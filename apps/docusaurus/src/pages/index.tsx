import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";

import styles from "./index.module.css";

function WarningBanner() {
  return (
    <div className={styles.warningBanner}>
      <strong>Important:</strong> Before using this template, complete the
      repository setup steps below!
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function SetupStepsSection() {
  return (
    <div className={styles.setupStepsSection}>
      <Heading as="h2">Repository Quick Start</Heading>

      <div className={styles.setupStepsContainer}>
        <div className={styles.setupStep}>
          <div className={styles.setupStepNumber}>1</div>
          <div className={styles.setupStepContent}>
            <Heading as="h3">Create a New Repository</Heading>
            <p>
              Click the button below to create a new repository from this
              template:
            </p>
            <a
              href="https://github.com/new?template_name=create-t3-labrys&template_owner=Labrys-Group"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.templateButton}
            >
              Use this template
            </a>
          </div>
        </div>

        <div className={styles.setupStep}>
          <div className={styles.setupStepNumber}>2</div>
          <div className={styles.setupStepContent}>
            <Heading as="h3">Initial Setup</Heading>
            <p>Install dependencies and copy environment variables</p>
            <CodeBlock language="bash">pnpm i</CodeBlock>
            <CodeBlock language="bash">cp .env.example .env</CodeBlock>
            <div className={styles.setupLinks}>
              <Link
                className="button button--primary button--sm"
                to="/docs/repo-configuration/project-structure/apps/next/local-development"
              >
                Local Development →
              </Link>
              <Link
                className="button button--primary button--sm"
                to="/docs/repo-configuration/services/clerk"
              >
                Authentication Setup →
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.setupStep}>
          <div className={styles.setupStepNumber}>3</div>
          <div className={styles.setupStepContent}>
            <Heading as="h3">Database Configuration</Heading>
            <p>Spin up MongoDB with Docker and validate connection</p>
            <CodeBlock language="bash">
              docker-compose -f packages/db/docker-compose.yml up -d
            </CodeBlock>
            <div className={styles.setupLinks}>
              <Link
                className="button button--primary button--sm"
                to="/docs/repo-configuration/features/database"
              >
                Database Setup →
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.setupStep}>
          <div className={styles.setupStepNumber}>4</div>
          <div className={styles.setupStepContent}>
            <Heading as="h3">Start the Web App</Heading>
            <p>Start the Next.js application</p>
            <CodeBlock language="bash">pnpm dev:next</CodeBlock>
          </div>
        </div>

        <div className={styles.setupStep}>
          <div className={styles.setupStepNumber}>5</div>
          <div className={styles.setupStepContent}>
            <Heading as="h3">Setup Authentication</Heading>
            <p>Log in to Clerk and claim your application</p>
            <div className={styles.setupLinks}>
              <Link
                className="button button--primary button--sm"
                to="/docs/repo-configuration/services/clerk"
              >
                Clerk Setup →
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.setupStep}>
          <div className={styles.setupStepNumber}>6</div>
          <div className={styles.setupStepContent}>
            <Heading as="h3">Optional: Remove Expo</Heading>
            <p>If you're not building a mobile app, safely remove Expo</p>
            <CodeBlock language="bash">rm -rf apps/expo</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

function UIGuidanceSection() {
  return (
    <div className={styles.uiGuidanceSection}>
      <Heading as="h2">UI Development Best Practices</Heading>
      <div className={styles.bestPracticesContainer}>
        <div className={styles.bestPractice}>
          <Heading as="h3">Use shadcn/ui Components</Heading>
          <p>
            All UI components should be built with shadcn/ui, including forms,
            tables, and other complex components.
          </p>

          <div className={styles.bestPracticesList}>
            <div className={styles.bestPracticeItem}>
              <div className={styles.bestPracticeIcon}>✓</div>
              <div>
                Use shadcn/ui for consistent design language and accessibility
              </div>
            </div>
            <div className={styles.bestPracticeItem}>
              <div className={styles.bestPracticeIcon}>✓</div>
              <div>
                Leverage react-hook-form with shadcn form components for
                validation
              </div>
            </div>
            <div className={styles.bestPracticeItem}>
              <div className={styles.bestPracticeIcon}>✓</div>
              <div>
                Extend components with consistent styling using the cn utility
              </div>
            </div>
            <div className={styles.bestPracticeItem}>
              <div className={styles.bestPracticeIcon}>✓</div>
              <div>
                Maintain theme consistency with provided theme variables
              </div>
            </div>
            <div className={styles.bestPracticeItem}>
              <div className={styles.bestPracticeIcon}>✘</div>
              <div>
                Avoid creating custom components when shadcn equivalents exist
              </div>
            </div>
          </div>

          <p>Add new UI components using the CLI:</p>
          <CodeBlock language="bash">pnpm ui-add</CodeBlock>
          <Link
            className="button button--outline button--sm"
            to="/docs/repo-configuration/project-structure/packages/ui"
          >
            UI Package Documentation →
          </Link>
        </div>
      </div>
    </div>
  );
}

function PathwaySection() {
  return (
    <div className={styles.pathwaySection}>
      <Heading as="h2">Development Pathway</Heading>
      <div className={styles.pathway}>
        <div className={styles.pathwayStep}>
          <div className={styles.pathwayStepIcon}>📋</div>
          <div className={styles.pathwayStepText}>1. Setup Repo</div>
          <div className={styles.pathwayStepDesc}>
            Configure auth & database
          </div>
        </div>
        <div className={styles.pathwayArrow}>→</div>

        <div className={styles.pathwayStep}>
          <div className={styles.pathwayStepIcon}>🚀</div>
          <div className={styles.pathwayStepText}>2. Initial Deploy</div>
          <div className={styles.pathwayStepDesc}>Deploy baseline app</div>
        </div>
        <div className={styles.pathwayArrow}>→</div>

        <div className={styles.pathwayStep}>
          <div className={styles.pathwayStepIcon}>📚</div>
          <div className={styles.pathwayStepText}>3. Deploy Docs</div>
          <div className={styles.pathwayStepDesc}>
            Set up documentation site
          </div>
        </div>
        <div className={styles.pathwayArrow}>→</div>

        <div className={styles.pathwayStep}>
          <div className={styles.pathwayStepIcon}>🔨</div>
          <div className={styles.pathwayStepText}>4. Build Features</div>
          <div className={styles.pathwayStepDesc}>
            API and UI implementation
          </div>
        </div>
        <div className={styles.pathwayArrow}>→</div>

        <div className={styles.pathwayStep}>
          <div className={styles.pathwayStepIcon}>♻️</div>
          <div className={styles.pathwayStepText}>5. Continuous Deployment</div>
          <div className={styles.pathwayStepDesc}>CI/CD pipeline</div>
        </div>
      </div>
    </div>
  );
}

function NextStepsSection() {
  return (
    <div className={styles.nextStepsSection}>
      <Heading as="h2">Next Steps</Heading>
      <div className={styles.nextStepsContainer}>
        <div className={styles.nextStep}>
          <div className={styles.nextStepIcon}>🚀</div>
          <div className={styles.nextStepContent}>
            <Heading as="h3">Deploy Your Applications</Heading>
            <p>
              Follow these guides to deploy your applications to production:
            </p>
            <div className={styles.setupLinks}>
              <Link
                className="button button--primary button--sm"
                to="/docs/repo-configuration/project-structure/apps/next/vercel-deployment"
              >
                Next.js Deployment →
              </Link>
              <Link
                className="button button--primary button--sm"
                to="/docs/repo-configuration/project-structure/apps/docusaurus/deployment"
              >
                Docusaurus Deployment →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BestPracticesSection() {
  return (
    <div className={styles.bestPracticesSection}>
      <Heading as="h2">Key Architecture Principles</Heading>

      <div className={styles.principlesContainer}>
        <div className={styles.principle}>
          <div className={styles.principleHeader}>
            <div className={styles.principleIcon}>🧩</div>
            <Heading as="h3">Shared Packages</Heading>
          </div>
          <p>
            Keep business logic in shared packages that can be used across all
            apps. This promotes code reuse and consistency.
          </p>
        </div>

        <div className={styles.principle}>
          <div className={styles.principleHeader}>
            <div className={styles.principleIcon}>🔒</div>
            <Heading as="h3">Type Safety</Heading>
          </div>
          <p>
            Maintain end-to-end type safety with tRPC, Typegoose, and Zod for
            robust APIs and validation.
          </p>
        </div>

        <div className={styles.principle}>
          <div className={styles.principleHeader}>
            <div className={styles.principleIcon}>🔄</div>
            <Heading as="h3">Early Deployment</Heading>
          </div>
          <p>
            Set up deployment early and deploy frequently to catch integration
            issues early in development.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="T3 Stack monorepo with Next.js, tRPC, and MongoDB"
    >
      <WarningBanner />
      <HomepageHeader />
      <main>
        <div className={styles.mainContainer}>
          <SetupStepsSection />
          <NextStepsSection />
          <PathwaySection />
          <BestPracticesSection />
          <UIGuidanceSection />

          <div className={styles.docLinks}>
            <Heading as="h2">Documentation Links</Heading>
            <div className={styles.docLinksContainer}>
              <Link
                className={styles.docLink}
                to="/docs/repo-configuration/project-structure"
              >
                Project Structure
              </Link>
              <Link className={styles.docLink} to="/docs/category/features">
                Features
              </Link>
              <Link className={styles.docLink} to="/docs/tags/repo-setup">
                Repo Setup Steps
              </Link>
              <Link
                className={styles.docLink}
                to="/docs/repo-configuration/project-structure/packages/ui"
              >
                UI Components
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
