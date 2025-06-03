import Footer from '@/layouts/main/footer'
import Header from '@/layouts/main/header'

function ProjectsLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default ProjectsLayout
