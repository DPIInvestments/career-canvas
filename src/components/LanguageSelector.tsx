import { useUserStore } from '@/stores/userStore';
import type { Language } from '@/lib/i18n';
import { Globe } from 'lucide-react';

const languages: { code: Language; label: string }[] = [
  { code: 'EN', label: 'EN' },
  { code: 'FR', label: 'FR' },
  { code: 'ES', label: 'ES' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useUserStore();

  return (
    <div className="flex items-center gap-0.5 rounded-xl border border-border bg-card p-0.5">
      <Globe className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
            language === code
              ? 'bg-navy text-beige'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
