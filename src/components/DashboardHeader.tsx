
import { useEffect, useState } from "react";
import { Cpu, BarChart2, Calendar, GaugeCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
  timestamp: string;
  platform: string;
  arch: string;
};

const DashboardHeader = ({ timestamp, platform, arch }: DashboardHeaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const date = new Date(timestamp);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "transition-all duration-700",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium px-2.5 py-1 bg-primary/10 text-primary rounded-full mb-3">
            <GaugeCircle size={14} />
            <span>Performance Metrics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Application Metrics Dashboard</h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <span>
              {date.toLocaleDateString("en-US", { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </p>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full">
            <Cpu size={15} className="text-muted-foreground" />
            <span className="font-medium capitalize">{platform}</span>
          </div>
          
          <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full">
            <BarChart2 size={15} className="text-muted-foreground" />
            <span className="font-medium">{arch}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
