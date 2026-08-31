import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function captureFeatureClick(featureTitle) {
  const ph = typeof window !== 'undefined' ? window.posthog : undefined;
  if (ph) {
    ph.capture('homepage_feature_clicked', {
      feature_title: featureTitle,
    });
  }
}

const FeatureList = [
  {
    title: 'Guy Klages',
    img: require('@site/static/img/Guy-suit-head-shot.png').default,
    description: (
      <>
        Bay Area, CA <br/> <br/>
        guy.klages@gmail.com <br/>
        <a href="https://www.linkedin.com/in/klages">linkedin.com/in/klages</a>
      </>
    ),
  },
  {
    title: <a href="portfolio">Technical Writer</a>,
    img: require('@site/static/img/Guy_working-two-monitors.png').default,
    description: (
      <>
        Developer and SDK guides <br/>
        API reference <br/> <br/>
        Designing, building, and scaling developer documentation systems
      </>
    ),
  },
  {
    title: <a href="portfolio/developer-advocacy">Developer Advocate</a>,
    img: require('@site/static/img/TalkGroup_Mini-Adventure-class.png').default,
    description: (
      <>
        Bridging companies with external developers <br/> <br/>
        Representing the community's feedback to internal product and engineering teams
      </>
    ),
  },
];

function Feature({img, title, description, featureKey}) {
  return (
    <div className={clsx('col col--4')} onClick={() => captureFeatureClick(featureKey)}>
      <div className="text--center">
        <img src={img} className={styles.featureSvg} role="img" alt={featureKey} />
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
            <Feature key={idx} featureKey={typeof props.title === 'string' ? props.title : ['Guy Klages', 'Technical Writer', 'Developer Advocate'][idx]} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
