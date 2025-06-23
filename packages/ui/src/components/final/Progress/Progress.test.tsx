import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress, CircularProgress, StepProgress } from './Progress';

describe('Progress Component', () => {
  // Linear Progress Tests
  describe('Linear Progress', () => {
    it('renders with default props', () => {
      render(<Progress value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });

    it('applies correct size classes', () => {
      const { rerender } = render(<Progress value={50} size="sm" />);
      expect(screen.getByRole('progressbar')).toHaveClass('h-1');

      rerender(<Progress value={50} size="lg" />);
      expect(screen.getByRole('progressbar')).toHaveClass('h-3');
    });

    it('applies correct variant classes', () => {
      const { rerender } = render(<Progress value={50} variant="success" />);
      expect(screen.getByRole('progressbar')).toHaveClass('bg-green-100');

      rerender(<Progress value={50} variant="warning" />);
      expect(screen.getByRole('progressbar')).toHaveClass('bg-yellow-100');
    });

    it('shows percentage when enabled', () => {
      render(<Progress value={50} showPercentage />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('shows label when provided', () => {
      render(<Progress value={50} label="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('handles indeterminate state', () => {
      render(<Progress indeterminate />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).not.toHaveAttribute('aria-valuenow');
    });
  });

  // Circular Progress Tests
  describe('CircularProgress', () => {
    it('renders with default props', () => {
      render(<CircularProgress value={50} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toBeInTheDocument();
      expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    });

    it('applies custom size', () => {
      render(<CircularProgress value={50} size={160} />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).toHaveStyle({ width: '160px', height: '160px' });
    });

    it('shows percentage when enabled', () => {
      render(<CircularProgress value={50} showPercentage />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('shows label when provided', () => {
      render(<CircularProgress value={50} label="CPU Usage" />);
      expect(screen.getByText('CPU Usage')).toBeInTheDocument();
    });

    it('handles indeterminate state', () => {
      render(<CircularProgress indeterminate />);
      const progressbar = screen.getByRole('progressbar');
      expect(progressbar).not.toHaveAttribute('aria-valuenow');
    });
  });

  // Step Progress Tests
  describe('StepProgress', () => {
    const steps = ['Step 1', 'Step 2', 'Step 3'];

    it('renders correct number of steps', () => {
      render(<StepProgress currentStep={1} totalSteps={3} steps={steps} />);
      expect(screen.getAllByRole('presentation')).toHaveLength(3);
    });

    it('shows step numbers when enabled', () => {
      render(<StepProgress currentStep={1} totalSteps={3} steps={steps} showNumbers />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('applies correct styles for completed, current, and upcoming steps', () => {
      render(<StepProgress currentStep={1} totalSteps={3} steps={steps} />);
      const stepElements = screen.getAllByRole('presentation');
      
      // First step (completed)
      expect(stepElements[0]).toHaveClass('border-primary');
      
      // Second step (current)
      expect(stepElements[1]).toHaveClass('border-primary');
      expect(stepElements[1]).toHaveClass('bg-background');
      
      // Third step (upcoming)
      expect(stepElements[2]).toHaveClass('border-muted');
    });

    it('renders in vertical orientation', () => {
      render(
        <StepProgress
          currentStep={1}
          totalSteps={3}
          steps={steps}
          orientation="vertical"
        />
      );
      const container = screen.getByRole('presentation').parentElement;
      expect(container).toHaveClass('flex-col');
    });

    it('applies different sizes', () => {
      const { rerender } = render(
        <StepProgress
          currentStep={1}
          totalSteps={3}
          steps={steps}
          size="sm"
        />
      );
      expect(screen.getAllByRole('presentation')[0]).toHaveClass('h-6');

      rerender(
        <StepProgress
          currentStep={1}
          totalSteps={3}
          steps={steps}
          size="lg"
        />
      );
      expect(screen.getAllByRole('presentation')[0]).toHaveClass('h-10');
    });
  });
});