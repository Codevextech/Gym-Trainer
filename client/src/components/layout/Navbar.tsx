import { Link, useLocation } from "wouter";
import { useAuth, useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Dumbbell, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const { data: user } = useAuth();
  const logout = useLogout();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", path: "/programs" },
    { name: "Schedule", path: "/schedule" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 py-2 shadow-lg" : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <Dumbbell className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform" />
          <span className="text-2xl font-display font-bold uppercase tracking-wider text-white">
            Fit<span className="text-primary">Coach</span> Pro
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <span className={`text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors cursor-pointer ${
                location === link.path ? "text-primary" : "text-muted-foreground"
              }`}>
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-white">
                  <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => logout.mutate()} className="text-muted-foreground hover:text-destructive">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link href="/auth">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-none px-6">
                Join Now
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-card border-b border-border/50 shadow-xl flex flex-col p-4 gap-4">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path}>
              <span 
                className="block text-lg font-display uppercase p-2 hover:bg-white/5 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </span>
            </Link>
          ))}
          <div className="h-px bg-border/50 my-2" />
          {user ? (
            <div className="flex flex-col gap-2">
              <Link href={user.role === 'admin' ? '/admin' : '/dashboard'}>
                <Button className="w-full justify-start" onClick={() => setMobileMenuOpen(false)}>Dashboard</Button>
              </Link>
              <Button variant="destructive" className="w-full justify-start" onClick={() => { logout.mutate(); setMobileMenuOpen(false); }}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button className="w-full bg-primary" onClick={() => setMobileMenuOpen(false)}>Join Now</Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
