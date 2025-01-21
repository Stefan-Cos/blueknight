import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const checkAuthorization = async (email: string) => {
    const { data, error } = await supabase
      .from("authorized_viewers")
      .select("email")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error) {
      console.error("Authorization check error:", error);
      return false;
    }

    return !!data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isAuthorized = await checkAuthorization(email);
      if (!isAuthorized) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "This email is not authorized to access submissions.",
        });
        return;
      }

      // Try to sign in first
      let { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // If sign in fails, try to sign up
      if (signInError) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in.",
        });
      }

      navigate("/submissions");
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Access Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10"
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Sign In / Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}