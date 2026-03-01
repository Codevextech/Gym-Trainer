import React from 'react';
import { PageTransition, SectionHeading, Button, Input, Textarea } from '@/components/SharedUI';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateMessage } from '@/hooks/use-messages';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { mutateAsync: sendMessage, isPending } = useCreateMessage();
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
      await sendMessage(data);
      toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
      reset();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <PageTransition>
      <SectionHeading title="Get In Touch" subtitle="Contact Us" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 max-w-6xl mx-auto">
        <div className="space-y-8">
          <h3 className="text-3xl font-display font-bold uppercase mb-6">Let's Start Your Transformation</h3>
          <p className="text-muted-foreground text-lg">
            Have questions about our programs, personal training, or facilities? Drop us a message and our team will get back to you within 24 hours.
          </p>
          
          <div className="space-y-6 pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider text-sm">Location</h4>
                <p className="text-muted-foreground">123 Iron Street, Muscle City, MC 90210</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider text-sm">Phone</h4>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-wider text-sm">Email</h4>
                <p className="text-muted-foreground">contact@fitcoachpro.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">Name</label>
              <Input {...register('name')} placeholder="John Doe" />
              {errors.name && <p className="text-primary text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">Email</label>
              <Input {...register('email')} type="email" placeholder="john@example.com" />
              {errors.email && <p className="text-primary text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2">Message</label>
              <Textarea {...register('message')} placeholder="How can we help you?" />
              {errors.message && <p className="text-primary text-sm mt-1">{errors.message.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
