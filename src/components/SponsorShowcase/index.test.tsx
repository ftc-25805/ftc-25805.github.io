import React from 'react';
import { render, screen } from '@testing-library/react';
import SponsorShowcase, { SponsorShowcaseProps, Sponsor } from './index';

describe('SponsorShowcase', () => {
  const mockSponsors: Sponsor[] = [
    {
      name: "Test Sponsor 1",
      logo: "/test-logo1.png",
      tier: "platinum",
      website: "https://test1.com",
      description: "Test description 1"
    },
    {
      name: "Test Sponsor 2",
      logo: "/test-logo2.png",
      tier: "gold",
      website: "https://test2.com",
      description: "Test description 2"
    }
  ];

  const defaultProps: SponsorShowcaseProps = {
    title: "Test Sponsors",
    subtitle: "Test subtitle",
    sponsors: mockSponsors
  };

  it('renders correctly with default props', () => {
    render(<SponsorShowcase />);
    
    expect(screen.getByText('Our Sponsors')).toBeInTheDocument();
    expect(screen.getByText(/Thank you to our amazing sponsors/)).toBeInTheDocument();
    expect(screen.getByText('TechCorp Industries')).toBeInTheDocument();
    expect(screen.getByText('Engineering Solutions LLC')).toBeInTheDocument();
    expect(screen.getByText('Local Hardware Store')).toBeInTheDocument();
  });

  it('renders correctly with custom props', () => {
    render(<SponsorShowcase {...defaultProps} />);
    
    expect(screen.getByText('Test Sponsors')).toBeInTheDocument();
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Sponsor 1')).toBeInTheDocument();
    expect(screen.getByText('Test Sponsor 2')).toBeInTheDocument();
  });

  it('displays sponsor information correctly', () => {
    render(<SponsorShowcase {...defaultProps} />);
    
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();
    expect(screen.getByAltText('Test Sponsor 1 logo')).toBeInTheDocument();
    expect(screen.getByAltText('Test Sponsor 2 logo')).toBeInTheDocument();
  });

  it('displays tier badges correctly', () => {
    render(<SponsorShowcase {...defaultProps} />);
    
    expect(screen.getByText('PLATINUM')).toBeInTheDocument();
    expect(screen.getByText('GOLD')).toBeInTheDocument();
  });

  it('displays sponsor website links', () => {
    render(<SponsorShowcase {...defaultProps} />);
    
    const links = screen.getAllByText('Visit Website →');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://test1.com');
    expect(links[1]).toHaveAttribute('href', 'https://test2.com');
  });

  it('displays call-to-action section', () => {
    render(<SponsorShowcase />);
    
    expect(screen.getByText('Interested in Sponsoring Our Team?')).toBeInTheDocument();
    expect(screen.getByText(/Help us build the future through robotics/)).toBeInTheDocument();
    expect(screen.getByText('Become a Sponsor')).toBeInTheDocument();
  });

  it('call-to-action button links to sponsorship page', () => {
    render(<SponsorShowcase />);
    
    const ctaButton = screen.getByText('Become a Sponsor');
    expect(ctaButton).toHaveAttribute('href', '/sponsorship');
  });

  it('handles empty sponsors array gracefully', () => {
    render(<SponsorShowcase sponsors={[]} />);
    
    expect(screen.getByText('Our Sponsors')).toBeInTheDocument();
    expect(screen.getByText('Become a Sponsor')).toBeInTheDocument();
  });

  it('has correct CSS classes for styling', () => {
    const { container } = render(<SponsorShowcase />);
    
    expect(container.firstChild).toHaveClass('sponsorShowcase');
  });
});