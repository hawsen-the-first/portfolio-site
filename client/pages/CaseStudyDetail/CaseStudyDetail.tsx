import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchProjectBySlug } from '../../api/projects'
import { strapiUrl } from '../../api/strapi'
import type { StrapiProject } from '../../types/strapi'
import { buildRichText } from '../../utils/richText'
import styles from './CaseStudyDetail.module.css'

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<StrapiProject | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetchProjectBySlug(slug)
      .then((p) => {
        if (!p) navigate('/case-studies', { replace: true })
        else setProject(p)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug, navigate])

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading…</p>
      </div>
    )
  }

  if (!project) return null

  return (
    <article className={styles.page}>
      {project.coverImage && (
        <div className={styles.hero}>
          <img
            src={strapiUrl(project.coverImage.url)}
            alt={project.coverImage.alternativeText ?? project.Title}
            className={styles.heroImg}
          />
        </div>
      )}

      <div className={styles.container}>
        <Link to="/case-studies" className={styles.back}>
          ← Back to Case Studies
        </Link>

        <header className={styles.header}>
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
          <h1 className={styles.title}>{project.Title}</h1>
          {project.shortDescription && (
            <p className={styles.lead}>{project.shortDescription}</p>
          )}
        </header>

        <div className={styles.meta}>
          {project.ProjectStatus && (
            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>Status</span>
              {project.ProjectStatus}
            </span>
          )}
          {project.clients && project.clients.length > 0 && (
            <span className={styles.metaItem}>
              <span className={styles.metaLabel}>Client</span>
              {project.clients.map((c) => c.Name).join(', ')}
            </span>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaLink}
            >
              Live demo ›
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.ctaLink}
            >
              View repo ›
            </a>
          )}
        </div>

        {project.Description && project.Description.length > 0 && (
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: buildRichText(project.Description) }}
          />
        )}

        {project.Images && project.Images.length > 0 && (
          <div className={styles.gallery}>
            {project.Images.map((img) => (
              <img
                key={img.id}
                src={strapiUrl(img.url)}
                alt={img.alternativeText ?? ''}
                className={styles.galleryImg}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
