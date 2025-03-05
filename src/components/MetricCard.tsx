
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type MetricCardProps = {
  title: string;
  value: number;
  unit?: string;
  maxValue?: number;
  percentage?: number;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
  className?: string;
  isAnimated?: boolean;
  delay?: number;
};

const MetricCard = ({
  title,
  value,
  unit = "",
  maxValue,
  percentage,
  icon,
  variant = "default",
  className,
  isAnimated = true,
  delay = 0,
}: MetricCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(!isAnimated);

  useEffect(() => {
    if (isAnimated) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isAnimated, delay]);

  useEffect(() => {
    if (isVisible) {
      let startValue = 0;
      const duration = 1000;
      const startTime = performance.now();
      
      const animateValue = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setAnimatedValue(progress * value);
        
        if (percentage !== undefined) {
          setAnimatedPercentage(progress * percentage);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animateValue);
        }
      };
      
      requestAnimationFrame(animateValue);
    }
  }, [isVisible, value, percentage]);

  const displayValue = isAnimated ? animatedValue : value;
  const displayPercentage = isAnimated ? animatedPercentage : (percentage || 0);

  const variantClassMap = {
    default: "bg-card",
    primary: "bg-primary/10 border-primary/20",
    secondary: "bg-secondary"
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        variantClassMap[variant],
        className
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-semibold">
            {displayValue.toLocaleString(undefined, { 
              maximumFractionDigits: 2,
              minimumFractionDigits: value % 1 === 0 ? 0 : 2
            })}
            {unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>}
          </div>
          
          {percentage !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span>{Math.round(displayPercentage)}%</span>
              </div>
              <Progress value={displayPercentage} className="h-1" />
            </div>
          )}
          
          {maxValue !== undefined && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Usage</span>
                <span>{Math.round((value / maxValue) * 100)}%</span>
              </div>
              <Progress value={(value / maxValue) * 100} className="h-1" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
