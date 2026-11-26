import { Link } from 'react-router-dom'
import { strapiUrl } from '../../api/strapi'
import type { StrapiProject } from '../../types/strapi'
import styles from './CaseStudies.module.css'

interface Props {
  title?: string
  subtitle?: string
  projects: StrapiProject[]
  loading?: boolean
}

const FALLBACK_STUDIES = [
  { id: -1, color: '#f59e0b', tag: 'Fintech' },
  { id: -2, color: '#3b82f6', tag: 'EdTech' },
  { id: -3, color: '#10b981', tag: 'Finance' },
]

export function CaseStudies({ title, subtitle, projects, loading = false }: Props) {
  const items =
    projects.length > 0
      ? projects.slice(0, 3)
      : FALLBACK_STUDIES.map((f, i) => ({
          ...f,
          documentId: String(f.id),
          Title: 'Work name here',
          slug: '',
          tagColor: f.color,
          shortDescription:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus incididunt.',
        }))

  if (loading) {
    return (
      <section id="case-studies" className={styles.section} aria-busy="true">
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={`sk ${styles.skTitle}`} />
            <div className={`sk ${styles.skSubtitle}`} />
          </div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`${styles.study} ${i % 2 !== 0 ? styles.imageFirst : ''}`}
            >
              <div className={styles.studyText}>
                <div className={`sk ${styles.skTag}`} />
                <div className={`sk ${styles.skStudyTitle}`} />
                <div className={`sk ${styles.skLine}`} />
                <div className={`sk ${styles.skLine}`} />
                <div className={`sk ${styles.skCta}`} />
              </div>
              <div className={`sk ${styles.studyImage}`} />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="case-studies" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title ?? 'Case Studies'}</h2>
          <p className={styles.subtitle}>
            {subtitle ??
              'Solving real business problems since last 5+ years. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
          </p>
        </div>

        {items.map((project, i) => (
          <div
            key={project.id}
            className={`${styles.study} ${i % 2 !== 0 ? styles.imageFirst : ''}`}
          >
            <div className={styles.studyText}>
              {project.tag && (
                <span
                  className={styles.tag}
                  style={{
                    color: project.tagColor ?? '#6b7280',
                    background: `${project.tagColor ?? '#6b7280'}18`,
                  }}
                >
                  {project.tag}
                </span>
              )}
              <h3 className={styles.studyTitle}>{project.Title}</h3>
              <p className={styles.studyDesc}>
                {project.shortDescription ??
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
              </p>
              {project.slug ? (
                <Link
                  to={`/case-studies/${project.slug}`}
                  className={styles.studyCta}
                  style={{ background: project.tagColor ?? 'var(--color-green)' }}
                >
                  View case study ›
                </Link>
              ) : (
                <span
                  className={styles.studyCta}
                  style={{ background: project.tagColor ?? 'var(--color-green)' }}
                >
                  View case study ›
                </span>
              )}
            </div>
            <div
              className={styles.studyImage}
              style={
                !project.coverImage
                  ? { background: `${project.tagColor ?? '#6b7280'}14` }
                  : undefined
              }
            >
              {project.coverImage && (
                <img
                  src={strapiUrl(project.coverImage.url)}
                  alt={project.coverImage.alternativeText ?? project.Title}
                />
              )}
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}
