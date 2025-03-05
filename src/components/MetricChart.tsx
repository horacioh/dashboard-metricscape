
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";

type MetricChartProps = {
  title: string;
  data: any[];
  type?: "area" | "bar" | "line";
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  secondaryColor?: string;
  className?: string;
  showGrid?: boolean;
  unit?: string;
  height?: number;
  isAnimated?: boolean;
  delay?: number;
};

const MetricChart = ({
  title,
  data,
  type = "area",
  dataKey,
  xAxisKey = "name",
  color = "hsl(var(--primary))",
  secondaryColor = "hsl(var(--primary) / 0.2)",
  className,
  showGrid = true,
  unit = "",
  height = 300,
  isAnimated = true,
  delay = 0,
}: MetricChartProps) => {
  const [isVisible, setIsVisible] = useState(!isAnimated);

  useEffect(() => {
    if (isAnimated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isAnimated, delay]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover shadow-soft p-3 rounded-lg border border-border text-sm">
          <p className="font-medium text-foreground mb-1">{label}</p>
          <p className="text-primary">
            {payload[0].value.toLocaleString()} {unit}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case "area":
        return (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              dx={-10}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              fill="url(#colorGradient)" 
              animationDuration={1500}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: "white" }}
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              dx={-10}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={dataKey} 
              fill={color} 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              barSize={30}
            />
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />}
            <XAxis 
              dataKey={xAxisKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              dx={-10}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2} 
              dot={{ stroke: color, strokeWidth: 2, fill: "white", r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: "white" }}
              animationDuration={1500}
            />
          </LineChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height={height}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricChart;
