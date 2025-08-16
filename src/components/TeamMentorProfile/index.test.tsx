import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamMentorProfile, { MentorProfile } from './index';

describe('TeamMentorProfile', () => {
  const mockMentor: MentorProfile = {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Senior Software Engineer at TechCorp',
    bio: 'Experienced mentor with 15 years in robotics and software development. Passionate about helping students learn programming and engineering principles.',
    photoUrl: '/img/mentors/sarah-johnson.jpg',
    expertise: ['Java Programming', 'Robot Control Systems', 'Software Architecture', 'Mentoring'],
    yearsWithTeam: 3
  };

  const mockMentorWithoutPhoto: MentorProfile = {
    id: '2',
    name: 'Mike Chen',
    title: 'Mechanical Engineer',
    bio: 'Expert in mechanical design and fabrication.',
    expertise: ['CAD Design', 'Manufacturing'],
    yearsWithTeam: 1
  };

  it('renders mentor profile with all information', () => {
    render(<TeamMentorProfile mentor={mockMentor} />);
    
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Senior Software Engineer at TechCorp')).toBeInTheDocument();
    expect(screen.getByText('Experienced mentor with 15 years in robotics and software development. Passionate about helping students learn programming and engineering principles.')).toBeInTheDocument();
    expect(screen.getByText('3 years with the team')).toBeInTheDocument();
  });

  it('renders mentor badge', () => {
    render(<TeamMentorProfile mentor={mockMentor} />);
    
    expect(screen.getByText('Mentor')).toBeInTheDocument();
  });

  it('renders mentor photo with correct alt text', () => {
    render(<TeamMentorProfile mentor={mockMentor} />);
    
    const photo = screen.getByAltText('Dr. Sarah Johnson profile photo');
    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute('src', '/img/mentors/sarah-johnson.jpg');
  });

  it('renders expertise section with all areas', () => {
    render(<TeamMentorProfile mentor={mockMentor} />);
    
    expect(screen.getByText('Areas of Expertise')).toBeInTheDocument();
    expect(screen.getByText('Java Programming')).toBeInTheDocument();
    expect(screen.getByText('Robot Control Systems')).toBeInTheDocument();
    expect(screen.getByText('Software Architecture')).toBeInTheDocument();
    expect(screen.getByText('Mentoring')).toBeInTheDocument();
  });

  it('renders placeholder photo with initials when no photo URL is provided', () => {
    render(<TeamMentorProfile mentor={mockMentorWithoutPhoto} />);
    
    expect(screen.getByText('MC')).toBeInTheDocument();
    expect(screen.queryByAltText(/profile photo/)).not.toBeInTheDocument();
  });

  it('handles singular year correctly', () => {
    render(<TeamMentorProfile mentor={mockMentorWithoutPhoto} />);
    
    expect(screen.getByText('1 year with the team')).toBeInTheDocument();
  });

  it('handles plural years correctly', () => {
    render(<TeamMentorProfile mentor={mockMentor} />);
    
    expect(screen.getByText('3 years with the team')).toBeInTheDocument();
  });

  it('handles mentors with single name correctly for initials', () => {
    const singleNameMentor: MentorProfile = {
      id: '3',
      name: 'Alex',
      title: 'Engineering Consultant',
      bio: 'Specialist in robotics design.',
      expertise: ['Design'],
      yearsWithTeam: 2
    };

    render(<TeamMentorProfile mentor={singleNameMentor} />);
    
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('handles mentors with multiple names correctly for initials', () => {
    const multipleNameMentor: MentorProfile = {
      id: '4',
      name: 'Mary Jane Watson Smith',
      title: 'Technical Advisor',
      bio: 'Experienced technical mentor.',
      expertise: ['Technical Leadership'],
      yearsWithTeam: 5
    };

    render(<TeamMentorProfile mentor={multipleNameMentor} />);
    
    expect(screen.getByText('MJWS')).toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<TeamMentorProfile mentor={mockMentor} />);
    
    expect(container.firstChild).toHaveClass('mentorCard');
    expect(screen.getByText('Dr. Sarah Johnson')).toHaveClass('mentorName');
    expect(screen.getByText('Senior Software Engineer at TechCorp')).toHaveClass('mentorTitle');
  });

  it('renders with minimal required props', () => {
    const minimalMentor: MentorProfile = {
      id: '5',
      name: 'Test Mentor',
      title: 'Test Title',
      bio: 'Test bio',
      expertise: ['Test Skill'],
      yearsWithTeam: 1
    };

    render(<TeamMentorProfile mentor={minimalMentor} />);
    
    expect(screen.getByText('Test Mentor')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();
    expect(screen.getByText('Test Skill')).toBeInTheDocument();
  });

  it('handles empty expertise array', () => {
    const mentorWithoutExpertise: MentorProfile = {
      id: '6',
      name: 'Test Mentor',
      title: 'Test Title',
      bio: 'Test bio',
      expertise: [],
      yearsWithTeam: 1
    };

    render(<TeamMentorProfile mentor={mentorWithoutExpertise} />);
    
    expect(screen.getByText('Areas of Expertise')).toBeInTheDocument();
    // Should still show the section header but no expertise tags
  });
});