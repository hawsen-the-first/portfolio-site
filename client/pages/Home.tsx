import { useState, useEffect } from 'react'
import { Hero } from '../components/Hero/Hero'
import { CaseStudies } from '../components/CaseStudies/CaseStudies'
import { Testimonials } from '../components/Testimonials/Testimonials'
import { RecentWork } from '../components/RecentWork/RecentWork'
import { Contact } from '../components/Contact/Contact'
import { fetchHomepage } from '../api/homepage'
import { fetchCaseStudies, fetchFeaturedProjects } from '../api/projects'
import { fetchTestimonials } from '../api/testimonials'
import type { StrapiHomepage, StrapiProject, StrapiTestimonial } from '../types/strapi'

export function Home() {
  const [homepage, setHomepage] = useState<StrapiHomepage | null>(null)
  const [caseStudies, setCaseStudies] = useState<StrapiProject[]>([])
  const [recentWork, setRecentWork] = useState<StrapiProject[]>([])
  const [testimonials, setTestimonials] = useState<StrapiTestimonial[]>([])

  useEffect(() => {
    fetchHomepage().then(setHomepage).catch(console.error)
    fetchCaseStudies().then(setCaseStudies).catch(console.error)
    fetchFeaturedProjects().then(setRecentWork).catch(console.error)
    fetchTestimonials().then(setTestimonials).catch(console.error)
  }, [])

  return (
    <>
      <Hero homepage={homepage} />
      <CaseStudies
        title={homepage?.caseStudiesTitle}
        subtitle={homepage?.caseStudiesSubtitle}
        projects={caseStudies}
      />
      <Testimonials
        title={homepage?.testimonialsTitle}
        subtitle={homepage?.testimonialsSubtitle}
        testimonials={testimonials}
      />
      <RecentWork
        title={homepage?.recentWorkTitle}
        subtitle={homepage?.recentWorkSubtitle}
        projects={recentWork}
      />
      <Contact />
    </>
  )
}
