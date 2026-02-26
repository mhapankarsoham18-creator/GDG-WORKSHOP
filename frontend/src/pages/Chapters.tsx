import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ChapterCard from "@/components/chapters/ChapterCard";
import { chapters } from "@/data/mockData";

const Chapters = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const countries = useMemo(
    () => ["all", ...Array.from(new Set(chapters.map((c) => c.country)))],
    []
  );

  const filtered = useMemo(() => {
    return chapters.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || c.country === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

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
              Find a GDG Chapter Near You
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Explore developer communities across the globe
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-10"
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search chapters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All Countries" : c}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((chapter, i) => (
                <ChapterCard key={chapter.id} chapter={chapter} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No chapters found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Chapters;
