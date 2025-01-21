import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Eye, Copy, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SubmissionsList() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      checkAuthorization();
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setLoading(false);
  };

  const checkAuthorization = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: authorizedUser, error } = await supabase
      .from('authorized_viewers')
      .select('email')
      .eq('email', user.email)
      .maybeSingle();

    if (error) {
      console.error('Error checking authorization:', error);
      return;
    }

    setIsAuthorized(!!authorizedUser);
  };

  const checkIfAuthorizedEmail = async (email: string) => {
    try {
      const { data: authorizedUser, error } = await supabase
        .from('authorized_viewers')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        console.error('Error checking authorization:', error);
        return false;
      }

      return !!authorizedUser;
    } catch (error) {
      console.error('Error checking authorization:', error);
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    
    try {
      const isAuthorized = await checkIfAuthorizedEmail(email);
      if (!isAuthorized) {
        setAuthError("This email is not authorized to access submissions. Please contact your administrator.");
        setAuthLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setAuthError(error.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      }
    } catch (error: any) {
      setAuthError(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const isAuthorized = await checkIfAuthorizedEmail(email);
      if (!isAuthorized) {
        setAuthError("This email is not authorized to access submissions. Please contact your administrator.");
        setAuthLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/submissions`
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          setAuthError("An account already exists for this email. Please log in instead.");
        } else {
          setAuthError(error.message);
        }
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      } else {
        toast({
          title: "Success",
          description: "Account created successfully. You can now log in.",
        });
      }
    } catch (error: any) {
      setAuthError(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    if (!isAuthenticated) return;

    const { data, error } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
      return;
    }

    setSubmissions(data || []);
    setLoading(false);
  };

  const copySubmissionLink = (id: string) => {
    const fullUrl = `${window.location.origin}/submissions/${id}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    toast({
      title: "Link copied",
      description: "The submission link has been copied to your clipboard",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {authError && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            <Tabs defaultValue="signup">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">First Time Access</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={authLoading}>
                    {authLoading ? "Loading..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Set Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={authLoading}>
                    {authLoading ? "Loading..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Unauthorized Access</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your email is not authorized to view submissions. Please contact your administrator for access.
              </AlertDescription>
            </Alert>
            <Button 
              className="mt-4 w-full"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading submissions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Form Submissions</h1>
          <Button 
            variant="outline" 
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </Button>
        </div>
        {submissions.map((submission) => (
          <Card key={submission.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {submission.project_name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Company: {submission.company_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Submitted: {new Date(submission.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => copySubmissionLink(submission.id)}
                    className="flex items-center gap-2"
                  >
                    {copiedId === submission.id ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    Copy Link
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/submissions/${submission.id}`)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
