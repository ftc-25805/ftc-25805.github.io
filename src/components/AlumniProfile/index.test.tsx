import React from 'react';
import { render, screen } from '@testing-library/react';
import AlumniProfile, { AlumniProfile as AlumniProfileInterface } from './index';

describe('AlumniProfile', () => {
  const mockAlumni: AlumniProfileInterface = {
    id: '1',
    name: 'Emily Rodriguez',
    graduationYear: 2023,
    achievements: [
      'Team Captain for 2 consecutive years',
      'Won State Championship 2022',
      'Recipient of Dean\'s List Award',
      'Published research on autonomous navigation'
    ],
    currentPursuit: 'Computer Science Student at MIT',
    photoUrl: '/img/alumni/emily-rodriguez.jpg',
    bio: 'Former team captain who led the team to multiple victories. Now pursuing Computer Science with a focus on robotics and AI.'
  };

  const mockAlumniWithoutPhoto: AlumniProfileInterface = {
    id: '2',
    name: 'David Kim',
    graduationYear: 2022,
    achievements: ['Outstanding Mentor Award'],
    currentPursuit: 'Software Engineer at Google',
    bio: 'Dedicated team member and mentor.'
  };

  it('renders alumni profile with all information', () => {
    render(<AlumniProfile alumni={mockAlumni} />);
    
    expect(screen.getByText('Emily Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('Computer Science Student at MIT')).toBeInTheDocument();
    expect(screen.getByText('Former team captain who led the team to multiple victories. Now pursuing Computer Science with a focus on robotics and AI.')).toBeInTheDocument();
    expect(screen.getByText('Class of 2023')).toBeInTheDocument();
  });

  it('renders alumni badge and graduation year', () => {
    render(<AlumniProfile alumni={mockAlumni} />);
    
    expect(screen.getByText('Alumni')).toBeInTheDocument();
    expect(screen.getByText('Class of 2023')).toBeInTheDocument();
  });

  it('renders alumni photo with correct alt text', () => {
    render(<AlumniProfile alumni={mockAlumni} />);
    
    const photo = screen.getByAltText('Emily Rodriguez profile photo');
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', '/img/alumni/emily-rodriguez.jpg');
  });

  it('renders achievements section with all items', () => {
    render(<AlumniProfile alumni={mockAlumni} />);
    
    expect(screen.getByText('Notable Achievements')).toBeInTheDocument();
    expect(screen.getByText('Team Captain for 2 consecutive years')).toBeInTheDocument();
    expect(screen.getByText('Won State Championship 2022')).toBeInTheDocument();
    expect(screen.getByText('Recipient of Dean\'s List Award')).toBeInTheDocument();
    expect(screen.getByText('Published research on autonomous navigation')).toBeInTheDocument();
  });

  it('renders placeholder photo with initials when no photo URL is provided', () => {
    render(<AlumniProfile alumni={mockAlumniWithoutPhoto} />);
    
    expect(screen.getByText('DK')).toBeInTheDocument();
    expect(screen.queryByAltText(/profile photo/)).not.toBeInTheDocument();
  });

  it('handles alumni with single name correctly for initials', () => {
    const singleNameAlumni: AlumniProfileInterface = {
      id: '3',
      name: 'Alex',
      graduationYear: 2021,
      achievements: ['Team Member'],
      currentPursuit: 'College Student',
      bio: 'Dedicated team member.'
    };

    render(<AlumniProfile alumni={singleNameAlumni} />);
    
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('handles alumni with multiple names correctly for initials', () => {
    const multipleNameAlumni: AlumniProfileInterface = {
      id: '4',
      name: 'Mary Jane Watson Smith',
      graduationYear: 2020,
      achievements: ['Leadership Award'],
      currentPursuit: 'Engineer',
      bio: 'Exceptional leader.'
    };

    render(<AlumniProfile alumni={multipleNameAlumni} />);
    
    expect(screen.getByText('MJWS')).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<AlumniProfile alumni={mockAlumni} />);
    
    expect(container.firstChild).toHaveClass('alumniCard');
    expect(screen.getByText('Emily Rodriguez')).toHaveClass('alumniName');
    expect(screen.getByText('Computer Science Student at MIT')).toHaveClass('currentPursuit');
  });

  it('renders with minimal required props', () => {
    const minimalAlumni: AlumniProfileInterface = {
      id: '5',
      name: 'Test Alumni',
      graduationYear: 2024,
      achievements: ['Test Achievement'],
      currentPursuit: 'Test Pursuit',
      bio: 'Test bio'
    };

    render(<AlumniProfile alumni={minimalAlumni} />);
    
    expect(screen.getByText('Test Alumni')).toBeInTheDocument();
    expect(screen.getByText('Test Pursuit')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();
    expect(screen.getByText('Test Achievement')).toBeInTheDocument();
    expect(screen.getByText('Class of 2024')).toBeInTheDocument();
  });

  it('handles empty achievements array', () => {
    const alumniWithoutAchievements: AlumniProfileInterface = {
      id: '6',
      name: 'Test Alumni',
      graduationYear: 2024,
      achievements: [],
      currentPursuit: 'Test Pursuit',
      bio: 'Test bio'
    };

    render(<AlumniProfile alumni={alumniWithoutAchievements} />);
    
    expect(screen.getByText('Notable Achievements')).toBeInTheDocument();
    // Should still show the section header but no achievement items
  });

  it('renders multiple achievements as list items', () => {
    render(<AlumniProfile alumni={mockAlumni} />);
    
    const achievementsList = screen.getByRole('list');
    expect(achievementsList).toBeInTheDocument();
    
    const achievementItems = screen.getAllByRole('listitem');
    expect(achievementItems).toHaveLength(4);
  });
});