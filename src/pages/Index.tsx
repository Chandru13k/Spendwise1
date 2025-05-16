
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/pages/Dashboard';
import { TransactionPage } from '@/pages/TransactionPage';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { AddIncomePage } from '@/pages/AddIncomePage';
import { AddExpensePage } from '@/pages/AddExpensePage';
import { ReportsPage } from '@/pages/ReportsPage';
import { BudgetPlannerPage } from '@/pages/BudgetPlannerPage';
import { CategoryManagementPage } from '@/pages/CategoryManagementPage';
import { ProfileSettingsPage } from '@/pages/ProfileSettingsPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { TipsInsightsPage } from '@/pages/TipsInsightsPage';
import { HelpSupportPage } from '@/pages/HelpSupportPage';
import { DataImportExportPage } from '@/pages/DataImportExportPage';
import { SubscriptionPage } from '@/pages/SubscriptionPage';
import { ErrorPage } from '@/pages/ErrorPage';

// Mock authentication state - in a real app, this would come from auth context/API
const isAuthenticated = false; // Change to true to bypass login screens

const Index = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <Dashboard />
          </Route>
        </RequireAuth>
      } />
      <Route path="/add-income" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <AddIncomePage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/add-expense" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <AddExpensePage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/transactions" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <TransactionPage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/reports" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <ReportsPage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/budget" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <BudgetPlannerPage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/categories" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <CategoryManagementPage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/profile" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <ProfileSettingsPage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/notifications" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <NotificationsPage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/tips" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <TipsInsightsPage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/help" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <HelpSupportPage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/data-tools" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <DataImportExportPage />
          </Route>
        </RequireAuth>
      } />
      <Route path="/subscription" element={
        <RequireAuth>
          <Route element={<AppLayout/>}>
            <SubscriptionPage />
          </Route>
        </RequireAuth>
      } />
      
      {/* Error routes */}
      <Route path="/404" element={<ErrorPage type="404" />} />
      <Route path="/500" element={<ErrorPage type="500" />} />
      <Route path="/401" element={<ErrorPage type="401" />} />
      <Route path="/session-expired" element={<ErrorPage type="session-expired" />} />
      <Route path="/payment-failure" element={<ErrorPage type="payment-failure" />} />
      <Route path="/network-error" element={<ErrorPage type="network-error" />} />
      
      {/* Redirect /dashboard to / if not authenticated */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

// Simple auth guard component
function RequireAuth({ children }: { children: JSX.Element }) {
  // if (!isAuthenticated) {
  //   // In development mode, comment this line to bypass authentication
  //   // return <Navigate to="/login" replace />;
  // }

  return children;
}

export default Index;
