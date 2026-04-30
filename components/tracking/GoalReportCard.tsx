"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

interface ActionSummary {
  name: string;
  avg_percentage: number;
}

interface GoalReportCardProps {
  goal: {
    title: string;
    avg_progress: number;
    total_completed: number;
    unit: string;
    actions: ActionSummary[];
  };
}

export function GoalReportCard({ goal }: GoalReportCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card title={goal.title} className="relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gray-800/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
      
      <div className="space-y-6 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-text-secondary">Weekly Average</span>
            <span className="text-4xl font-bold text-secondary tracking-tighter">{goal.avg_progress}%</span>
          </div>
          <div className="w-full bg-bg-main h-3 rounded-full overflow-hidden shadow-inner border border-border-subtle/50">
            <div 
              className="bg-gradient-to-r from-secondary to-secondary-hover h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              style={{ width: `${goal.avg_progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-border-subtle/50">
          <div>
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-text-secondary block mb-2">Total Impact</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-text-primary tracking-tight">{goal.total_completed}</span>
              <span className="text-xs text-text-secondary font-bold uppercase">{goal.unit || 'units'}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-medium tracking-[0.08em] uppercase text-gray-50 hover:underline underline-offset-4"
          >
            {isExpanded ? "Hide Breakdown" : "View Breakdown"}
          </button>
        </div>

        {isExpanded && (
          <div className="pt-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {goal.actions?.map((action, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm font-bold mb-1.5">
                  <span className="text-text-secondary">{action.name}</span>
                  <span className="text-secondary font-bold">{action.avg_percentage}%</span>
                </div>
                <div className="w-full bg-bg-main h-2 rounded-full overflow-hidden shadow-inner border border-border-subtle/50">
                  <div 
                    className="bg-secondary/40 h-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                    style={{ width: `${action.avg_percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
