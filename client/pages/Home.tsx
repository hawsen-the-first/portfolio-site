import { useState, useEffect } from 'react'
import { Hero } from '../components/Hero/Hero'
import { CaseStudies } from '../components/CaseStudies/CaseStudies'
import { Testimonials } from '../components/Testimonials/Testimonials'
import { RecentWork } from '../components/RecentWork/RecentWork'
import { Contact } from '../components/Contact/Contact'
import { fetchHomepage } from '../api/homepage'
import { fetchFeaturedProjects, fetchAllProjects } from '../api/projects'
import { fetchTestimonials } from '../api/testimonials'
import { fetchClients } from '../api/clients'
import type { StrapiHomepage, StrapiProject, StrapiTestimonial, StrapiClient } from '../types/strapi'

export function Home() {
  const [homepage, setHomepage] = useState<StrapiHomepage | null>(null)
  const [caseStudies, setCaseStudies] = useState<StrapiProject[]>([])
  const [recentWork, setRecentWork] = useState<StrapiProject[]>([])
  const [testimonials, setTestimonials] = useState<StrapiTestimonial[]>([])
  const [clients, setClients] = useState<StrapiClient[]>([])

  useEffect(() => {
    fetchHomepage().then(setHomepage).catch(console.error)
    fetchFeaturedProjects().then(setCaseStudies).catch(console.error)
    fetchAllProjects().then(setRecentWork).catch(console.error)
    fetchTestimonials().then(setTestimonials).catch(console.error)
    fetchClients().then(setClients).catch(console.error)
  }, [])

  return (
    <>
      <Hero homepage={homepage} clients={clients} />
      <CaseStudies
        title={homepage?.caseStudiesTitle}
        subtitle={homepage?.caseStudiesSubtitle}
        projects={caseStudies}
      />
      {testimonials.length > 0 && (
        <Testimonials
          title={homepage?.testimonialsTitle}
          subtitle={homepage?.testimonialsSubtitle}
          testimonials={testimonials}
        />
      )}
      <RecentWork
        title={homepage?.recentWorkTitle}
        subtitle={homepage?.recentWorkSubtitle}
        projects={recentWork}
      />
      <Contact />
    </>
  )
}
