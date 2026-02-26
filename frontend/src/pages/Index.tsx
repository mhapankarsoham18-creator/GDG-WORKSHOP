import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Globe, Users, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ChapterCard from "@/components/chapters/ChapterCard";
import EventCard from "@/components/events/EventCard";
import { chapters, events } from "@/data/mockData";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32">
        {/* Floating dots decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-google-blue/20" style={{ animation: "float 4s ease-in-out infinite" }} />
          <div className="absolute top-40 right-[15%] w-4 h-4 rounded-full bg-google-red/20" style={{ animation: "float 5s ease-in-out infinite 1s" }} />
          <div className="absolute bottom-32 left-[20%] w-2.5 h-2.5 rounded-full bg-google-yellow/25" style={{ animation: "float 3.5s ease-in-out infinite 0.5s" }} />
          <div className="absolute bottom-20 right-[25%] w-3.5 h-3.5 rounded-full bg-google-green/20" style={{ animation: "float 4.5s ease-in-out infinite 1.5s" }} />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex justify-center gap-2 mb-6">
              <span className="google-dot google-dot-blue" />
              <span className="google-dot google-dot-red" />
              <span className="google-dot google-dot-yellow" />
              <span className="google-dot google-dot-green" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="gradient-text">Connect.</span>{" "}
              <span className="text-foreground">Learn.</span>{" "}
              <span className="gradient-text">Build.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Join a global network of developer communities powered by Google technologies. 
              Learn, share, and grow together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chapters" className="btn-google text-base">
                Explore Chapters
                <ArrowRight size={18} />
              </Link>
              <Link to="/events" className="btn-google-outline text-base">
                View Events
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center gap-8 md:gap-16 mt-16"
          >
            {[
              { icon: Globe, value: "1,000+", label: "Chapters" },
              { icon: Users, value: "2M+", label: "Members" },
              { icon: Calendar, value: "5,000+", label: "Events/Year" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon size={20} className="mx-auto mb-2 text-primary" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Chapters */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Featured Chapters
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Discover developer communities around the world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.slice(0, 3).map((chapter, i) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/chapters" className="btn-google-outline">
              View All Chapters
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Join workshops, meetups, and conferences near you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/events" className="btn-google-outline">
              View All Events
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="color-bar absolute top-0 left-0 right-0" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Join the Community?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Connect with thousands of developers, learn new skills, and build amazing things together.
            </p>
            <Link to="/chapters" className="btn-google text-base">
              Find Your Chapter
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
