import { Link } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { FileText, Lightbulb, Edit, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { language, sector, profession, experienceLevel, requiresAdvancedATS, quizCompleted } = useUserStore();

  if (!quizCompleted) {
    return (
      <div className="container max-w-2xl py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-foreground">{t('dash.title', language)}</h1>
        <p className="mb-6 text-muted-foreground">{t('dash.no_resume', language)}</p>
        <Button asChild className="gradient-hero border-0 text-primary-foreground">
          <Link to="/quiz">{t('nav.quiz', language)} <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    );
  }

  const cards = [
    { label: t('dash.sector', language), value: sector },
    { label: t('dash.profession', language), value: profession },
    { label: t('dash.experience', language), value: experienceLevel },
    { label: t('dash.ats_level', language), value: requiresAdvancedATS ? 'Advanced' : 'Standard' },
  ];

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="mb-2 text-2xl font-bold text-foreground">{t('dash.title', language)}</h1>
      <p className="mb-8 text-muted-foreground">{t('dash.welcome', language)}</p>

      {/* Status Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {cards.map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="mb-4 text-lg font-semibold text-foreground">{t('dash.actions', language)}</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        <Button asChild variant="outline" className="h-auto flex-col gap-2 py-6">
          <Link to="/preview">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-sm">{t('nav.preview', language)}</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto flex-col gap-2 py-6">
          <Link to="/recommendations">
            <Lightbulb className="h-5 w-5 text-accent" />
            <span className="text-sm">{t('nav.recommendations', language)}</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-auto flex-col gap-2 py-6">
          <Link to="/quiz">
            <Edit className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{t('nav.quiz', language)}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
