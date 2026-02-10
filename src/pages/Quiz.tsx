import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { useAnalyticsStore } from '@/stores/analyticsStore';
import { t } from '@/lib/i18n';
import { SECTORS, PROFESSIONS, EXPERIENCE_LEVELS, requiresAdvancedATS } from '@/lib/sectorRules';
import type { Sector, ExperienceLevel } from '@/lib/sectorRules';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

const TOTAL_STEPS = 4;

export default function Quiz() {
  const navigate = useNavigate();
  const { language, setSector, setProfession, setExperienceLevel, setRequiresAdvancedATS, setQuizAnswers, setQuizCompleted } = useUserStore();
  const { track } = useAnalyticsStore();

  const [step, setStep] = useState(1);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceLevel | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      track('quiz_started');
      setStarted(true);
    }
  }, []);

  const validate = (): boolean => {
    setError('');
    if (step === 1 && !selectedSector) { setError(t('quiz.validation', language)); return false; }
    if (step === 2 && !selectedProfession) { setError(t('quiz.validation', language)); return false; }
    if (step === 3 && !selectedExperience) { setError(t('quiz.validation', language)); return false; }
    if (step === 4 && (!fullName.trim() || !email.trim())) { setError(t('quiz.validation', language)); return false; }
    return true;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      // Finish
      setSector(selectedSector!);
      setProfession(selectedProfession!);
      setExperienceLevel(selectedExperience!);
      const ats = requiresAdvancedATS(selectedSector!);
      setRequiresAdvancedATS(ats);
      setQuizAnswers({ fullName, email });
      setQuizCompleted(true);

      track('quiz_completed', {
        sector: selectedSector!,
        profession: selectedProfession!,
        experience: selectedExperience!,
        language,
        requiresAdvancedATS: ats,
      });

      navigate('/preview');
    }
  };

  const stepKeys = ['quiz.step1', 'quiz.step2', 'quiz.step3', 'quiz.step4'];

  return (
    <div className="container max-w-2xl py-12">
      <h1 className="mb-2 text-2xl font-bold text-foreground">{t('quiz.title', language)}</h1>
      <p className="mb-8 text-muted-foreground">{t(stepKeys[step - 1], language)}</p>

      {/* Progress */}
      <div className="mb-8 flex gap-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < step ? 'gradient-hero' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Step 1: Sector */}
      {step === 1 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {SECTORS.map((sector) => (
            <button
              key={sector}
              onClick={() => { setSelectedSector(sector); setSelectedProfession(null); }}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left text-sm font-medium transition-all ${
                selectedSector === sector
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {selectedSector === sector && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
              <span>{sector}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Profession */}
      {step === 2 && selectedSector && (
        <div className="grid gap-3 sm:grid-cols-2">
          {PROFESSIONS[selectedSector].map((prof) => (
            <button
              key={prof}
              onClick={() => setSelectedProfession(prof)}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left text-sm font-medium transition-all ${
                selectedProfession === prof
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {selectedProfession === prof && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
              <span>{prof}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Experience */}
      {step === 3 && (
        <div className="grid gap-3">
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedExperience(level)}
              className={`flex items-center gap-3 rounded-lg border p-4 text-left text-sm font-medium transition-all ${
                selectedExperience === level
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              {selectedExperience === level && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
              <span>{level}</span>
            </button>
          ))}
        </div>
      )}

      {/* Step 4: Details */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('quiz.fullname', language)}</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('quiz.email', language)}</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
          </div>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('quiz.back', language)}
        </Button>
        <Button onClick={handleNext} className="gradient-hero border-0 text-primary-foreground hover:opacity-90">
          {step === TOTAL_STEPS ? t('quiz.finish', language) : t('quiz.next', language)}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
