import React from 'react';
import { PageTransition, SectionHeading, Button } from '@/components/SharedUI';
import { Check } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Link, useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';

export default function Membership() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const plans = [
    {
      name: "Basic",
      price: "$49",
      duration: "/month",
      features: ["Access to Gym", "Basic Workout Plan", "Locker Room Access", "1 Free PT Session"],
      popular: false
    },
    {
      name: "Pro",
      price: "$99",
      duration: "/month",
      features: ["All Basic Features", "Custom Diet Plan", "Weekly PT Session", "Priority Support", "Access to Classes"],
      popular: true
    },
    {
      name: "Elite",
      price: "$249",
      duration: "/3 months",
      features: ["All Pro Features", "Daily PT Sessions", "Supplement Guide", "Body Composition Analysis", "24/7 Coach WhatsApp"],
      popular: false
    }
  ];

  const handleSubscribe = (planName: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to subscribe to a plan.",
        variant: "destructive"
      });
      setLocation('/auth');
      return;
    }
    
    // In a real app, this would redirect to Stripe checkout.
    // For this mockup, we just show a success message.
    toast({
      title: "Redirecting to Payment...",
      description: `Setting up your ${planName} subscription.`,
    });
  };

  return (
    <PageTransition>
      <SectionHeading title="Choose Your Plan" subtitle="Pricing" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`glass-card rounded-2xl p-8 flex flex-col relative ${
              plan.popular ? 'border-primary shadow-primary/20 scale-105 z-10' : 'border-white/10'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-display font-bold uppercase mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl md:text-5xl font-bold font-display">{plan.price}</span>
              <span className="text-muted-foreground">{plan.duration}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feat, j) => (
                <li key={j} className="flex items-center gap-3 text-muted-foreground">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <Button 
              variant={plan.popular ? 'primary' : 'outline'} 
              className="w-full"
              onClick={() => handleSubscribe(plan.name)}
            >
              Choose Plan
            </Button>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
