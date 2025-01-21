import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Send } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function MainForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    projectName: "",
    shareSaleType: "",
    shareholdersExit: "",
    transitionPeriod: "",
    reasonForSelling: "",
    isRegulated: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your form has been submitted successfully.",
      });
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
              Submission Complete!
            </CardTitle>
            <CardDescription>
              Thank you for submitting your information. We will review it shortly.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-primary/10">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Business Sale Information</CardTitle>
          <CardDescription>
            Please provide the following details about your business sale
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Accordion type="single" collapsible defaultValue="overview">
              <AccordionItem value="overview">
                <AccordionTrigger>Section 1: Overview</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      placeholder="Enter project name"
                      value={formData.projectName}
                      onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shareSaleType">Share Sale Type</Label>
                    <Select
                      value={formData.shareSaleType}
                      onValueChange={(value) => setFormData({ ...formData, shareSaleType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sale type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full sale</SelectItem>
                        <SelectItem value="partial">Partial sale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shareholdersExit">
                      All shareholders/director(s) intending to exit?
                    </Label>
                    <Select
                      value={formData.shareholdersExit}
                      onValueChange={(value) => setFormData({ ...formData, shareholdersExit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transitionPeriod">
                      Managing director/CEO - Transition period
                    </Label>
                    <Select
                      value={formData.transitionPeriod}
                      onValueChange={(value) => setFormData({ ...formData, transitionPeriod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transition period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-6">3 - 6 months</SelectItem>
                        <SelectItem value="6-12">6 - 12 months</SelectItem>
                        <SelectItem value="12+">12+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reasonForSelling">Reason for Selling</Label>
                    <Textarea
                      id="reasonForSelling"
                      placeholder="Please provide detailed reasons for selling"
                      value={formData.reasonForSelling}
                      onChange={(e) => setFormData({ ...formData, reasonForSelling: e.target.value })}
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isRegulated">Is the company regulated?</Label>
                    <Select
                      value={formData.isRegulated}
                      onValueChange={(value) => setFormData({ ...formData, isRegulated: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="business">
                <AccordionTrigger>Section 2: Business Information</AccordionTrigger>
                <AccordionContent>
                  <div className="py-4 text-center text-muted-foreground">
                    Business Information section will be implemented in the next phase
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="other">
                <AccordionTrigger>Section 3: Other</AccordionTrigger>
                <AccordionContent>
                  <div className="py-4 text-center text-muted-foreground">
                    Other section will be implemented in the next phase
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                "Submitting..."
              ) : (
                <>
                  Submit Form
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}