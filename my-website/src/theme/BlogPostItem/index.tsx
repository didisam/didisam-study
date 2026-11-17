import React, {type ReactNode} from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import type {Props} from '@theme/BlogPostItem';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import Comments from '@site/src/components/Comments';

export default function BlogPostItemWrapper(props: Props): ReactNode {
  const {isBlogPostPage, metadata, frontMatter} = useBlogPost();
  const {comments} = frontMatter as typeof frontMatter & {comments?: boolean};

  return (
    <>
      <BlogPostItem {...props} />
      {isBlogPostPage && comments !== false && (
        <Comments permalink={metadata.permalink} />
      )}
    </>
  );
}
