import { vi, expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import '@testing-library/jest-dom';

window.print = vi.fn();

expect.extend(matchers);

afterEach(() => {
    cleanup();
});