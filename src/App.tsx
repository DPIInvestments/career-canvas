import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import Preview from "./pages/Preview";
import Recommendations from "./pages/Recommendations";
import Dashboard from "./pages/Dashboard";
import Operator from "./pages/Operator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function OperatorHotkey() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'O') {
        e.preventDefault();
        navigate('/operator');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OperatorHotkey />
        <Navbar />
        <main className="min-h-[calc(100vh-3.5rem)]">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/operator" element={<Operator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
