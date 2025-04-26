
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export const TestimonialEmbedOptions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [limit, setLimit] = useState("3");
  const [theme, setTheme] = useState("light");
  
  const userId = user?.id || "";
  
  const scriptCode = `<script
  src="${window.location.origin}/widget-loader.js" 
  data-user="${userId}"
  data-limit="${limit}"
  data-theme="${theme}"
></script>`;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied!",
          description: "Widget code has been copied to clipboard.",
        });
      },
      (err) => {
        toast({
          title: "Error",
          description: "Could not copy code to clipboard.",
          variant: "destructive",
        });
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Testimonial Widget to Your Website</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Add a floating testimonial button to your website that opens a popup with your testimonials when clicked.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="limit">Number of testimonials to show</Label>
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
              <Label htmlFor="theme">Widget theme</Label>
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
        
        <div className="space-y-4">
          <Label>Copy this code</Label>
          <div className="bg-gray-50 p-4 rounded-md overflow-auto">
            <pre className="text-xs whitespace-pre-wrap">{scriptCode}</pre>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => copyToClipboard(scriptCode)}
            className="w-full"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Widget Code
          </Button>
          
          <div className="bg-gray-100 p-3 rounded text-sm">
            <p className="text-gray-700">
              Add this code to your website before the closing &lt;/body&gt; tag to display a floating testimonial button.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
