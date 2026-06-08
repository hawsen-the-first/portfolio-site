export interface StrapiMedia {
  id: number
  url: string
  alternativeText?: string
  width?: number
  height?: number
}

export interface StrapiClient {
  id: number
  documentId: string
  Name: string
  Logo?: StrapiMedia[]
}

import type { RichTextBlock } from '../utils/richText'

export interface StrapiProject {
  id: number
  documentId: string
  Title: string
  slug: string
  tag?: string
  tagColor?: string
  shortDescription?: string
  Description?: RichTextBlock[]
  demoUrl?: string
  repoUrl?: string
  videoUrl?: string
  ctaText?: string
  ProjectStatus?: 'In Progress' | 'Completed'
  coverImage?: StrapiMedia
  Images?: StrapiMedia[]
  isCaseStudy?: boolean
  isFeatured?: boolean
  clients?: StrapiClient[]
}

export interface StrapiTestimonial {
  id: number
  documentId: string
  Quote: string
  client?: StrapiClient
}

export interface StrapiHomepage {
  id: number
  documentId: string
  heroName?: string
  heroIntro?: string
  heroCta?: string
  heroPhoto?: StrapiMedia
  caseStudiesTitle?: string
  caseStudiesSubtitle?: string
  testimonialsTitle?: string
  testimonialsSubtitle?: string
  recentWorkTitle?: string
  recentWorkSubtitle?: string
}

export interface StrapiContact {
  id: number
  documentId: string
  Title?: string
  Blurb?: string
  Email?: string
  Phone?: string
  LinkedIn?: string
  GitHub?: string
}

export interface StrapiResponse<T> {
  data: T
  meta?: unknown
}

export interface StrapiListResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
