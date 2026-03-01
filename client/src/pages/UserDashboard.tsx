import { PageTransition, SectionHeading, Button, Input } from '@/components/SharedUI';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import { Activity, Calendar, Trophy, Settings } from 'lucide-react';

export default function UserDashboard() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [bmiParams, setBmiParams] = useState({ height: '', weight: '' });
  const [bmi, setBmi] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation('/auth');
    }
  }, [user, isLoading, setLocation]);

  if (isLoading || !user) {
    return <PageTransition><div className="text-center mt-20">Loading...</div></PageTransition>;
  }

  const calculateBmi = () => {
    const h = parseFloat(bmiParams.height) / 100; // cm to m
    const w = parseFloat(bmiParams.weight);
    if (h > 0 && w > 0) {
      setBmi(+(w / (h * h)).toFixed(1));
    }
  };

  return (
    <PageTransition>
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold uppercase tracking-wider">Dashboard</h1>
          <p className="text-muted-foreground text-lg">Welcome back, <span className="text-primary">{user.name || user.username}</span>!</p>
        </div>
        <Button variant="outline" className="hidden sm:flex">
          <Settings className="w-4 h-4 mr-2" /> Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-primary/20 text-primary rounded-xl">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Membership</p>
            <p className="text-2xl font-display uppercase">{user.membershipStatus || 'None'}</p>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-blue-500/20 text-blue-500 rounded-xl">
            <Activity className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Active Plan</p>
            <p className="text-2xl font-display uppercase">Weight Loss Pro</p>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-4 bg-green-500/20 text-green-500 rounded-xl">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Next Session</p>
            <p className="text-2xl font-display uppercase">Tomorrow, 10 AM</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BMI Calculator */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-display font-bold uppercase mb-6">BMI Calculator</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Height (cm)</label>
                <Input 
                  type="number" 
                  value={bmiParams.height} 
                  onChange={e => setBmiParams({...bmiParams, height: e.target.value})} 
                  placeholder="175"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">Weight (kg)</label>
                <Input 
                  type="number" 
                  value={bmiParams.weight} 
                  onChange={e => setBmiParams({...bmiParams, weight: e.target.value})} 
                  placeholder="70"
                />
              </div>
            </div>
            <Button onClick={calculateBmi} className="w-full">Calculate</Button>
            
            {bmi !== null && (
              <div className="mt-6 p-4 bg-background border border-white/5 rounded-xl text-center">
                <p className="text-sm text-muted-foreground mb-1">Your BMI Is</p>
                <p className="text-4xl font-display font-bold text-primary">{bmi}</p>
                <p className="text-sm mt-2 text-muted-foreground">
                  {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal weight' : bmi < 30 ? 'Overweight' : 'Obese'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Current Plan Overview */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-display font-bold uppercase mb-6">Weekly Schedule</h3>
          <div className="space-y-3">
            {[
              { day: 'Monday', focus: 'Chest & Triceps', completed: true },
              { day: 'Tuesday', focus: 'Back & Biceps', completed: true },
              { day: 'Wednesday', focus: 'Rest / Active Recovery', completed: false },
              { day: 'Thursday', focus: 'Legs & Core', completed: false },
              { day: 'Friday', focus: 'Shoulders & Abs', completed: false },
            ].map((workout, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/5">
                <div>
                  <p className="font-bold text-sm uppercase text-muted-foreground">{workout.day}</p>
                  <p className="font-display text-lg">{workout.focus}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${workout.completed ? 'border-primary bg-primary' : 'border-white/20'}`}>
                  {workout.completed && <Check className="w-4 h-4 text-white" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function Check(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
}
