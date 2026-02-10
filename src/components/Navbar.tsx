import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { useUserStore } from '@/stores/userStore';
import { t } from '@/lib/i18n';
import { FileText } from 'lucide-react';

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

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-14 max-w-6xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base">ResumeATS</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map(({ path, key }) => (
            <Link
              key={path}
              to={path}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                location.pathname === path
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t(key, language)}
            </Link>
          ))}
        </div>

        <LanguageSelector />
      </div>
    </nav>
  );
}
