import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import SEOHead from '@site/src/components/SEOHead';

export default function AccessibilityPage(): ReactNode {
  return (
    <>
      <SEOHead
        title="Accessibility Statement"
        description="FTC Team 25805's commitment to web accessibility and inclusive design"
        keywords={['accessibility', 'WCAG', 'inclusive design', 'web standards']}
      />
      <Layout
        title="Accessibility Statement"
        description="Our commitment to accessible design"
      >
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h1>Accessibility Statement</h1>
              
              <p>
                FTC Team 25805 is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone and applying the relevant 
                accessibility standards.
              </p>

              <h2>Conformance Status</h2>
              <p>
                The <a href="https://www.w3.org/WAI/WCAG21/quickref/">Web Content Accessibility Guidelines (WCAG)</a> 
                defines requirements for designers and developers to improve accessibility for people with disabilities. 
                It defines three levels of conformance: Level A, Level AA, and Level AAA.
              </p>
              <p>
                This website is <strong>partially conformant</strong> with WCAG 2.1 level AA. 
                "Partially conformant" means that some parts of the content do not fully conform to the accessibility standard.
              </p>

              <h2>Accessibility Features</h2>
              <div style={{ 
                background: 'var(--ifm-background-surface-color)', 
                padding: '1.5rem', 
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                <h3>✅ Implemented Features</h3>
                <ul>
                  <li><strong>Semantic HTML:</strong> Proper heading structure and landmark elements</li>
                  <li><strong>Keyboard Navigation:</strong> All interactive elements accessible via keyboard</li>
                  <li><strong>Alt Text:</strong> Images include descriptive alternative text</li>
                  <li><strong>Color Contrast:</strong> Text meets WCAG AA contrast requirements</li>
                  <li><strong>Focus Management:</strong> Clear focus indicators and logical tab order</li>
                  <li><strong>Screen Reader Support:</strong> ARIA labels and descriptions where needed</li>
                  <li><strong>Responsive Design:</strong> Mobile-friendly and zoom-friendly up to 200%</li>
                  <li><strong>Dark Mode:</strong> High contrast dark theme option</li>
                </ul>
              </div>

              <div style={{ 
                background: 'var(--ifm-color-warning-contrast-background)', 
                padding: '1.5rem', 
                borderRadius: '8px',
                marginTop: '1rem',
                border: '1px solid var(--ifm-color-warning)'
              }}>
                <h3>⚠️ Areas for Improvement</h3>
                <ul>
                  <li>Video content needs captions and transcripts</li>
                  <li>Complex interactive components may need enhanced ARIA support</li>
                  <li>Some color-only information could benefit from additional indicators</li>
                  <li>Form validation messages could be more descriptive</li>
                </ul>
              </div>

              <h2>Testing Methods</h2>
              <p>We test our website using various methods:</p>
              <ul>
                <li><strong>Automated Testing:</strong> axe-core accessibility engine</li>
                <li><strong>Keyboard Testing:</strong> Navigation without mouse</li>
                <li><strong>Screen Reader Testing:</strong> NVDA, JAWS, and VoiceOver</li>
                <li><strong>Color Contrast:</strong> WebAIM Contrast Checker</li>
                <li><strong>Mobile Testing:</strong> Various devices and screen sizes</li>
                <li><strong>Zoom Testing:</strong> Up to 200% magnification</li>
              </ul>

              <h2>Feedback and Contact</h2>
              <p>
                We welcome your feedback on the accessibility of our website. 
                Please let us know if you encounter accessibility barriers:
              </p>
              
              <div style={{ 
                background: 'var(--ifm-background-surface-color)', 
                padding: '1.5rem', 
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                <ul>
                  <li><strong>Email:</strong> accessibility@ftc25805.org</li>
                  <li><strong>Contact Form:</strong> <a href="/contact">Contact Us</a></li>
                  <li><strong>GitHub Issues:</strong> <a href="https://github.com/ftc-25805/ftc-25805.github.io/issues">Report Technical Issues</a></li>
                </ul>
              </div>

              <h2>Assessment Approach</h2>
              <p>
                FTC Team 25805 assessed the accessibility of this website by self-evaluation 
                and testing with assistive technologies. This assessment was conducted in {new Date().getFullYear()}.
              </p>

              <h2>Browser and Assistive Technology Support</h2>
              <p>We aim to support:</p>
              <ul>
                <li><strong>Browsers:</strong> Chrome, Firefox, Safari, Edge (latest 2 versions)</li>
                <li><strong>Screen Readers:</strong> NVDA, JAWS, VoiceOver, TalkBack</li>
                <li><strong>Other Tools:</strong> Voice control software, keyboard-only navigation</li>
              </ul>

              <h2>Limitations and Alternatives</h2>
              <p>
                Despite our efforts, some limitations may exist. If you encounter any 
                accessibility barriers, please contact us for alternative formats or assistance.
              </p>

              <div style={{ 
                background: 'var(--ifm-color-info-contrast-background)', 
                padding: '1.5rem', 
                borderRadius: '8px',
                marginTop: '2rem',
                border: '1px solid var(--ifm-color-info)'
              }}>
                <h3>🔧 Technical Standards</h3>
                <p>This website was built using:</p>
                <ul>
                  <li>Docusaurus 3.7.0 with accessibility best practices</li>
                  <li>Semantic HTML5 markup</li>
                  <li>WAI-ARIA specifications</li>
                  <li>WCAG 2.1 AA guidelines</li>
                  <li>Modern web standards for compatibility</li>
                </ul>
              </div>

              <p style={{ marginTop: '2rem', fontSize: '0.9em', color: 'var(--ifm-color-emphasis-600)' }}>
                <em>
                  This accessibility statement was last updated on {new Date().toLocaleDateString()}.
                  We review and update this statement regularly as we continue to improve our website's accessibility.
                </em>
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}