import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Calendar, MapPin, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { chapters, events } from "@/data/mockData";
import mascot from "@/assets/mascot.png";

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const joinedChapters = chapters.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <Layout>
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="section-container">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10"
          >
            <div className="flex items-center gap-4">
              <img src={mascot} alt="Mascot" className="w-14 h-14 object-contain" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Welcome back, {user?.name || "Developer"}! 👋
                </h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="btn-google-outline !text-sm flex items-center gap-2"
            >
              <LogOut size={16} /> Logout
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Joined Chapters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Star size={18} className="text-google-yellow" />
                <h2 className="text-lg font-semibold text-foreground">Your Chapters</h2>
              </div>
              <div className="space-y-3">
                {joinedChapters.map((ch) => (
                  <Link
                    key={ch.id}
                    to={`/chapters/${ch.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {ch.name.charAt(4)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{ch.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={10} /> {ch.city}, {ch.country}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Calendar size={18} className="text-google-blue" />
                <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((ev) => (
                  <div key={ev.id} className="p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <p className="text-sm font-medium text-foreground">{ev.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(ev.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} • {ev.time}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={10} /> {ev.chapterName}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
