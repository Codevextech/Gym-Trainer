import React from 'react';
import { PageTransition, SectionHeading } from '@/components/SharedUI';

export default function Schedule() {
  const schedule = [
    { time: "06:00 AM", mon: "HIIT", tue: "Strength", wed: "Cardio", thu: "Strength", fri: "HIIT", sat: "Yoga", sun: "-" },
    { time: "08:00 AM", mon: "Strength", tue: "HIIT", wed: "Strength", thu: "Cardio", fri: "Strength", sat: "-", sun: "-" },
    { time: "12:00 PM", mon: "Core", tue: "Core", wed: "Core", thu: "Core", fri: "Core", sat: "Mobility", sun: "-" },
    { time: "05:00 PM", mon: "CrossFit", tue: "CrossFit", wed: "CrossFit", thu: "CrossFit", fri: "CrossFit", sat: "-", sun: "-" },
    { time: "07:00 PM", mon: "Boxing", tue: "Yoga", wed: "Boxing", thu: "Yoga", fri: "Boxing", sat: "-", sun: "-" },
  ];

  return (
    <PageTransition>
      <SectionHeading title="Class Schedule" subtitle="Plan Your Week" />
      
      <div className="mt-12 glass-card rounded-2xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-primary/10 text-primary font-display text-xl uppercase tracking-widest border-b border-primary/20">
                <th className="py-4 px-4 text-left border-r border-primary/20">Time</th>
                <th className="py-4 px-4 border-r border-white/5">Mon</th>
                <th className="py-4 px-4 border-r border-white/5">Tue</th>
                <th className="py-4 px-4 border-r border-white/5">Wed</th>
                <th className="py-4 px-4 border-r border-white/5">Thu</th>
                <th className="py-4 px-4 border-r border-white/5">Fri</th>
                <th className="py-4 px-4 border-r border-white/5">Sat</th>
                <th className="py-4 px-4">Sun</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              {schedule.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-5 px-4 text-left text-foreground font-bold whitespace-nowrap border-r border-white/5">
                    {row.time}
                  </td>
                  <td className="py-5 px-4 border-r border-white/5">{row.mon}</td>
                  <td className="py-5 px-4 border-r border-white/5">{row.tue}</td>
                  <td className="py-5 px-4 border-r border-white/5">{row.wed}</td>
                  <td className="py-5 px-4 border-r border-white/5">{row.thu}</td>
                  <td className="py-5 px-4 border-r border-white/5">{row.fri}</td>
                  <td className="py-5 px-4 border-r border-white/5">{row.sat}</td>
                  <td className="py-5 px-4">{row.sun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageTransition>
  );
}
