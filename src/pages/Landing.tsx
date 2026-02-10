import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useAnalyticsStore } from '@/stores/analyticsStore';
import { t } from '@/lib/i18n';
import { ArrowRight, Zap, Target, Languages, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Landing() {
  const { language } = useUserStore();
  const { track } = useAnalyticsStore();

  useEffect(() => {
    track('landing_visit');
  }, []);

  const features = [
    { icon: Target, titleKey: 'landing.feat1.title', descKey: 'landing.feat1.desc' },
    { icon: Zap, titleKey: 'landing.feat2.title', descKey: 'landing.feat2.desc' },
    { icon: Languages, titleKey: 'landing.feat3.title', descKey: 'landing.feat3.desc' },
  ];

  const stats = [
    { value: '12,400+', key: 'landing.stats.resumes' },
    { value: '94%', key: 'landing.stats.rate' },
    { value: '10+', key: 'landing.stats.sectors' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 gradient-surface" />
        <div className="container relative z-10 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-soft animate-fade-in">
            <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
            {t('landing.badge', language)}
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-foreground md:text-6xl animate-slide-up">
            {t('landing.title', language)}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t('landing.subtitle', language)}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" className="gradient-hero border-0 px-8 text-primary-foreground shadow-elevated hover:opacity-90 transition-opacity">
              <Link to="/quiz">
                {t('landing.cta', language)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link to="/preview">{t('landing.cta2', language)}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card py-12">
        <div className="container grid max-w-4xl grid-cols-3 gap-8">
          {stats.map(({ value, key }) => (
            <div key={key} className="text-center">
              <div className="text-3xl font-bold text-foreground">{value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{t(key, language)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container grid max-w-5xl gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, titleKey, descKey }) => (
            <div key={titleKey} className="group rounded-xl border border-border bg-card p-6 shadow-soft transition-all hover:shadow-card">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{t(titleKey, language)}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{t(descKey, language)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-16 text-center">
        <div className="container max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to land your next role?</h2>
          <p className="mb-8 text-muted-foreground">Join thousands of professionals who trust ResumeATS for their career moves.</p>
          <Button asChild size="lg" className="gradient-hero border-0 px-8 text-primary-foreground shadow-elevated hover:opacity-90 transition-opacity">
            <Link to="/quiz">
              {t('landing.cta', language)}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
