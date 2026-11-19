import { siteConfig, whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(`Hi ${siteConfig.brand}! I have a question about your clothing.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mandela Motion on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-deep transition-transform hover:scale-110"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" aria-hidden />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  );
}
