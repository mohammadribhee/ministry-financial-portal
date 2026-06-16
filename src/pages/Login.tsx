import { useState } from "react";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      const data = await login(email, password);

      loginUser(data.accessToken, data.user);

      setError("");

      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[500px] bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-center mb-2 text-3xl leading-tight text-blue-900 font-bold">
          Ministry Financial Portal
        </h1>

        <p className="text-center mb-5 text-gray-600">
          Please sign in to continue
        </p>

        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>

            <input
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>

            <input
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-600 text-center text-sm">{error}</p>}

          <button
            className="p-3 rounded-lg bg-blue-800 text-white text-base cursor-pointer hover:bg-blue-950"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
