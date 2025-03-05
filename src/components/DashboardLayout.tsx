
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className={cn(
        "min-h-screen bg-gradient-to-br from-background to-secondary/30 transition-opacity duration-1000",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
