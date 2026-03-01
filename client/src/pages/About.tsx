import React from 'react';
import { PageTransition, SectionHeading } from '@/components/SharedUI';

export default function About() {
  return (
    <PageTransition>
      <SectionHeading title="Meet Your Coach" subtitle="About Me" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-transparent opacity-20 blur-2xl rounded-full" />
          {/* fitness trainer portrait */}
          <img 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop" 
            alt="Coach Portrait" 
            className="relative z-10 rounded-2xl shadow-2xl border border-white/10 w-full object-cover aspect-[4/5]"
          />
        </div>
        
        <div className="space-y-6 text-lg text-muted-foreground">
          <h3 className="text-3xl font-display font-bold text-foreground uppercase mb-4">
            Hi, I'm <span className="text-primary">Alex</span>
          </h3>
          <p>
            With over 10 years of experience in the fitness industry, I've helped hundreds of clients transform their bodies and completely shift their mindset towards health and wellness.
          </p>
          <p>
            My philosophy is simple: consistent hard work, smart nutrition, and proper recovery. There are no shortcuts or magic pills. It's about building sustainable habits that last a lifetime.
          </p>
          
          <div className="grid grid-cols-2 gap-6 pt-6 mt-6 border-t border-white/10">
            <div>
              <h4 className="font-display text-4xl text-primary font-bold mb-2">10+</h4>
              <p className="uppercase tracking-wider text-sm">Years Experience</p>
            </div>
            <div>
              <h4 className="font-display text-4xl text-primary font-bold mb-2">500+</h4>
              <p className="uppercase tracking-wider text-sm">Clients Transformed</p>
            </div>
            <div>
              <h4 className="font-display text-4xl text-primary font-bold mb-2">15</h4>
              <p className="uppercase tracking-wider text-sm">Certifications</p>
            </div>
            <div>
              <h4 className="font-display text-4xl text-primary font-bold mb-2">100%</h4>
              <p className="uppercase tracking-wider text-sm">Commitment</p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
