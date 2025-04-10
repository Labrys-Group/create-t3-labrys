import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/category/apps"
          >
            Repo Structure
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/category/features"
          >
            Project Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: "600px",
            }}
          >
            <p style={{ textAlign: "center" }}>
              Welcome to your new Docusaurus documentation site!
            </p>
            <p style={{ textAlign: "center" }}>
              To get started take a look at the docs tagged with "Repo setup"{" "}
              <a href="docs/tags/repo-setup">here</a> or read through the "Repo
              structure" docs by clicking the button above.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
