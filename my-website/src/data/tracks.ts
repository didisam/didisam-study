/**
 * 스터디 트랙 목록. `dir`은 docs/ 하위 폴더 이름과 같아야 한다.
 * 트랙을 추가하려면 여기에 항목을 추가하고 docs/<dir>/ 폴더를 만들면 된다.
 */
export type Track = {
  dir: string;
  title: string;
  // 카드에 표시되는 짧은 약어
  short: string;
  description: string;
  keywords: string[];
};

export const tracks: Track[] = [
  {
    dir: 'frontend',
    title: 'Frontend',
    short: 'FE',
    description: '웹 플랫폼, React 생태계, 렌더링 성능과 사용자 경험',
    keywords: ['React', 'TypeScript', 'Web Perf'],
  },
  {
    dir: 'backend',
    title: 'Backend',
    short: 'BE',
    description: '서버 아키텍처, API 설계, 데이터베이스와 분산 시스템',
    keywords: ['Spring', 'Node.js', 'DB'],
  },
  {
    dir: 'infra',
    title: 'Infra & DevOps',
    short: 'OPS',
    description: '클라우드, 컨테이너, CI/CD, 모니터링과 운영 자동화',
    keywords: ['AWS', 'Kubernetes', 'CI/CD'],
  },
  {
    dir: 'ai',
    title: 'AI & Data',
    short: 'AI',
    description: 'LLM 활용, 데이터 파이프라인, ML 서비스 적용 사례',
    keywords: ['LLM', 'RAG', 'Data'],
  },
  {
    dir: 'cs',
    title: 'CS 기초',
    short: 'CS',
    description: '자료구조·알고리즘, 네트워크, 운영체제 등 기본기',
    keywords: ['Algorithm', 'Network', 'OS'],
  },
];
