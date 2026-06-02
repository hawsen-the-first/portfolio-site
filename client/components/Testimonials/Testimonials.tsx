import type { StrapiTestimonial } from '../../types/strapi'
import styles from './Testimonials.module.css'

interface Props {
  title?: string
  subtitle?: string
  testimonials: StrapiTestimonial[]
}

const FALLBACK: StrapiTestimonial[] = [
  { id: -1, documentId: '-1', Quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus incididunt ut labore et dolore magna aliqua.', client: { id: -1, documentId: '-1', Name: 'Client Name' } },
  { id: -2, documentId: '-2', Quote: 'Consectetur adipiscing elit, sed do eiusmod tempus incididunt ut labore et dolore magna aliqua.', client: { id: -2, documentId: '-2', Name: 'Client Name' } },
  { id: -3, documentId: '-3', Quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus incididunt ut labore et dolore magna aliqua.', client: { id: -3, documentId: '-3', Name: 'Client Name' } },
  { id: -4, documentId: '-4', Quote: 'Consectetur adipiscing elit, sed do eiusmod tempus incididunt ut labore et dolore magna aliqua.', client: { id: -4, documentId: '-4', Name: 'Client Name' } },
]

export function Testimonials({ title, subtitle, testimonials }: Props) {
  const items = testimonials.length > 0 ? testimonials : FALLBACK

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title ?? 'Testimonials'}</h2>
          <p className={styles.subtitle}>
            {subtitle ??
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus incididunt ut labore et dolore magna aliqua.'}
          </p>
        </div>
        <div className={styles.grid}>
          {items.map((t) => {
            const initials = t.client?.Name
              ? t.client.Name.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)
              : 'CN'
            return (
              <div key={t.id} className={styles.card}>
                <span className={styles.quote}>&ldquo;</span>
                <p className={styles.text}>{t.Quote}</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>{initials}</div>
                  <span className={styles.name}>{t.client?.Name ?? 'Client Name'}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
