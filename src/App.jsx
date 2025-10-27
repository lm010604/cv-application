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
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const handleDownloadPdf = () => {
    if (!cvRef.current) return;
    const originalTitle = document.title;
    document.title = "CV";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 0);
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    const title = newSectionTitle.trim();
    if (title !== "") {
      setCustomSections([...customSections, { id: Date.now(), title, isCustom: true }]);
      setNewSectionTitle("");
      setIsAddingSection(false);
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
              isCustom={section.isCustom}
              onDelete={() => handleDeleteSection(section.id)}
            />
          ))}
        </div>

        {/* Add Section Area */}
        {!isAddingSection ? (
          <div className="add-actions" style={{ marginTop: "16px" }}>

            <CustomButton
              text="Add a Section"
              handleClick={() => setIsAddingSection(true)}
              type="button"
            />
          </div>
        ) : (
          <form
            onSubmit={handleAddSection}
            style={{
              marginTop: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "flex-start",
              marginLeft: "20px",
              marginRight: "20px",
              backgroundColor: "rgb(225, 239, 248)"
            }}
          >
            <label htmlFor="newSectionTitle">
              Enter a section title (e.g. Projects, Awards):
            </label>
            <input
              id="newSectionTitle"
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value.toUpperCase())}
              required
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                width: "280px",

              }}
            />
            <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
              <CustomButton text="Add" type="submit" />
              <CustomButton
                text="Cancel"
                handleClick={() => {
                  setNewSectionTitle("");
                  setIsAddingSection(false);
                }}
              />
            </div>
          </form>
        )}

      </div>
    </div>
  );
}

export default App;
