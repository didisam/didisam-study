import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import siteDataPlugin from './src/plugins/site-data';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const GITHUB_URL = 'https://github.com/didisam/didisam-study';
const EDIT_URL = `${GITHUB_URL}/tree/main/my-website/`;

const config: Config = {
  title: 'DIDISAM Study',
  tagline: '함께 배우고, 기록하고, 나눕니다.',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https://didisam.github.io',
  baseUrl: '/didisam-study/',
  trailingSlash: true,

  organizationName: 'didisam',
  projectName: 'didisam-study',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  // 한글 가독성을 위한 Pretendard 웹폰트 (dynamic subset)
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
      crossorigin: 'anonymous',
    },
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: EDIT_URL,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          breadcrumbs: true,
        },
        blog: {
          blogTitle: '블로그',
          blogDescription: '산타 개발자들의 스터디 기록과 기술 이야기',
          blogSidebarTitle: '전체 글',
          blogSidebarCount: 'ALL',
          postsPerPage: 10,
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: 'DIDISAM Study Blog',
            description: '산타 개발자들의 스터디 기록과 기술 이야기',
            language: 'ko',
          },
          editUrl: EDIT_URL,
          // 태그/저자는 tags.yml, authors.yml에 등록된 것만 허용
          onInlineTags: 'throw',
          onInlineAuthors: 'throw',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          lastmod: 'date',
          changefreq: null,
          priority: null,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [siteDataPlugin],

  themeConfig: {
    // TODO: 1200x630 소셜 카드 이미지를 static/img/social-card.png 로 추가하고 아래 주석 해제
    // image: 'img/social-card.png',
    metadata: [
      {name: 'keywords', content: 'didisam, 디디샘, 개발 스터디, 기술 블로그'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    blog: {
      sidebar: {
        groupByYear: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    navbar: {
      title: 'DIDISAM Study',
      hideOnScroll: true,
      logo: {
        alt: 'DIDISAM Study',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/blog', label: '블로그', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'studySidebar',
          position: 'left',
          label: '스터디 노트',
        },
        {to: '/blog/tags', label: '태그', position: 'left'},
        {to: '/blog/authors', label: '멤버', position: 'left'},
        {
          href: GITHUB_URL,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: '콘텐츠',
          items: [
            {label: '블로그', to: '/blog'},
            {label: '스터디 노트', to: '/docs/intro'},
            {label: '태그', to: '/blog/tags'},
          ],
        },
        {
          title: '참여하기',
          items: [
            {label: '글쓰기 가이드', to: '/docs/guide/writing-blog'},
            {label: '멤버', to: '/blog/authors'},
            {label: 'GitHub', href: GITHUB_URL},
          ],
        },
        {
          title: '구독',
          items: [
            {label: 'RSS', href: 'pathname:///didisam-study/blog/rss.xml'},
            {label: 'Atom', href: 'pathname:///didisam-study/blog/atom.xml'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} DIDISAM. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['java', 'bash', 'sql', 'docker', 'diff'],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
