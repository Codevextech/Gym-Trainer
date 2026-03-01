import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Users, Trophy } from 'lucide-react';
import { PageTransition, SectionHeading, Button } from '@/components/SharedUI';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* dark gym workout heavy weights */}
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop" 
            alt="Gym Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold uppercase tracking-tight mb-6">
              Push Beyond <br />
              <span className="text-gradient">Your Limits</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Elite personal training, customized nutrition, and a bulletproof mindset to achieve the body you deserve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/membership">
                <Button className="w-full sm:w-auto text-xl px-8 py-4">Start Your Journey</Button>
              </Link>
              <Link href="/programs">
                <Button variant="outline" className="w-full sm:w-auto text-xl px-8 py-4 bg-background/50 backdrop-blur-sm">View Programs</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Snippet */}
      <section className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What I Offer" subtitle="Services" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { icon: Activity, title: "Personal Training", desc: "1-on-1 coaching tailored specifically to your body type and goals." },
              { icon: Users, title: "Group Classes", desc: "High-energy group sessions designed to burn fat and build endurance." },
              { icon: Trophy, title: "Nutrition Plans", desc: "Custom meal plans that fuel your workouts and optimize recovery." },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-8 rounded-2xl text-center hover-elevate"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-bold uppercase mb-4">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase mb-6">Ready to Transform?</h2>
          <p className="text-xl text-muted-foreground mb-10">Join today and get 20% off your first month of premium coaching.</p>
          <Link href="/auth">
            <Button className="text-xl px-10 py-5">
              Claim Offer <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
