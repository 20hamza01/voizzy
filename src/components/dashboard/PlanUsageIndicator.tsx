
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface PlanUsageIndicatorProps {
  currentCount: number;
  limit: number;
  planType: string;
  isNearLimit: boolean;
  isAtLimit: boolean;
}

export const PlanUsageIndicator: React.FC<PlanUsageIndicatorProps> = ({
  currentCount,
  limit,
  planType,
  isNearLimit,
  isAtLimit,
}) => {
  const progress = limit === Infinity ? 0 : (currentCount / limit) * 100;
  const formattedLimit = limit === Infinity ? "Unlimited" : limit;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Testimonial Usage</h3>
          {(isNearLimit || isAtLimit) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>You're {isAtLimit ? "at" : "near"} your plan limit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {currentCount} / {formattedLimit}
        </span>
      </div>

      <Progress value={progress} className="h-2" />
      
      {planType === "free" && (isNearLimit || isAtLimit) && (
        <div className="pt-2">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link to="/dashboard/plans">
              Upgrade to {isAtLimit ? "continue collecting" : "collect more"} testimonials
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
