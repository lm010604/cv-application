
import ExperienceSection from "./ExperienceSection";

const educationFields = [
    { label: "School Name", id: "schoolName", type: "text", required: true },
    { label: "Title of Study", id: "titleOfStudy", type: "text", required: true },
    { label: "Date From", id: "dateFrom", type: "text", required: true },
    { label: "Date To", id: "dateTo", type: "text", required: true },
];

const initialEducation = [
    {
        schoolName: "Cornell University, College of Arts and Sciences",
        titleOfStudy: "Bachelor of Arts, Information Science",
        dateFrom: "2022",
        dateTo: "2026",
    },
    {
        schoolName: "German Swiss International School",
        titleOfStudy: "High School Diploma",
        dateFrom: "2018",
        dateTo: "2022",
    },
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
