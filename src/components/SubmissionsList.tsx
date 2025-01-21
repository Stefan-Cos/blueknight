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

    const { data: authorizedUser } = await supabase
      .from('authorized_viewers')
      .select('email')
      .eq('email', user.email)
      .single();

    setIsAuthorized(!!authorizedUser);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    
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
    setAuthLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    // First check if email is authorized
    const { data: authorizedUser } = await supabase
      .from('authorized_viewers')
      .select('email')
      .eq('email', email)
      .single();

    if (!authorizedUser) {
      setAuthError("This email is not authorized to access submissions. Please contact your administrator.");
      setAuthLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
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
        description: "Please check your email to verify your account",
      });
    }
    setAuthLoading(false);
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
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={authLoading} className="flex-1">
                  {authLoading ? "Loading..." : "Login"}
                </Button>
                <Button type="button" variant="outline" onClick={handleSignUp} disabled={authLoading} className="flex-1">
                  First Time? Sign Up
                </Button>
              </div>
            </form>
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
}