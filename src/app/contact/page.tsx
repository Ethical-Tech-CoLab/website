import type { Metadata } from "next";
import { ContactQRSlide } from "@/components/ContactQRSlide";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Scan a code to join the NYU Ethical Tech CoLab's events calendar, LinkedIn page, or WhatsApp community.",
};

// Paste the three real links here — this is the only thing to edit on this
// page. Each one drives the QR code of the same name in ContactQRSlide.
const LUMA_URL = "https://luma.com/ethical-tech-colab";
const LINKEDIN_URL = "https://www.linkedin.com/company/ethical-tech-lab/";
const WHATSAPP_URL = "https://chat.whatsapp.com/Is4rMvXb16N5c5F4nXUdIz";

export default function ContactPage() {
  return (
    <ContactQRSlide
      lumaUrl={LUMA_URL}
      linkedinUrl={LINKEDIN_URL}
      whatsappUrl={WHATSAPP_URL}
    />
  );
}
