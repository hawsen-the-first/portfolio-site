import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAllProjects } from '../../api/projects'
import { strapiUrl } from '../../api/strapi'
import type { StrapiProject } from '../../types/strapi'
import styles from './CaseStudiesPage.module.css'

export function CaseStudiesPage() {
  const [projects, setProjects] = useState<StrapiProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Case Studies</h1>
          <p className={styles.subtitle}>
            A look at some of the projects I&apos;ve worked on.
          </p>
        </div>

        {loading && <p className={styles.loading}>Loading…</p>}

        <div className={styles.grid}>
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/case-studies/${project.slug}`}
              className={styles.card}
            >
              <div className={styles.cardImage}>
                {project.coverImage ? (
                  <img
                    src={strapiUrl(project.coverImage.url)}
                    alt={project.coverImage.alternativeText ?? project.Title}
                  />
                ) : null}
              </div>
              <div className={styles.cardBody}>
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
                <h2 className={styles.cardTitle}>{project.Title}</h2>
                {project.shortDescription && (
                  <p className={styles.cardDesc}>{project.shortDescription}</p>
                )}
                <span className={styles.cardLink}>View case study ›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
