import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useAnalyticsStore } from '@/stores/analyticsStore';
import { t } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Download, Edit, Zap, CheckCircle } from 'lucide-react';

export default function Preview() {
  const { language, sector, profession, experienceLevel, requiresAdvancedATS, quizAnswers, quizCompleted } = useUserStore();
  const { track } = useAnalyticsStore();

  useEffect(() => {
    track('preview_viewed');
  }, []);

  if (!quizCompleted) {
    return (
      <div className="container max-w-2xl py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-foreground">{t('preview.title', language)}</h1>
        <p className="mb-6 text-muted-foreground">{t('dash.no_resume', language)}</p>
        <Button asChild className="gradient-hero border-0 text-primary-foreground">
          <Link to="/quiz">{t('nav.quiz', language)}</Link>
        </Button>
      </div>
    );
  }

  const name = quizAnswers.fullName || 'John Doe';
  const email = quizAnswers.email || 'john@example.com';

  return (
    <div className="container max-w-3xl py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">{t('preview.title', language)}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-3.5 w-3.5" />
            {t('preview.edit', language)}
          </Button>
          <Button size="sm" className="gradient-hero border-0 text-primary-foreground">
            <Download className="mr-2 h-3.5 w-3.5" />
            {t('preview.download', language)}
          </Button>
        </div>
      </div>

      {/* ATS Notice */}
      <div className={`mb-6 flex items-start gap-3 rounded-lg border p-4 text-sm ${
        requiresAdvancedATS
          ? 'border-accent/30 bg-accent/5 text-foreground'
          : 'border-primary/20 bg-primary/5 text-foreground'
      }`}>
        {requiresAdvancedATS ? <Zap className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> : <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
        <span>{requiresAdvancedATS ? t('preview.ats_notice', language) : t('preview.ats_standard', language)}</span>
      </div>

      {/* Resume Mock */}
      <div className="rounded-xl border border-border bg-card p-8 shadow-card">
        {/* Header */}
        <div className="mb-6 border-b border-border pb-6">
          <h2 className="text-2xl font-bold text-foreground">{name}</h2>
          <p className="text-muted-foreground">{profession} • {sector}</p>
          <p className="text-sm text-muted-foreground">{email} • New York, NY • linkedin.com/in/{name.toLowerCase().replace(' ', '')}</p>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">{t('preview.summary', language)}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Results-driven {profession} with {experienceLevel === 'Student' ? 'academic' : experienceLevel?.toLowerCase() + '-level'} experience in {sector}.
            Proven track record of delivering high-impact solutions and driving measurable business outcomes.
            {requiresAdvancedATS && ' Expertise in compliance-driven environments requiring advanced ATS optimization.'}
          </p>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">{t('preview.experience', language)}</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Senior {profession}</span>
                <span className="text-xs text-muted-foreground">2021 – Present</span>
              </div>
              <p className="text-sm text-muted-foreground">Global Corp Inc. • New York, NY</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Led cross-functional team of 8 to deliver $2M+ project under budget and ahead of schedule</li>
                <li>• Implemented process improvements resulting in 35% efficiency increase</li>
                <li>• Mentored junior team members, improving retention by 20%</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">{profession}</span>
                <span className="text-xs text-muted-foreground">2018 – 2021</span>
              </div>
              <p className="text-sm text-muted-foreground">Innovation Labs • San Francisco, CA</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Delivered 15+ successful projects within {sector?.toLowerCase()} domain</li>
                <li>• Collaborated with stakeholders to define requirements and roadmap</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">{t('preview.education', language)}</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-foreground">Bachelor of Science</span>
              <p className="text-sm text-muted-foreground">University of Excellence • GPA: 3.8/4.0</p>
            </div>
            <span className="text-xs text-muted-foreground">2014 – 2018</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">{t('preview.skills', language)}</h3>
          <div className="flex flex-wrap gap-2">
            {['Leadership', 'Strategic Planning', 'Data Analysis', 'Project Management', 'Cross-functional Collaboration', 'Stakeholder Management'].map((skill) => (
              <span key={skill} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
