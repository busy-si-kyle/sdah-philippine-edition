import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContributePage from '@/app/contribute/page';

// Mock next/navigation
const mockBack = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

describe('Contribute Page - Navigation', () => {
  it('should call router.back() when clicking the Back button', () => {
    render(<ContributePage />);
    const backButton = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backButton);
    expect(mockBack).toHaveBeenCalled();
  });
});
