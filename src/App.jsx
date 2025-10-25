import './App.css';
import { useState, useEffect } from 'react';
import GeneralInfo from './GeneralInfo';
import EducationalExperience from './EducationalExperience';
import WorkExperience from './WorkExperience';
import CustomButton from './CustomButton';

function App() {
  // Centralized CV state
  const defaultCvData = {
    generalInfo: {
      name: 'Lauren Mok',
      email: 'laurensymok@gmail.com',
      phone: '607-339-1653',
      linkedIn: 'linkedin.com/in/laurensymok',
      website: 'laurensymok.com',
    },
    education: [],
    work: [],
  };

  const [cvData, setCvData] = useState(defaultCvData);

  // ✅ Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cvData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // ✅ Merge safely without using stale cvData
        setCvData({
          generalInfo: parsed.generalInfo || defaultCvData.generalInfo,
          education: Array.isArray(parsed.education)
            ? parsed.education
            : defaultCvData.education,
          work: Array.isArray(parsed.work)
            ? parsed.work
            : defaultCvData.work,
        });
      } catch (err) {
        console.error('Failed to parse saved CV data:', err);
      }
    }
  }, []); // 👈 run once only

  // ✅ Auto-save whenever cvData changes
  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [cvData]);

  // Update handlers
  const updateGeneralInfo = (info) =>
    setCvData((prev) => ({ ...prev, generalInfo: info }));

  const updateEducation = (educationList) =>
    setCvData((prev) => ({ ...prev, education: educationList }));

  const updateWork = (workList) =>
    setCvData((prev) => ({ ...prev, work: workList }));

  // PDF + Reset
  const handleDownloadPdf = () => window.print();

  const handleReset = () => {
    if (window.confirm('Clear all CV data?')) {
      localStorage.removeItem('cvData');
      setCvData(defaultCvData);
    }
  };

  return (
    <div className="app-container">
      <div className="download-actions">
        <CustomButton
          text="Download as PDF"
          handleClick={handleDownloadPdf}
          type="button"
        />
        <CustomButton text="Reset All" handleClick={handleReset} type="button" />
      </div>

      <div className="cv-wrapper">
        <GeneralInfo data={cvData.generalInfo} onChange={updateGeneralInfo} />
        <EducationalExperience
          data={cvData.education}
          onChange={updateEducation}
        />
        <WorkExperience data={cvData.work} onChange={updateWork} />
      </div>
    </div>
  );
}

export default App;
