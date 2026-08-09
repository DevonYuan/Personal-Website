import { SiteNav } from '@/components/site-nav'
import { HeroSection } from '@/components/hero-section'
import { ProjectsSection } from '@/components/projects-section'
import { SkillsSection } from '@/components/skills-section'
import { LifeSection } from '@/components/life-section'
import { ContactSection } from '@/components/contact-section'
import { ScrollRail } from '@/components/scroll-rail'

export default function Page() {
  return (
    <>
      <SiteNav />
      <ScrollRail />
      <main>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <LifeSection />
        <ContactSection />
      </main>
    </>
  )
}
