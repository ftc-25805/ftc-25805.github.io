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
    title: 'Engineering Excellence',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        We strive for innovation and precision in every robot we build,
        constantly pushing the boundaries of what's possible in competitive robotics.
      </>
    ),
  },
  {
    title: 'Team Collaboration',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Our diverse team of students works together to design, build, and program
        robots while developing leadership and technical skills.
      </>
    ),
  },
  {
    title: 'FIRST Values',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        We embody the core FIRST values of Gracious Professionalism and Coopetition,
        building lasting relationships both on and off the field.
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
        <div className="text--center padding-bottom--lg">
          <h2>About FTC Team 25805 - Reprogrammed</h2>
          <p>
            We are a passionate group of high school students dedicated to competitive robotics,
            STEM education, and making a positive impact in our community.
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
