import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';

describe('App', () => {
    it('renders Nexora title', async () => {
        global.fetch = vi.fn((url) => {
            if (url.includes('/api/health')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ status: 'ok' })
                })
            }

            if (url.includes('/api/services')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([])
                })
            }

            return Promise.reject(new Error('Unknown endpoint'))
        })

        render(<App />);
        const title = await screen.findByText(/Nexora/i);
        expect(title).toBeInTheDocument();
    });
});
