import React, {useEffect, useRef, type ReactNode} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {useColorMode} from '@docusaurus/theme-common';

type Props = {permalink: string};

function CommentWidget({permalink}: Props): ReactNode {
  const {colorMode} = useColorMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(colorMode);

  useEffect(() => {
    themeRef.current = colorMode;
    containerRef.current?.querySelector('iframe')?.contentWindow?.postMessage(
      {giscus: {setConfig: {theme: colorMode}}},
      'https://giscus.app',
    );
  }, [colorMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    const config = {
      repo: 'didisam/didisam-study',
      'repo-id': 'R_kgDOVsjpcw',
      category: 'Announcements',
      'category-id': 'DIC_kwDOVsjpc84DLTpA',
      mapping: 'specific',
      term: permalink,
      strict: '1',
      'reactions-enabled': '1',
      'emit-metadata': '0',
      'input-position': 'top',
      theme: themeRef.current,
      lang: 'ko',
      loading: 'lazy',
    };
    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(`data-${key}`, value);
    });

    // Apply the latest theme even if it changed while the iframe was loading.
    const syncTheme = () => {
      container.querySelector('iframe')?.contentWindow?.postMessage(
        {giscus: {setConfig: {theme: themeRef.current}}},
        'https://giscus.app',
      );
    };
    container.addEventListener('load', syncTheme, true);
    container.appendChild(script);
    return () => {
      container.removeEventListener('load', syncTheme, true);
      container.replaceChildren();
    };
  }, [permalink]);

  return <div ref={containerRef} className="giscus" />;
}

export default function Comments(props: Props): ReactNode {
  return (
    <section className="margin-top--xl margin-bottom--lg" aria-label="댓글">
      <h2>댓글</h2>
      <p>GitHub 계정으로 로그인해 질문과 의견을 남겨주세요.</p>
      <BrowserOnly>{() => <CommentWidget {...props} />}</BrowserOnly>
    </section>
  );
}
