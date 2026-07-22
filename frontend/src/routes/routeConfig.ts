import { lazy } from 'react';
import { ROUTES } from '@/lib/constants';

// Public pages
const LandingPage = lazy(() => import('@/features/landing/pages/LandingPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/pages/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('@/features/auth/pages/VerifyEmailPage'));
const AuthSuccessPage = lazy(() => import('@/features/auth/pages/AuthSuccessPage'));

// Private pages
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const AgentsPage = lazy(() => import('@/features/agents/pages/AgentsPage'));
const CreateAgentPage = lazy(() => import('@/features/agents/pages/CreateAgentPage'));
const AgentDetailsPage = lazy(() => import('@/features/agents/pages/AgentDetailsPage'));
const WorkflowsPage = lazy(() => import('@/features/workflows/pages/WorkflowsPage'));
const BlueprintPage = lazy(() => import('@/features/blueprint/pages/BlueprintPage'));
const StudioPage = lazy(() => import('@/features/studio/pages/StudioPage'));
const TemplatesPage = lazy(() => import('@/features/templates/pages/TemplatesPage'));
const MarketplacePage = lazy(() => import('@/features/marketplace/pages/MarketplacePage'));
const IntegrationsPage = lazy(() => import('@/features/integrations/pages/IntegrationsPage'));
const KnowledgePage = lazy(() => import('@/features/knowledge/pages/KnowledgePage'));
const AnalyticsPage = lazy(() => import('@/features/analytics/pages/AnalyticsPage'));
const NotificationsPage = lazy(() => import('@/features/notifications/pages/NotificationsPage'));
const BillingPage = lazy(() => import('@/features/billing/pages/BillingPage'));
const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'));
const DocumentationPage = lazy(() => import('@/features/documentation/pages/DocumentationPage'));
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'));

export const routeConfig = {
  public: [
    { path: ROUTES.HOME, component: LandingPage },
    { path: ROUTES.LOGIN, component: LoginPage },
    { path: ROUTES.REGISTER, component: RegisterPage },
    { path: ROUTES.FORGOT_PASSWORD, component: ForgotPasswordPage },
    { path: ROUTES.RESET_PASSWORD, component: ResetPasswordPage },
    { path: ROUTES.VERIFY_EMAIL, component: VerifyEmailPage },
  ],
  private: [
    { path: ROUTES.DASHBOARD, component: DashboardPage },
    { path: ROUTES.STUDIO, component: StudioPage },
    { path: ROUTES.AGENTS, component: AgentsPage },
    { path: ROUTES.AGENTS_NEW, component: CreateAgentPage },
    { path: ROUTES.AGENT_DETAIL, component: AgentDetailsPage },
    { path: ROUTES.WORKFLOWS, component: WorkflowsPage },
    { path: ROUTES.BLUEPRINT, component: BlueprintPage },
    { path: ROUTES.TEMPLATES, component: TemplatesPage },
    { path: ROUTES.MARKETPLACE, component: MarketplacePage },
    { path: ROUTES.INTEGRATIONS, component: IntegrationsPage },
    { path: ROUTES.KNOWLEDGE, component: KnowledgePage },
    { path: ROUTES.ANALYTICS, component: AnalyticsPage },
    { path: ROUTES.NOTIFICATIONS, component: NotificationsPage },
    { path: ROUTES.BILLING, component: BillingPage },
    { path: ROUTES.SETTINGS, component: SettingsPage },
    { path: ROUTES.DOCUMENTATION, component: DocumentationPage },
    { path: ROUTES.PROFILE, component: ProfilePage },
  ],
};
