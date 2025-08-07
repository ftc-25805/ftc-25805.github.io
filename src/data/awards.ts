/**
 * Award-focused data models for FTC Team 25805
 * Structured to align with FTC award criteria and judging requirements
 */

export interface AwardCriteria {
  name: string;
  description: string;
  keyPoints: string[];
  evidenceTypes: string[];
  judgingFocus: string[];
}

export interface DesignIteration {
  id: string;
  title: string;
  date: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  images: string[];
  cadModels?: string[];
  testData?: TestResult[];
}

export interface TestResult {
  testName: string;
  date: string;
  parameters: Record<string, any>;
  results: Record<string, any>;
  conclusion: string;
  nextSteps: string[];
}

export interface OutreachEvent {
  id: string;
  title: string;
  date: string;
  type: 'workshop' | 'presentation' | 'volunteer' | 'mentor' | 'camp' | 'demo';
  audience: string;
  location: string;
  participantsReached: number;
  description: string;
  activities: string[];
  outcomes: string[];
  followUp?: string;
  images: string[];
  testimonials?: Testimonial[];
  impact?: ImpactMetrics;
}

export interface ImpactMetrics {
  preEvent: {
    stemInterest: number;
    roboticsKnowledge: number;
    programAwareness: number;
  };
  postEvent: {
    stemInterest: number;
    roboticsKnowledge: number;
    programAwareness: number;
  };
  followUpActions: string[];
  longTermOutcomes: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  organization?: string;
  content: string;
  date: string;
  type: 'student' | 'parent' | 'educator' | 'mentor' | 'sponsor' | 'community';
  relatedEvent?: string;
}

export interface Achievement {
  id: string;
  title: string;
  award?: string;
  competition?: string;
  date: string;
  description: string;
  significance: string;
  teamContribution: string;
  evidence: string[];
}

export interface Partnership {
  id: string;
  organization: string;
  type: 'sponsor' | 'mentor' | 'facility' | 'community' | 'educational';
  relationship: string;
  startDate: string;
  contributions: string[];
  impact: string;
  collaborationExamples: string[];
  testimonial?: Testimonial;
}

export interface TeamValue {
  name: string;
  description: string;
  examples: TeamValueExample[];
}

export interface TeamValueExample {
  situation: string;
  action: string;
  outcome: string;
  impact: string;
  date: string;
  participants: string[];
}

/**
 * FTC Award Criteria Database
 */
export const awardCriteria: Record<string, AwardCriteria> = {
  inspire: {
    name: "Inspire Award",
    description: "The most prestigious FTC award recognizing a team that embodies the FIRST ideals of sportsmanship and commitment to FIRST values.",
    keyPoints: [
      "Exceptional team performance in all areas",
      "Strong community outreach and FIRST program promotion",
      "Gracious Professionalism and positive team culture", 
      "Effective collaboration and mentorship",
      "Clear documentation and presentation of achievements"
    ],
    evidenceTypes: [
      "Community outreach documentation",
      "Team culture and values examples",
      "Mentorship and collaboration evidence",
      "Competition performance records",
      "Comprehensive team portfolio"
    ],
    judgingFocus: [
      "Overall team excellence and impact",
      "Commitment to FIRST values",
      "Community engagement depth",
      "Team sustainability and growth",
      "Leadership and mentorship qualities"
    ]
  },
  think: {
    name: "Think Award",
    description: "Recognizes a team that best reflects the team's journey in the engineering design process.",
    keyPoints: [
      "Clear documentation of engineering design process",
      "Iterative design approach with evidence",
      "Problem identification and solution development",
      "Testing, validation, and continuous improvement",
      "Creative and innovative thinking"
    ],
    evidenceTypes: [
      "Engineering notebook documentation",
      "Design iteration examples",
      "Testing data and analysis",
      "CAD models and technical drawings",
      "Problem-solving methodology"
    ],
    judgingFocus: [
      "Engineering process documentation quality",
      "Design iteration and improvement",
      "Scientific method application",
      "Creative problem-solving approach",
      "Technical depth and understanding"
    ]
  },
  connect: {
    name: "Connect Award",
    description: "Recognizes a team that connects with their local science, technology, engineering, and mathematics community.",
    keyPoints: [
      "Meaningful STEM community connections",
      "Measurable outreach impact",
      "Sustainable community partnerships",
      "Educational program development",
      "Long-term community engagement"
    ],
    evidenceTypes: [
      "Quantified outreach metrics",
      "Community partnership documentation",
      "Educational program materials",
      "Impact measurement data",
      "Testimonials from community partners"
    ],
    judgingFocus: [
      "Breadth and depth of community connections",
      "Measurable impact on STEM education",
      "Sustainability of programs and partnerships",
      "Innovation in outreach approaches",
      "Growth and expansion of initiatives"
    ]
  },
  design: {
    name: "Design Award",
    description: "Recognizes design elements of a robot that are both functional and aesthetic.",
    keyPoints: [
      "Elegant and functional robot design",
      "Clear design documentation",
      "Manufacturing and assembly quality",
      "Innovative mechanical solutions",
      "Design process methodology"
    ],
    evidenceTypes: [
      "CAD models and technical drawings",
      "Design rationale documentation",
      "Manufacturing process records",
      "Testing and performance data",
      "Design evolution timeline"
    ],
    judgingFocus: [
      "Design elegance and functionality",
      "Manufacturing quality and precision",
      "Innovation in mechanical solutions",
      "Documentation completeness",
      "Design process rigor"
    ]
  },
  motivate: {
    name: "Motivate Award", 
    description: "Recognizes a team that embraces the culture of FIRST and clearly shows what it means to be a team.",
    keyPoints: [
      "Strong team culture and identity",
      "Promotion of FIRST values and programs",
      "Team growth and development",
      "Positive influence on other teams",
      "Commitment to Gracious Professionalism"
    ],
    evidenceTypes: [
      "Team culture documentation",
      "FIRST program promotion activities",
      "Team growth and development records",
      "Collaboration with other teams",
      "Community and competition behavior"
    ],
    judgingFocus: [
      "Team culture strength and positivity",
      "FIRST program advocacy",
      "Team member development",
      "Positive community impact",
      "Gracious Professionalism examples"
    ]
  }
};

/**
 * Team Values aligned with FIRST Core Values
 */
export const teamValues: TeamValue[] = [
  {
    name: "Gracious Professionalism",
    description: "Competing with respect, kindness, and helping others achieve their best.",
    examples: [
      {
        situation: "Alliance partner's robot broke during elimination match",
        action: "Offered our backup parts and helped with repairs during break",
        outcome: "Alliance partner returned to competition, we advanced together",
        impact: "Strengthened regional robotics community, demonstrated FIRST values",
        date: "2024-02-15",
        participants: ["Sarah Chen", "Alex Johnson", "Emily Watson"]
      }
    ]
  },
  {
    name: "Coopertition",
    description: "Cooperative competition where teams help each other succeed while competing.",
    examples: [
      {
        situation: "New team struggling with programming basics at competition",
        action: "Spent pit time teaching basic autonomous programming concepts",
        outcome: "New team successfully ran autonomous routine in next match",
        impact: "Fostered growth of regional FTC program, gained mentoring experience",
        date: "2024-01-20",
        participants: ["David Kim", "Marcus Rodriguez"]
      }
    ]
  },
  {
    name: "Innovation",
    description: "Creative problem-solving and continuous improvement in all aspects.",
    examples: [
      {
        situation: "Standard intake designs ineffective for game pieces",
        action: "Developed novel mechanism combining concepts from multiple engineering disciplines",
        outcome: "Achieved 95% intake success rate, influenced other teams' designs",
        impact: "Advanced regional technical innovation, shared design openly",
        date: "2024-11-10",
        participants: ["Ryan Thompson", "Maya Patel", "Jessica Park"]
      }
    ]
  }
];

/**
 * Current season achievements and evidence
 */
export const currentAchievements: Achievement[] = [
  {
    id: "think-award-2024",
    title: "Think Award Winner",
    award: "Think Award", 
    competition: "Regional Championship 2024",
    date: "2024-03-15",
    description: "Recognized for exceptional engineering design process documentation and innovative problem-solving approach.",
    significance: "First major award for Team 25805, validates our systematic engineering approach",
    teamContribution: "Entire team contributed through rigorous documentation, iterative design, and comprehensive testing",
    evidence: [
      "Detailed engineering notebook with 147 pages",
      "15 documented design iterations with test data",
      "CAD models showing evolution of design",
      "Performance testing results and analysis"
    ]
  },
  {
    id: "outreach-impact-2024",
    title: "Community STEM Education Impact",
    date: "2024-09-01",
    description: "Reached over 800 students through comprehensive outreach programs across 12 schools and 5 community centers",
    significance: "Demonstrates significant community impact and Connect Award potential",
    teamContribution: "Coordinated team effort with specialized outreach sub-teams and educational material development",
    evidence: [
      "Documented visits to 12 partner schools",
      "Post-event surveys showing 73% increase in STEM interest",
      "5 ongoing educational partnerships established",
      "Educational curriculum materials developed and distributed"
    ]
  }
];

/**
 * Sample outreach events with detailed impact documentation
 */
export const outreachEvents: OutreachEvent[] = [
  {
    id: "oak-elementary-visit-2024",
    title: "Oak Elementary School STEM Day",
    date: "2024-10-15",
    type: "presentation",
    audience: "Grades 3-5 (120 students)",
    location: "Oak Elementary School, Richmond, VA",
    participantsReached: 120,
    description: "Interactive robotics demonstration and hands-on activities introducing elementary students to engineering concepts",
    activities: [
      "Robot demonstration showing autonomous and teleop capabilities",
      "Simple programming activity using block-based interface", 
      "Engineering challenge: build tallest tower with limited materials",
      "Q&A session about robotics and engineering careers"
    ],
    outcomes: [
      "98% of students reported increased interest in robotics",
      "15 students expressed interest in joining after-school STEM club",
      "3 teachers requested follow-up workshops for deeper integration",
      "School invited team back for Science Fair judging"
    ],
    followUp: "Scheduled monthly visits for remainder of school year, developed take-home activity packets",
    images: [
      "/img/outreach/oak-elementary-demo.jpg",
      "/img/outreach/oak-elementary-students.jpg",
      "/img/outreach/oak-elementary-activities.jpg"
    ],
    testimonials: [
      {
        id: "oak-teacher-feedback",
        author: "Mrs. Jennifer Martinez",
        role: "5th Grade Science Teacher",
        organization: "Oak Elementary School",
        content: "The FTC team's presentation was incredibly engaging and age-appropriate. My students haven't stopped talking about robotics since their visit. Several have started asking about engineering careers!",
        date: "2024-10-16",
        type: "educator",
        relatedEvent: "oak-elementary-visit-2024"
      }
    ],
    impact: {
      preEvent: {
        stemInterest: 45,
        roboticsKnowledge: 12,
        programAwareness: 8
      },
      postEvent: {
        stemInterest: 89,
        roboticsKnowledge: 67,
        programAwareness: 78
      },
      followUpActions: [
        "Monthly STEM club visits scheduled",
        "Teacher training workshop planned",
        "After-school robotics club formation support"
      ],
      longTermOutcomes: [
        "3 students joined middle school FLL team",
        "School integrated robotics into science curriculum",
        "Annual STEM day partnership established"
      ]
    }
  }
];

/**
 * Design iterations for Think Award documentation
 */
export const designIterations: DesignIteration[] = [
  {
    id: "intake-mechanism-v3",
    title: "Intake Mechanism Redesign - Version 3",
    date: "2024-11-15",
    description: "Complete redesign of game piece intake system based on competition analysis and testing data",
    challenge: "Version 2 intake had 67% success rate, inconsistent performance with different game piece orientations, and frequent jamming issues",
    solution: "Implemented dual-stage intake with compliant wheels and active positioning system using servo-controlled guides",
    results: "Achieved 95% success rate across all game piece orientations, eliminated jamming, reduced cycle time by 40%",
    images: [
      "/img/robot/intake-v3-cad.jpg", 
      "/img/robot/intake-v3-prototype.jpg",
      "/img/robot/intake-v3-testing.jpg"
    ],
    cadModels: [
      "https://cad.onshape.com/documents/abc123/v/def456/e/ghi789"
    ],
    testData: [
      {
        testName: "Intake Success Rate",
        date: "2024-11-20",
        parameters: {
          gamepiece_orientations: 8,
          trials_per_orientation: 25,
          robot_approach_angles: [0, 15, 30, 45]
        },
        results: {
          overall_success_rate: 0.95,
          orientation_variance: 0.03,
          average_cycle_time: 2.1
        },
        conclusion: "Design meets performance requirements with consistent results",
        nextSteps: [
          "Competition validation testing",
          "Driver training on optimal approach",
          "Backup mechanism preparation"
        ]
      }
    ]
  }
];

/**
 * Partnership and sponsor relationships
 */
export const partnerships: Partnership[] = [
  {
    id: "leidos-partnership",
    organization: "Leidos",
    type: "sponsor",
    relationship: "Title Sponsor and Engineering Mentorship",
    startDate: "2023-08-01",
    contributions: [
      "$15,000 annual funding for equipment and competition fees",
      "Weekly mentorship sessions with professional engineers",
      "Access to professional-grade software licenses",
      "Facility access for advanced manufacturing projects"
    ],
    impact: "Enabled advanced robot capabilities, professional development for team members, and sustainable funding model",
    collaborationExamples: [
      "Joint presentation at National Engineers Week",
      "Student internship program development",
      "Technical review sessions for robot design",
      "Professional development workshops for team members"
    ],
    testimonial: {
      id: "leidos-testimonial",
      author: "Dr. Michael Chen",
      role: "Senior Systems Engineer",
      organization: "Leidos",
      content: "Partnering with FTC Team 25805 has been incredibly rewarding. The students' enthusiasm and technical growth over the past year has been remarkable. They approach problems with true engineering mindset and aren't afraid to iterate and improve.",
      date: "2024-12-01",
      type: "sponsor"
    }
  }
];

/**
 * Load award-focused data
 */
export function getAwardEvidence(awardType: keyof typeof awardCriteria) {
  const criteria = awardCriteria[awardType];
  
  // Filter relevant data based on award type
  switch (awardType) {
    case 'think':
      return {
        criteria,
        designIterations,
        achievements: currentAchievements.filter(a => a.award === 'Think Award'),
        testResults: designIterations.flatMap(d => d.testData || [])
      };
    
    case 'connect':
      return {
        criteria,
        outreachEvents,
        partnerships: partnerships.filter(p => p.type === 'community' || p.type === 'educational'),
        impact: outreachEvents.reduce((total, event) => total + event.participantsReached, 0)
      };
      
    case 'inspire':
      return {
        criteria,
        achievements: currentAchievements,
        teamValues,
        outreachEvents,
        partnerships,
        designIterations
      };
      
    case 'design':
      return {
        criteria,
        designIterations,
        testResults: designIterations.flatMap(d => d.testData || [])
      };
      
    case 'motivate':
      return {
        criteria,
        teamValues,
        achievements: currentAchievements.filter(a => a.title.includes('Community') || a.title.includes('Culture'))
      };
      
    default:
      return { criteria };
  }
}

export default {
  awardCriteria,
  teamValues,
  currentAchievements,
  outreachEvents,
  designIterations,
  partnerships,
  getAwardEvidence
};