import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Video, CheckCircle, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { Event } from "@/data/mockData";
import { toast } from "@/components/ui/sonner";

interface EventCardProps {
  event: Event;
  index: number;
}

const typeColors: Record<string, string> = {
  meetup: "google-green",
  workshop: "google-blue",
  conference: "google-red",
  hackathon: "google-yellow",
};

const typeEmoji: Record<string, string> = {
  meetup: "🤝",
  workshop: "🛠️",
  conference: "🎤",
  hackathon: "💻",
};

const EventCard = ({ event, index }: EventCardProps) => {
  const [registered, setRegistered] = useState(false);
  const colorVar = typeColors[event.type] || "google-blue";
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const fillPercent = Math.round(((event.attendees + (registered ? 1 : 0)) / event.capacity) * 100);

  const handleRegister = () => {
    setRegistered(!registered);
    if (!registered) {
      toast.success(`Registered for ${event.title}!`, {
        description: `${formattedDate} at ${event.time}`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card-hover p-6 flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{typeEmoji[event.type]}</span>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground capitalize"
            style={{ backgroundColor: `hsl(var(--${colorVar}))` }}
          >
            {event.type}
          </span>
        </div>
        {event.isVirtual && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            <Video size={10} />
            Online
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>

      <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
        {event.description}
      </p>

      {/* Tags */}
      {event.tags && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {event.tags.map((tag) => (
            <span key={tag} className="tag-pill text-[10px]">{tag}</span>
          ))}
        </div>
      )}

      {/* Speakers */}
      {event.speakers && event.speakers.length > 0 && (
        <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground">
          <Mic size={12} className="text-primary shrink-0" />
          <span className="truncate">{event.speakers.join(", ")}</span>
        </div>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={14} className="shrink-0" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={14} className="shrink-0" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} className="shrink-0" />
          <span>{event.chapterName}</span>
        </div>
      </div>

      {/* Capacity bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>{event.attendees + (registered ? 1 : 0)} / {event.capacity}</span>
          <span>{fillPercent}% full</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: `hsl(var(--${colorVar}))` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${fillPercent}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-border/50">
        <button
          onClick={handleRegister}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
            registered
              ? "bg-google-green/10 text-google-green border border-google-green/30"
              : "btn-google !rounded-xl"
          }`}
        >
          {registered ? (
            <>
              <CheckCircle size={14} />
              Registered
            </>
          ) : (
            "Register Now"
          )}
        </button>
        <Link
          to={`/chapters/${event.chapterId}`}
          className="px-3 py-2.5 rounded-xl border border-border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          Chapter
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
