import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Guy Klages',
    img: require('@site/static/img/Guy-suit-head-shot.png').default,
    description: (
      <>
        Bay Area, CA <br/> <br/>
        guy.klages@gmail.com <br/> <br/>
        <a href="https://www.linkedin.com/in/klages">linkedin.com/in/klages</a>
      </>
    ),
  },
  {
    title: 'Technical Writer',
    img: require('@site/static/img/guy-workstation.png').default,
    description: (
      <>
        Developer guides <br/> <br/>
        API reference <br/> <br/>
        Information architecture organization
      </>
    ),
  },
  {
    title: 'Developer Advocate',
    img: require('@site/static/img/TalkGroup_Mini-Adventure-class.png').default,
    description: (
      <>
        Bridging companies with external developers <br/> <br/>
        Representing the community's feedback to internal product and engineering teams
      </>
    ),
  },
];

function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={img} className={styles.featureSvg} role="img" alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
