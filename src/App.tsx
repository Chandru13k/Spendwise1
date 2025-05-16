
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { CookieConsentBanner } from "./components/modals/CookieConsentBanner";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { Dashboard } from "./pages/Dashboard";
import { AddIncomePage } from "./pages/AddIncomePage";
import { AddExpensePage } from "./pages/AddExpensePage";
import { TransactionPage } from "./pages/TransactionPage";
import { ReportsPage } from "./pages/ReportsPage";
import { ProfileSettingsPage } from "./pages/ProfileSettingsPage";
import { ErrorPage } from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Protected Routes */}
            <Route path="/app" element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-income" element={<AddIncomePage />} />
              <Route path="add-expense" element={<AddExpensePage />} />
              <Route path="transactions" element={<TransactionPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="profile" element={<ProfileSettingsPage />} />
            </Route>
            
            {/* Error Pages */}
            <Route path="/404" element={<ErrorPage type="404" />} />
            <Route path="/500" element={<ErrorPage type="500" />} />
            <Route path="/401" element={<ErrorPage type="401" />} />
            <Route path="/session-expired" element={<ErrorPage type="session-expired" />} />
            <Route path="/payment-failure" element={<ErrorPage type="payment-failure" />} />
            <Route path="/network-error" element={<ErrorPage type="network-error" />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Global components */}
          <CookieConsentBanner />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Auth guard component
function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default App;
