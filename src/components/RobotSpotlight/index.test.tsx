import React from 'react';
import { render, screen } from '@testing-library/react';
import RobotSpotlight, { RobotSpotlightProps } from './index';

describe('RobotSpotlight', () => {
  const defaultProps: RobotSpotlightProps = {
    robotName: "Test Robot",
    robotImage: "/test-robot.png",
    description: "Test robot description"
  };

  it('renders correctly with default props', () => {
    render(<RobotSpotlight />);
    
    expect(screen.getByText('Competition Bot 2024')).toBeInTheDocument();
    expect(screen.getByText(/Our latest competition robot featuring/)).toBeInTheDocument();
    expect(screen.getByText('Mecanum Wheels')).toBeInTheDocument();
    expect(screen.getByText('Java & Blocks')).toBeInTheDocument();
    expect(screen.getByText('REV Control Hub')).toBeInTheDocument();
  });

  it('renders correctly with custom props', () => {
    render(<RobotSpotlight {...defaultProps} />);
    
    expect(screen.getByText('Test Robot')).toBeInTheDocument();
    expect(screen.getByText('Test robot description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Robot')).toBeInTheDocument();
  });

  it('displays robot image with correct attributes', () => {
    render(<RobotSpotlight {...defaultProps} />);
    
    const image = screen.getByAltText('Test Robot');
    expect(image).toHaveAttribute('src', '/test-robot.png');
    expect(image).toHaveAttribute('alt', 'Test Robot');
  });

  it('displays technical specifications', () => {
    render(<RobotSpotlight />);
    
    expect(screen.getByText('Drive System:')).toBeInTheDocument();
    expect(screen.getByText('Programming:')).toBeInTheDocument();
    expect(screen.getByText('Control Hub:')).toBeInTheDocument();
  });

  it('has correct CSS classes for styling', () => {
    const { container } = render(<RobotSpotlight />);
    
    expect(container.firstChild).toHaveClass('robotSpotlight');
  });
});