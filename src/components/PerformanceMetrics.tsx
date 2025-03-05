
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "./MetricCard";
import MetricChart from "./MetricChart";
import { Cpu, Memory, Clock, Gauge, Server, Activity, LayoutPanelLeft } from "lucide-react";

type MetricsData = {
  "app-startup": {
    layoutDuration: number;
    recalcStyleDuration: number;
    scriptDuration: number;
    taskDuration: number;
    jsHeapUsedSize: number;
    jsHeapTotalSize: number;
    domContentLoaded: number;
    cpuUsage: {
      percentCPUUsage: number;
      idleWakeupsPerSecond: number;
    };
    timeToInteractive: number;
    appStartupTime: number;
  };
  [key: string]: any;
};

type PerformanceMetricsProps = {
  metrics: MetricsData;
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const transformDataForCharts = (metrics: MetricsData) => {
  const sections = Object.keys(metrics);
  
  // Memory chart data
  const memoryData = sections.map(section => ({
    name: section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    memory: metrics[section].jsHeapUsedSize,
    total: metrics[section].jsHeapTotalSize
  }));
  
  // CPU chart data
  const cpuData = sections.map(section => ({
    name: section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    cpu: metrics[section].cpuUsage?.percentCPUUsage || 0
  }));
  
  // Duration chart data
  const durationData = sections.map(section => ({
    name: section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    duration: metrics[section].taskDuration * 1000 // Convert to ms
  }));
  
  const scriptData = sections.map(section => ({
    name: section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    script: metrics[section].scriptDuration * 1000, // Convert to ms
    layout: metrics[section].layoutDuration * 1000,
    style: metrics[section].recalcStyleDuration * 1000
  }));
  
  return { memoryData, cpuData, durationData, scriptData };
};

const PerformanceMetrics = ({ metrics }: PerformanceMetricsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { memoryData, cpuData, durationData, scriptData } = transformDataForCharts(metrics);
  
  // Find average, min, max values
  const avgMemoryUsage = memoryData.reduce((sum, item) => sum + item.memory, 0) / memoryData.length;
  const avgCpuUsage = cpuData.reduce((sum, item) => sum + item.cpu, 0) / cpuData.length;
  const maxMemoryUsage = Math.max(...memoryData.map(item => item.memory));
  const maxTotalMemory = Math.max(...memoryData.map(item => item.total));
  const avgMemoryPercentage = (avgMemoryUsage / maxTotalMemory) * 100;
  
  // Get startup metrics specifically
  const startupMetrics = metrics["app-startup"];
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
            <TabsTrigger value="memory" className="text-sm">Memory</TabsTrigger>
            <TabsTrigger value="performance" className="text-sm">Performance</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Average Memory Usage" 
              value={avgMemoryUsage}
              unit=" bytes"
              maxValue={maxTotalMemory}
              icon={<Memory size={18} />}
              delay={100}
            />
            <MetricCard 
              title="App Startup Time" 
              value={startupMetrics.appStartupTime}
              unit=" ms"
              icon={<Activity size={18} />}
              delay={200}
            />
            <MetricCard 
              title="Time to Interactive" 
              value={startupMetrics.timeToInteractive}
              unit=" ms"
              icon={<Clock size={18} />}
              delay={300}
            />
            <MetricCard 
              title="Average CPU Usage" 
              value={avgCpuUsage}
              unit="%"
              percentage={avgCpuUsage}
              icon={<Cpu size={18} />}
              delay={400}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetricChart 
              title="Memory Usage Across Sections" 
              data={memoryData} 
              type="bar" 
              dataKey="memory" 
              unit="bytes"
              delay={500}
            />
            <MetricChart 
              title="CPU Usage Across Sections" 
              data={cpuData} 
              type="line" 
              dataKey="cpu" 
              unit="%"
              delay={600}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="memory" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Heap Used" 
              value={avgMemoryUsage}
              unit=" bytes"
              maxValue={maxTotalMemory}
              icon={<Memory size={18} />}
              delay={100}
            />
            <MetricCard 
              title="Max Heap Used" 
              value={maxMemoryUsage}
              unit=" bytes"
              icon={<Server size={18} />}
              delay={200}
            />
            <MetricCard 
              title="Total Heap Available" 
              value={maxTotalMemory}
              unit=" bytes"
              icon={<Gauge size={18} />}
              delay={300}
            />
            <MetricCard 
              title="Memory Utilization" 
              value={avgMemoryPercentage}
              unit="%"
              percentage={avgMemoryPercentage}
              icon={<Activity size={18} />}
              delay={400}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <MetricChart 
              title="Memory Usage vs Total Available" 
              data={memoryData.map(item => ({
                name: item.name,
                used: item.memory,
                total: item.total,
                percentage: (item.memory / item.total) * 100
              }))} 
              type="bar" 
              dataKey="used"
              unit="bytes"
              height={400}
              delay={500}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard 
              title="Script Duration" 
              value={startupMetrics.scriptDuration * 1000}
              unit=" ms"
              icon={<LayoutPanelLeft size={18} />}
              delay={100}
            />
            <MetricCard 
              title="Task Duration" 
              value={startupMetrics.taskDuration * 1000}
              unit=" ms"
              icon={<Activity size={18} />}
              delay={200}
            />
            <MetricCard 
              title="Style Recalculation" 
              value={startupMetrics.recalcStyleDuration * 1000}
              unit=" ms"
              icon={<Gauge size={18} />}
              delay={300}
            />
            <MetricCard 
              title="Layout Duration" 
              value={startupMetrics.layoutDuration * 1000}
              unit=" ms"
              icon={<Clock size={18} />}
              delay={400}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetricChart 
              title="Task Duration Across Sections" 
              data={durationData} 
              type="area" 
              dataKey="duration" 
              unit="ms"
              delay={500}
            />
            <MetricChart 
              title="Script Performance Breakdown" 
              data={scriptData} 
              type="bar" 
              dataKey="script" 
              unit="ms"
              delay={600}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMetrics;
