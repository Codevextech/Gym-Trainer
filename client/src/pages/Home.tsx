import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Users, Trophy, Star, CheckCircle, Zap } from 'lucide-react';
import { PageTransition, SectionHeading, Button } from '@/components/SharedUI';

export default function Home() {
  const transformations = [
    { name: "John D.", result: "Lost 20kg in 4 months", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop" },
    { name: "Sarah K.", result: "Gained 5kg lean muscle", img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=400&auto=format&fit=crop" },
    { name: "Mike R.", result: "Improved strength by 40%", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=400&auto=format&fit=crop" },
  ];

  const testimonials = [
    { name: "David L.", text: "Alex is the best coach I've ever worked with. His approach to nutrition changed my life.", stars: 5 },
    { name: "Emma W.", text: "The personalized workout plans are intense but incredibly effective. Highly recommend!", stars: 5 },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop" 
            alt="Gym Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold tracking-widest uppercase text-xs">
              FitCoach Pro - Elite Training
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tighter mb-6 leading-none">
              Transform <br />
              <span className="text-gradient">Your Body</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Unlock your peak potential with science-backed training, custom nutrition, and 24/7 expert accountability.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/membership">
                <Button className="w-full sm:w-auto text-xl px-10 py-5 group">
                  Start Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" className="w-full sm:w-auto text-xl px-10 py-5 bg-white/5">
                  Our Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Members", val: "2,500+" },
            { label: "Expert Coaches", val: "15" },
            { label: "Success Rate", val: "98%" },
            { label: "Workout Sessions", val: "10k+" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-display font-bold text-primary">{stat.val}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Premium Services" subtitle="Push Your Limits" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Zap, title: "Custom Training", desc: "Scientific approach to strength and hypertrophy tailored to your anatomy." },
              { icon: Activity, title: "Precision Macros", desc: "Nutritional frameworks optimized for performance and rapid body composition changes." },
              { icon: Trophy, title: "Peak Performance", desc: "Advanced athletic conditioning to unlock speed, power, and mental toughness." },
            ].map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-10 rounded-3xl border border-white/5 relative group overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 text-primary">
                  <s.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold uppercase mb-4">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Real Results" subtitle="Success Stories" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {transformations.map((t, i) => (
              <div key={i} className="group relative rounded-3xl overflow-hidden aspect-[4/5] glass-card">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-2xl font-display font-bold uppercase text-white">{t.name}</p>
                  <p className="text-primary font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> {t.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Client Love" subtitle="Testimonials" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl border-l-4 border-l-primary">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-5 h-5 fill-primary text-primary" />)}
                </div>
                <p className="text-xl italic text-foreground/90 mb-8 leading-relaxed">"{t.text}"</p>
                <p className="font-display font-bold uppercase tracking-widest text-primary">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full -translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase mb-8 leading-tight">Your Best Self <br /> Starts <span className="text-primary">Today</span></h2>
          <p className="text-xl text-muted-foreground mb-12">Stop waiting for the "perfect time". The clock is ticking anyway.</p>
          <Link href="/auth">
            <Button className="text-2xl px-12 py-6 shadow-2xl shadow-primary/40">
              Join FitCoach Pro Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
