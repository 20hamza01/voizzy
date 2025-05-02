
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export function useSendEmail() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendEmail = async ({ to, subject, html, from }: EmailParams) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("send-email", {
        body: { to, subject, html, from },
      });

      if (error) {
        console.error("Error sending email:", error);
        toast({
          title: "Email sending failed",
          description: error.message || "Something went wrong",
          variant: "destructive",
        });
        throw error;
      }

      toast({
        title: "Email sent successfully",
        description: `Email sent to ${to}`,
      });
      
      return data;
    } catch (error) {
      console.error("Send email error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    sendEmail,
    loading,
  };
}
