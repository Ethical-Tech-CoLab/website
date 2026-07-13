import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ScrollProgress } from "@/components/ScrollProgress";
// IntroCurtain (the "Tap to enter" splash) removed — visitors land directly on
// the site. Component preserved at src/components/IntroCurtain.tsx to re-enable.

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ethicaltechlab.org"),
  title: {
    default: "NYU Ethical Tech CoLab · Emerging Tech, Human Condition",
    template: "%s · NYU Ethical Tech CoLab",
  },
  description:
    "A research collaboration between NYU's Center for Global Affairs and Microsoft, exploring tech interventions for migration, forced labor, IDPs and refugees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        data-theme="dark"
        suppressHydrationWarning
        className={`${bebasNeue.variable} ${spaceMono.variable} h-full antialiased`}
      >
        <head>
          {/* Dark is the flagship theme: default to it unless the visitor has
              explicitly chosen light before. Applied pre-paint to avoid a flash. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
            }}
          />
        </head>
        <body className="min-h-full flex flex-col bg-background text-foreground">
          <ScrollProgress />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </body>
      </html>
    </ViewTransitions>
  );
}
