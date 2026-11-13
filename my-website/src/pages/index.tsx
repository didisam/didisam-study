import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {usePluginData} from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PostCard from '@site/src/components/PostCard';
import type {SiteData} from '@site/src/plugins/site-data';
import {tracks} from '@site/src/data/tracks';

import styles from './index.module.css';

function useSiteData(): SiteData {
  return usePluginData('site-data') as SiteData;
}

function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}): ReactNode {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <Heading as="h2" className={styles.sectionTitle}>
          {title}
        </Heading>
        {description && <p className={styles.sectionDescription}>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function Hero(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroGrid} aria-hidden />
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroCopy}>
          <p className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            DIDISAM Engineering Study
          </p>
          <Heading as="h1" className={styles.heroTitle}>
            배운 것을 기록하고,
            <br />
            <span className={styles.gradientText}>함께 성장합니다.</span>
          </Heading>
          <p className={styles.heroSubtitle}>
            {siteConfig.tagline} 산타 개발자들이 스터디하며 정리한 지식과
            경험을 공개합니다.
          </p>
          <div className={styles.heroActions}>
            <Link className={clsx('button button--primary button--lg', styles.cta)} to="/blog">
              최신 글 보기
            </Link>
            <Link
              className={clsx('button button--secondary button--lg', styles.ctaGhost)}
              to="/docs/intro">
              스터디 노트 →
            </Link>
          </div>
        </div>
        <div className={styles.heroCode} aria-hidden>
          <div className={styles.codeWindowBar}>
            <span />
            <span />
            <span />
            <em>study.ts</em>
          </div>
          <pre className={styles.codeBody}>
            <code>
              <span className={styles.tkKeyword}>const</span> study = {'{'}
              {'\n'}
              {'  '}team: <span className={styles.tkString}>'DIDISAM'</span>,{'\n'}
              {'  '}cadence: <span className={styles.tkString}>'weekly'</span>,{'\n'}
              {'  '}tracks: [<span className={styles.tkString}>'FE'</span>,{' '}
              <span className={styles.tkString}>'BE'</span>,{' '}
              <span className={styles.tkString}>'Infra'</span>,{' '}
              <span className={styles.tkString}>'AI'</span>],{'\n'}
              {'}'};{'\n\n'}
              <span className={styles.tkKeyword}>while</span> (curious) {'{'}
              {'\n'}
              {'  '}
              <span className={styles.tkFn}>learn</span>();{' '}
              <span className={styles.tkFn}>write</span>();{' '}
              <span className={styles.tkFn}>share</span>();{'\n'}
              {'}'}
              <span className={styles.caret} />
            </code>
          </pre>
        </div>
      </div>
    </header>
  );
}

function Stats(): ReactNode {
  const {postCount, docCount, authorCount} = useSiteData();
  const items = [
    {label: '블로그 글', value: postCount},
    {label: '스터디 노트', value: docCount},
    {label: '스터디 트랙', value: tracks.length},
    {label: '참여 멤버', value: authorCount},
  ];
  return (
    <section className={styles.stats}>
      <div className={clsx('container', styles.statsInner)}>
        {items.map((item) => (
          <div key={item.label} className={styles.stat}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentPosts(): ReactNode {
  const {recentPosts} = useSiteData();
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="Latest"
          title="최신 글"
          description="스터디에서 다룬 주제와 실무에서 겪은 이야기를 정리합니다."
          action={
            <Link to="/blog" className={styles.moreLink}>
              전체 글 보기 →
            </Link>
          }
        />
        {recentPosts.length > 0 ? (
          <div className={styles.postGrid}>
            {recentPosts.map((post) => (
              <PostCard key={post.permalink} post={post} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            아직 발행된 글이 없습니다. 첫 번째 글을 기다리고 있어요!
          </div>
        )}
      </div>
    </section>
  );
}

function Tracks(): ReactNode {
  const {docCountByDir} = useSiteData();
  return (
    <section className={clsx(styles.section, styles.sectionMuted)}>
      <div className="container">
        <SectionHeader
          eyebrow="Tracks"
          title="스터디 트랙"
          description="관심 분야별로 트랙을 나누어 학습하고, 결과를 스터디 노트로 남깁니다."
        />
        <div className={styles.trackGrid}>
          {tracks.map((track) => (
            <Link
              key={track.dir}
              to={`/docs/${track.dir}/`}
              className={styles.trackCard}>
              <div className={styles.trackTop}>
                <span className={styles.trackIcon}>{track.short}</span>
                <span className={styles.trackCount}>
                  노트 {docCountByDir[track.dir] ?? 0}
                </span>
              </div>
              <Heading as="h3" className={styles.trackTitle}>
                {track.title}
              </Heading>
              <p className={styles.trackDescription}>{track.description}</p>
              <ul className={styles.trackKeywords}>
                {track.keywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    no: '01',
    title: '주제 선정',
    description: '트랙별로 함께 파고들 주제와 자료를 정하고 일정을 잡습니다.',
  },
  {
    no: '02',
    title: '학습 · 정리',
    description: '각자 학습한 내용을 스터디 노트로 정리하고 코드로 검증합니다.',
  },
  {
    no: '03',
    title: '발표 · 토론',
    description: '정기 세션에서 발표하고, 질문과 토론으로 이해를 넓힙니다.',
  },
  {
    no: '04',
    title: '공개 · 공유',
    description: '다듬은 결과물을 블로그 글로 발행해 모두와 나눕니다.',
  },
];

function Process(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="How we study"
          title="이렇게 공부합니다"
          description="배움이 개인에게 머무르지 않도록, 기록과 공유를 스터디의 기본 단위로 삼습니다."
        />
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.no} className={styles.step}>
              <span className={styles.stepNo}>{step.no}</span>
              <Heading as="h3" className={styles.stepTitle}>
                {step.title}
              </Heading>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function JoinBanner(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.banner}>
          <div>
            <Heading as="h2" className={styles.bannerTitle}>
              글 한 편으로 시작해 보세요
            </Heading>
            <p className={styles.bannerText}>
              Markdown 파일 하나와 Pull Request 하나면 충분합니다. 작성 방법은 글쓰기
              가이드에 정리해 두었어요.
            </p>
          </div>
          <div className={styles.bannerActions}>
            <Link className="button button--lg button--primary" to="/docs/guide/writing-blog">
              글쓰기 가이드
            </Link>
            <Link
              className={clsx('button button--lg', styles.bannerGhost)}
              href="https://github.com/didisam/didisam-study">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="개발 스터디 & 기술 블로그"
      description={`${siteConfig.title} — 산타 개발자들의 스터디 기록과 기술 이야기`}>
      <Hero />
      <main>
        <Stats />
        <RecentPosts />
        <Tracks />
        <Process />
        <JoinBanner />
      </main>
    </Layout>
  );
}
