import React, { useEffect } from 'react';
import { PageTransition, SectionHeading, Button } from '@/components/SharedUI';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { useStats, useUsers } from '@/hooks/use-users';
import { useMessages } from '@/hooks/use-messages';
import { Users, LayoutList, Mail, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  
  const { data: stats } = useStats();
  const { data: usersList } = useUsers();
  const { data: messages } = useMessages();

  useEffect(() => {
    if (!authLoading) {
      if (!user) setLocation('/auth');
      else if (user.role !== 'admin') setLocation('/dashboard');
    }
  }, [user, authLoading, setLocation]);

  if (authLoading || !user || user.role !== 'admin') {
    return <PageTransition><div className="text-center mt-20">Loading...</div></PageTransition>;
  }

  const chartData = [
    { name: 'Users', value: stats?.totalUsers || 0 },
    { name: 'Programs', value: stats?.totalPrograms || 0 },
    { name: 'Messages', value: stats?.totalMessages || 0 },
  ];

  return (
    <PageTransition>
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold uppercase tracking-wider text-primary">Admin Portal</h1>
        <p className="text-muted-foreground text-lg">Manage platform data and track performance.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Total Users</p>
            <p className="text-4xl font-display font-bold mt-1">{stats?.totalUsers || 0}</p>
          </div>
          <div className="p-4 bg-primary/10 text-primary rounded-xl"><Users className="w-6 h-6" /></div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Programs</p>
            <p className="text-4xl font-display font-bold mt-1">{stats?.totalPrograms || 0}</p>
          </div>
          <div className="p-4 bg-blue-500/10 text-blue-500 rounded-xl"><LayoutList className="w-6 h-6" /></div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Messages</p>
            <p className="text-4xl font-display font-bold mt-1">{stats?.totalMessages || 0}</p>
          </div>
          <div className="p-4 bg-green-500/10 text-green-500 rounded-xl"><Mail className="w-6 h-6" /></div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Status</p>
            <p className="text-2xl font-display font-bold mt-1 text-green-500">Healthy</p>
          </div>
          <div className="p-4 bg-white/5 text-white/50 rounded-xl"><Activity className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-display font-bold uppercase mb-6">Platform Metrics</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#141414', border: '1px solid #333'}} />
                <Bar dataKey="value" fill="hsl(350 89% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="glass-card p-6 rounded-2xl flex flex-col">
          <h3 className="text-xl font-display font-bold uppercase mb-6 flex justify-between items-center">
            Inbox
            <span className="text-xs bg-primary px-2 py-1 rounded-full text-white">{messages?.length || 0}</span>
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 max-h-[300px] pr-2">
            {messages?.slice(0,5).map(msg => (
              <div key={msg.id} className="p-4 bg-background/50 border border-white/5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-sm">{msg.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(msg.createdAt!).toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{msg.message}</p>
              </div>
            ))}
            {messages?.length === 0 && <p className="text-muted-foreground text-center py-8">No new messages</p>}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-8 glass-card p-6 rounded-2xl overflow-hidden">
        <h3 className="text-xl font-display font-bold uppercase mb-6">Registered Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-muted-foreground text-sm uppercase tracking-wider">
                <th className="pb-3 pr-4 font-normal">ID</th>
                <th className="pb-3 px-4 font-normal">Username</th>
                <th className="pb-3 px-4 font-normal">Role</th>
                <th className="pb-3 px-4 font-normal">Membership</th>
              </tr>
            </thead>
            <tbody>
              {usersList?.map(u => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 pr-4 text-muted-foreground">#{u.id}</td>
                  <td className="py-4 px-4 font-bold">{u.username}</td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/70'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground uppercase text-sm tracking-wider">{u.membershipStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageTransition>
  );
}
