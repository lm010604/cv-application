import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
vi.mock('./GeneralInfo', () => ({
    default: () => <div>General Info Section</div>,
}));

vi.mock('./EducationalExperience', () => ({
    default: () => <div>EDUCATION</div>,
}));

vi.mock('./WorkExperience', () => ({
    default: () => <div>WORK EXPERIENCE</div>,
}));

import App from './App';


beforeEach(() => {
    render(<App />);
});


describe('App component', () => {

    it('renders the main CV sections', () => {
        expect(screen.getByText(/EDUCATION/i)).toBeInTheDocument();
        expect(screen.getByText(/WORK EXPERIENCE/i)).toBeInTheDocument();
    });

    it('shows the "Add a Section" button', () => {
        expect(screen.getByText(/Add a Section/i)).toBeInTheDocument();
    });

    it('calls window.print when "Download as PDF" is clicked', () => {
        const downloadBtn = screen.getByText(/Download as PDF/i);
        fireEvent.click(downloadBtn);
        expect(window.print).toHaveBeenCalledTimes(1);
    });

    it('renders cusom sections', () => {

    })
});

describe('Add a section', () => {
    it('allows user to input and save a new section title', async () => {
        const addSectionButton = screen.getByRole('button', { name: /Add a Section/i });
        expect(addSectionButton).toBeInTheDocument();
        fireEvent.click(addSectionButton);
        const input = await screen.findByLabelText(/enter a section title/i);
        expect(input).toBeInTheDocument();
        fireEvent.change(input, { target: { value: "PROJECTS" } });
        const confirmAddButton = screen.getByRole("button", { name: /^add$/i });
        fireEvent.click(confirmAddButton);
        const newSection = await screen.findByText("PROJECTS");
        expect(newSection).toBeInTheDocument();
        expect(screen.queryByLabelText(/enter a section title/i)).not.toBeInTheDocument();
    })

    it('hides the form to add a section when "Cancel" is clicked'), async () => {
        const addSectionButton = screen.getByRole('button', { name: /Add a Section/i });
        fireEvent.click(addSectionButton);
        const input = await screen.findByLabelText(/enter a section title/i);
        expect(input).toBeInTheDocument();
        const cancelButton = screen.getByRole("button", { name: /^cancel$/i });
        fireEvent.click(cancelButton);
        expect(screen.queryByLabelText(/enter a section title/i)).not.toBeInTheDocument();
    }
});
