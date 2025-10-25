
import ExperienceSection from "./ExperienceSection";

const workFields = [
    { label: "Company Name", id: "companyName", type: "text", required: true },
    { label: "Position Title", id: "positionTitle", type: "text", required: true },
    { label: "Date From", id: "dateFrom", type: "text", required: true },
    { label: "Date To", id: "dateTo", type: "text", required: true },
];

// const initialWork = [
//     {
//         companyName: "Tech Corp",
//         positionTitle: "Software Engineer",
//         mainTasks: "Developed web applications",
//         dateFrom: "2023",
//         dateTo: "Present",
//     }
// ];

function getMainText(item) {
    return `${item.companyName} | ${item.positionTitle}`;
}
function getSubText(item) {
    return item.mainTasks ? item.mainTasks.replace(/\t/g, '\n') : "";
}
function getDateText(item) {
    return `${item.dateFrom} - ${item.dateTo}`;
}

function extraFormFields(form, handleChange) {
    return (
        <div className="form-row" style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
            <label htmlFor="mainTasks" style={{ alignSelf: 'flex-start', marginTop: '4px', minWidth: '120px', marginRight: '8px' }}>Main Tasks:</label>
            <textarea
                id="mainTasks"
                rows={4}
                value={form.mainTasks}
                onChange={handleChange}
                className="main-tasks-textarea"
                style={{ flex: 1 }}
                required
                onKeyDown={e => {
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        const { selectionStart, selectionEnd, value } = e.target;
                        const newValue = value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);
                        handleChange({
                            target: {
                                id: 'mainTasks',
                                value: newValue
                            }
                        });
                        setTimeout(() => {
                            e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
                        }, 0);
                    }
                }}
            />
        </div>
    );
}

const workRows = [
    ["companyName", "dateFrom"],
    ["positionTitle", "dateTo"],
];

function WorkExperience({ data, onChange }) {
    return (
        <ExperienceSection
            title="WORK EXPERIENCE"
            fields={workFields}
            items={data}
            onItemsChange={onChange}
            getMainText={getMainText}
            getSubText={getSubText}
            getDateText={getDateText}
            extraFormFields={extraFormFields}
            formRows={workRows}
            initialFormValues={{ mainTasks: "" }}
        />
    );
}

export default WorkExperience;
