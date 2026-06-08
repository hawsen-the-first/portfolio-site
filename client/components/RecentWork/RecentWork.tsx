import { useState } from 'react'
import { Link } from 'react-router-dom'
import { strapiUrl } from '../../api/strapi'
import type { StrapiProject } from '../../types/strapi'
import styles from './RecentWork.module.css'

interface Props {
  title?: string
  subtitle?: string
  projects: StrapiProject[]
}

const FALLBACK: StrapiProject[] = [
  { id: -1, documentId: '-1', Title: 'Work name here', slug: '', shortDescription: 'Labore et dolore magna aliqua, sed do eiusmod tempus incididunt ut labore et dolore magna aliqua.' },
  { id: -2, documentId: '-2', Title: 'Work name here', slug: '', shortDescription: 'Tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempus incididunt ut labore.' },
  { id: -3, documentId: '-3', Title: 'Work name here', slug: '', shortDescription: 'Labore et dolore magna aliqua, sed do eiusmod tempus incididunt ut labore et dolore magna aliqua.' },
  { id: -4, documentId: '-4', Title: 'Work name here', slug: '', shortDescription: 'Tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempus incididunt ut labore.' },
]

export function RecentWork({ title, subtitle, projects }: Props) {
  const items = projects.length > 0 ? projects : FALLBACK
  const [start, setStart] = useState(0)
  const canPrev = start > 0
  const canNext = start + 2 < items.length
  const visible = items.slice(start, start + 2)

  return (
    <section id="recent-work" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title ?? 'Recent Work'}</h2>
          <p className={styles.subtitle}>
            {subtitle ??
              'Solving real business problems since last 5+ years. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </p>
        </div>

        <div className={styles.carousel}>
          <button
            className={styles.arrow}
            onClick={() => setStart((s) => s - 1)}
            disabled={!canPrev}
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 12L6 8l4-4" />
            </svg>
          </button>

          <div className={styles.track}>
            {visible.map((project) => (
              <div key={project.id} className={styles.card}>
                <div className={styles.cardImage}>
                  {project.coverImage && (
                    <img
                      src={strapiUrl(project.coverImage.url)}
                      alt={project.coverImage.alternativeText ?? project.Title}
                    />
                  )}
                </div>
                <h3 className={styles.cardTitle}>{project.Title}</h3>
                <p className={styles.cardDesc}>
                  {project.shortDescription ?? ''}
                </p>
                {project.slug ? (
                  <Link
                    to={`/case-studies/${project.slug}`}
                    className={styles.cardLink}
                  >
                    Read more ›
                  </Link>
                ) : (
                  <span className={styles.cardLink}>Read more ›</span>
                )}
              </div>
            ))}
          </div>

          <button
            className={styles.arrow}
            onClick={() => setStart((s) => s + 1)}
            disabled={!canNext}
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4l4 4-4 4" />
            </svg>
          </button>
        </div>

        <div className={styles.mobileGrid}>
          {items.map((project) => (
            <div key={project.id} className={styles.card}>
              <div className={styles.cardImage}>
                {project.coverImage && (
                  <img
                    src={strapiUrl(project.coverImage.url)}
                    alt={project.coverImage.alternativeText ?? project.Title}
                  />
                )}
              </div>
              <h3 className={styles.cardTitle}>{project.Title}</h3>
              <p className={styles.cardDesc}>
                {project.shortDescription ?? ''}
              </p>
              {project.slug ? (
                <Link to={`/case-studies/${project.slug}`} className={styles.cardLink}>
                  Read more ›
                </Link>
              ) : (
                <span className={styles.cardLink}>Read more ›</span>
              )}
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <Link to="/case-studies" className={styles.viewAll}>
            View all projects ›
          </Link>
        </div>
      </div>
    </section>
  )
}
