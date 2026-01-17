import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard from "./dashboards/admin/AdminDashboard";
import VerifierDashboard from "./dashboards/verifier/VerifierDashboard";
import NGODashboard from "./dashboards/ngo/NGODashboard";
import CorporateDashboard from "./dashboards/corporate/CorporateDashboard";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Role-based Dashboards */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/verifier" element={<VerifierDashboard />} />
      <Route path="/ngo" element={<NGODashboard />} />
      <Route path="/corporate" element={<CorporateDashboard />} />
    </Routes>
  );
}

export default App;
