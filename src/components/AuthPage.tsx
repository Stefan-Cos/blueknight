import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      console.log('Checking authorization for email:', email.trim());
      
      const { data: viewers, error: viewerError } = await supabase
        .from('authorized_viewers')
        .select('*')
        .eq('email', email.trim());

      console.log('Authorization check result:', { viewers, viewerError });

      if (viewerError) {
        console.error('Error checking authorization:', viewerError);
        throw new Error('Error checking authorization status');
      }

      if (!viewers || viewers.length === 0) {
        console.log('No authorized viewer found for email:', email.trim());
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "This email is not authorized to access submissions.",
        });
        setIsLoading(false);
        return;
      }

      console.log('Proceeding with signup for authorized email');
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });

      navigate("/submissions");
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      console.log('Checking authorization for email:', email.trim());
      
      const { data: viewers, error: viewerError } = await supabase
        .from('authorized_viewers')
        .select('*')
        .eq('email', email.trim());

      console.log('Authorization check result:', { viewers, viewerError });

      if (viewerError) {
        console.error('Error checking authorization:', viewerError);
        throw new Error('Error checking authorization status');
      }

      if (!viewers || viewers.length === 0) {
        console.log('No authorized viewer found for email:', email.trim());
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: "This email is not authorized to access submissions.",
        });
        setIsLoading(false);
        return;
      }

      console.log('Proceeding with signin for authorized email');
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) throw signInError;

      toast({
        title: "Welcome back!",
        description: "Successfully logged in.",
      });

      navigate("/submissions");
    } catch (error: any) {
      console.error('Signin error:', error);
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
          <CardTitle className="text-2xl font-bold">Access Submissions</CardTitle>
          <CardDescription>
            Sign in or register to view form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">First Time Access</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      Sign In
                      <LogIn className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      required
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="Choose a password"
                      className="pl-10"
                      required
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      Register
                      <UserPlus className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}