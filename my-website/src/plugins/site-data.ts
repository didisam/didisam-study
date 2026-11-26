import {execFileSync} from 'node:child_process';
import {mkdir, writeFile} from 'node:fs/promises';
import {join} from 'node:path';
import type {Plugin} from '@docusaurus/types';
import type {BlogContent} from '@docusaurus/plugin-content-blog';
import type {LoadedContent as DocsContent} from '@docusaurus/plugin-content-docs';
import {Feed} from 'feed';
import {tracks} from '../data/tracks';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

export type RecentPost = {
  title: string;
  description: string;
  permalink: string;
  date: string;
  readingTime?: number;
  image?: string;
  tags: {label: string; permalink: string}[];
  authors: {name?: string; imageURL?: string}[];
};

export type SiteData = {
  recentPosts: RecentPost[];
  postCount: number;
  // 트랙 폴더 안의 노트 수 (트랙 개요 index 문서는 제외)
  docCount: number;
  // 트랙별 노트 수. 예: {frontend: 3, backend: 1}
  docCountByDir: Record<string, number>;
  authorCount: number;
};

const RECENT_POST_COUNT = 6;
type StudyNote = DocsContent['loadedVersions'][number]['docs'][number];

/**
 * 블로그/문서 플러그인이 로드한 데이터를 모아 홈 화면에서 쓸 수 있도록
 * global data로 노출한다. (usePluginData('site-data')로 접근)
 * @see https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#allContentLoaded
 */
export default function siteDataPlugin(): Plugin {
  const studyNotes: StudyNote[] = [];

  return {
    name: 'site-data',
    async allContentLoaded({allContent, actions}) {
      const blog = allContent['docusaurus-plugin-content-blog']?.default as
        | BlogContent
        | undefined;
      const docs = allContent['docusaurus-plugin-content-docs']?.default as
        | DocsContent
        | undefined;

      const posts = (blog?.blogPosts ?? []).filter(
        (post) => !post.metadata.unlisted,
      );
      const currentDocs = (docs?.loadedVersions[0]?.docs ?? []).filter(
        (doc) => !doc.unlisted,
      );

      const trackDirs = new Set(tracks.map((track) => track.dir));
      const docCountByDir: Record<string, number> = {};
      let docCount = 0;
      studyNotes.length = 0;
      for (const doc of currentDocs) {
        const [dir] = doc.id.split('/');
        if (trackDirs.has(dir) && !doc.id.endsWith('/index')) {
          studyNotes.push(doc);
          docCountByDir[dir] = (docCountByDir[dir] ?? 0) + 1;
          docCount += 1;
        }
      }

      const data: SiteData = {
        recentPosts: posts.slice(0, RECENT_POST_COUNT).map(({metadata}) => ({
          title: metadata.title,
          description: metadata.description,
          permalink: metadata.permalink,
          date: new Date(metadata.date).toISOString(),
          readingTime: metadata.readingTime,
          image: metadata.frontMatter.image,
          tags: metadata.tags.map(({label, permalink}) => ({label, permalink})),
          authors: metadata.authors.map(({name, imageURL}) => ({
            name,
            imageURL,
          })),
        })),
        postCount: posts.length,
        docCount,
        docCountByDir,
        authorCount: Object.keys(blog?.authorsMap ?? {}).length,
      };

      actions.setGlobalData(data);
    },
    async postBuild({outDir, siteDir, siteConfig}) {
      const docsUrl = new URL(`${siteConfig.baseUrl}docs/`, siteConfig.url);
      const feed = new Feed({
        title: 'DIDISAM Study Notes',
        description: '디디샘 스터디 노트',
        id: docsUrl.href,
        link: new URL('intro/', docsUrl).href,
        feedLinks: {rss: new URL('rss.xml', docsUrl).href},
        language: 'ko',
        copyright: siteConfig.title,
      });

      const entries = studyNotes.flatMap((doc) => {
        const source = doc.source.replace(/^@site\//, '');
        // Use the date the file landed on the branch so edits do not
        // bump the entry's publication date.
        const timestamp = execFileSync('git', [
          'log', '--first-parent', '--diff-merges=first-parent',
          '--diff-filter=A', '--no-patch', '-1', '--format=%ct', '--', source,
        ], {cwd: siteDir, encoding: 'utf8'}).trim();
        if (!timestamp) {
          return [];
        }

        const docUrl = new URL(doc.permalink, siteConfig.url);
        if (siteConfig.trailingSlash && !docUrl.pathname.endsWith('/')) {
          docUrl.pathname += '/';
        }
        const link = docUrl.href;
        return [{
          title: doc.title,
          description: doc.description,
          id: link,
          link,
          date: new Date(Number(timestamp) * 1000),
        }];
      });

      entries.sort((a, b) => b.date.getTime() - a.date.getTime());
      for (const entry of entries) {
        feed.addItem(entry);
      }

      const feedDir = join(outDir, 'docs');
      await mkdir(feedDir, {recursive: true});
      await writeFile(join(feedDir, 'rss.xml'), feed.rss2());
    },
  };
}
