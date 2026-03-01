import { useLocation } from "wouter";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Activity } from "lucide-react";

export function ProtectedRoute({ component: Component, adminOnly = false }: { component: any, adminOnly?: boolean }) {
  const { data: user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        setLocation('/auth');
      } else if (adminOnly && user.role !== 'admin') {
        setLocation('/dashboard');
      }
    }
  }, [user, isLoading, setLocation, adminOnly]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Activity className="animate-spin h-12 w-12 text-primary" />
      </div>
    );
  }

  if (!user || (adminOnly && user.role !== 'admin')) {
    return null;
  }

  return <Component />;
}
