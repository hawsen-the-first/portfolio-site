import { strapiGet, strapiPost } from './strapi'
import type { StrapiResponse, StrapiContact } from '../types/strapi'

export async function fetchContact() {
  const { data } = await strapiGet<StrapiResponse<StrapiContact>>('/api/contact')
  return data
}

export async function submitContactForm(form: {
  email: string
  mobile: string
  message: string
}) {
  return strapiPost<{ message: string }>('/api/contact/submit', form)
}
