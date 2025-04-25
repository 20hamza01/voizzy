
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Grid, List, Copy } from "lucide-react";

interface EmbedCodeGeneratorProps {
  userId?: string;
  planType?: string;
}

const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({ 
  userId = '',
  planType = 'free'
}) => {
  const [count, setCount] = useState<number>(3);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const isPremium = planType !== 'free';

  const baseUrl = window.location.origin;
  const embedUrl = `${baseUrl}/embed/${userId}?limit=${count}&layout=${layout}`;

  const iframeCode = `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="400" 
  style="border:none;overflow:hidden" 
  scrolling="no" 
  frameborder="0" 
  allowTransparency="true">
</iframe>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(iframeCode);
    toast({ title: "Copied!", description: "Embed code copied to clipboard" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Your Testimonials</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Number of testimonials</Label>
              <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{count}</span>
            </div>
            <Slider 
              value={[count]} 
              min={1} 
              max={isPremium ? 10 : 3} 
              step={1} 
              onValueChange={(values) => setCount(values[0])} 
            />
            {!isPremium && (
              <p className="text-sm text-muted-foreground">
                Upgrade to premium to display more than 3 testimonials
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Layout</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={layout === "grid" ? "default" : "outline"}
                className="flex items-center justify-center gap-2"
                onClick={() => setLayout("grid")}
              >
                <Grid className="h-4 w-4" /> Grid
              </Button>
              <Button
                variant={layout === "list" ? "default" : "outline"} 
                className="flex items-center justify-center gap-2"
                onClick={() => setLayout("list")}
              >
                <List className="h-4 w-4" /> List
              </Button>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <Label>Embed Code</Label>
            <div className="bg-gray-100 p-4 rounded overflow-x-auto">
              <pre className="text-sm text-gray-800">{iframeCode}</pre>
            </div>
            <Button onClick={handleCopyCode} className="w-full flex items-center gap-2">
              <Copy className="h-4 w-4" /> Copy Code
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div className="border rounded-md p-2 bg-white">
              <iframe
                src={embedUrl}
                width="100%"
                height="400"
                style={{ border: "none" }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmbedCodeGenerator;
