import { useRef } from 'react'
import './App.css'
import CustomButton from './CustomButton'
import EducationalExperience from './EducationalExperience'
import GeneralInfo from './GeneralInfo'
import WorkExperience from './WorkExperience'

function App() {
  const cvRef = useRef(null)

  const handleDownloadPdf = () => {
    if (!cvRef.current) return
    const originalTitle = document.title
    document.title = 'CV'

    window.print()

    setTimeout(() => {
      document.title = originalTitle
    }, 0)
  }

  return (
    <div className="app-container">
      <div className="download-actions">
        <CustomButton text="Download as PDF" handleClick={handleDownloadPdf} type="button" />
      </div>
      <div className="cv-wrapper" ref={cvRef}>
        <GeneralInfo />
        <EducationalExperience />
        <WorkExperience />
      </div>
    </div>
  )
}

export default App
