import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Users, Globe, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import EventCard from "@/components/events/EventCard";
import { chapters, events } from "@/data/mockData";

const organizers = [
  { name: "Priya Sharma", role: "Lead Organizer", avatar: "PS" },
  { name: "Alex Chen", role: "Co-Organizer", avatar: "AC" },
  { name: "Maria Lopez", role: "Events Lead", avatar: "ML" },
];

const colors = ["google-blue", "google-red", "google-yellow", "google-green"];

const ChapterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const chapter = chapters.find((c) => c.id === id);
  const chapterEvents = events.filter((e) => e.chapterId === id);

  if (!chapter) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center section-container">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Chapter not found</h1>
          <Link to="/chapters" className="btn-google-outline mt-4 inline-flex">
            <ArrowLeft size={16} /> Back to Chapters
          </Link>
        </div>
      </Layout>
    );
  }

  const colorVar = colors[parseInt(chapter.id) % 4];

  return (
    <Layout>
      {/* Hero banner */}
      <section
        className="pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, hsl(var(--${colorVar}) / 0.08) 0%, hsl(var(--background)) 60%)`,
        }}
      >
        <div className="section-container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/chapters"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={14} /> All Chapters
            </Link>

            <div className="flex items-start gap-5">
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-2xl md:text-3xl shrink-0"
                style={{ backgroundColor: `hsl(var(--${colorVar}))` }}
              >
                {chapter.name.charAt(4)}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{chapter.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {chapter.city}, {chapter.country}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users size={14} /> {chapter.members.toLocaleString()} members
                  </span>
                  {chapter.isVirtual && (
                    <span className="flex items-center gap-1.5">
                      <Globe size={14} /> Virtual
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-container pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 -mt-4">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-semibold text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{chapter.description}</p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We host regular meetups, workshops, and study jams covering Android, Web, Cloud, AI/ML, and more.
                Whether you're a beginner or an experienced developer, there's a place for you here.
              </p>
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {chapter.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            {/* Events */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={18} className="text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Upcoming Events</h2>
              </div>
              {chapterEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {chapterEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 text-center">
                  <p className="text-muted-foreground">No upcoming events. Check back soon!</p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 text-center">
              <div className="color-bar mb-5" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Join this Chapter</h3>
              <p className="text-sm text-muted-foreground mb-5">Connect with {chapter.members.toLocaleString()}+ developers</p>
              <button className="btn-google w-full">Join {chapter.name}</button>
            </motion.div>

            {/* Organizers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Organizers</h3>
              <div className="space-y-4">
                {organizers.map((org, i) => (
                  <div key={org.name} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-primary-foreground"
                      style={{ backgroundColor: `hsl(var(--${colors[i % 4]}))` }}
                    >
                      {org.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{org.name}</div>
                      <div className="text-xs text-muted-foreground">{org.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChapterDetails;
