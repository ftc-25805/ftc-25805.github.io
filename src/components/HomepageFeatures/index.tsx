import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Competitive Robotics',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        🤖 We design, build, and program competitive robots for FTC challenges using Java, 
        OpenCV, and advanced autonomous systems. Our current robot features mecanum drivetrain,
        precision manipulators, and computer vision.
      </>
    ),
  },
  {
    title: 'Awards & Achievements',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        🏆 Regional Tournament Winners, Think Award recipients, and Dean's List nominees.
        We've competed in 25+ tournaments across 6 seasons, consistently ranking in top performances
        with our innovative engineering solutions.
      </>
    ),
  },
  {
    title: 'STEM Outreach',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        🌟 Active in community outreach with 500+ hours of STEM mentoring, elementary school 
        robotics camps, and local science fairs. We inspire the next generation through 
        hands-on demonstrations and collaborative learning.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
