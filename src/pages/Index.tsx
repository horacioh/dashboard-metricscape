
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardHeader from "@/components/DashboardHeader";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import PlatformInfo from "@/components/PlatformInfo";

const metricsData = {
  "timestamp": "2025-03-05T00:12:16.599Z",
  "metrics": {
    "app-startup": {
      "layoutDuration": 0,
      "recalcStyleDuration": 0,
      "scriptDuration": 11.057,
      "taskDuration": 11.079,
      "jsHeapUsedSize": 1914820,
      "jsHeapTotalSize": 3047424,
      "domContentLoaded": 0,
      "cpuUsage": {
        "percentCPUUsage": 15,
        "idleWakeupsPerSecond": 5
      },
      "timeToInteractive": 284,
      "appStartupTime": 284
    },
    "dashboard-view": {
      "layoutDuration": 0,
      "recalcStyleDuration": 0,
      "scriptDuration": 0,
      "taskDuration": 0.005,
      "jsHeapUsedSize": 26394264,
      "jsHeapTotalSize": 39550976,
      "domContentLoaded": 864010325.235,
      "cpuUsage": {
        "percentCPUUsage": 15,
        "idleWakeupsPerSecond": 5
      }
    },
    "navigation-performance": {
      "layoutDuration": 0,
      "recalcStyleDuration": 0,
      "scriptDuration": 0,
      "taskDuration": 0.005,
      "jsHeapUsedSize": 8084012,
      "jsHeapTotalSize": 15253504,
      "domContentLoaded": 864011660.827,
      "cpuUsage": {
        "percentCPUUsage": 15,
        "idleWakeupsPerSecond": 5
      }
    },
    "heavy-operation": {
      "layoutDuration": 0,
      "recalcStyleDuration": 0,
      "scriptDuration": 0,
      "taskDuration": 0.005,
      "jsHeapUsedSize": 8083956,
      "jsHeapTotalSize": 15777792,
      "domContentLoaded": 864012572.041,
      "cpuUsage": {
        "percentCPUUsage": 15,
        "idleWakeupsPerSecond": 5
      }
    },
    "ipc-communication": {
      "layoutDuration": 0,
      "recalcStyleDuration": 0,
      "scriptDuration": 0,
      "taskDuration": 0.020999999999999998,
      "jsHeapUsedSize": 22168512,
      "jsHeapTotalSize": 38764544,
      "domContentLoaded": 864013624.204,
      "cpuUsage": {
        "percentCPUUsage": 15,
        "idleWakeupsPerSecond": 5
      }
    },
    "memory-usage": {
      "layoutDuration": 0,
      "recalcStyleDuration": 0,
      "scriptDuration": 0,
      "taskDuration": 0.008,
      "jsHeapUsedSize": 27180316,
      "jsHeapTotalSize": 43220992,
      "domContentLoaded": 864016182.3690001,
      "cpuUsage": {
        "percentCPUUsage": 15,
        "idleWakeupsPerSecond": 5
      }
    },
    "window-management": {
      "layoutDuration": 0,
      "recalcStyleDuration": 0,
      "scriptDuration": 0,
      "taskDuration": 0.018000000000000002,
      "jsHeapUsedSize": 21857280,
      "jsHeapTotalSize": 39813120,
      "domContentLoaded": 864022706.527,
      "cpuUsage": {
        "percentCPUUsage": 15,
        "idleWakeupsPerSecond": 5
      }
    },
    "large-content": {
      "layoutDuration": 0,
      "recalcStyleDuration": 0,
      "scriptDuration": 0,
      "taskDuration": 0.011,
      "jsHeapUsedSize": 22233252,
      "jsHeapTotalSize": 40075264,
      "domContentLoaded": 864025239.469,
      "cpuUsage": {
        "percentCPUUsage": 15,
        "idleWakeupsPerSecond": 5
      }
    }
  },
  "platform": "darwin",
  "arch": "arm64"
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground animate-pulse">Loading metrics...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardHeader 
        timestamp={metricsData.timestamp} 
        platform={metricsData.platform} 
        arch={metricsData.arch} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-3">
          <PerformanceMetrics metrics={metricsData.metrics} />
        </div>
        
        <div className="lg:col-span-1">
          <PlatformInfo 
            timestamp={metricsData.timestamp}
            platform={metricsData.platform}
            arch={metricsData.arch}
            metrics={metricsData.metrics}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
