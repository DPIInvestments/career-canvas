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

  const sectorData = SECTORS.map((sector) => {
    const users = completed.filter((c) => c.sector === sector);
    const count = users.length;
    const pctTotal = ((count / total) * 100).toFixed(1);
    const pctATS = count > 0 ? ((users.filter((u) => u.requiresAdvancedATS).length / count) * 100).toFixed(0) : '0';
    return { sector, count, pctTotal, pctATS };
  });

  const expData = EXPERIENCE_LEVELS.map((level) => {
    const count = completed.filter((c) => c.experience === level).length;
    return { level, count, pct: ((count / total) * 100).toFixed(1) };
  });

  const atsTrue = completed.filter((c) => c.requiresAdvancedATS).length;
  const atsFalse = completed.filter((c) => !c.requiresAdvancedATS).length;

  const langData = (['EN', 'FR', 'ES'] as const).map((lang) => {
    const count = completed.filter((c) => c.language === lang).length;
    return { lang, count, pct: ((count / total) * 100).toFixed(1) };
  });

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-sm font-bold text-beige">OP</div>
        <h1 className="text-2xl font-bold text-foreground">{t('op.title', language)}</h1>
      </div>

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

      <Section title={t('op.sectors', language)}>
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-left font-semibold text-muted-foreground">Sector</th>
                <th className="p-3 text-right font-semibold text-muted-foreground">Users</th>
                <th className="p-3 text-right font-semibold text-muted-foreground">% Total</th>
                <th className="p-3 text-right font-semibold text-muted-foreground">% Adv ATS</th>
              </tr>
            </thead>
            <tbody>
              {sectorData.map(({ sector, count, pctTotal, pctATS }) => (
                <tr key={sector} className="border-b border-border/50 last:border-0">
                  <td className="p-3 text-foreground">{sector}</td>
                  <td className="p-3 text-right text-foreground">{count}</td>
                  <td className="p-3 text-right text-muted-foreground">{pctTotal}%</td>
                  <td className="p-3 text-right text-muted-foreground">{pctATS}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={t('op.experience', language)}>
        <div className="grid gap-3 sm:grid-cols-5">
          {expData.map(({ level, count, pct }) => (
            <div key={level} className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-xl font-bold text-foreground">{count}</p>
              <p className="text-xs font-medium text-muted-foreground">{level}</p>
              <p className="text-xs text-muted-foreground">{pct}%</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t('op.ats', language)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Metric label="Advanced ATS (true)" value={`${((atsTrue / total) * 100).toFixed(1)}%`} />
          <Metric label="Standard ATS (false)" value={`${((atsFalse / total) * 100).toFixed(1)}%`} />
        </div>
      </Section>

      <Section title={t('op.languages', language)}>
        <div className="grid gap-4 sm:grid-cols-3">
          {langData.map(({ lang, count, pct }) => (
            <div key={lang} className="rounded-xl border border-border bg-card p-5 text-center">
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
      <h2 className="mb-4 text-lg font-bold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}
