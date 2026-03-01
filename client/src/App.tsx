import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Components
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Schedule from "./pages/Schedule";
import Membership from "./pages/Membership";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/programs" component={Programs} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/membership" component={Membership} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/auth" component={Auth} />
        <Route path="/dashboard" component={UserDashboard} />
        <Route path="/admin" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
