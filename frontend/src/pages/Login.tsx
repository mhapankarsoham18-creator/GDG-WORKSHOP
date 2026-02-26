import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, AlertTriangle, ServerCrash, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { authApi, ApiError } from "@/lib/api";
import mascot from "@/assets/mascot.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message: string; isServerError: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError({ message: "Please fill in all fields.", isServerError: false });
      return;
    }

    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setError({
          message: err.message,
          isServerError: err.status === 503 || err.status >= 500,
        });
      } else {
        setError({ message: "Something went wrong.", isServerError: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 min-h-screen flex items-center">
        <div className="section-container w-full">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <motion.img
                src={mascot}
                alt="GDG Mascot"
                className="w-24 h-24 mx-auto mb-4 object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
              <p className="text-muted-foreground">Sign in to your GDG account</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-8"
            >
              <div className="color-bar mb-6" />

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-start gap-3 p-4 rounded-xl mb-6 ${
                    error.isServerError
                      ? "bg-destructive/10 border border-destructive/20"
                      : "bg-google-yellow/10 border border-google-yellow/20"
                  }`}
                >
                  {error.isServerError ? (
                    <ServerCrash size={20} className="text-destructive shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={20} className="text-google-yellow shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`text-sm font-medium ${error.isServerError ? "text-destructive" : "text-foreground"}`}>
                      {error.isServerError ? "Server Connection Error" : "Login Failed"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{error.message}</p>
                    {error.isServerError && (
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        💡 The backend server is not connected yet. Connect your Node.js server to enable authentication.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-google w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
