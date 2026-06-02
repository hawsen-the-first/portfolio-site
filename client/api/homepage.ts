import { strapiGet } from './strapi'
import type { StrapiResponse, StrapiHomepage } from '../types/strapi'

export async function fetchHomepage() {
  const { data } = await strapiGet<StrapiResponse<StrapiHomepage>>(
    '/api/homepage?populate=heroPhoto'
  )
  return data
}
