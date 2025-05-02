
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSendEmail } from "@/hooks/useSendEmail";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { sendEmail, loading } = useSendEmail();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name || !message) {
      return;
    }
    
    try {
      await sendEmail({
        to: "your-email@example.com", // Change this to your email address
        subject: `Contact form submission from ${name}`,
        html: `
          <h1>New Contact Message</h1>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
      
      // Reset form fields after successful submission
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Fill out the form below to send us a message.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              required
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
