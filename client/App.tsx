import { Routes, Route } from 'react-router-dom'
import { Nav } from './components/Nav/Nav'
import { Footer } from './components/Footer/Footer'
import { Home } from './pages/Home'
import { CaseStudiesPage } from './pages/CaseStudies/CaseStudiesPage'
import { CaseStudyDetail } from './pages/CaseStudyDetail/CaseStudyDetail'

export function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
