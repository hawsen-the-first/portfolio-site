import { strapiUrl } from '../../api/strapi'
import type { StrapiClient, StrapiHomepage } from '../../types/strapi'
import styles from './Hero.module.css'

const FALLBACK_COMPANIES = ['ClickUp', 'Dropbox', 'Paychex', 'Elastic', 'Stripe']

interface Props {
  homepage: StrapiHomepage | null
  clients: StrapiClient[]
}

export function Hero({ homepage, clients }: Props) {
  const photoUrl = homepage?.heroPhoto?.url
    ? strapiUrl(homepage.heroPhoto.url)
    : null

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.heading}>
            {homepage?.heroName ?? 'Your Name Here'}
          </h1>
          <p className={styles.intro}>
            {homepage?.heroIntro ??
              'Intro text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempus incididunt ut labore et dolore magna aliqua.'}
          </p>
          <a href="#contact" className={styles.cta}>
            {homepage?.heroCta ?? "Let's get started"} ›
          </a>
        </div>
        <div className={styles.photo}>
          {photoUrl && (
            <img
              src={photoUrl}
              alt={homepage?.heroPhoto?.alternativeText ?? 'Profile photo'}
            />
          )}
        </div>
      </div>
      <div className={styles.clientsStrip}>
        <div className={styles.clientsInner}>
          <span className={styles.clientsLabel}>Worked with</span>
          <div className={styles.logos}>
            {clients.length > 0
              ? clients.map((c) => {
                  const logo = c.Logo?.[0]
                  return logo ? (
                    <img
                      key={c.id}
                      src={strapiUrl(logo.url)}
                      alt={logo.alternativeText ?? c.Name}
                      className={styles.logoImg}
                    />
                  ) : (
                    <span key={c.id} className={styles.logo}>{c.Name}</span>
                  )
                })
              : FALLBACK_COMPANIES.map((c) => (
                  <span key={c} className={styles.logo}>{c}</span>
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}
