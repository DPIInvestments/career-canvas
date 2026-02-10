import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { useUserStore } from '@/stores/userStore';
import { t } from '@/lib/i18n';
import { FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { path: '/', key: 'nav.home' },
  { path: '/quiz', key: 'nav.quiz' },
  { path: '/preview', key: 'nav.preview' },
  { path: '/recommendations', key: 'nav.recommendations' },
  { path: '/dashboard', key: 'nav.dashboard' },
];

export function Navbar() {
  const location = useLocation();
  const { language } = useUserStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container flex h-16 max-w-6xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy">
            <FileText className="h-4.5 w-4.5 text-beige" />
          </div>
          <span className="text-lg tracking-tight">ResumeATS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(({ path, key }) => (
            <Link
              key={path}
              to={path}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {t(key, language)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map(({ path, key }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                {t(key, language)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
