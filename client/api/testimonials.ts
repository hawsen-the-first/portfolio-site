import { strapiGet } from './strapi'
import type { StrapiListResponse, StrapiTestimonial } from '../types/strapi'

export async function fetchTestimonials() {
  const { data } = await strapiGet<StrapiListResponse<StrapiTestimonial>>(
    '/api/testimonials?populate=client'
  )
  return data
}
