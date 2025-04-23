
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const colorSchemes = [
  { id: "purple", name: "Royal Purple", primary: "#9b87f5", secondary: "#D6BCFA" },
  { id: "blue", name: "Ocean Blue", primary: "#0EA5E9", secondary: "#D3E4FD" },
  { id: "green", name: "Fresh Green", primary: "#10B981", secondary: "#F2FCE2" },
  { id: "orange", name: "Warm Orange", primary: "#F97316", secondary: "#FDE1D3" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    logo: null,
    colorScheme: "purple",
  });

  const handleNext = () => {
    if (step === 1 && !formData.businessName) {
      toast({
        title: "Business name required",
        description: "Please enter your business name to continue",
        variant: "destructive",
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form and navigate to dashboard
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // This will be replaced with actual API call to store user preferences
    console.log("Onboarding complete with data:", formData);
    
    // Show success toast
    toast({
      title: "Onboarding complete!",
      description: "Your testimonial form has been created.",
    });
    
    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Set up your Voizzy profile</h1>
          <p className="text-gray-500 mt-2">Step {step} of 3</p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
            <div 
              className="bg-voizzy-purple h-2 rounded-full transition-all" 
              style={{ width: `${(step / 3) * 100}%` }} 
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Tell us about your business</h2>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  placeholder="Acme Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select 
                  value={formData.industry} 
                  onValueChange={(value) => setFormData({...formData, industry: value})}
                >
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Upload your logo</h2>
              <p className="text-sm text-gray-500">This will appear on your testimonial form and Wall of Love page.</p>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="logo-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">SVG, PNG or JPG (MAX. 800x400px)</p>
                  </div>
                  <input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={(e) => setFormData({...formData, logo: e.target.files?.[0] || null})} />
                </label>
              </div>
              {formData.logo && (
                <p className="text-sm text-green-600">File selected: {formData.logo.name}</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Choose your color scheme</h2>
              <p className="text-sm text-gray-500">Select a color scheme for your testimonial form and Wall of Love page.</p>
              
              <Tabs defaultValue="purple" value={formData.colorScheme} onValueChange={(value) => setFormData({...formData, colorScheme: value})}>
                <TabsList className="grid grid-cols-4 h-auto">
                  {colorSchemes.map((scheme) => (
                    <TabsTrigger 
                      key={scheme.id} 
                      value={scheme.id}
                      className="h-10 data-[state=active]:shadow-none"
                      style={{
                        backgroundColor: scheme.id === formData.colorScheme ? scheme.secondary : undefined,
                        borderBottom: scheme.id === formData.colorScheme ? `3px solid ${scheme.primary}` : undefined
                      }}
                    >
                      <div 
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: scheme.primary }}
                      />
                      <span className="hidden md:inline">{scheme.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <div className="mt-6">
                  <div className="p-4 border rounded-lg">
                    <div className="w-full h-32 rounded-md flex items-center justify-center"
                      style={{ 
                        background: `linear-gradient(135deg, ${colorSchemes.find(s => s.id === formData.colorScheme)?.primary || '#9b87f5'} 0%, ${colorSchemes.find(s => s.id === formData.colorScheme)?.secondary || '#D6BCFA'} 100%)` 
                      }}
                    >
                      <div className="bg-white p-4 rounded-lg shadow-lg">
                        <p className="font-medium">Your form preview</p>
                        <p className="text-sm text-gray-500">With {colorSchemes.find(s => s.id === formData.colorScheme)?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={handleBack} 
              disabled={step === 1}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {step === 3 ? "Complete Setup" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
