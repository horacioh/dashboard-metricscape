
import { useEffect, useState } from "react";
import { Server, Cpu, Gauge } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type PlatformInfoProps = {
  timestamp: string;
  platform: string;
  arch: string;
  metrics: {
    "app-startup": {
      cpuUsage: {
        percentCPUUsage: number;
        idleWakeupsPerSecond: number;
      };
      jsHeapUsedSize: number;
      jsHeapTotalSize: number;
    };
  };
};

const PlatformInfo = ({ timestamp, platform, arch, metrics }: PlatformInfoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const startupMetrics = metrics["app-startup"];
  const memoryPercentage = (startupMetrics.jsHeapUsedSize / startupMetrics.jsHeapTotalSize) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div 
      className={cn(
        "bg-card rounded-lg border p-4 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <h3 className="text-lg font-medium mb-2">System Information</h3>
      <Separator className="my-3" />
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Server size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Platform</span>
              <span className="text-sm capitalize">{platform}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Architecture</span>
              <span className="text-sm">{arch}</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-1" />
        
        <div className="flex items-center gap-3">
          <Cpu size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">CPU Usage</span>
              <span className="text-sm">{startupMetrics.cpuUsage.percentCPUUsage}%</span>
            </div>
            <Progress value={startupMetrics.cpuUsage.percentCPUUsage} className="h-1" />
            <div className="flex justify-between items-center mt-2 mb-1">
              <span className="text-xs text-muted-foreground">Idle Wakeups</span>
              <span className="text-xs">{startupMetrics.cpuUsage.idleWakeupsPerSecond}/sec</span>
            </div>
          </div>
        </div>
        
        <Separator className="my-1" />
        
        <div className="flex items-center gap-3">
          <Gauge size={18} className="text-muted-foreground" />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Memory Usage</span>
              <span className="text-sm">{formatBytes(startupMetrics.jsHeapUsedSize)}</span>
            </div>
            <Progress value={memoryPercentage} className="h-1" />
            <div className="flex justify-between items-center mt-2 mb-1">
              <span className="text-xs text-muted-foreground">Total Available</span>
              <span className="text-xs">{formatBytes(startupMetrics.jsHeapTotalSize)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformInfo;
