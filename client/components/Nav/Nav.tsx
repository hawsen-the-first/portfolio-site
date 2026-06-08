import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { fetchContact } from '../../api/contact'
import styles from './Nav.module.css'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Recent Work', href: '/#recent-work' },
  { label: 'Get In Touch', href: '/#contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    fetchContact().then((c) => setEmail(c?.Email ?? null)).catch(() => null)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          {navLinks.map(({ label, href, to }) =>
            to ? (
              <Link key={label} to={to}>{label}</Link>
            ) : (
              <a key={label} href={href}>{label}</a>
            )
          )}
        </div>

        <div className={styles.social}>
          <SocialLinks email={email} />
        </div>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {open && (
        <div className={styles.drawer}>
          <div className={styles.drawerLinks}>
            {navLinks.map(({ label, href, to }) =>
              to ? (
                <Link key={label} to={to} onClick={() => setOpen(false)}>{label}</Link>
              ) : (
                <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
              )
            )}
          </div>
          <div className={styles.drawerSocial}>
            <SocialLinks email={email} />
          </div>
        </div>
      )}
    </header>
  )
}

function SocialLinks({ email }: { email: string | null }) {
  return (
    <>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zm-11 19H5V8h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765C14.396 7.179 20 6.988 20 12.243V19z" />
        </svg>
      </a>
      <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className={styles.socialLink}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 22.097 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      {email && (
        <a href={`mailto:${email}`} aria-label="Email" className={styles.socialLink}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 7l10 7 10-7" />
          </svg>
        </a>
      )}
    </>
  )
}
