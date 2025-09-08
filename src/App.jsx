import './App.css'
import EducationalExperience from './EducationalExperience'
import GeneralInfo from './GeneralInfo'
import WorkExperience from './WorkExperience'

function App() {
  return (
    <div>
      <GeneralInfo name="John Doe" email="johndoe@gmail.com" phone="123-456-7890" />
      <EducationalExperience schoolName="Cornell University, College of Arts and Sciences" titleOfStudy="Bachelor of Science in Computer Science" dateOfStudy="2022-2026" />
      <WorkExperience companyName="Tech Corp" positionTitle="Software Engineer" mainTasks="Developed web applications" dateFrom="2023" dateTo="Present" />
    </div>
  )
}

export default App
