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
