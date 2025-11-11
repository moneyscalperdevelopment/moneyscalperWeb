import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import gmailIcon from "@/assets/gmail-icon.png";
import telegramIcon from "@/assets/telegram-icon-circle.png";
import instagramIcon from "@/assets/instagram-icon.png";
import discordIcon from "@/assets/discord-icon.png";
interface ContactDialogProps {
  children: React.ReactNode;
}
const ContactDialog = ({
  children
}: ContactDialogProps) => {
  return <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Get In Touch
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Connect with us through your preferred platform
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap justify-center gap-8 py-8">
          <a href="mailto:contact@moneyscalper.com" className="flex flex-col items-center gap-3 group transition-transform hover:scale-110">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img src={gmailIcon} alt="Email" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Email
            </span>
          </a>

          <a href="https://t.me/moneyscalper" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group transition-transform hover:scale-110">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img src={telegramIcon} alt="Telegram" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Telegram
            </span>
          </a>

          <a href="https://www.instagram.com/money_scalper?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group transition-transform hover:scale-110">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img src={instagramIcon} alt="Instagram" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Instagram
            </span>
          </a>

          <a href="https://discord.gg/VNkhzUGw" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 group transition-transform hover:scale-110">
            <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img src={discordIcon} alt="Discord" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Discord
            </span>
          </a>
        </div>
        <div className="text-center pt-2 pb-2">
          <p className="text-sm text-muted-foreground">   Secure   •   Active 24/7   •   Expert Support</p>
        </div>
      </DialogContent>
    </Dialog>;
};
export default ContactDialog;