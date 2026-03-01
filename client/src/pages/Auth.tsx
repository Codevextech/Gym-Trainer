import { useState, useEffect } from 'react';
import { PageTransition, Input, Button } from '@/components/SharedUI';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Dumbbell } from 'lucide-react';

const authSchema = z.object({
  username: z.string().min(3, "Username required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register: registerUser, user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema)
  });

  useEffect(() => {
    if (user) {
      setLocation(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [user, setLocation]);

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    try {
      if (isLogin) {
        await login(data);
        toast({ title: "Welcome back!" });
      } else {
        await registerUser(data);
        toast({ title: "Account created successfully!" });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <PageTransition className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 sm:p-10 rounded-3xl text-center">
          <Dumbbell className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold uppercase mb-2">
            {isLogin ? 'Welcome Back' : 'Join The Club'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isLogin ? 'Enter your credentials to access your dashboard' : 'Create an account to start your journey'}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-foreground/80">Username</label>
              <Input {...register('username')} placeholder="Enter your username" />
              {errors.username && <p className="text-primary text-sm mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-foreground/80">Password</label>
              <Input {...register('password')} type="password" placeholder="••••••••" />
              {errors.password && <p className="text-primary text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <Button type="submit" className="w-full text-xl py-4" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </Button>
          </form>

          <div className="mt-8 text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-primary hover:underline font-bold"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
