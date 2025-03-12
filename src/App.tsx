
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegistrationForm } from "./components/RegistrationForm";
import { MainForm } from "./components/MainForm";
import { SubmissionsList } from "./components/SubmissionsList";
import { SubmissionDetail } from "./components/SubmissionDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/form" element={<MainForm />} />
          <Route path="/submissions" element={<SubmissionsList />} />
          <Route path="/submissions/:id" element={<SubmissionDetail />} />
          <Route path="/" element={<Navigate to="/form" replace />} />
          <Route path="*" element={<Navigate to="/form" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
