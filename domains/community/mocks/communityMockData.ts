import {
  PostListType,
  PostTagType,
  PostListResponseDto,
  PostTagListResponseDto,
  PostDetailType,
  PostDetailResponseDto
} from '../types';

// 게시글 목록 mock data
export const mockPostList: PostListType[] = [
  {
    createId: 'user123',
    createDt: '2024-01-15T10:30:00Z',
    updateDt: '2024-01-15T10:30:00Z',
    idx: '1',
    boardIdx: 1,
    title: '새해 목표 공유해요! 🎯',
    like: 24,
    viewCount: 156,
    tags: ['새해목표', '동기부여', '성장'],
    images: ['https://picsum.photos/400/300?random=1'],
    useYn: 'Y'
  },
  {
    createId: 'user456',
    createDt: '2024-01-14T15:45:00Z',
    updateDt: '2024-01-14T15:45:00Z',
    idx: '2',
    boardIdx: 1,
    title: '운동 루틴 추천 부탁드려요',
    like: 18,
    viewCount: 89,
    tags: ['운동', '헬스', '루틴'],
    images: [],
    useYn: 'Y'
  },
  {
    createId: 'user789',
    createDt: '2024-01-14T09:20:00Z',
    updateDt: '2024-01-14T09:20:00Z',
    idx: '3',
    boardIdx: 1,
    title: '독서 모임 멤버 모집합니다 📚',
    like: 31,
    viewCount: 203,
    tags: ['독서', '모임', '책'],
    images: [
      'https://picsum.photos/400/300?random=2',
      'https://picsum.photos/400/300?random=3'
    ],
    useYn: 'Y'
  },
  {
    createId: 'user101',
    createDt: '2024-01-13T20:15:00Z',
    updateDt: '2024-01-13T20:15:00Z',
    idx: '4',
    boardIdx: 1,
    title: '맛집 추천 받습니다!',
    like: 12,
    viewCount: 67,
    tags: ['맛집', '음식', '추천'],
    images: ['https://picsum.photos/400/300?random=4'],
    useYn: 'Y'
  },
  {
    createId: 'user202',
    createDt: '2024-01-13T14:30:00Z',
    updateDt: '2024-01-13T14:30:00Z',
    idx: '5',
    boardIdx: 1,
    title: '프로그래밍 스터디 같이 하실 분?',
    like: 45,
    viewCount: 312,
    tags: ['프로그래밍', '스터디', '개발'],
    images: [],
    useYn: 'Y'
  },
  {
    createId: 'user303',
    createDt: '2024-01-12T11:45:00Z',
    updateDt: '2024-01-12T11:45:00Z',
    idx: '6',
    boardIdx: 1,
    title: '여행 계획 세우는 팁 공유',
    like: 28,
    viewCount: 145,
    tags: ['여행', '계획', '팁'],
    images: ['https://picsum.photos/400/300?random=5'],
    useYn: 'Y'
  },
  {
    createId: 'user404',
    createDt: '2024-01-12T08:20:00Z',
    updateDt: '2024-01-12T08:20:00Z',
    idx: '7',
    boardIdx: 1,
    title: '취미로 시작한 요리 레시피 공유',
    like: 19,
    viewCount: 98,
    tags: ['요리', '레시피', '취미'],
    images: [
      'https://picsum.photos/400/300?random=6',
      'https://picsum.photos/400/300?random=7'
    ],
    useYn: 'Y'
  },
  {
    createId: 'user505',
    createDt: '2024-01-11T16:10:00Z',
    updateDt: '2024-01-11T16:10:00Z',
    idx: '8',
    boardIdx: 1,
    title: '반려동물 키우시는 분들 모여요 🐕',
    like: 37,
    viewCount: 189,
    tags: ['반려동물', '펫', '커뮤니티'],
    images: ['https://picsum.photos/400/300?random=8'],
    useYn: 'Y'
  },
  {
    createId: 'user606',
    createDt: '2024-01-11T13:25:00Z',
    updateDt: '2024-01-11T13:25:00Z',
    idx: '9',
    boardIdx: 1,
    title: '영화 추천 받습니다',
    like: 15,
    viewCount: 76,
    tags: ['영화', '추천', '엔터테인먼트'],
    images: [],
    useYn: 'Y'
  },
  {
    createId: 'user707',
    createDt: '2024-01-10T19:40:00Z',
    updateDt: '2024-01-10T19:40:00Z',
    idx: '10',
    boardIdx: 1,
    title: '주말 등산 같이 가실 분 계신가요?',
    like: 22,
    viewCount: 134,
    tags: ['등산', '주말', '아웃도어'],
    images: ['https://picsum.photos/400/300?random=9'],
    useYn: 'Y'
  }
];

// 태그 목록 mock data
export const mockPostTags: PostTagType[] = [
  { name: '새해목표' },
  { name: '동기부여' },
  { name: '성장' },
  { name: '운동' },
  { name: '헬스' },
  { name: '루틴' },
  { name: '독서' },
  { name: '모임' },
  { name: '책' },
  { name: '맛집' },
  { name: '음식' },
  { name: '추천' },
  { name: '프로그래밍' },
  { name: '스터디' },
  { name: '개발' },
  { name: '여행' },
  { name: '계획' },
  { name: '팁' },
  { name: '요리' },
  { name: '레시피' },
  { name: '취미' },
  { name: '반려동물' },
  { name: '펫' },
  { name: '커뮤니티' },
  { name: '영화' },
  { name: '엔터테인먼트' },
  { name: '등산' },
  { name: '주말' },
  { name: '아웃도어' },
  { name: '건강' },
  { name: '라이프스타일' },
  { name: '자기계발' }
];

// 게시글 상세 mock data
export const mockPostDetail: PostDetailType = {
  createId: 'user123',
  createDt: '2024-01-15T10:30:00Z',
  updateDt: '2024-01-15T10:30:00Z',
  idx: '1',
  boardIdx: 1,
  title: '새해 목표 공유해요! 🎯',
  content: `안녕하세요! 새해가 시작된 지 벌써 반 달이 지났네요.

올해 세운 목표들을 공유하고 서로 응원해주면 좋을 것 같아서 글을 올려봅니다.

저의 2024년 목표는:
1. 매일 30분 이상 운동하기 💪
2. 한 달에 책 2권 이상 읽기 📚
3. 새로운 기술 스택 하나 마스터하기 💻
4. 건강한 식습관 만들기 🥗

여러분의 목표도 댓글로 공유해주세요!
함께 응원하며 목표를 달성해봐요 ✨

#새해목표 #동기부여 #성장`,
  like: 24,
  viewCount: 156,
  tags: ['새해목표', '동기부여', '성장'],
  images: ['https://picsum.photos/400/300?random=1'],
  useYn: 'Y'
};

// API 응답 형태의 mock data 생성 함수들
export const createMockPostListResponse = (
  posts: PostListType[] = mockPostList,
  page: number = 1,
  size: number = 10,
  totalPosts?: PostListType[]
): PostListResponseDto => {
  // 전체 포스트 배열이 제공되지 않은 경우 기본 mock data 사용
  const allPosts = totalPosts || posts;
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  return {
    data: paginatedPosts,
    pagination: {
      totalItem: allPosts.length,
      totalPage: Math.ceil(allPosts.length / size),
      size,
      page
    },
    message: 'Success',
    timeStamp: new Date().toISOString()
  };
};

export const createMockPostTagListResponse = (
  tags: PostTagType[] = mockPostTags,
  searchTerm?: string
): PostTagListResponseDto => {
  let filteredTags = tags;

  if (searchTerm) {
    filteredTags = tags.filter(tag =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return {
    data: filteredTags,
    message: 'Success',
    statusCode: 200,
    timeStamp: new Date().toISOString()
  };
};

export const createMockPostDetailResponse = (
  post: PostDetailType = mockPostDetail
): PostDetailResponseDto => {
  return {
    data: [post],
    message: 'Success',
    statusCode: 200,
    timeStamp: new Date().toISOString()
  };
};

// 추가 mock data 생성 유틸리티
export const generateMoreMockPosts = (
  count: number,
  startIdx: number = mockPostList.length + 1
): PostListType[] => {
  const additionalPosts: PostListType[] = [];
  const baseTopics = [
    '일상 공유',
    '질문 있어요',
    '정보 공유',
    '후기 남겨요',
    '추천 부탁드려요',
    '같이 해요',
    '도움 요청',
    '경험담',
    '팁 공유',
    '모임 모집',
    '취미 생활',
    '건강 관리',
    '자기계발',
    '여가 활동',
    '스포츠'
  ];

  const baseTags = [
    ['일상', '소통'],
    ['질문', '도움'],
    ['정보', '공유'],
    ['후기', '리뷰'],
    ['추천', '의견'],
    ['모임', '함께'],
    ['도움', '요청'],
    ['경험', '이야기'],
    ['팁', '노하우'],
    ['모집', '참여'],
    ['취미', '라이프스타일'],
    ['건강', '운동'],
    ['자기계발', '성장'],
    ['여가', '휴식'],
    ['스포츠', '활동']
  ];

  for (let i = 0; i < count; i++) {
    const topicIndex = i % baseTopics.length;
    const randomId = Math.floor(Math.random() * 1000) + 100;
    const randomLikes = Math.floor(Math.random() * 50) + 1;
    const randomViews = Math.floor(Math.random() * 200) + 10;
    const hasImages = Math.random() > 0.6;
    const imageCount = hasImages ? Math.floor(Math.random() * 3) + 1 : 0;

    const images = [];
    for (let j = 0; j < imageCount; j++) {
      images.push(`https://picsum.photos/400/300?random=${randomId + j}`);
    }

    additionalPosts.push({
      createId: `user${randomId}`,
      createDt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updateDt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      idx: (startIdx + i).toString(),
      boardIdx: 1,
      title: `${baseTopics[topicIndex]} ${Math.floor(Math.random() * 100) + 1}`,
      like: randomLikes,
      viewCount: randomViews,
      tags: baseTags[topicIndex],
      images,
      useYn: 'Y'
    });
  }

  return additionalPosts;
};

// 대량의 mock data 생성 (무한 스크롤 테스트용)
export const generateLargeMockDataSet = (
  totalCount: number = 100
): PostListType[] => {
  const additionalPosts = generateMoreMockPosts(
    totalCount - mockPostList.length
  );
  return [...mockPostList, ...additionalPosts];
};
