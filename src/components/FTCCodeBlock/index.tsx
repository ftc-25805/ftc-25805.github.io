import type { ReactNode } from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

export interface FTCCodeBlockProps {
  code: string;
  language: 'java' | 'blocks' | 'python' | 'javascript' | 'json';
  title?: string;
  description?: string;
  robotController?: boolean;
  highlights?: number[];
  showLineNumbers?: boolean;
  className?: string;
  children?: ReactNode;
}

const languageDisplayNames = {
  java: 'Java',
  blocks: 'Blocks',
  python: 'Python',
  javascript: 'JavaScript',
  json: 'JSON'
};

const getRobotControllerNote = (language: string): string => {
  switch (language) {
    case 'java':
      return 'FTC Robot Controller - Java SDK';
    case 'blocks':
      return 'FTC Robot Controller - Blocks Programming';
    case 'python':
      return 'FTC Robot Controller - Python (experimental)';
    default:
      return 'FTC Robot Controller';
  }
};

const getLanguageIcon = (language: string): string => {
  switch (language) {
    case 'java': return '☕';
    case 'blocks': return '🧩';
    case 'python': return '🐍';
    case 'javascript': return '🟨';
    case 'json': return '📄';
    default: return '💻';
  }
};

export default function FTCCodeBlock({
  code,
  language,
  title,
  description,
  robotController = false,
  highlights,
  showLineNumbers = true,
  className,
  children
}: FTCCodeBlockProps): ReactNode {
  // Clean up the code by removing extra indentation
  const cleanCode = code.trim();
  
  return (
    <div className={clsx('ftc-card', styles.codeContainer, className, {
      [styles.robotController]: robotController
    })}>
      {(title || description || robotController) && (
        <div className={styles.codeHeader}>
          <div className={styles.headerTop}>
            {title && (
              <h4 className={styles.codeTitle}>
                <span className={styles.languageIcon}>
                  {getLanguageIcon(language)}
                </span>
                {title}
              </h4>
            )}
            
            <div className={styles.languageBadge}>
              {languageDisplayNames[language] || language}
            </div>
          </div>
          
          {robotController && (
            <div className={styles.robotControllerNote}>
              <span className={styles.robotIcon}>🤖</span>
              {getRobotControllerNote(language)}
            </div>
          )}
          
          {description && (
            <p className={styles.codeDescription}>{description}</p>
          )}
        </div>
      )}
      
      <div className={styles.codeWrapper}>
        <CodeBlock
          language={language === 'blocks' ? 'javascript' : language}
          showLineNumbers={showLineNumbers}
          metastring={highlights ? `{${highlights.join(',')}}` : undefined}
        >
          {cleanCode}
        </CodeBlock>
      </div>
      
      {children && (
        <div className={styles.codeFooter}>
          {children}
        </div>
      )}
      
      {robotController && (
        <div className={styles.ftcTips}>
          <h5>💡 FTC Programming Tips</h5>
          <ul>
            {language === 'java' && (
              <>
                <li>Use <code>telemetry.addData()</code> for debugging output</li>
                <li>Initialize hardware in <code>init()</code> method</li>
                <li>Check <code>opModeIsActive()</code> in autonomous loops</li>
              </>
            )}
            {language === 'blocks' && (
              <>
                <li>Use the "Telemetry" blocks for debugging</li>
                <li>Organize code with "Comment" blocks</li>
                <li>Test small sections before building complex programs</li>
              </>
            )}
            {language === 'python' && (
              <>
                <li>Python support is experimental in FTC</li>
                <li>Focus on Java or Blocks for competition</li>
                <li>Great for prototyping and learning concepts</li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}