import "./App.css";
import { useRef, useState } from "react";
import CustomButton from "./CustomButton";
import GeneralInfo from "./GeneralInfo";
import EducationalExperience from "./EducationalExperience";
import WorkExperience from "./WorkExperience";
import ExperienceSection from "./ExperienceSection";

function App() {
  const cvRef = useRef(null);
  const [customSections, setCustomSections] = useState([]);

  const handleDownloadPdf = () => {
    if (!cvRef.current) return;
    const originalTitle = document.title;
    document.title = "CV";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 0);
  };

  const handleAddSection = () => {
    const title = prompt("Enter a section title (e.g. Projects, Awards):");
    if (title && title.trim() !== "") {
      setCustomSections([...customSections, { id: Date.now(), title }]);
    }
  };

  const handleDeleteSection = (id) => {
    setCustomSections(customSections.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="app-container">
        <div className="download-actions">
          <CustomButton
            text="Download as PDF"
            handleClick={handleDownloadPdf}
            type="button"
          />
        </div>

        <div className="cv-wrapper" ref={cvRef}>
          <GeneralInfo />
          <EducationalExperience />
          <WorkExperience />

          {/* Render dynamically added sections */}
          {customSections.map((section) => (
            <ExperienceSection
              key={section.id}
              title={section.title}
              fields={[
                { id: "title", label: "Title", type: "text", required: true },
                { id: "subtitle", label: "Subtitle", type: "text" },
                { id: "date", label: "Date", type: "text" },
                {
                  id: "description",
                  label: "Description",
                  type: "textarea",
                  rows: 4,
                },
              ]}
              initialItems={[]}
              getMainText={(item) => item.title}
              getSubText={(item) => item.subtitle}
              getDateText={(item) => item.date}
              renderExtraContent={(item) =>
                item.description ? (
                  <p
                    style={{
                      marginTop: "4px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {item.description}
                  </p>
                ) : null
              }
              onDelete={() => handleDeleteSection(section.id)}
            />
          ))}



        </div>
        <div className="add-actions">
          <CustomButton
            text="Add a Section"
            handleClick={handleAddSection}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
