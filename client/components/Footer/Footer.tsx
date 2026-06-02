import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Made with <span aria-hidden="true">♥</span>
      </p>
    </footer>
  )
}
