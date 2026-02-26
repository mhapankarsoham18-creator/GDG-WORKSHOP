import { Link } from "react-router-dom";
import gdgLogo from "@/assets/gdg-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={gdgLogo} alt="GDG Logo" className="h-8 w-8" />
              <span className="text-lg font-bold text-foreground">
                GDG <span className="text-muted-foreground font-normal">Community</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Google Developer Groups bring together developers from diverse backgrounds to learn, connect, and grow with Google technologies.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="google-dot google-dot-blue" />
              <span className="google-dot google-dot-red" />
              <span className="google-dot google-dot-yellow" />
              <span className="google-dot google-dot-green" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Explore</h4>
            <div className="space-y-2">
              <Link to="/chapters" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Chapters</Link>
              <Link to="/events" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Events</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Resources</h4>
            <div className="space-y-2">
              <a href="https://developers.google.com" target="_blank" rel="noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Google Developers</a>
              <a href="https://gdg.community.dev" target="_blank" rel="noreferrer" className="block text-sm text-muted-foreground hover:text-primary transition-colors">GDG Platform</a>
            </div>
          </div>
        </div>

        <div className="color-bar mt-10 mb-6" />

        <p className="text-center text-xs text-muted-foreground">
          © 2025 Google Developer Groups. Built with ❤️ by the community.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
