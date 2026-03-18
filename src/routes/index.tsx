import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/layout/AppLayout";
import { RoutePaths } from "./RoutePaths";
import MigrationPage from "@/pages/Migration/MigrationPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import NotFound from "@/pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout><MigrationPage /></AppLayout>} path={RoutePaths.HOME} />
      <Route element={<AppLayout><DashboardPage /></AppLayout>} path={RoutePaths.DASHBOARD} />
      <Route element={<AppLayout><MigrationPage /></AppLayout>} path={RoutePaths.MIGRATION} />
      <Route path={RoutePaths.ENTRY_TYPES} element={<Navigate to={RoutePaths.DASHBOARD} replace />} />
      <Route path={RoutePaths.MASTER_IDENTITY} element={<Navigate to={RoutePaths.DASHBOARD} replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
