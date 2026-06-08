import { strapiGet } from './strapi'
import type { StrapiListResponse, StrapiProject } from '../types/strapi'

const COVER_POPULATE = 'populate[coverImage]=*'

export async function fetchCaseStudies() {
  const { data } = await strapiGet<StrapiListResponse<StrapiProject>>(
    `/api/projects?filters[isCaseStudy][$eq]=true&sort=createdAt:desc&${COVER_POPULATE}`
  )
  return data
}

export async function fetchFeaturedProjects() {
  const { data } = await strapiGet<StrapiListResponse<StrapiProject>>(
    `/api/projects?filters[isFeatured][$eq]=true&sort=createdAt:desc&${COVER_POPULATE}`
  )
  return data
}

export async function fetchAllProjects() {
  const { data } = await strapiGet<StrapiListResponse<StrapiProject>>(
    `/api/projects?sort=createdAt:desc&${COVER_POPULATE}`
  )
  return data
}

export async function fetchProjectBySlug(slug: string) {
  const { data } = await strapiGet<StrapiListResponse<StrapiProject>>(
    `/api/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[coverImage]=*&populate[Images]=*&populate[clients]=*`
  )
  return data[0] ?? null
}
