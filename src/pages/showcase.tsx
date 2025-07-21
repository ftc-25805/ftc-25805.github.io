import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import RobotCard from '@site/src/components/RobotCard';
import TeamMember from '@site/src/components/TeamMember';
import CompetitionResults from '@site/src/components/CompetitionResults';

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

        <section style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--ifm-background-surface-color)', borderRadius: '8px' }}>
          <h2>Usage Instructions</h2>
          <h3>Importing Components</h3>
          <pre style={{ background: 'var(--ifm-code-background)', padding: '1rem', borderRadius: '4px' }}>
{`import RobotCard from '@site/src/components/RobotCard';
import TeamMember from '@site/src/components/TeamMember';
import CompetitionResults from '@site/src/components/CompetitionResults';`}
          </pre>
          
          <h3>Component Features</h3>
          <ul>
            <li><strong>RobotCard:</strong> TypeScript interfaces, responsive design, technical specs display, media links</li>
            <li><strong>TeamMember:</strong> Social media integration, specialty tags, leadership badges, profile images</li>
            <li><strong>CompetitionResults:</strong> Match breakdown, statistical analysis, awards display, video links</li>
          </ul>
          
          <h3>Responsive Design</h3>
          <p>All components are fully responsive and adapt to mobile, tablet, and desktop screen sizes.</p>
          
          <h3>Theming</h3>
          <p>Components automatically adapt to light and dark modes using CSS custom properties.</p>
        </section>
      </div>
    </Layout>
  );
}