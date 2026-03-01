import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Dumbbell, Menu, X, User as UserIcon, LogOut } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <Dumbbell className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
              <span className="font-display text-2xl font-bold tracking-widest uppercase">
                Fit<span className="text-primary">Coach</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`font-display uppercase tracking-widest text-lg transition-colors hover:text-primary ${
                    location === link.path ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link 
                    href={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display uppercase tracking-wider"
                  >
                    <UserIcon className="w-5 h-5" />
                    {user.name || user.username}
                  </Link>
                  <button 
                    onClick={() => logout()}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link 
                  href="/auth"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded font-display uppercase tracking-widest transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
                >
                  Join Now
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-foreground p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-card border-b border-white/5 py-4 px-4 flex flex-col gap-4 shadow-xl">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-display uppercase tracking-widest text-xl ${
                  location === link.path ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            {user ? (
              <>
                <Link 
                  href={user.role === 'admin' ? '/admin' : '/dashboard'}
                  onClick={() => setIsOpen(false)}
                  className="font-display uppercase tracking-widest text-xl text-foreground"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="text-left font-display uppercase tracking-widest text-xl text-destructive"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/auth"
                onClick={() => setIsOpen(false)}
                className="font-display uppercase tracking-widest text-xl text-primary"
              >
                Login / Join
              </Link>
            )}
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-card border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <Dumbbell className="w-8 h-8 text-primary" />
              <span className="font-display text-2xl font-bold tracking-widest uppercase">
                Fit<span className="text-primary">Coach</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Transform your body and mind with professional coaching, tailored diet plans, and a community that pushes you to your limits.
            </p>
          </div>
          <div>
            <h4 className="font-display uppercase tracking-widest text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Me</Link>
              <Link href="/programs" className="text-muted-foreground hover:text-primary transition-colors">Programs</Link>
              <Link href="/membership" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display uppercase tracking-widest text-lg mb-4">Connect</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <p>contact@fitcoachpro.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Iron Street, Muscle City</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/5 text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} FitCoach Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
