import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { JourneySection } from './components/experience/JourneySection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { LearningSection } from './components/learning/LearningSection';
import { ContactSection } from './components/contact/ContactSection';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <JourneySection />
        <AboutSection />
        <SkillsSection />
        <LearningSection />
        <ContactSection />
      </main>
      <Footer />
      <SpeedInsights />
    </>
  );
}

export default App;
