import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/layout/AppLayout";
import { RoutePaths } from "./RoutePaths";
import MigrationPage from "@/pages/Migration/MigrationPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import MasterIdentityPage from "@/pages/MasterIdentity/MasterIdentityPage";
import EntryTypesPage from "@/pages/EntryTypes/EntryTypesPage";
import NotFound from "@/pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout><MigrationPage /></AppLayout>} path={RoutePaths.HOME} />
      <Route element={<AppLayout><DashboardPage /></AppLayout>} path={RoutePaths.DASHBOARD} />
      <Route element={<AppLayout><MigrationPage /></AppLayout>} path={RoutePaths.MIGRATION} />
      <Route element={<AppLayout><MasterIdentityPage /></AppLayout>} path={RoutePaths.MASTER_IDENTITY} />
      <Route element={<AppLayout><EntryTypesPage /></AppLayout>} path={RoutePaths.ENTRY_TYPES} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
