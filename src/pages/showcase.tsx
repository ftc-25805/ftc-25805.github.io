import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import RobotCard from '@site/src/components/RobotCard';
import TeamMember from '@site/src/components/TeamMember';
import CompetitionResults from '@site/src/components/CompetitionResults';
import ProgressTimeline from '@site/src/components/ProgressTimeline';
import SponsorShowcase from '@site/src/components/SponsorShowcase';
import FTCCodeBlock from '@site/src/components/FTCCodeBlock';
import ImageGallery from '@site/src/components/ImageGallery';

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

        <section style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--ifm-background-surface-color)', borderRadius: '8px' }}>
          <h2>Phase 3 Component Library</h2>
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
import ImageGallery from '@site/src/components/ImageGallery';`}
          </pre>
          
          <h3>Advanced Features</h3>
          <ul>
            <li><strong>ProgressTimeline:</strong> Interactive timeline with status tracking, event categorization, and image support</li>
            <li><strong>SponsorShowcase:</strong> Tiered sponsor display with multiple layouts, contribution tracking, and call-to-action</li>
            <li><strong>FTCCodeBlock:</strong> Enhanced code blocks with FTC-specific features, programming tips, and syntax highlighting</li>
            <li><strong>ImageGallery:</strong> Full-featured gallery with lightbox, category filtering, and responsive grid layouts</li>
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