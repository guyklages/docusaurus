import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

import React from 'react';
import RecommendationShowcase from '@site/src/components/RecommendationShowcase';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Empowering users, one page at a time.
        </Heading>
        <Heading as="h2" className="hero__subtitle">
          I'm passionate about creating documentation and resources that help developers and end users fully unlock a product's
          potential. I'm also excited to support fellow technical writers&mdash;sharing interview questions, writing tips, and insights
          to help you showcase your skills and land your next role with confidence.
        </Heading>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={` ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <RecommendationShowcase />
    </Layout>
  );
}
