import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();
    console.log("Attempting to authenticate with email:", cleanEmail);
    
    try {
      // First check if user is authorized
      const { data: authorizedUsers, error: fetchError } = await supabase
        .from("authorized_viewers")
        .select("email");

      if (fetchError) {
        console.error("Error fetching authorized users:", fetchError);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to check authorization.",
        });
        return;
      }

      console.log("Authorized users:", authorizedUsers);
      
      const isAuthorized = authorizedUsers?.some(
        user => user.email.toLowerCase().trim() === cleanEmail
      );

      console.log("Is authorized:", isAuthorized);

      if (!isAuthorized) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You are not authorized to access this application.",
        });
        return;
      }

      // Try to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (signInError) {
        // If sign in fails, try to sign up
        const { error: signUpError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });

        if (signUpError) {
          console.error("Sign up error:", signUpError);
          toast({
            variant: "destructive",
            title: "Error",
            description: signUpError.message,
          });
          return;
        }

        toast({
          title: "Account Created",
          description: "Please check your email to verify your account.",
        });
        return;
      }

      // If sign in succeeds
      toast({
        title: "Success",
        description: "Successfully logged in.",
      });
      navigate("/submissions");
      
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during authentication.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In / Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}