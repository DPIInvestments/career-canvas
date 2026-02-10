import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useAnalyticsStore } from '@/stores/analyticsStore';
import { t } from '@/lib/i18n';
import { getRecommendations } from '@/lib/recommendationEngine';
import { Button } from '@/components/ui/button';
import { Lightbulb, AlertTriangle, Star } from 'lucide-react';

export default function Recommendations() {
  const { language, sector, experienceLevel, quizCompleted } = useUserStore();
  const { track } = useAnalyticsStore();

  useEffect(() => {
    track('recommendations_viewed');
  }, []);

  if (!quizCompleted || !sector || !experienceLevel) {
    return (
      <div className="container max-w-2xl py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-foreground">{t('rec.title', language)}</h1>
        <p className="mb-6 text-muted-foreground">{t('dash.no_resume', language)}</p>
        <Button asChild className="bg-accent text-accent-foreground border-0 rounded-xl">
          <Link to="/quiz">{t('nav.quiz', language)}</Link>
        </Button>
      </div>
    );
  }

  const recs = getRecommendations(sector, experienceLevel);

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="mb-2 text-2xl font-bold text-foreground">{t('rec.title', language)}</h1>
      <p className="mb-8 text-muted-foreground">{t('rec.subtitle', language)} — <span className="font-medium text-foreground">{sector}</span></p>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-foreground">{t('rec.keywords', language)}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {recs.keywords.map((kw) => (
              <span key={kw} className="rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">{kw}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">{t('rec.tips', language)}</h2>
          </div>
          <ul className="space-y-3">
            {recs.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="text-lg font-bold text-foreground">{t('rec.avoid', language)}</h2>
          </div>
          <ul className="space-y-3">
            {recs.avoid.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
