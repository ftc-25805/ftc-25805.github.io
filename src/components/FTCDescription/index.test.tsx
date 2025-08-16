import React from 'react';
import { render, screen } from '@testing-library/react';
import FTCDescription, { FTCDescriptionProps } from './index';

describe('FTCDescription', () => {
  const defaultProps: FTCDescriptionProps = {
    title: "Test Title",
    subtitle: "Test Subtitle"
  };

  it('renders correctly with default props', () => {
    render(<FTCDescription />);
    
    expect(screen.getByText('What is FIRST Tech Challenge?')).toBeInTheDocument();
    expect(screen.getByText('More than robots, building the future')).toBeInTheDocument();
    expect(screen.getByText(/FIRST Tech Challenge \(FTC\) is a robotics competition/)).toBeInTheDocument();
  });

  it('renders correctly with custom props', () => {
    render(<FTCDescription {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('displays all highlight sections', () => {
    render(<FTCDescription />);
    
    expect(screen.getByText('Robot Design')).toBeInTheDocument();
    expect(screen.getByText('Competition')).toBeInTheDocument();
    expect(screen.getByText('Community Impact')).toBeInTheDocument();
  });

  it('displays highlight descriptions', () => {
    render(<FTCDescription />);
    
    expect(screen.getByText(/Build and program autonomous robots/)).toBeInTheDocument();
    expect(screen.getByText(/Compete in regional, state, and world championship/)).toBeInTheDocument();
    expect(screen.getByText(/Engage in outreach projects/)).toBeInTheDocument();
  });

  it('displays FIRST Core Values section', () => {
    render(<FTCDescription />);
    
    expect(screen.getByText('FIRST Core Values')).toBeInTheDocument();
    expect(screen.getByText('Gracious Professionalism')).toBeInTheDocument();
    expect(screen.getByText('Coopertition')).toBeInTheDocument();
    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.getByText('Innovation')).toBeInTheDocument();
    expect(screen.getByText('Impact')).toBeInTheDocument();
    expect(screen.getByText('Inclusion')).toBeInTheDocument();
    expect(screen.getByText('Teamwork')).toBeInTheDocument();
    expect(screen.getByText('Fun')).toBeInTheDocument();
  });

  it('displays emojis for visual elements', () => {
    render(<FTCDescription />);
    
    expect(screen.getByText('🤖')).toBeInTheDocument();
    expect(screen.getByText('🏆')).toBeInTheDocument();
    expect(screen.getByText('🤝')).toBeInTheDocument();
  });

  it('has correct CSS classes for styling', () => {
    const { container } = render(<FTCDescription />);
    
    expect(container.firstChild).toHaveClass('ftcDescription');
  });
});