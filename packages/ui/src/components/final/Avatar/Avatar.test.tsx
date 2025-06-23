import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback, ProfileAvatar } from './Avatar';

describe('Avatar Component', () => {
  // Basic rendering
  it('renders avatar container', () => {
    render(<Avatar />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  // Size variants
  it('applies correct size classes', () => {
    const { rerender } = render(<Avatar size="sm" />);
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('h-8', 'w-8');

    rerender(<Avatar size="lg" />);
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('h-12', 'w-12');
  });

  // Custom classes
  it('accepts custom className', () => {
    render(<Avatar className="custom-class" />);
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('custom-class');
  });
});

describe('AvatarImage Component', () => {
  it('renders image with correct src and alt', () => {
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test User" />
      </Avatar>
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test User');
  });

  it('applies correct classes', () => {
    render(
      <Avatar>
        <AvatarImage src="test.jpg" alt="Test" className="custom-image" />
      </Avatar>
    );
    expect(screen.getByRole('img')).toHaveClass('custom-image');
  });
});

describe('AvatarFallback Component', () => {
  it('renders fallback content', () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('generates initials from name prop', () => {
    render(
      <Avatar>
        <AvatarFallback name="John Doe" />
      </Avatar>
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('applies correct classes', () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fallback">JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText('JD').parentElement).toHaveClass('custom-fallback');
  });
});

describe('ProfileAvatar Component', () => {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: 'test.jpg',
  };

  it('renders with user image', () => {
    render(<ProfileAvatar user={user} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'John Doe');
  });

  it('renders fallback with initials when no image', () => {
    render(<ProfileAvatar user={{ firstName: 'John', lastName: 'Doe' }} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('uses custom fallback when provided', () => {
    render(<ProfileAvatar user={user} fallback="Custom" />);
    const img = screen.getByRole('img');
    img.dispatchEvent(new Event('error'));
    waitFor(() => {
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });
  });

  it('applies size prop correctly', () => {
    render(<ProfileAvatar user={user} size="lg" />);
    expect(screen.getByRole('img', { hidden: true })).toHaveClass('h-12', 'w-12');
  });

  it('handles missing names gracefully', () => {
    render(<ProfileAvatar user={{}} />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});