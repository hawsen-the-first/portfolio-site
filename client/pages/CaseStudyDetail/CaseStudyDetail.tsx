import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { fetchProjectBySlug } from '../../api/projects'
import { strapiUrl } from '../../api/strapi'
import type { StrapiProject } from '../../types/strapi'
import { buildRichText } from '../../utils/richText'
import styles from './CaseStudyDetail.module.css'

const DEFAULT_CTA = "Working on something similar? Let's have a chat about your vision."

function toEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  const vm = url.match(/vimeo\.com\/(\d+)/)
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`
  return url
}

export function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<StrapiProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [slide, setSlide] = useState(0)

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

  const images = project.Images ?? []
  const hasImages = images.length > 0

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
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className={styles.ctaLink}>
              Live demo ›
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className={styles.ctaLink}>
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

        {project.videoUrl && (
          <div className={styles.videoWrap}>
            <iframe
              src={toEmbedUrl(project.videoUrl)}
              title={`${project.Title} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.video}
            />
          </div>
        )}

        <div className={styles.cta}>
          <p className={styles.ctaHeading}>
            {project.ctaText ?? DEFAULT_CTA}
          </p>
          <a href="/#contact" className={styles.ctaBtn}>Get in touch</a>
        </div>
      </div>

      {hasImages && (
        <div className={styles.carousel}>
          <div className={styles.carouselTrack}>
            <img
              src={strapiUrl(images[slide].url)}
              alt={images[slide].alternativeText ?? ''}
              className={styles.carouselImg}
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                className={`${styles.carouselArrow} ${styles.carouselPrev}`}
                onClick={() => setSlide((s) => (s - 1 + images.length) % images.length)}
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 12L6 8l4-4" />
                </svg>
              </button>
              <button
                className={`${styles.carouselArrow} ${styles.carouselNext}`}
                onClick={() => setSlide((s) => (s + 1) % images.length)}
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 4l4 4-4 4" />
                </svg>
              </button>
              <div className={styles.carouselDots}>
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === slide ? styles.dotActive : ''}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </article>
  )
}
