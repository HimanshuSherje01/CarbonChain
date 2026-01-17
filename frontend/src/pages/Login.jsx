import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Login (Demo)</h2>

      <button onClick={() => navigate("/admin")}>Login as Admin</button>
      <button onClick={() => navigate("/verifier")}>Login as Verifier</button>
      <button onClick={() => navigate("/ngo")}>Login as NGO</button>
      <button onClick={() => navigate("/corporate")}>Login as Corporate</button>
    </div>
  );
};

export default Login;
