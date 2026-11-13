import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type {RecentPost} from '@site/src/plugins/site-data';
import styles from './styles.module.css';

export function formatDate(iso: string): string {
  // 서버/클라이언트 렌더 결과를 맞추기 위해 UTC 기준으로 포맷
  return new Date(iso).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function Thumbnail({post}: {post: RecentPost}): ReactNode {
  const imageUrl = useBaseUrl(post.image ?? '');
  if (post.image) {
    return <img className={styles.thumbImage} src={imageUrl} alt="" loading="lazy" />;
  }
  // 대표 이미지가 없으면 첫 태그 이름으로 플레이스홀더를 그린다
  return (
    <div className={styles.thumbPlaceholder} aria-hidden>
      <span>{post.tags[0]?.label ?? 'Study'}</span>
    </div>
  );
}

export default function PostCard({post}: {post: RecentPost}): ReactNode {
  return (
    <article className={styles.card}>
      <Link to={post.permalink} className={styles.thumb}>
        <Thumbnail post={post} />
      </Link>
      <div className={styles.body}>
        {post.tags.length > 0 && (
          <ul className={styles.tags}>
            {post.tags.slice(0, 3).map((tag) => (
              <li key={tag.permalink}>
                <Link to={tag.permalink}>{tag.label}</Link>
              </li>
            ))}
          </ul>
        )}
        <Link to={post.permalink} className={styles.titleLink}>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.description}>{post.description}</p>
        </Link>
        <footer className={styles.meta}>
          <span className={styles.avatars}>
            {post.authors
              .filter((author) => author.imageURL)
              .slice(0, 3)
              .map((author) => (
                <img
                  key={author.name}
                  src={author.imageURL}
                  alt={author.name}
                  title={author.name}
                />
              ))}
          </span>
          <span>{post.authors.map((author) => author.name).join(', ')}</span>
          <span className={styles.dot} aria-hidden>
            ·
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readingTime !== undefined && (
            <>
              <span className={styles.dot} aria-hidden>
                ·
              </span>
              <span>{Math.max(1, Math.ceil(post.readingTime))}분</span>
            </>
          )}
        </footer>
      </div>
    </article>
  );
}
