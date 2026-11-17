import React, {type ReactNode} from 'react';
import Footer from '@theme-original/DocItem/Footer';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Comments from '@site/src/components/Comments';

export default function DocItemFooter(): ReactNode {
  const {metadata, frontMatter} = useDoc();
  const {comments} = frontMatter as typeof frontMatter & {comments?: boolean};

  return (
    <>
      <Footer />
      {comments !== false && (
        <Comments permalink={metadata.permalink} />
      )}
    </>
  );
}
