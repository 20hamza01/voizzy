import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { usePlanUpgrade } from "@/hooks/usePlanUpgrade";

const Plans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentPlan, isLoading, upgradePlan, error } = usePlanUpgrade();

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for trying out Voizzy",
      features: [
        "Up to 3 testimonials",
        "Basic testimonial wall",
        "Standard form",
        "Email support"
      ],
      limitations: ["Limited to 3 testimonials", "No customization"],
      button: currentPlan === "free" ? "Current Plan" : "Downgrade to Free",
      isPopular: false
    },
    {
      name: "Basic",
      price: "19",
      description: "For growing businesses",
      features: [
        "Unlimited testimonials",
        "Advanced analytics",
        "Priority support",
        "Custom domains"
      ],
      limitations: ["No form customization"],
      button: currentPlan === "basic" ? "Current Plan" : "Upgrade to Basic",
      isPopular: true
    },
    {
      name: "Premium",
      price: "49",
      description: "For businesses that need more",
      features: [
        "Everything in Basic",
        "Custom branding",
        "Form customization",
        "Premium support"
      ],
      limitations: [],
      button: currentPlan === "premium" ? "Current Plan" : "Upgrade to Premium",
      isPopular: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Plans & Pricing</h1>
          <p className="text-muted-foreground">
            Choose the perfect plan for your business
          </p>
        </div>

        <TooltipProvider>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border p-6 shadow-sm ${
                  plan.isPopular ? "border-primary" : ""
                }`}
              >
                {plan.isPopular && (
                  <Badge
                    className="absolute -top-2 right-4"
                    variant="secondary"
                  >
                    Most Popular
                  </Badge>
                )}

                {currentPlan === plan.name.toLowerCase() && (
                  <Badge
                    className="absolute -top-2 left-4"
                    variant="outline"
                  >
                    Current Plan
                  </Badge>
                )}

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>

                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Limitations:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation) => (
                          <li key={limitation} className="flex items-center gap-2">
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{limitation}</p>
                              </TooltipContent>
                            </Tooltip>
                            <span className="text-sm text-muted-foreground">
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    variant={currentPlan === plan.name.toLowerCase() ? "outline" : "default"}
                    disabled={currentPlan === plan.name.toLowerCase() || isLoading}
                    onClick={() => upgradePlan(plan.name.toLowerCase())}
                  >
                    {plan.button}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </DashboardLayout>
  );
};

export default Plans;
