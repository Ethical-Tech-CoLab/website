"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

/**
 * A "projection slide" hero: three scannable QR codes, meant to be legible
 * put up on a screen at an event as much as read at a desk. Sits under the
 * normal site header and above the normal footer, like any other page.
 *
 * QR codes are drawn client-side from davidshimjs/qrcodejs, loaded from a
 * CDN rather than installed as a dependency — this page is the only thing
 * that needs it, and it is a tiny, unmaintained-but-stable library with no
 * npm types.
 */

const QR_LIBRARY_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";

// davidshimjs/qrcodejs ships no types. Declared narrowly to what this
// component actually calls, rather than reaching for `any`.
interface QRCodeOptions {
  text: string;
  width?: number;
  height?: number;
  colorDark?: string;
  colorLight?: string;
  correctLevel?: number;
}
interface QRCodeConstructor {
  new (element: HTMLElement, options: QRCodeOptions): unknown;
  CorrectLevel: { L: number; M: number; Q: number; H: number };
}
declare global {
  interface Window {
    QRCode?: QRCodeConstructor;
  }
}

function QrCard({
  label,
  caption,
  url,
  libraryReady,
}: {
  label: string;
  caption: string;
  url: string;
  libraryReady: boolean;
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  // qrcodejs draws into the DOM node imperatively and has no update/destroy
  // API, so this card draws once per URL rather than reconciling with React.
  const drawnFor = useRef<string | null>(null);

  useEffect(() => {
    if (!libraryReady || !window.QRCode || !targetRef.current) return;
    if (drawnFor.current === url) return;
    targetRef.current.replaceChildren();
    // High correction level and a source resolution above every CSS size
    // this renders at, so the code stays crisp scaled down for a phone and
    // sharp scaled up for a projector.
    new window.QRCode(targetRef.current, {
      text: url,
      width: 320,
      height: 320,
      colorDark: "#0a0612",
      colorLight: "#ffffff",
      correctLevel: window.QRCode.CorrectLevel.H,
    });
    drawnFor.current = url;
  }, [libraryReady, url]);

  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-card px-6 py-8 text-center sm:px-8">
      <div className="aspect-square w-full max-w-[190px] overflow-hidden rounded-xl bg-white p-3 sm:max-w-[220px] lg:max-w-[260px]">
        <div
          ref={targetRef}
          className="h-full w-full [&>canvas]:h-full [&>canvas]:w-full [&>img]:h-full [&>img]:w-full"
        />
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight sm:text-xl">{label}</p>
        <p className="mt-1 text-sm text-muted sm:text-base">{caption}</p>
      </div>
    </div>
  );
}

export function ContactQRSlide({
  lumaUrl,
  linkedinUrl,
  whatsappUrl,
}: {
  lumaUrl: string;
  linkedinUrl: string;
  whatsappUrl: string;
}) {
  const [libraryReady, setLibraryReady] = useState(false);

  const codes = [
    {
      key: "luma",
      label: "Events Calendar",
      caption: "Powered by Luma — RSVP to our next session.",
      url: lumaUrl,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      caption: "Follow the CoLab for research and announcements.",
      url: linkedinUrl,
    },
    {
      key: "whatsapp",
      label: "Join our WhatsApp Community",
      caption: "Event reminders and updates between cohorts.",
      url: whatsappUrl,
    },
  ] as const;

  return (
    <>
      <Script
        src={QR_LIBRARY_SRC}
        strategy="afterInteractive"
        onReady={() => setLibraryReady(true)}
      />
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center sm:py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            NYU CGA × Microsoft
          </p>
          <h1 className="mx-auto mt-3 max-w-3xl font-heading text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
            Connect with the <span className="display-em">CoLab</span>.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
            Scan a code below — from your seat, or across the room.
          </p>

          <div className="mx-auto mt-10 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {codes.map((code) => (
              <QrCard
                key={code.key}
                label={code.label}
                caption={code.caption}
                url={code.url}
                libraryReady={libraryReady}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
