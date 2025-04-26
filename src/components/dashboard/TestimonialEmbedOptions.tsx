
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export const TestimonialEmbedOptions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [limit, setLimit] = useState("3");
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("widget");
  
  const userId = user?.id || "";
  
  const widgetUrl = `${window.location.origin}/widget/${userId}?limit=${limit}&theme=${theme}`;
  
  const iframeCode = `<iframe
  src="${widgetUrl}"
  width="100%"
  height="600px"
  frameborder="0"
  scrolling="no"
  style="border: none; overflow: hidden;"
></iframe>`;

  const scriptCode = `<script
  src="${window.location.origin}/widget-loader.js" 
  data-user="${userId}"
  data-limit="${limit}"
  data-theme="${theme}"
></script>`;
  
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied!",
          description: `${type} code has been copied to clipboard.`,
        });
      },
      (err) => {
        toast({
          title: "Error",
          description: "Could not copy text.",
          variant: "destructive",
        });
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonial Widget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="limit">Number of testimonials</Label>
              <Select 
                value={limit} 
                onValueChange={setLimit}
              >
                <SelectTrigger id="limit">
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select 
                value={theme} 
                onValueChange={setTheme}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="widget" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="widget">Widget Code</TabsTrigger>
            <TabsTrigger value="iframe">iFrame Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="widget" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md overflow-auto">
              <pre className="text-xs whitespace-pre-wrap">{scriptCode}</pre>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard(scriptCode, "Widget")}
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Widget Code
            </Button>
            
            <div className="bg-gray-100 p-3 rounded text-sm">
              <p className="text-gray-700">
                Add this code to your website to display the floating widget button that opens your testimonials.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="iframe" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md overflow-auto">
              <pre className="text-xs whitespace-pre-wrap">{iframeCode}</pre>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard(iframeCode, "iFrame")}
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy iFrame Code
            </Button>
            
            <div className="bg-gray-100 p-3 rounded text-sm">
              <p className="text-gray-700">
                Add this code to embed your testimonials directly within your website content.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6">
          <Label className="block mb-2">Widget Preview URL</Label>
          <div className="flex">
            <Input 
              value={widgetUrl} 
              readOnly 
              className="flex-grow"
            />
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard(widgetUrl, "URL")}
              className="ml-2"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
