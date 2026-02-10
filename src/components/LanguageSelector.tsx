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
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-0.5">
      <Globe className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
            language === code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
