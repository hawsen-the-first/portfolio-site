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
  const [heroLoading, setHeroLoading] = useState(true)
  const [clientsLoading, setClientsLoading] = useState(true)
  const [caseStudiesLoading, setCaseStudiesLoading] = useState(true)
  const [recentWorkLoading, setRecentWorkLoading] = useState(true)
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)

  useEffect(() => {
    fetchHomepage()
      .then(setHomepage)
      .catch(console.error)
      .finally(() => setHeroLoading(false))
    fetchFeaturedProjects()
      .then(setCaseStudies)
      .catch(console.error)
      .finally(() => setCaseStudiesLoading(false))
    fetchAllProjects()
      .then(setRecentWork)
      .catch(console.error)
      .finally(() => setRecentWorkLoading(false))
    fetchTestimonials()
      .then(setTestimonials)
      .catch(console.error)
      .finally(() => setTestimonialsLoading(false))
    fetchClients()
      .then(setClients)
      .catch(console.error)
      .finally(() => setClientsLoading(false))
  }, [])

  return (
    <>
      <Hero
        homepage={homepage}
        clients={clients}
        loading={heroLoading}
        clientsLoading={clientsLoading}
      />
      <CaseStudies
        title={homepage?.caseStudiesTitle}
        subtitle={homepage?.caseStudiesSubtitle}
        projects={caseStudies}
        loading={caseStudiesLoading || heroLoading}
      />
      {(testimonialsLoading || testimonials.length > 0) && (
        <Testimonials
          title={homepage?.testimonialsTitle}
          subtitle={homepage?.testimonialsSubtitle}
          testimonials={testimonials}
          loading={testimonialsLoading || heroLoading}
        />
      )}
      <RecentWork
        title={homepage?.recentWorkTitle}
        subtitle={homepage?.recentWorkSubtitle}
        projects={recentWork}
        loading={recentWorkLoading || heroLoading}
      />
      <Contact />
    </>
  )
}
