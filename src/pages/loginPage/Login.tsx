import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { updateCustomerNumber } from "@/store/reducers/accountReducer";

import { loginUser } from "../../service/api/account";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await loginUser({ emailId: email, password });
      toast.success("Log in successful");
      localStorage.setItem(
        "customerNumber",
        JSON.stringify(data.customerNumber)
      );
      localStorage.setItem("isLoggedIn", "true");
      dispatch(
        updateCustomerNumber({
          customerNumber: data.customerNumber,
        })
      );
      navigate("/account");
    } catch (err) {
      toast.error("Invalid Login Details");
      console.log("log", err);
    } finally {
      console.log(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">My Account</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              required
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              required
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-4 top-7 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🔒" : "👁️"}
            </button>
          </div>

          <div className="text-right mb-4">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/SignUp")}
            className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
