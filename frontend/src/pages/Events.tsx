import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, LayoutGrid, List } from "lucide-react";
import Layout from "@/components/layout/Layout";
import EventCard from "@/components/events/EventCard";
import EventTimelineCard from "@/components/events/EventTimelineCard";
import { events } from "@/data/mockData";

const eventTypes = ["all", "meetup", "workshop", "conference", "hackathon"];

const Events = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchSearch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.chapterName.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || e.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  // Group events by month for timeline
  const groupedEvents = useMemo(() => {
    const groups: Record<string, typeof events> = {};
    filtered.forEach((e) => {
      const monthKey = new Date(e.date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
      if (!groups[monthKey]) groups[monthKey] = [];
      groups[monthKey].push(e);
    });
    return groups;
  }, [filtered]);

  return (
    <Layout>
      <section className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
              Upcoming Events
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Workshops, meetups, hackathons, and conferences worldwide
            </p>

            {/* Stats bar */}
            <div className="flex justify-center gap-6 mt-6">
              {[
                { label: "Total Events", value: events.length, color: "google-blue" },
                { label: "Virtual", value: events.filter((e) => e.isVirtual).length, color: "google-green" },
                { label: "In-Person", value: events.filter((e) => !e.isVirtual).length, color: "google-red" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Search + View toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events or chapters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="flex gap-1 bg-muted rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                }`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "timeline" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </motion.div>

          {/* Type pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            {eventTypes.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                  typeFilter === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type === "all" ? "All" : type}
              </button>
            ))}
          </motion.div>

          {/* Content */}
          {filtered.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {Object.entries(groupedEvents).map(([month, monthEvents]) => (
                  <div key={month} className="mb-12">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-lg font-semibold text-foreground mb-6 text-center"
                    >
                      <span className="px-4 py-1.5 bg-muted rounded-full">{month}</span>
                    </motion.h3>

                    {/* Timeline line */}
                    <div className="relative">
                      <div className="absolute left-0 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border hidden md:block" />
                      <div className="space-y-8">
                        {monthEvents.map((event, i) => (
                          <EventTimelineCard key={event.id} event={event} index={i} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;
