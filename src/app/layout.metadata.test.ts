import { expect, it, describe, vi } from 'vitest';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}));

import { metadata } from './layout';

describe('Root Layout Metadata', () => {
  it('should have the correct site title', () => {
    expect(metadata.title).toBe('SDAH Philippine Edition');
  });
});