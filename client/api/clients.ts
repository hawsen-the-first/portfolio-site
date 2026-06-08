import { strapiGet } from './strapi'
import type { StrapiListResponse, StrapiClient } from '../types/strapi'

export async function fetchClients() {
  const { data } = await strapiGet<StrapiListResponse<StrapiClient>>(
    '/api/clients?populate=*'
  )
  return data
}
