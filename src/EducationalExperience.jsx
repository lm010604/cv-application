
import ExperienceSection from "./ExperienceSection";

const educationFields = [
    { label: "School Name", id: "schoolName", type: "text", required: true },
    { label: "Title of Study", id: "titleOfStudy", type: "text", required: true },
    { label: "Date From", id: "dateFrom", type: "text", required: true },
    { label: "Date To", id: "dateTo", type: "text", required: true },
];

const initialEducation = [
    {
        schoolName: "Cornell University, College of Engineering",
        titleOfStudy: "Bachelor of Engineering, Computer Science",
        dateFrom: "2022",
        dateTo: "2026",
    }
];

function getMainText(item) {
    return item.schoolName;
}
function getSubText(item) {
    return item.titleOfStudy;
}
function getDateText(item) {
    return `${item.dateFrom} - ${item.dateTo}`;
}

const educationRows = [
    ["schoolName", "dateFrom"],
    ["titleOfStudy", "dateTo"],
];

function EducationalExperience() {
    return (
        <ExperienceSection
            title="EDUCATION"
            fields={educationFields}
            initialItems={initialEducation}
            getMainText={getMainText}
            getSubText={getSubText}
            getDateText={getDateText}
            formRows={educationRows}
        />
    );
}

export default EducationalExperience;
