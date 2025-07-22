import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import RobotCard from '@site/src/components/RobotCard';
import TeamMember from '@site/src/components/TeamMember';
import CompetitionResults from '@site/src/components/CompetitionResults';
import ProgressTimeline from '@site/src/components/ProgressTimeline';
import SponsorShowcase from '@site/src/components/SponsorShowcase';
import FTCCodeBlock from '@site/src/components/FTCCodeBlock';
import ImageGallery from '@site/src/components/ImageGallery';
import AwardShowcase from '@site/src/components/AwardShowcase';
import TechnicalNotebook from '@site/src/components/TechnicalNotebook';
import GameElementDemo from '@site/src/components/GameElementDemo';

export default function Showcase(): ReactNode {
  // Sample data for demonstration
  const sampleRobot = {
    name: "Phoenix",
    season: "2023-24",
    image: "/img/robot-placeholder.svg",
    description: "Our competition robot for the CENTERSTAGE season. Features a precision claw mechanism, reliable autonomous routines, and excellent maneuverability.",
    achievements: [
      "Regional Championship Qualifier",
      "Think Award Winner",
      "Alliance Captain at 2 tournaments"
    ],
    specs: {
      drivebase: "Mecanum wheels with REV HD Hex Motors",
      programming: "Java with FTC SDK",
      sensors: ["IMU", "Color Sensors", "Distance Sensors", "Camera"],
      specialFeatures: [
        "Automated pixel placement system",
        "Vision-guided autonomous navigation",
        "Advanced alliance cooperation protocols"
      ]
    },
    buildLogUrl: "/docs/intro",
    videoUrl: "https://youtube.com"
  };

  const sampleTeamMember = {
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
  };

  const sampleCompetition = {
    competition: "Regional Championship",
    date: "March 15, 2024",
    location: "Local High School",
    rank: 8,
    totalTeams: 32,
    record: {
      wins: 6,
      losses: 2,
      ties: 0
    },
    awards: [
      {
        name: "Think Award",
        description: "For outstanding engineering design and documentation"
      }
    ],
    matches: [
      {
        number: 1,
        alliance: 'red' as const,
        partners: ["Team 12345", "Team 67890"],
        opponents: ["Team 11111", "Team 22222"],
        score: { team: 125, opponent: 98 },
        result: 'win' as const
      },
      {
        number: 2,
        alliance: 'blue' as const,
        partners: ["Team 33333", "Team 44444"],
        opponents: ["Team 55555", "Team 66666"],
        score: { team: 89, opponent: 112 },
        result: 'loss' as const
      },
      {
        number: 3,
        alliance: 'red' as const,
        partners: ["Team 77777", "Team 88888"],
        opponents: ["Team 99999", "Team 10101"],
        score: { team: 134, opponent: 87 },
        result: 'win' as const
      }
    ],
    highlights: [
      "Achieved highest autonomous score of the tournament",
      "Perfect alliance cooperation in elimination rounds",
      "Robot performed flawlessly with zero technical failures"
    ],
    videos: ["https://youtube.com/watch1", "https://youtube.com/watch2"]
  };

  const sampleAwards = [
    {
      id: '1',
      name: 'Think Award',
      season: '2023-24',
      competition: 'Regional Championship',
      date: '2024-03-15',
      level: 'regional' as const,
      category: 'judged' as const,
      description: 'Awarded to the team whose robot design shows the most creative and thoughtful engineering process.',
      significance: 'This award recognizes our comprehensive engineering notebook documentation and innovative autonomous routines.',
      teamRole: 'Lead recognition for our engineering design process and documentation excellence.',
      certificate: '/docs/awards/think-award-2024.pdf'
    },
    {
      id: '2',
      name: 'Alliance Captain',
      season: '2023-24',
      competition: 'League Tournament #2',
      date: '2024-02-10',
      level: 'tournament' as const,
      category: 'performance' as const,
      description: 'Selected as first alliance captain for elimination rounds based on ranking performance.',
      significance: 'Demonstrates consistent high performance and strategic gameplay throughout qualification matches.',
      teamRole: 'Alliance captain with 6-2 qualification record, leading our alliance to semifinal rounds.'
    },
    {
      id: '3',
      name: 'Connect Award',
      season: '2022-23',
      competition: 'State Championship',
      date: '2023-04-08',
      level: 'state' as const,
      category: 'outreach' as const,
      description: 'Recognizes a team that connects with their community through their enthusiasm for FIRST.',
      significance: 'Awarded for our extensive community outreach program including STEM workshops for elementary students.',
      teamRole: 'Led 12 community outreach events reaching over 300 students in local schools.',
      image: '/img/connect-award-ceremony.jpg'
    }
  ];

  const sampleNotebookEntries = [
    {
      id: '1',
      date: '2024-11-15',
      title: 'Autonomous Routine Testing Results',
      category: 'testing' as const,
      author: 'Sarah Chen',
      content: 'Today we conducted comprehensive testing of our autonomous routines on the competition field setup. We tested three different approach strategies for the specimen scoring.\n\nResults:\n- Strategy A (Vision-guided): 85% success rate, average time 28.5 seconds\n- Strategy B (Encoder-based): 92% success rate, average time 31.2 seconds  \n- Strategy C (Hybrid): 88% success rate, average time 29.8 seconds\n\nStrategy B shows the most consistent results, though slightly slower. We recommend implementing Strategy B as our primary autonomous with Strategy C as backup.',
      images: ['/img/auto-test-field.jpg', '/img/auto-results-chart.png'],
      attachments: [
        {
          name: 'Autonomous Test Data.xlsx',
          url: '/data/auto-test-results-nov15.xlsx',
          type: 'data' as const
        }
      ],
      tags: ['autonomous', 'testing', 'specimens', 'vision'],
      status: 'approved' as const
    },
    {
      id: '2',
      date: '2024-11-10',
      title: 'Intake Mechanism Design Review',
      category: 'design' as const,
      author: 'Marcus Rodriguez',
      content: 'Design review for our sample intake mechanism. The current prototype uses a combination of compliant wheels and surgical tubing to effectively grab and manipulate game elements.\n\nKey Design Features:\n- Variable compression system for different sample types\n- Quick-release mechanism for scoring\n- Integration with existing elevator system\n\nNext steps: Finalize CAD model and prepare for manufacturing.',
      images: ['/img/intake-prototype.jpg'],
      attachments: [
        {
          name: 'Intake_Mechanism_v3.step',
          url: '/cad/intake-v3.step',
          type: 'cad' as const
        },
        {
          name: 'Design Requirements.pdf',
          url: '/docs/intake-requirements.pdf',
          type: 'document' as const
        }
      ],
      tags: ['intake', 'design', 'cad', 'mechanisms'],
      status: 'review' as const
    },
    {
      id: '3',
      date: '2024-11-05',
      title: 'Team Strategy Meeting - Game Analysis',
      category: 'meeting' as const,
      author: 'Alex Johnson',
      content: 'Weekly strategy meeting focused on analyzing the current game and developing our competition strategy.\n\nKey Discussion Points:\n- Scoring priorities: Specimens vs Samples\n- Alliance cooperation strategies\n- Endgame hanging mechanism requirements\n- Time allocation during autonomous and teleoperated periods\n\nDecisions made: Focus on specimen scoring for higher points, develop reliable hanging mechanism for endgame.',
      tags: ['strategy', 'game-analysis', 'alliance', 'endgame'],
      status: 'implemented' as const
    }
  ];

  const sampleGameElements = [
    {
      id: '1',
      name: 'Sample',
      type: 'scoring' as const,
      description: 'Cube-shaped scoring element that can be picked up by robots and placed in scoring areas for points.',
      image: '/img/sample-element.svg',
      points: {
        autonomous: 6,
        teleoperated: 4,
        endgame: 0
      },
      rules: [
        'Samples must be fully supported by the scoring area to count',
        'Maximum of 3 samples can be scored in the observation zone',
        'Samples cannot be possessed for more than 30 seconds'
      ],
      strategies: [
        'Prioritize sample collection during autonomous for higher points',
        'Use vision systems to identify and track sample locations',
        'Develop reliable intake mechanism for consistent pickup'
      ],
      dimensions: {
        length: '3.5 inches',
        width: '3.5 inches',
        height: '3.5 inches',
        weight: '4.0 oz'
      },
      materials: ['Foam', 'Plastic coating', 'Reflective tape'],
      interactions: ['Specimens', 'Baskets', 'Observation zone']
    },
    {
      id: '2',
      name: 'Specimen',
      type: 'scoring' as const,
      description: 'Elongated scoring element designed to hang on the submersible or be placed in specific scoring positions.',
      image: '/img/specimen-element.svg',
      points: {
        autonomous: 10,
        teleoperated: 6,
        endgame: 0
      },
      rules: [
        'Specimens must be hung completely above the chamber wall',
        'Only one robot can score specimens at a time per alliance',
        'Specimens cannot be moved once properly scored'
      ],
      strategies: [
        'Focus on specimen scoring for maximum point potential',
        'Develop precise hanging mechanism for consistent scoring',
        'Practice coordination with alliance partners for chamber access'
      ],
      dimensions: {
        length: '11.5 inches',
        width: '1.5 inches',
        height: '1.5 inches',
        weight: '1.5 oz'
      },
      materials: ['Plastic tube', 'End caps', 'Hook attachments'],
      interactions: ['Chambers', 'Submersible', 'Alliance coordination']
    },
    {
      id: '3',
      name: 'Submersible',
      type: 'field' as const,
      description: 'Central field element where specimens are hung and robots can ascend for endgame points.',
      image: '/img/submersible-field.svg',
      points: {
        autonomous: 0,
        teleoperated: 0,
        endgame: 6
      },
      rules: [
        'Robots must be fully supported by the submersible rungs',
        'Multiple alliance robots can ascend the same submersible',
        'Ascent must be completed before the match timer expires'
      ],
      strategies: [
        'Design climbing mechanism early in build season',
        'Practice consistent and fast climbing routines',
        'Coordinate with alliance for optimal positioning'
      ],
      dimensions: {
        length: '24 inches',
        width: '24 inches',
        height: '46 inches'
      },
      materials: ['Aluminum frame', 'Polycarbonate panels', 'Steel bars'],
      interactions: ['Ascending robots', 'Specimen hanging', 'Alliance coordination']
    },
    {
      id: '4',
      name: 'Net Zone',
      type: 'field' as const,
      description: 'Scoring area where samples can be placed for points, with higher scoring for the upper basket.',
      rules: [
        'Samples must be completely within the net zone boundaries',
        'Upper basket scores higher than lower basket',
        'Robots cannot contact the net zone structure during scoring'
      ],
      strategies: [
        'Develop accurate shooting mechanism for upper basket',
        'Practice consistent scoring from various field positions',
        'Balance speed vs accuracy for optimal scoring rate'
      ],
      dimensions: {
        length: '18 inches',
        width: '18 inches',
        height: '36 inches'
      },
      materials: ['PVC frame', 'Netting material', 'Mounting hardware'],
      interactions: ['Samples', 'Scoring robots', 'Field boundaries']
    }
  ];

  return (
    <Layout
      title="Component Showcase"
      description="Demonstration of FTC Team 25805 custom React components">
      <div className="container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <h1>Component Showcase</h1>
        <p>This page demonstrates the custom React components built for the FTC Team 25805 website.</p>

        <section style={{ marginTop: '3rem' }}>
          <h2>RobotCard Component</h2>
          <p>Displays robot information with technical specifications, achievements, and media links.</p>
          <RobotCard {...sampleRobot} />
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>TeamMember Component</h2>
          <p>Showcases team member profiles with roles, specialties, and social links.</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TeamMember {...sampleTeamMember} />
          </div>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>CompetitionResults Component</h2>
          <p>Displays competition performance with detailed match results and awards.</p>
          <CompetitionResults {...sampleCompetition} />
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>ProgressTimeline Component</h2>
          <p>Visual timeline for tracking build progress, competition milestones, and team achievements.</p>
          <ProgressTimeline
            title="Build Season Timeline"
            events={[
              {
                id: '1',
                date: '2024-09-07',
                title: 'Game Reveal & Kickoff',
                description: 'Official start of the 2024-25 FTC season with game rules announcement.',
                type: 'milestone',
                status: 'completed'
              },
              {
                id: '2', 
                date: '2024-10-15',
                title: 'Design Review Complete',
                description: 'Finalized robot design and CAD models after extensive prototyping.',
                type: 'build',
                status: 'completed'
              },
              {
                id: '3',
                date: '2024-11-20',
                title: 'First Competition',
                description: 'League Tournament #1 - Testing our robot against other teams.',
                type: 'competition',
                status: 'in-progress'
              }
            ]}
          />
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>SponsorShowcase Component</h2>
          <p>Tiered sponsor display with recognition levels and contribution tracking.</p>
          <SponsorShowcase
            sponsors={[
              {
                id: '1',
                name: 'Tech Innovations Corp',
                logo: '/img/team-placeholder.svg',
                tier: 'title',
                description: 'Leading technology partner supporting STEM education.',
                since: '2023',
                featured: true,
                website: 'https://example.com'
              },
              {
                id: '2',
                name: 'Local Engineering Firm',
                logo: '/img/team-placeholder.svg', 
                tier: 'gold',
                description: 'Providing mentorship and technical expertise.',
                since: '2024'
              }
            ]}
            layout="tiered"
            showDescription={true}
          />
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>FTCCodeBlock Component</h2>
          <p>Enhanced code display specifically designed for FTC programming with syntax highlighting and tips.</p>
          <FTCCodeBlock
            language="java"
            title="Autonomous Drive Example"
            description="Basic autonomous routine for driving forward and turning"
            robotController={true}
            code={`@Autonomous(name="Drive Forward", group="Linear OpMode")
public class DriveForward extends LinearOpMode {
    private DcMotor leftDrive = null;
    private DcMotor rightDrive = null;

    @Override
    public void runOpMode() {
        // Initialize the hardware variables
        leftDrive = hardwareMap.get(DcMotor.class, "left_drive");
        rightDrive = hardwareMap.get(DcMotor.class, "right_drive");
        
        // Set motor directions
        leftDrive.setDirection(DcMotor.Direction.FORWARD);
        rightDrive.setDirection(DcMotor.Direction.REVERSE);
        
        // Wait for the game to start
        waitForStart();
        
        // Drive forward for 3 seconds
        leftDrive.setPower(0.5);
        rightDrive.setPower(0.5);
        sleep(3000);
        
        // Stop motors
        leftDrive.setPower(0);
        rightDrive.setPower(0);
    }
}`}
          />
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>ImageGallery Component</h2>
          <p>Responsive image gallery with lightbox functionality and category filtering.</p>
          <ImageGallery
            title="Robot Build Gallery"
            images={[
              {
                id: '1',
                src: '/img/robot-placeholder.svg',
                alt: 'Robot assembly progress',
                caption: 'Initial robot frame assembly',
                category: 'Build Progress',
                date: '2024-10-15'
              },
              {
                id: '2',
                src: '/img/team-placeholder.svg',
                alt: 'Team working on robot',
                caption: 'Team collaborating on mechanical design',
                category: 'Team Photos',
                date: '2024-10-20'
              },
              {
                id: '3',
                src: '/img/robot-placeholder.svg',
                alt: 'Competition robot',
                caption: 'Completed robot ready for competition',
                category: 'Competitions',
                date: '2024-11-01'
              }
            ]}
            showCategories={true}
            columns={3}
            aspectRatio="landscape"
          />
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>AwardShowcase Component</h2>
          <p>Display team awards and achievements with detailed recognition information and filtering capabilities.</p>
          <AwardShowcase awards={sampleAwards} layout="grid" showFilters={true} showStats={true} />
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>TechnicalNotebook Component</h2>
          <p>Engineering notebook entries with expandable content, attachments, and category filtering.</p>
          <TechnicalNotebook 
            entries={sampleNotebookEntries} 
            layout="journal" 
            showFilters={true} 
            showStats={true}
            entriesPerPage={5}
          />
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>GameElementDemo Component</h2>
          <p>Interactive game element guide with detailed specifications, rules, and strategic information.</p>
          <GameElementDemo 
            elements={sampleGameElements}
            season="2024-25"
            gameName="INTO THE DEEP℠"
            layout="interactive"
            showFilters={true}
            interactive={true}
          />
        </section>

        <section style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--ifm-background-surface-color)', borderRadius: '8px' }}>
          <h2>Phase 4 Component Library</h2>
          <h3>All Components</h3>
          <pre style={{ background: 'var(--ifm-code-background)', padding: '1rem', borderRadius: '4px' }}>
{`// Phase 2 Components
import RobotCard from '@site/src/components/RobotCard';
import TeamMember from '@site/src/components/TeamMember';
import CompetitionResults from '@site/src/components/CompetitionResults';

// Phase 3 Components  
import ProgressTimeline from '@site/src/components/ProgressTimeline';
import SponsorShowcase from '@site/src/components/SponsorShowcase';
import FTCCodeBlock from '@site/src/components/FTCCodeBlock';
import ImageGallery from '@site/src/components/ImageGallery';

// Phase 4 Components
import AwardShowcase from '@site/src/components/AwardShowcase';
import TechnicalNotebook from '@site/src/components/TechnicalNotebook';
import GameElementDemo from '@site/src/components/GameElementDemo';`}
          </pre>
          
          <h3>Advanced Features</h3>
          <ul>
            <li><strong>ProgressTimeline:</strong> Interactive timeline with status tracking, event categorization, and image support</li>
            <li><strong>SponsorShowcase:</strong> Tiered sponsor display with multiple layouts, contribution tracking, and call-to-action</li>
            <li><strong>FTCCodeBlock:</strong> Enhanced code blocks with FTC-specific features, programming tips, and syntax highlighting</li>
            <li><strong>ImageGallery:</strong> Full-featured gallery with lightbox, category filtering, and responsive grid layouts</li>
            <li><strong>AwardShowcase:</strong> Award display with multi-level filtering, statistics, and achievement tracking</li>
            <li><strong>TechnicalNotebook:</strong> Engineering notebook with expandable entries, attachments, and search capabilities</li>
            <li><strong>GameElementDemo:</strong> Interactive game element guide with detailed specifications, rules, and strategies</li>
          </ul>
          
          <h3>Interactive Elements</h3>
          <ul>
            <li>Lightbox modals with keyboard navigation</li>
            <li>Category filtering and search</li>
            <li>Hover animations and transitions</li>
            <li>Mobile-optimized touch interactions</li>
          </ul>
          
          <h3>Accessibility & Performance</h3>
          <ul>
            <li>WCAG 2.1 AA compliant with screen reader support</li>
            <li>Keyboard navigation and focus management</li>
            <li>Optimized for performance with lazy loading</li>
            <li>Dark mode support across all components</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}