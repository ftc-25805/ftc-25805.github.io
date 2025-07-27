import type { TeamMemberProps } from '@site/src/components/TeamMember';

/**
 * Team member data for FTC Team 25805
 */
export const teamMembers: TeamMemberProps[] = [
  {
    name: "Alex Johnson",
    role: "Team Captain & Lead Programmer",
    grade: 11,
    bio: "Passionate about robotics and software development. Leads our programming team and coordinates competition strategy. Has 3 years of FTC experience and mentors younger team members.",
    image: "/img/team-placeholder.svg",
    specialties: ["Java Programming", "Autonomous Development", "Team Leadership", "Strategy Planning"],
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "alex@example.com"
    },
    isLead: true
  },
  {
    name: "Sarah Chen",
    role: "Mechanical Team Lead",
    grade: 12,
    bio: "Expert in CAD design and mechanical engineering. Leads the design and construction of our robot mechanisms. Specializes in innovative solutions for complex engineering challenges.",
    image: "/img/team-placeholder.svg", 
    specialties: ["CAD Design", "Mechanical Engineering", "3D Printing", "Precision Manufacturing"],
    social: {
      linkedin: "https://linkedin.com",
      email: "sarah@example.com"
    },
    isLead: true
  },
  {
    name: "Marcus Rodriguez",
    role: "Outreach Team Lead",
    grade: 10,
    bio: "Coordinates community outreach programs and STEM education initiatives. Passionate about inspiring younger students to pursue engineering and technology careers.",
    image: "/img/team-placeholder.svg",
    specialties: ["Public Speaking", "Event Planning", "STEM Education", "Community Engagement"],
    social: {
      email: "marcus@example.com"
    },
    isLead: true
  },
  {
    name: "Emily Watson",
    role: "Business Team Lead",
    grade: 11,
    bio: "Manages team finances, sponsor relationships, and documentation. Ensures our team operates efficiently and maintains strong partnerships with our supporters.",
    image: "/img/team-placeholder.svg",
    specialties: ["Fundraising", "Sponsor Relations", "Financial Management", "Technical Writing"],
    social: {
      linkedin: "https://linkedin.com",
      email: "emily@example.com"
    },
    isLead: true
  },
  {
    name: "David Kim",
    role: "Vision Systems Developer",
    grade: 10,
    bio: "Specializes in computer vision and autonomous navigation systems. Develops advanced algorithms for object detection and field navigation.",
    image: "/img/team-placeholder.svg",
    specialties: ["Computer Vision", "OpenCV", "Machine Learning", "Sensor Integration"],
    social: {
      github: "https://github.com",
      portfolio: "https://portfolio.example.com"
    }
  },
  {
    name: "Jessica Park",
    role: "Drive Team Member",
    grade: 9,
    bio: "Skilled robot operator and strategy specialist. Excels in teleoperated control and works closely with alliance partners during competitions.",
    image: "/img/team-placeholder.svg",
    specialties: ["Robot Operation", "Game Strategy", "Alliance Coordination", "Performance Analysis"],
    social: {
      email: "jessica@example.com"
    }
  },
  {
    name: "Ryan Thompson",
    role: "CAD Specialist", 
    grade: 12,
    bio: "Creates detailed 3D models and technical drawings for all robot components. Ensures precision in design and manufacturability of parts.",
    image: "/img/team-placeholder.svg",
    specialties: ["SolidWorks", "3D Modeling", "Technical Drawing", "Design Optimization"],
    social: {
      portfolio: "https://portfolio.example.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    name: "Maya Patel",
    role: "Electronics Specialist",
    grade: 11,
    bio: "Handles wiring, sensors, and electronic integration. Ensures reliable electrical systems and troubleshoots electronic issues during competitions.",
    image: "/img/team-placeholder.svg",
    specialties: ["Circuit Design", "Sensor Integration", "Troubleshooting", "System Testing"],
    social: {
      email: "maya@example.com"
    }
  }
];

/**
 * Get team leads
 */
export function getTeamLeads(): TeamMemberProps[] {
  return teamMembers.filter(member => member.isLead);
}

/**
 * Get team members by role
 */
export function getTeamMembersByRole(role: string): TeamMemberProps[] {
  return teamMembers.filter(member => member.role.toLowerCase().includes(role.toLowerCase()));
}

/**
 * Get all team members
 */
export function getAllTeamMembers(): TeamMemberProps[] {
  return teamMembers;
}

/**
 * Get team member by name
 */
export function getTeamMemberByName(name: string): TeamMemberProps | undefined {
  return teamMembers.find(member => member.name.toLowerCase() === name.toLowerCase());
}