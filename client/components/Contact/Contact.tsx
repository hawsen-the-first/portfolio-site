import { useState, FormEvent } from 'react'
import { submitContactForm } from '../../api/contact'
import styles from './Contact.module.css'

export function Contact() {
  const [form, setForm] = useState({ email: '', mobile: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitContactForm(form)
      setStatus('sent')
      setForm({ email: '', mobile: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempus incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <label className={styles.label} htmlFor="email">Email</label>
            <input id="email" name="email" type="email" className={styles.input} placeholder="Enter your email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label className={styles.label} htmlFor="mobile">Mobile</label>
            <input id="mobile" name="mobile" type="tel" className={styles.input} placeholder="Enter number" value={form.mobile} onChange={handleChange} />
          </div>
          <div>
            <label className={styles.label} htmlFor="message">Message</label>
            <textarea id="message" name="message" className={styles.textarea} placeholder="Enter your message" rows={5} value={form.message} onChange={handleChange} required />
          </div>

          <button type="submit" className={styles.submit} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Submit ›'}
          </button>

          {status === 'sent' && <p className={styles.successMsg}>Message sent — thanks!</p>}
          {status === 'error' && <p className={styles.errorMsg}>Something went wrong. Try again.</p>}
        </form>
      </div>
    </section>
  )
}
