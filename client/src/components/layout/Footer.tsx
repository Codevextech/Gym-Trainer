import { Link } from "wouter";
import { Dumbbell, Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card pt-16 pb-8 border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 cursor-pointer">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="text-2xl font-display font-bold uppercase tracking-wider text-white">
                Fit<span className="text-primary">Coach</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Transforming lives through elite personal training, customized nutrition, and relentless dedication.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-display uppercase mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">About Us</span></Link></li>
              <li><Link href="/programs"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Programs</span></Link></li>
              <li><Link href="/schedule"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Schedule</span></Link></li>
              <li><Link href="/membership"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Membership</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-display uppercase mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/contact"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">Contact Us</span></Link></li>
              <li><Link href="/faq"><span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">FAQ</span></Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-display uppercase mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">123 Iron Avenue, Muscle City, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">info@fitcoachpro.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 text-center text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} FitCoach Pro. All rights reserved.</p>
          <p>Forged with discipline.</p>
        </div>
      </div>
    </footer>
  );
}
