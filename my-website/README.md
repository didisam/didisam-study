# DIDISAM Study

산타 개발자들의 공개 스터디 & 기술 블로그. [Docusaurus](https://docusaurus.io/) 3로 만들었습니다.

- 사이트: https://didisam.github.io/didisam-study/
- 글쓰기 가이드: `docs/guide/` (사이트의 **스터디 노트 → 참여 가이드**)

## 로컬 실행

```bash
npm ci
npm start          # http://localhost:3000/didisam-study/
npm run build      # 프로덕션 빌드 (깨진 링크가 있으면 실패)
npm run typecheck
```

## 구조

```text
blog/                 # 블로그 글 (YYYY-MM-DD-slug/index.mdx)
├── authors.yml       # 저자(멤버) 목록
└── tags.yml          # 사용 가능한 태그 목록
docs/                 # 스터디 노트 (폴더 = 트랙, 사이드바 자동 생성)
├── intro.mdx
├── frontend/ backend/ infra/ ai/ cs/
└── guide/            # 참여 가이드
src/
├── pages/index.tsx   # 홈
├── components/       # PostCard 등
├── data/tracks.ts    # 홈에 노출되는 트랙 정의
├── plugins/site-data.ts  # 최신 글·노트 수를 홈에 제공하는 로컬 플러그인
└── css/custom.css    # 테마 토큰 · 전역 스타일
```

## 배포

`main` 브랜치에 push하면 GitHub Actions(`.github/workflows/deploy.yml`)가 GitHub Pages로 배포합니다.
`main`으로 향하는 PR은 빌드만 검증합니다.

## 댓글 (giscus)

블로그 상세 글과 스터디 노트 하단에 [giscus](https://giscus.app/ko) 댓글을 표시합니다.
댓글은 `didisam/didisam-study` 저장소의 Discussions → Announcements에 저장됩니다.
저장소의 Discussions가 켜져 있어야 하며, [giscus GitHub App](https://github.com/apps/giscus)을
`Only select repositories` → `didisam-study` 대상으로 설치해야 합니다.

설정은 `src/components/Comments/index.tsx`에서 관리합니다. 한국어, 반응, 라이트·다크 모드를 지원하며,
페이지의 permalink로 토론을 구분합니다. 첫 댓글이나 반응을 남기면 토론이 생성됩니다.
글의 slug/permalink를 바꾸면 기존 댓글과 연결이 끊어지므로 기존 토론도 함께 이전해야 합니다.
로컬에서도 동일한 토론에 연결되므로 테스트 댓글은 실제 저장소에 남습니다.

특정 글에서 댓글을 숨기려면 MD/MDX front matter에 다음을 추가합니다.

```yaml
comments: false
```
