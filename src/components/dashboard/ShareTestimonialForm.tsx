
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ShareTestimonialForm = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate the testimonial collection URL
  const formUrl = user ? `${window.location.origin}/collect/${user.id}` : "";
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formUrl);
      setCopied(true);
      toast.success("Form URL copied to clipboard!");
      
      // Reset copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy to clipboard");
    }
  };
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-2">Share Your Testimonial Form</h3>
      <p className="text-sm text-gray-600 mb-4">
        Share this link with your clients to collect testimonials
      </p>
      
      <div className="flex gap-2">
        <Input 
          value={formUrl} 
          readOnly 
          className="font-mono text-sm bg-white"
        />
        <Button 
          onClick={copyToClipboard}
          variant="outline"
          className="flex-shrink-0"
        >
          {copied ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="default" 
          onClick={() => window.open(formUrl, "_blank")}
          className="w-full sm:w-auto"
        >
          Preview Form
        </Button>
      </div>
    </div>
  );
};

export default ShareTestimonialForm;
