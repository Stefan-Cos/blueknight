import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, Mail, User } from "lucide-react";

export function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Pre-fill form if query parameters exist
    const companyName = searchParams.get("company");
    const fullName = searchParams.get("name");
    const email = searchParams.get("advisor");
    
    if (companyName) {
      const companyInput = document.getElementById("companyName") as HTMLInputElement;
      if (companyInput) companyInput.value = companyName;
    }
    if (fullName) {
      const nameInput = document.getElementById("fullName") as HTMLInputElement;
      if (nameInput) nameInput.value = fullName;
    }
    if (email) {
      const emailInput = document.getElementById("email") as HTMLInputElement;
      if (emailInput) emailInput.value = email;
    }
  }, [searchParams]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      companyName: formData.get("companyName") as string,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
    };

    // Validate form
    if (!data.companyName || !data.fullName || !data.email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Store in Supabase (you'll need to connect Supabase first)
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Registration successful!",
        description: "You will be redirected to the form.",
      });
      
      // Navigate to the main form with advisor data
      setTimeout(() => {
        navigate("/form", {
          state: { advisorData: data }
        });
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Enter your details to access the form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Advisor Company Name</Label>
              <div className="relative">
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Enter company name"
                  className="pl-10"
                  required
                />
                <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="pl-10"
                  required
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Continue to Form
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}