import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/navbar";
import Landing from "@/pages/landing";
import Registration from "@/pages/registration";
import Documents from "@/pages/documents";
import Psychometric from "@/pages/psychometric";
import Results from "@/pages/results";
import Admin from "@/pages/admin";
import Demo from "@/pages/demo";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Demo} />
      <Route path="/full" component={Landing} />
      <Route path="/registration" component={Registration} />
      <Route path="/documents/:userId" component={Documents} />
      <Route path="/psychometric/:userId" component={Psychometric} />
      <Route path="/results/:userId" component={Results} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isDemo = location === '/';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          {!isDemo && <Navbar />}
          <main>
            <Router />
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
