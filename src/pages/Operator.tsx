import { useAnalyticsStore } from '@/stores/analyticsStore';
import { useUserStore } from '@/stores/userStore';
import { t } from '@/lib/i18n';
import { SECTORS, EXPERIENCE_LEVELS } from '@/lib/sectorRules';

export default function Operator() {
  const { language } = useUserStore();
  const { getCount, getCompletedQuizzes } = useAnalyticsStore();

  const completed = getCompletedQuizzes();
  const total = completed.length || 1;

  const landingVisits = getCount('landing_visit');
  const quizStarted = getCount('quiz_started');
  const quizCompleted = getCount('quiz_completed');
  const previewViewed = getCount('preview_viewed');
  const recViewed = getCount('recommendations_viewed');
  const completionRate = quizStarted > 0 ? ((quizCompleted / quizStarted) * 100).toFixed(1) : '0';

  // Sector breakdown
  const sectorData = SECTORS.map((sector) => {
    const users = completed.filter((c) => c.sector === sector);
    const count = users.length;
    const pctTotal = ((count / total) * 100).toFixed(1);
    const pctATS = count > 0 ? ((users.filter((u) => u.requiresAdvancedATS).length / count) * 100).toFixed(0) : '0';
    return { sector, count, pctTotal, pctATS };
  });

  // Experience
  const expData = EXPERIENCE_LEVELS.map((level) => {
    const count = completed.filter((c) => c.experience === level).length;
    return { level, count, pct: ((count / total) * 100).toFixed(1) };
  });

  // ATS
  const atsTrue = completed.filter((c) => c.requiresAdvancedATS).length;
  const atsFalse = completed.filter((c) => !c.requiresAdvancedATS).length;

  // Languages
  const langData = (['EN', 'FR', 'ES'] as const).map((lang) => {
    const count = completed.filter((c) => c.language === lang).length;
    return { lang, count, pct: ((count / total) * 100).toFixed(1) };
  });

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10 text-sm font-bold text-destructive">OP</div>
        <h1 className="text-2xl font-bold text-foreground">{t('op.title', language)}</h1>
      </div>

      {/* Section 1: General */}
      <Section title={t('op.general', language)}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Metric label="Landing Visits" value={landingVisits} />
          <Metric label="Quiz Started" value={quizStarted} />
          <Metric label="Quiz Completed" value={quizCompleted} />
          <Metric label="Completion Rate" value={`${completionRate}%`} />
          <Metric label="Preview Viewed" value={previewViewed} />
          <Metric label="Recommendations Viewed" value={recViewed} />
        </div>
      </Section>

      {/* Section 2: Sectors */}
      <Section title={t('op.sectors', language)}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-2 font-medium text-muted-foreground">Sector</th>
                <th className="pb-2 text-right font-medium text-muted-foreground">Users</th>
                <th className="pb-2 text-right font-medium text-muted-foreground">% Total</th>
                <th className="pb-2 text-right font-medium text-muted-foreground">% Adv ATS</th>
              </tr>
            </thead>
            <tbody>
              {sectorData.map(({ sector, count, pctTotal, pctATS }) => (
                <tr key={sector} className="border-b border-border/50">
                  <td className="py-2.5 text-foreground">{sector}</td>
                  <td className="py-2.5 text-right text-foreground">{count}</td>
                  <td className="py-2.5 text-right text-muted-foreground">{pctTotal}%</td>
                  <td className="py-2.5 text-right text-muted-foreground">{pctATS}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Section 3: Experience */}
      <Section title={t('op.experience', language)}>
        <div className="grid gap-3 sm:grid-cols-5">
          {expData.map(({ level, count, pct }) => (
            <div key={level} className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-lg font-bold text-foreground">{count}</p>
              <p className="text-xs text-muted-foreground">{level}</p>
              <p className="text-xs text-muted-foreground">{pct}%</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 4: ATS */}
      <Section title={t('op.ats', language)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Metric label="Advanced ATS (true)" value={`${((atsTrue / total) * 100).toFixed(1)}%`} />
          <Metric label="Standard ATS (false)" value={`${((atsFalse / total) * 100).toFixed(1)}%`} />
        </div>
      </Section>

      {/* Section 5: Languages */}
      <Section title={t('op.languages', language)}>
        <div className="grid gap-4 sm:grid-cols-3">
          {langData.map(({ lang, count, pct }) => (
            <div key={lang} className="rounded-lg border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{lang}</p>
              <p className="text-sm text-muted-foreground">{count} users • {pct}%</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}
