import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import GeneralInfo from './GeneralInfo';

beforeEach(() => {
    render(<GeneralInfo />);
});

describe('Edit Personal Info', () => {
    it('allows user to edit and save personal info', async () => {
        const editButton = screen.getByRole('button', { name: /Edit Personal Info/i });
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);
        const labels = [/name/i, /email/i, /phone number/i, /linkedin/i, /website/i];

        for (const label of labels) {
            const field = await screen.findByLabelText(label);
            expect(field).toBeInTheDocument();
        }

        fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'janedoe@example.com' } });
        fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '555-555-5555' } });
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);
        expect(await screen.findByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('janedoe@example.com')).toBeInTheDocument();
        expect(screen.getByText('555-555-5555')).toBeInTheDocument();
        expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();

    })
});