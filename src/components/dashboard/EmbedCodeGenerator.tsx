
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Copy, Layout, Grid, List } from "lucide-react";

interface EmbedCodeGeneratorProps {
  userId?: string;  // Make userId optional to prevent TypeScript errors
}

const EmbedCodeGenerator: React.FC<EmbedCodeGeneratorProps> = ({ userId = '' }) => {  // Provide a default empty string
  const [count, setCount] = useState<number>(3);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [currentTab, setCurrentTab] = useState<"script" | "iframe">("script");

  const baseUrl = window.location.origin;
  const embedUrl = `${baseUrl}/embed/${userId}?limit=${count}&layout=${layout}`;

  const scriptCode = `<div id="voizzy-testimonials"></div>
<script src="${baseUrl}/embed.js" data-user="${userId}" data-limit="${count}" data-layout="${layout}"></script>`;

  const iframeCode = `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="400" 
  style="border:none;overflow:hidden" 
  scrolling="no" 
  frameborder="0" 
  allowTransparency="true" 
  allow="encrypted-media">
</iframe>`;

  const handleCopyCode = () => {
    const codeToCopy = currentTab === "script" ? scriptCode : iframeCode;
    navigator.clipboard.writeText(codeToCopy);
    toast({ title: "Copied!", description: "Embed code copied to clipboard" });
  };

  const getEmbedCode = () => currentTab === "script" ? scriptCode : iframeCode;

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
              max={10} 
              step={1} 
              onValueChange={(values) => setCount(values[0])} 
            />
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
            <Tabs defaultValue="script" onValueChange={(value) => setCurrentTab(value as "script" | "iframe")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="script">Script</TabsTrigger>
                <TabsTrigger value="iframe">iFrame</TabsTrigger>
              </TabsList>
              <TabsContent value="script" className="space-y-3 mt-4">
                <div className="bg-gray-100 p-4 rounded overflow-x-auto">
                  <pre className="text-sm text-gray-800">{scriptCode}</pre>
                </div>
              </TabsContent>
              <TabsContent value="iframe" className="space-y-3 mt-4">
                <div className="bg-gray-100 p-4 rounded overflow-x-auto">
                  <pre className="text-sm text-gray-800">{iframeCode}</pre>
                </div>
              </TabsContent>
            </Tabs>
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
