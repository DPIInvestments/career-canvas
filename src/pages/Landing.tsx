import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useAnalyticsStore } from '@/stores/analyticsStore';
import { t } from '@/lib/i18n';
import { ArrowRight, Sparkles, Shield, Languages, CheckCircle2, Star, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Landing() {
  const { language } = useUserStore();
  const { track } = useAnalyticsStore();

  useEffect(() => {
    track('landing_visit');
  }, []);

  const features = [
    { icon: Sparkles, titleKey: 'landing.feat1.title', descKey: 'landing.feat1.desc' },
    { icon: Shield, titleKey: 'landing.feat2.title', descKey: 'landing.feat2.desc' },
    { icon: Languages, titleKey: 'landing.feat3.title', descKey: 'landing.feat3.desc' },
  ];

  const stats = [
    { value: '69,400+', key: 'landing.stats.resumes' },
    { value: '94%', key: 'landing.stats.rate' },
    { value: '10+', key: 'landing.stats.sectors' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero — resume.io inspired split layout */}
      <section className="relative overflow-hidden">
        <div className="container max-w-6xl">
          <div className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
            {/* Left: Copy */}
            <div className="animate-fade-in">
              <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] text-foreground md:text-5xl lg:text-[3.4rem]">
                This resume builder
                <br />
                gets you{' '}
                <span className="text-accent">an interview</span>
              </h1>
              <p className="mb-8 max-w-md text-lg leading-relaxed text-muted-foreground">
                {t('landing.subtitle', language)}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground border-0 px-8 text-base font-semibold shadow-elevated hover:opacity-90 transition-opacity rounded-xl h-12">
                  <Link to="/quiz">
                    {t('landing.cta', language)}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 text-base rounded-xl h-12 border-border">
                  <Link to="/preview">{t('landing.cta2', language)}</Link>
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>39% more likely to land the job</span>
              </div>
            </div>

            {/* Right: Resume preview mock (like resume.io) */}
            <div className="relative animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <div className="relative mx-auto max-w-sm">
                {/* Resume card */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-secondary" />
                    <div>
                      <div className="text-base font-bold text-foreground">Alice Hart</div>
                      <div className="text-sm text-muted-foreground">Software Engineer</div>
                    </div>
                  </div>
                  <div className="mb-3 space-y-2">
                    <div className="h-2 w-full rounded-full bg-secondary" />
                    <div className="h-2 w-4/5 rounded-full bg-secondary" />
                    <div className="h-2 w-3/5 rounded-full bg-secondary" />
                  </div>
                  <div className="mb-4 border-t border-border pt-3">
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Experience</div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-secondary" />
                      <div className="h-2 w-5/6 rounded-full bg-secondary" />
                    </div>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-primary">Skills</div>
                    <div className="flex flex-wrap gap-1.5">
                      {['React', 'TypeScript', 'Node.js', 'AWS'].map((s) => (
                        <span key={s} className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -right-4 top-6 rounded-xl bg-navy px-3 py-2 shadow-elevated">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-beige">
                    <FileCheck className="h-3.5 w-3.5 text-accent" />
                    ATS Perfect
                  </div>
                </div>
                <div className="absolute -left-3 bottom-16 rounded-xl border border-border bg-card px-3 py-2 shadow-card">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Star className="h-3.5 w-3.5 text-accent" />
                    Resume Score: 92%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats counter — resume.io style */}
      <section className="border-y border-border bg-card py-10">
        <div className="container flex max-w-4xl flex-col items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <FileCheck className="h-5 w-5 text-accent" />
            </div>
            <span className="text-2xl font-bold text-foreground md:text-3xl">
              <span className="text-accent">{stats[0].value}</span>{' '}
              {t(stats[0].key, language).toLowerCase()}
            </span>
          </div>

          <div className="grid w-full max-w-2xl grid-cols-2 gap-4 md:grid-cols-3">
            {stats.slice(1).map(({ value, key }) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-foreground">{value}</div>
                <div className="mt-0.5 text-sm text-muted-foreground">{t(key, language)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — clean card grid like resume.io */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Everything you need to get hired
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="group rounded-2xl border border-border bg-card p-7 shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{t(titleKey, language)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(descKey, language)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy py-20 text-center">
        <div className="container max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold text-beige">Ready to land your next role?</h2>
          <p className="mb-8 text-beige/70">Join thousands of professionals who trust ResumeATS for their career moves.</p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground border-0 px-10 text-base font-semibold rounded-xl h-12 hover:opacity-90 transition-opacity">
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
