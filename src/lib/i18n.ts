export type Language = 'EN' | 'FR' | 'ES';

type TranslationMap = Record<string, Record<Language, string>>;

const translations: TranslationMap = {
  // Nav
  'nav.home': { EN: 'Home', FR: 'Accueil', ES: 'Inicio' },
  'nav.quiz': { EN: 'Build Resume', FR: 'Créer un CV', ES: 'Crear CV' },
  'nav.preview': { EN: 'Preview', FR: 'Aperçu', ES: 'Vista previa' },
  'nav.recommendations': { EN: 'Recommendations', FR: 'Recommandations', ES: 'Recomendaciones' },
  'nav.dashboard': { EN: 'Dashboard', FR: 'Tableau de bord', ES: 'Panel' },

  // Landing
  'landing.badge': { EN: 'ATS-Optimized Resume Builder', FR: 'Générateur de CV optimisé ATS', ES: 'Generador de CV optimizado ATS' },
  'landing.title': { EN: 'Build Resumes That Pass Every ATS Scanner', FR: 'Créez des CV qui passent tous les filtres ATS', ES: 'Crea CVs que superen todos los filtros ATS' },
  'landing.subtitle': { EN: 'Sector-specific optimization powered by industry intelligence. Trusted by professionals across Technology, Finance, Healthcare, and more.', FR: 'Optimisation sectorielle propulsée par l\'intelligence métier. Utilisé par des professionnels de la Tech, Finance, Santé et plus.', ES: 'Optimización sectorial impulsada por inteligencia de la industria.' },
  'landing.cta': { EN: 'Start Building — Free', FR: 'Commencer — Gratuit', ES: 'Empezar — Gratis' },
  'landing.cta2': { EN: 'View Sample Resume', FR: 'Voir un exemple de CV', ES: 'Ver ejemplo de CV' },
  'landing.feat1.title': { EN: 'Sector Intelligence', FR: 'Intelligence Sectorielle', ES: 'Inteligencia Sectorial' },
  'landing.feat1.desc': { EN: 'Tailored recommendations for 10+ industries with role-specific keyword optimization.', FR: 'Recommandations sur mesure pour 10+ industries avec optimisation de mots-clés.', ES: 'Recomendaciones para 10+ industrias.' },
  'landing.feat2.title': { EN: 'ATS Compatibility', FR: 'Compatibilité ATS', ES: 'Compatibilidad ATS' },
  'landing.feat2.desc': { EN: 'Every resume is engineered to pass Applicant Tracking Systems used by Fortune 500 companies.', FR: 'Chaque CV est conçu pour passer les systèmes ATS des grandes entreprises.', ES: 'Cada CV supera sistemas ATS.' },
  'landing.feat3.title': { EN: 'Multi-Language', FR: 'Multilingue', ES: 'Multiidioma' },
  'landing.feat3.desc': { EN: 'Generate resumes in English, French, and Spanish with localized best practices.', FR: 'Générez des CV en anglais, français et espagnol.', ES: 'Genera CVs en inglés, francés y español.' },
  'landing.stats.resumes': { EN: 'Resumes Built', FR: 'CV Créés', ES: 'CVs Creados' },
  'landing.stats.rate': { EN: 'ATS Pass Rate', FR: 'Taux de passage ATS', ES: 'Tasa de aprobación ATS' },
  'landing.stats.sectors': { EN: 'Industry Sectors', FR: 'Secteurs', ES: 'Sectores' },

  // Quiz
  'quiz.title': { EN: 'Build Your Resume', FR: 'Construisez votre CV', ES: 'Crea tu CV' },
  'quiz.step1': { EN: 'Select Your Industry', FR: 'Sélectionnez votre secteur', ES: 'Selecciona tu sector' },
  'quiz.step2': { EN: 'Select Your Role', FR: 'Sélectionnez votre rôle', ES: 'Selecciona tu rol' },
  'quiz.step3': { EN: 'Experience Level', FR: 'Niveau d\'expérience', ES: 'Nivel de experiencia' },
  'quiz.step4': { EN: 'Final Details', FR: 'Détails finaux', ES: 'Detalles finales' },
  'quiz.next': { EN: 'Continue', FR: 'Continuer', ES: 'Continuar' },
  'quiz.back': { EN: 'Back', FR: 'Retour', ES: 'Atrás' },
  'quiz.finish': { EN: 'Generate Resume', FR: 'Générer le CV', ES: 'Generar CV' },
  'quiz.select_sector': { EN: 'Choose your industry sector', FR: 'Choisissez votre secteur', ES: 'Elige tu sector' },
  'quiz.select_profession': { EN: 'Choose your profession', FR: 'Choisissez votre métier', ES: 'Elige tu profesión' },
  'quiz.select_experience': { EN: 'Select your experience level', FR: 'Sélectionnez votre expérience', ES: 'Selecciona tu experiencia' },
  'quiz.fullname': { EN: 'Full Name', FR: 'Nom complet', ES: 'Nombre completo' },
  'quiz.email': { EN: 'Email', FR: 'Email', ES: 'Email' },
  'quiz.validation': { EN: 'Please complete this step before continuing.', FR: 'Veuillez compléter cette étape.', ES: 'Complete este paso antes de continuar.' },

  // Preview
  'preview.title': { EN: 'Resume Preview', FR: 'Aperçu du CV', ES: 'Vista Previa del CV' },
  'preview.summary': { EN: 'Professional Summary', FR: 'Résumé Professionnel', ES: 'Resumen Profesional' },
  'preview.experience': { EN: 'Experience', FR: 'Expérience', ES: 'Experiencia' },
  'preview.education': { EN: 'Education', FR: 'Formation', ES: 'Educación' },
  'preview.skills': { EN: 'Skills', FR: 'Compétences', ES: 'Habilidades' },
  'preview.ats_notice': { EN: '⚡ This resume requires Advanced ATS optimization for your sector. Enhanced keyword density and formatting rules have been applied.', FR: '⚡ Ce CV nécessite une optimisation ATS avancée. Des règles améliorées ont été appliquées.', ES: '⚡ Este CV requiere optimización ATS avanzada.' },
  'preview.ats_standard': { EN: '✓ Standard ATS formatting applied. Your resume is optimized for most tracking systems.', FR: '✓ Formatage ATS standard appliqué.', ES: '✓ Formato ATS estándar aplicado.' },
  'preview.download': { EN: 'Download PDF', FR: 'Télécharger PDF', ES: 'Descargar PDF' },
  'preview.edit': { EN: 'Edit Resume', FR: 'Modifier le CV', ES: 'Editar CV' },

  // Recommendations
  'rec.title': { EN: 'Sector Recommendations', FR: 'Recommandations Sectorielles', ES: 'Recomendaciones Sectoriales' },
  'rec.subtitle': { EN: 'Personalized tips for your industry and role', FR: 'Conseils personnalisés pour votre secteur', ES: 'Consejos personalizados para tu sector' },
  'rec.keywords': { EN: 'Key Skills & Keywords', FR: 'Compétences et mots-clés', ES: 'Habilidades y palabras clave' },
  'rec.tips': { EN: 'Resume Tips', FR: 'Conseils CV', ES: 'Consejos para el CV' },
  'rec.avoid': { EN: 'Common Mistakes to Avoid', FR: 'Erreurs courantes à éviter', ES: 'Errores comunes a evitar' },

  // Dashboard
  'dash.title': { EN: 'Your Dashboard', FR: 'Votre Tableau de Bord', ES: 'Tu Panel' },
  'dash.welcome': { EN: 'Welcome back', FR: 'Bienvenue', ES: 'Bienvenido' },
  'dash.resume_status': { EN: 'Resume Status', FR: 'Statut du CV', ES: 'Estado del CV' },
  'dash.sector': { EN: 'Sector', FR: 'Secteur', ES: 'Sector' },
  'dash.profession': { EN: 'Profession', FR: 'Profession', ES: 'Profesión' },
  'dash.experience': { EN: 'Experience', FR: 'Expérience', ES: 'Experiencia' },
  'dash.ats_level': { EN: 'ATS Level', FR: 'Niveau ATS', ES: 'Nivel ATS' },
  'dash.actions': { EN: 'Quick Actions', FR: 'Actions Rapides', ES: 'Acciones Rápidas' },
  'dash.no_resume': { EN: 'No resume created yet. Start the quiz to build one!', FR: 'Aucun CV créé. Commencez le quiz !', ES: '¡Aún no tienes CV. Empieza el quiz!' },

  // Operator
  'op.title': { EN: 'Operator Panel', FR: 'Panneau Opérateur', ES: 'Panel Operador' },
  'op.general': { EN: 'General Metrics', FR: 'Métriques Générales', ES: 'Métricas Generales' },
  'op.sectors': { EN: 'Sector Breakdown', FR: 'Répartition par Secteur', ES: 'Desglose por Sector' },
  'op.experience': { EN: 'Experience Distribution', FR: 'Distribution Expérience', ES: 'Distribución Experiencia' },
  'op.ats': { EN: 'Advanced ATS', FR: 'ATS Avancé', ES: 'ATS Avanzado' },
  'op.languages': { EN: 'Language Distribution', FR: 'Distribution Langues', ES: 'Distribución Idiomas' },
};

export function t(key: string, lang: Language): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry['EN'] || key;
}
