import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

import Login from "./pages/Login";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectSubmission from "./pages/ProjectSubmission";
import MyProjects from "./pages/MyProjects";
import VerificationDetail from "./pages/VerificationDetail";
import ProtectedRoute from "./components/ProtectedRoute";

import Marketplace from "./pages/Marketplace";
import MyOffsets from "./pages/MyOffsets";

import Registry from "./pages/admin/Registry";
import AuditLog from "./pages/admin/AuditLog";
import UserManagement from "./pages/admin/UserManagement";

import AdminDashboard from "./dashboards/admin/AdminDashboard";
import VerifierDashboard from "./dashboards/verifier/VerifierDashboard";
import NGODashboard from "./dashboards/ngo/NGODashboard";
import CorporateDashboard from "./dashboards/corporate/CorporateDashboard";

function App() {
  return (
    <DataProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/registry" element={<Registry />} />
          <Route path="/admin/audit" element={<AuditLog />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>

        {/* Protected Verifier Routes */}
        <Route element={<ProtectedRoute allowedRoles={['verifier']} />}>
          <Route path="/verifier" element={<VerifierDashboard />} />
          <Route path="/verifier/reviews" element={<VerifierDashboard />} />
          <Route path="/verifier/projects/:id" element={<VerificationDetail />} />
        </Route>

        {/* Protected NGO Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ngo']} />}>
          <Route path="/ngo" element={<NGODashboard />} />
          <Route path="/ngo/submit" element={<ProjectSubmission />} />
          <Route path="/ngo/projects" element={<MyProjects />} />
        </Route>

        {/* Protected Corporate Routes */}
        <Route element={<ProtectedRoute allowedRoles={['corporate']} />}>
          <Route path="/corporate" element={<CorporateDashboard />} />
          <Route path="/corporate/market" element={<Marketplace />} />
          <Route path="/corporate/portfolio" element={<MyOffsets />} />
        </Route>

        {/* General Protected Routes (Accessible by multiple roles if needed, or specific logic) */}
        {/* For now assuming only specific roles access specific details, but projects/:id might be shared? */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'verifier', 'ngo', 'corporate']} />}>
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
