import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamMemberProfile, { TeamMemberProfile as TeamMemberProfileInterface } from './index';

describe('TeamMemberProfile', () => {
  const mockMember: TeamMemberProfileInterface = {
    id: '1',
    name: 'John Doe',
    role: 'Lead Programmer',
    bio: 'Passionate about robotics and programming. Specializes in autonomous navigation systems.',
    photoUrl: '/img/team/john-doe.jpg',
    skills: ['Java', 'Android Studio', 'Robot Programming'],
    joinDate: 'September 2023'
  };

  const mockMemberWithoutPhoto: TeamMemberProfileInterface = {
    id: '2',
    name: 'Jane Smith',
    role: 'Mechanical Engineer',
    bio: 'Expert in robot design and mechanical systems.',
  };

  it('renders member profile with all information', () => {
    render(<TeamMemberProfile member={mockMember} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Lead Programmer')).toBeInTheDocument();
    expect(screen.getByText('Passionate about robotics and programming. Specializes in autonomous navigation systems.')).toBeInTheDocument();
    expect(screen.getByText('Team member since: September 2023')).toBeInTheDocument();
  });

  it('renders member photo with correct alt text', () => {
    render(<TeamMemberProfile member={mockMember} />);
    
    const photo = screen.getByAltText('John Doe profile photo');
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', '/img/team/john-doe.jpg');
  });

  it('renders skills section when skills are provided', () => {
    render(<TeamMemberProfile member={mockMember} />);
    
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('Android Studio')).toBeInTheDocument();
    expect(screen.getByText('Robot Programming')).toBeInTheDocument();
  });

  it('renders placeholder photo with initials when no photo URL is provided', () => {
    render(<TeamMemberProfile member={mockMemberWithoutPhoto} />);
    
    expect(screen.getByText('JS')).toBeInTheDocument();
    expect(screen.queryByAltText(/profile photo/)).not.toBeInTheDocument();
  });

  it('does not render skills section when no skills are provided', () => {
    render(<TeamMemberProfile member={mockMemberWithoutPhoto} />);
    
    expect(screen.queryByText('Skills')).not.toBeInTheDocument();
  });

  it('does not render join date when not provided', () => {
    render(<TeamMemberProfile member={mockMemberWithoutPhoto} />);
    
    expect(screen.queryByText(/Team member since/)).not.toBeInTheDocument();
  });

  it('handles members with single name correctly for initials', () => {
    const singleNameMember: TeamMemberProfileInterface = {
      id: '3',
      name: 'Alex',
      role: 'Designer',
      bio: 'Creative designer with a passion for user experience.',
    };

    render(<TeamMemberProfile member={singleNameMember} />);
    
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('handles members with multiple names correctly for initials', () => {
    const multipleNameMember: TeamMemberProfileInterface = {
      id: '4',
      name: 'Mary Jane Watson',
      role: 'Outreach Coordinator',
      bio: 'Dedicated to community engagement and education.',
    };

    render(<TeamMemberProfile member={multipleNameMember} />);
    
    expect(screen.getByText('MJW')).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<TeamMemberProfile member={mockMember} />);
    
    expect(container.firstChild).toHaveClass('memberCard');
    expect(screen.getByText('John Doe')).toHaveClass('memberName');
    expect(screen.getByText('Lead Programmer')).toHaveClass('memberRole');
  });

  it('renders with minimal required props', () => {
    const minimalMember: TeamMemberProfileInterface = {
      id: '5',
      name: 'Test User',
      role: 'Test Role',
      bio: 'Test bio',
    };

    render(<TeamMemberProfile member={minimalMember} />);
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Test Role')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();
  });
});