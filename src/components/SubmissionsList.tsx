import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Copy, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function SubmissionsList() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
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