
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFormSettings } from "@/hooks/useFormSettings";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Palette, Upload } from "lucide-react";

export const FormSettings = () => {
  const { user } = useAuth();
  const { settings, updateSettings, uploadLogo, uploading } = useFormSettings(user?.id);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleColorChange = (color: string) => {
    updateSettings({ primary_color: color });
  };

  const handleBrandingToggle = (show: boolean) => {
    updateSettings({ show_branding: show });
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadLogo(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Customization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="primary-color">Primary Color</Label>
          <div className="flex gap-4 items-center">
            <Palette className="h-4 w-4" />
            <Input
              id="primary-color"
              type="color"
              value={settings?.primary_color || "#000000"}
              onChange={(e) => handleColorChange(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Logo</Label>
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
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload Logo"}
            </Button>
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
