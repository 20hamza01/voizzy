
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFormSettings } from "@/hooks/useFormSettings";
import { usePremiumCheck } from "@/hooks/usePremiumCheck";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Palette, Upload, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const FormSettings = () => {
  const { user } = useAuth();
  const { settings, updateSettings, uploadLogo, uploading, isLoading } = useFormSettings(user?.id);
  const { isPremium, isLoading: checkingPremium } = usePremiumCheck();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleColorChange = (color: string) => {
    updateSettings({ primary_color: color });
  };

  const handleBrandingToggle = (show: boolean) => {
    updateSettings({ show_branding: show });
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (!isPremium) {
      toast({
        title: "Premium Required",
        description: "Logo upload requires a Premium plan",
        variant: "destructive",
      });
      return;
    }
    
    await uploadLogo(file);
  };

  const handleUpgradeClick = () => {
    navigate("/dashboard/plans");
  };

  if (checkingPremium || isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Form Customization</CardTitle>
          <CardDescription>Loading settings...</CardDescription>
        </CardHeader>
        <CardContent className="h-40 flex items-center justify-center">
          <p className="text-muted-foreground">Loading form settings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Customization</CardTitle>
        {!isPremium && (
          <CardDescription className="flex items-center gap-2 text-yellow-600">
            <Lock className="h-4 w-4" />
            Some features require a Premium plan
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="primary-color">Primary Color</Label>
            {!isPremium && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleUpgradeClick}
              >
                Upgrade to Premium
              </Button>
            )}
          </div>
          <div className="flex gap-4 items-center">
            <Palette className="h-4 w-4" />
            <Input
              id="primary-color"
              type="color"
              value={settings?.primary_color || "#9b87f5"}
              onChange={(e) => handleColorChange(e.target.value)}
              disabled={!isPremium}
              className={!isPremium ? "opacity-50 cursor-not-allowed" : ""}
            />
          </div>
          {!isPremium && (
            <p className="text-sm text-muted-foreground">
              Customize your form's colors with our Premium plan
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Logo</Label>
            {!isPremium && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleUpgradeClick}
              >
                Upgrade to Premium
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-4">
            {settings?.logo_url && (
              <img
                src={settings.logo_url}
                alt="Form logo"
                className="h-16 object-contain"
              />
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleLogoUpload}
              disabled={!isPremium}
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={!isPremium || uploading}
              className={!isPremium ? "opacity-50" : ""}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload Logo"}
            </Button>
            {!isPremium && (
              <p className="text-sm text-muted-foreground">
                Add your brand logo with our Premium plan
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-branding">Show Voizzy Branding</Label>
          <Switch
            id="show-branding"
            checked={settings?.show_branding ?? true}
            onCheckedChange={handleBrandingToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
};
