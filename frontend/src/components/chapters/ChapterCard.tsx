import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Chapter } from "@/data/mockData";

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
}

const ChapterCard = ({ chapter, index }: ChapterCardProps) => {
  const colors = ["google-blue", "google-red", "google-yellow", "google-green"];
  const colorVar = colors[index % 4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card-hover p-6 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg"
          style={{ backgroundColor: `hsl(var(--${colorVar}))` }}
        >
          {chapter.name.charAt(4)}
        </div>
        {chapter.isVirtual && (
          <span className="tag-pill">Virtual</span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-1">{chapter.name}</h3>

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
        <MapPin size={14} />
        <span>{chapter.city}, {chapter.country}</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {chapter.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {chapter.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md bg-muted text-xs font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users size={14} />
          <span>{chapter.members.toLocaleString()} members</span>
        </div>
        <Link to={`/chapters/${chapter.id}`} className="text-sm font-medium text-primary hover:underline transition-colors">
          View Chapter →
        </Link>
      </div>
    </motion.div>
  );
};

export default ChapterCard;
