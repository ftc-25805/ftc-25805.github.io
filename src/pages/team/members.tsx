import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import TeamMember from '@site/src/components/TeamMember';
import { getAllTeamMembers, getTeamLeads } from '@site/src/data/team';

export default function TeamMembers(): ReactNode {
  const teamMembers = getAllTeamMembers();
  const teamLeads = getTeamLeads();
  const regularMembers = teamMembers.filter(member => !member.isLead);

  return (
    <Layout
      title="Team Members"
      description="Meet the talented individuals who make up FTC Team 25805">
      <div className="container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <header>
          <h1>Team Members</h1>
          <p>
            Meet the talented individuals who make up FTC Team 25805! Our diverse team brings together 
            students with various skills and interests, all united by a passion for robotics and engineering.
          </p>
        </header>

        <section style={{ marginTop: '3rem' }}>
          <h2>Team Leadership</h2>
          <p>
            Our team leads coordinate their respective areas and ensure smooth collaboration across all 
            aspects of our robotics program.
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {teamLeads.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem' }}>
          <h2>Team Members</h2>
          <p>
            Our team members bring specialized skills and enthusiasm to make our robotics program successful.
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {regularMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </section>

        <section style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'var(--ifm-background-surface-color)', borderRadius: '8px' }}>
          <h2>Join Our Team</h2>
          <p>
            Interested in joining FTC Team 25805? We welcome new members throughout the year! 
            No prior robotics experience is required - just enthusiasm to learn and contribute.
          </p>
          
          <h3>What we're looking for:</h3>
          <ul>
            <li>Students interested in engineering, programming, or business</li>
            <li>Strong work ethic and commitment to the team</li>
            <li>Good communication and teamwork skills</li>
            <li>Willingness to learn new skills</li>
          </ul>

          <h3>Team Areas:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            <div>
              <h4>Mechanical Team</h4>
              <ul>
                <li>Robot design and CAD modeling</li>
                <li>Building and assembly</li>
                <li>Testing and iteration</li>
                <li>Mechanism prototyping</li>
              </ul>
            </div>
            
            <div>
              <h4>Programming Team</h4>
              <ul>
                <li>Autonomous programming</li>
                <li>TeleOp control systems</li>
                <li>Sensor integration</li>
                <li>Vision processing</li>
              </ul>
            </div>
            
            <div>
              <h4>Outreach Team</h4>
              <ul>
                <li>Community events</li>
                <li>Social media management</li>
                <li>Educational workshops</li>
                <li>Volunteer coordination</li>
              </ul>
            </div>
            
            <div>
              <h4>Business Team</h4>
              <ul>
                <li>Fundraising</li>
                <li>Sponsor relations</li>
                <li>Team documentation</li>
                <li>Event logistics</li>
              </ul>
            </div>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '1.1em', fontWeight: 'bold' }}>
            <strong>Contact us</strong> to learn more about joining our team!
          </p>
        </section>

        <section style={{ marginTop: '3rem' }}>
          <h2>Alumni</h2>
          <p>
            We're proud of our alumni who have gone on to pursue engineering, computer science, 
            and other STEM fields in college and beyond. Many continue to stay connected with 
            our team as mentors and supporters.
          </p>
        </section>
      </div>
    </Layout>
  );
}