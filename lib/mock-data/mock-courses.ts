// ============================================
// FILE: lib/mock-data/mock-courses-extended.ts
// ============================================
// Extended mock data with 50 courses for pagination testing
// Copy this content to replace your mock-courses.ts

import { Course, Instructor, Section } from './types';

// ============================================
// INSTRUCTORS DATA (Extended)
// ============================================
export const MOCK_INSTRUCTORS: Record<string, Instructor> = {
  'instructor-1': {
    id: 'instructor-1',
    name: 'Võ Nhật Cường',
    avatar: '/images/instructor-avatar.jpg',
    bio: 'Chuyên gia AI và Machine Learning với hơn 10 năm kinh nghiệm',
    followers: 15000,
    courses: 12,
    posts: 45
  },
  'instructor-2': {
    id: 'instructor-2',
    name: 'Nguyễn Văn A',
    avatar: '/images/instructor1.jpg',
    bio: 'Full-stack developer và giảng viên Web Development',
    followers: 25000,
    courses: 18,
    posts: 67
  },
  'instructor-3': {
    id: 'instructor-3',
    name: 'Trần Thị B',
    avatar: '/images/instructor2.jpg',
    bio: 'Data Scientist và ML Engineer',
    followers: 18000,
    courses: 15,
    posts: 89
  },
  'instructor-4': {
    id: 'instructor-4',
    name: 'Lê Minh Tuấn',
    avatar: '/images/instructor-avatar.jpg',
    bio: 'Blockchain Developer và Smart Contract Expert',
    followers: 12000,
    courses: 10,
    posts: 34
  },
  'instructor-5': {
    id: 'instructor-5',
    name: 'Phạm Thu Hà',
    avatar: '/images/instructor1.jpg',
    bio: 'UI/UX Designer và Frontend Specialist',
    followers: 20000,
    courses: 14,
    posts: 56
  },
  'instructor-6': {
    id: 'instructor-6',
    name: 'Hoàng Văn Nam',
    avatar: '/images/instructor2.jpg',
    bio: 'DevOps Engineer và Cloud Architect',
    followers: 16000,
    courses: 11,
    posts: 42
  },
  'instructor-7': {
    id: 'instructor-7',
    name: 'Đặng Thị Lan',
    avatar: '/images/instructor-avatar.jpg',
    bio: 'Mobile Developer và React Native Expert',
    followers: 14000,
    courses: 9,
    posts: 38
  },
  'instructor-8': {
    id: 'instructor-8',
    name: 'Bùi Quang Huy',
    avatar: '/images/instructor1.jpg',
    bio: 'Cybersecurity Specialist và Ethical Hacker',
    followers: 22000,
    courses: 13,
    posts: 51
  }
};

// ============================================
// DETAILED SECTIONS FOR COURSES
// ============================================

// Courses 1-4: Existing sections (giữ nguyên từ file cũ)
const COURSE_1_SECTIONS: Section[] = [
  {
    id: '1',
    title: 'Giới thiệu về React và Next.js',
    duration: '1 giờ 15 phút',
    orderIndex: 1,
    lessons: [
      {
        id: '1-1',
        title: 'Tổng quan về React và ecosystem',
        duration: '25 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '1-2',
        title: 'Tài liệu: Cài đặt môi trường development',
        duration: '15 phút',
        type: 'text',
        status: 'completed',
        orderIndex: 2
      },
      {
        id: '1-3',
        title: 'Bài kiểm tra: Kiến thức cơ bản',
        duration: '10 phút',
        type: 'quiz',
        status: 'in-progress',
        orderIndex: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Components và Props',
    duration: '1 giờ 30 phút',
    orderIndex: 2,
    lessons: [
      {
        id: '2-1',
        title: 'Functional Components',
        duration: '30 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'available',
        orderIndex: 1
      },
      {
        id: '2-2',
        title: 'Tài liệu: Props và PropTypes',
        duration: '20 phút',
        type: 'text',
        status: 'available',
        orderIndex: 2
      },
      {
        id: '2-3',
        title: 'Bài tập: Xây dựng component',
        duration: '15 phút',
        type: 'quiz',
        status: 'locked',
        orderIndex: 3
      }
    ]
  }
];

// Course 5: Python Programming
const COURSE_5_SECTIONS: Section[] = [
  {
    id: '1',
    title: 'Python Basics',
    duration: '1 giờ',
    orderIndex: 1,
    lessons: [
      {
        id: '1-1',
        title: 'Cú pháp cơ bản và biến',
        duration: '20 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '1-2',
        title: 'Tài liệu: Data types và Operations',
        duration: '15 phút',
        type: 'text',
        status: 'completed',
        orderIndex: 2
      },
      {
        id: '1-3',
        title: 'Bài kiểm tra: Python Syntax',
        duration: '10 phút',
        type: 'quiz',
        status: 'available',
        orderIndex: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Functions và Modules',
    duration: '1 giờ 20 phút',
    orderIndex: 2,
    lessons: [
      {
        id: '2-1',
        title: 'Định nghĩa và sử dụng functions',
        duration: '25 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'available',
        orderIndex: 1
      },
      {
        id: '2-2',
        title: 'Tài liệu: Modules và Packages',
        duration: '18 phút',
        type: 'text',
        status: 'available',
        orderIndex: 2
      },
      {
        id: '2-3',
        title: 'Bài tập: Tạo module',
        duration: '12 phút',
        type: 'quiz',
        status: 'locked',
        orderIndex: 3
      }
    ]
  }
];

// Course 6: Docker và Kubernetes
const COURSE_6_SECTIONS: Section[] = [
  {
    id: '1',
    title: 'Docker Fundamentals',
    duration: '1 giờ 10 phút',
    orderIndex: 1,
    lessons: [
      {
        id: '1-1',
        title: 'Giới thiệu về Containerization',
        duration: '22 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '1-2',
        title: 'Tài liệu: Docker Commands',
        duration: '16 phút',
        type: 'text',
        status: 'available',
        orderIndex: 2
      },
      {
        id: '1-3',
        title: 'Quiz: Docker Basics',
        duration: '10 phút',
        type: 'quiz',
        status: 'available',
        orderIndex: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Kubernetes Orchestration',
    duration: '1 giờ 30 phút',
    orderIndex: 2,
    lessons: [
      {
        id: '2-1',
        title: 'K8s Architecture Overview',
        duration: '28 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'locked',
        orderIndex: 1
      },
      {
        id: '2-2',
        title: 'Tài liệu: Pods và Services',
        duration: '20 phút',
        type: 'text',
        status: 'locked',
        orderIndex: 2
      },
      {
        id: '2-3',
        title: 'Lab: Deploy ứng dụng',
        duration: '15 phút',
        type: 'quiz',
        status: 'locked',
        orderIndex: 3
      }
    ]
  }
];

// Course 7: React Native
const COURSE_7_SECTIONS: Section[] = [
  {
    id: '1',
    title: 'React Native Setup',
    duration: '50 phút',
    orderIndex: 1,
    lessons: [
      {
        id: '1-1',
        title: 'Cài đặt môi trường',
        duration: '18 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '1-2',
        title: 'Tài liệu: Expo vs React Native CLI',
        duration: '12 phút',
        type: 'text',
        status: 'available',
        orderIndex: 2
      },
      {
        id: '1-3',
        title: 'Quiz: Setup Knowledge',
        duration: '8 phút',
        type: 'quiz',
        status: 'available',
        orderIndex: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Building Mobile UI',
    duration: '1 giờ 25 phút',
    orderIndex: 2,
    lessons: [
      {
        id: '2-1',
        title: 'Core Components',
        duration: '30 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'locked',
        orderIndex: 1
      },
      {
        id: '2-2',
        title: 'Tài liệu: Styling trong RN',
        duration: '18 phút',
        type: 'text',
        status: 'locked',
        orderIndex: 2
      },
      {
        id: '2-3',
        title: 'Project: Tạo Todo App',
        duration: '20 phút',
        type: 'quiz',
        status: 'locked',
        orderIndex: 3
      }
    ]
  }
];

// Course 8: AWS Cloud
const COURSE_8_SECTIONS: Section[] = [
  {
    id: '1',
    title: 'AWS Core Services',
    duration: '1 giờ 15 phút',
    orderIndex: 1,
    lessons: [
      {
        id: '1-1',
        title: 'EC2 và S3 Overview',
        duration: '28 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '1-2',
        title: 'Tài liệu: IAM và Security',
        duration: '20 phút',
        type: 'text',
        status: 'available',
        orderIndex: 2
      },
      {
        id: '1-3',
        title: 'Quiz: AWS Fundamentals',
        duration: '12 phút',
        type: 'quiz',
        status: 'available',
        orderIndex: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Serverless Architecture',
    duration: '1 giờ 20 phút',
    orderIndex: 2,
    lessons: [
      {
        id: '2-1',
        title: 'Lambda Functions',
        duration: '26 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'locked',
        orderIndex: 1
      },
      {
        id: '2-2',
        title: 'Tài liệu: API Gateway',
        duration: '18 phút',
        type: 'text',
        status: 'locked',
        orderIndex: 2
      },
      {
        id: '2-3',
        title: 'Lab: Deploy Serverless App',
        duration: '15 phút',
        type: 'quiz',
        status: 'locked',
        orderIndex: 3
      }
    ]
  }
];

// Course 9: Cybersecurity
const COURSE_9_SECTIONS: Section[] = [
  {
    id: '1',
    title: 'Security Fundamentals',
    duration: '1 giờ',
    orderIndex: 1,
    lessons: [
      {
        id: '1-1',
        title: 'Threats và Vulnerabilities',
        duration: '24 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '1-2',
        title: 'Tài liệu: CIA Triad',
        duration: '14 phút',
        type: 'text',
        status: 'available',
        orderIndex: 2
      },
      {
        id: '1-3',
        title: 'Quiz: Security Concepts',
        duration: '10 phút',
        type: 'quiz',
        status: 'available',
        orderIndex: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Penetration Testing',
    duration: '1 giờ 35 phút',
    orderIndex: 2,
    lessons: [
      {
        id: '2-1',
        title: 'Ethical Hacking Basics',
        duration: '32 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'locked',
        orderIndex: 1
      },
      {
        id: '2-2',
        title: 'Tài liệu: Tools và Techniques',
        duration: '22 phút',
        type: 'text',
        status: 'locked',
        orderIndex: 2
      },
      {
        id: '2-3',
        title: 'Lab: Vulnerability Scan',
        duration: '18 phút',
        type: 'quiz',
        status: 'locked',
        orderIndex: 3
      }
    ]
  }
];

// Course 10: Flutter Development
const COURSE_10_SECTIONS: Section[] = [
  {
    id: '1',
    title: 'Flutter Introduction',
    duration: '55 phút',
    orderIndex: 1,
    lessons: [
      {
        id: '1-1',
        title: 'Dart Language Basics',
        duration: '20 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '1-2',
        title: 'Tài liệu: Flutter Widgets',
        duration: '15 phút',
        type: 'text',
        status: 'available',
        orderIndex: 2
      },
      {
        id: '1-3',
        title: 'Quiz: Dart và Flutter',
        duration: '8 phút',
        type: 'quiz',
        status: 'available',
        orderIndex: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Building Flutter Apps',
    duration: '1 giờ 30 phút',
    orderIndex: 2,
    lessons: [
      {
        id: '2-1',
        title: 'State Management',
        duration: '28 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'locked',
        orderIndex: 1
      },
      {
        id: '2-2',
        title: 'Tài liệu: Navigation',
        duration: '18 phút',
        type: 'text',
        status: 'locked',
        orderIndex: 2
      },
      {
        id: '2-3',
        title: 'Project: Weather App',
        duration: '22 phút',
        type: 'quiz',
        status: 'locked',
        orderIndex: 3
      }
    ]
  }
];

// Helper function để tạo sections template
const createGenericSections = (courseTitle: string): Section[] => [
  {
    id: '1',
    title: `Giới thiệu ${courseTitle}`,
    duration: '1 giờ',
    orderIndex: 1,
    lessons: [
      {
        id: '1-1',
        title: 'Tổng quan về khóa học',
        duration: '20 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '1-2',
        title: 'Tài liệu: Kiến thức nền tảng',
        duration: '15 phút',
        type: 'text',
        status: 'available',
        orderIndex: 2
      },
      {
        id: '1-3',
        title: 'Bài kiểm tra đầu vào',
        duration: '10 phút',
        type: 'quiz',
        status: 'available',
        orderIndex: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Thực hành nâng cao',
    duration: '1 giờ 30 phút',
    orderIndex: 2,
    lessons: [
      {
        id: '2-1',
        title: 'Kỹ thuật chuyên sâu',
        duration: '30 phút',
        type: 'video',
        videoType: 'server',
        videoUrl: '/video/demo.mp4',
        status: 'locked',
        orderIndex: 1
      },
      {
        id: '2-2',
        title: 'Tài liệu: Best Practices',
        duration: '20 phút',
        type: 'text',
        status: 'locked',
        orderIndex: 2
      },
      {
        id: '2-3',
        title: 'Dự án thực tế',
        duration: '15 phút',
        type: 'quiz',
        status: 'locked',
        orderIndex: 3
      }
    ]
  }
];

const createCompletedSections = (courseTitle: string): Section[] => [
  {
    id: '1',
    title: `Giới thiệu ${courseTitle}`,
    duration: '1 giờ',
    orderIndex: 1,
    lessons: [
      {
        id: '1-1',
        title: 'Tổng quan về khóa học',
        duration: '20 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '1-2',
        title: 'Tài liệu: Kiến thức nền tảng',
        duration: '15 phút',
        type: 'text',
        status: 'completed',
        orderIndex: 2
      },
      {
        id: '1-3',
        title: 'Bài kiểm tra đầu vào',
        duration: '10 phút',
        type: 'quiz',
        status: 'completed',
        orderIndex: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Thực hành nâng cao',
    duration: '1 giờ 30 phút',
    orderIndex: 2,
    lessons: [
      {
        id: '2-1',
        title: 'Kỹ thuật chuyên sâu',
        duration: '30 phút',
        type: 'video',
        videoType: 'youtube',
        videoUrl: 'Y02_eKMUXiM',
        status: 'completed',
        orderIndex: 1
      },
      {
        id: '2-2',
        title: 'Tài liệu: Best Practices',
        duration: '20 phút',
        type: 'text',
        status: 'completed',
        orderIndex: 2
      },
      {
        id: '2-3',
        title: 'Dự án thực tế',
        duration: '15 phút',
        type: 'quiz',
        status: 'completed',
        orderIndex: 3
      }
    ]
  }
];

// ============================================
// ALL COURSES DATA (50 courses)
// ============================================
export const MOCK_COURSES: Course[] = [
  // Course 1-4: Giữ nguyên từ file cũ
  {
    id: '1',
    title: 'Khóa học Ứng dụng AI cho Thanh niên Việt Nam',
    thumbnail: '/images/tech1.jpg',
    provider: 'Phổ cập AI',
    category: 'AI & Machine Learning',
    enrolled: 33223,
    rating: 5.0,
    level: 'Beginner',
    price: 0,
    isFree: true,
    isCompleted: false,
    sections: 2,
    lessons: 6,
    videoDuration: '2 giờ 45 phút',
    hasCertificate: true,
    description: 'Khám phá sức mạnh của AI trong thời đại số! Từ ChatGPT đến các công cụ AI tiên tiến.',
    instructor: MOCK_INSTRUCTORS['instructor-1'],
    lastUpdated: 'Cập nhật lần cuối 15 thg 11 năm 2024',
    objectives: [
      'Nắm vững các khái niệm cơ bản về AI',
      'Ứng dụng AI vào cuộc sống hàng ngày',
      'Sử dụng các công cụ AI phổ biến',
      'Phát triển tư duy sáng tạo với AI'
    ],
    sectionsDetailed: COURSE_1_SECTIONS,
    totalVideos: 2
  },
  {
    id: '2',
    title: 'Tập huấn Kỹ Năng GenAI Cho Cán Bộ Đoàn Hội',
    thumbnail: '/images/tech2.jpg',
    provider: 'Phổ cập AI',
    category: 'AI & Machine Learning',
    enrolled: 105128,
    rating: 5.0,
    level: 'Intermediate',
    price: 0,
    isFree: true,
    isCompleted: false,
    sections: 2,
    lessons: 6,
    videoDuration: '2 giờ 30 phút',
    hasCertificate: true,
    description: 'Nâng cao kỹ năng GenAI cho cán bộ đoàn hội.',
    instructor: MOCK_INSTRUCTORS['instructor-2'],
    lastUpdated: 'Cập nhật lần cuối 28 thg 10 năm 2024',
    objectives: [
      'Hiểu về GenAI và ứng dụng',
      'Tạo nội dung với AI',
      'Quản lý dự án với AI',
      'Tối ưu hóa công việc'
    ],
    sectionsDetailed: createGenericSections('GenAI'),
    totalVideos: 2
  },
  {
    id: '3',
    title: 'Nhập môn lập trình Blockchain',
    thumbnail: '/images/tech1.jpg',
    provider: 'OpenEdu',
    category: 'Blockchain',
    enrolled: 5413,
    rating: 4.8,
    level: 'Beginner',
    price: 0,
    isFree: true,
    isCompleted: false,
    sections: 2,
    lessons: 6,
    videoDuration: '3 giờ',
    hasCertificate: true,
    description: 'Học lập trình Blockchain từ cơ bản đến nâng cao.',
    instructor: MOCK_INSTRUCTORS['instructor-4'],
    lastUpdated: 'Cập nhật lần cuối 5 thg 12 năm 2024',
    objectives: [
      'Hiểu kiến trúc Blockchain',
      'Lập trình Smart Contract',
      'Deploy contract lên mạng',
      'Xây dựng DApp'
    ],
    sectionsDetailed: createGenericSections('Blockchain'),
    totalVideos: 2
  },
  {
    id: '4',
    title: 'ỨNG DỤNG AI TRONG CÔNG TÁC HÀNH CHÍNH VĂN PHÒNG',
    thumbnail: '/images/tech2.jpg',
    provider: 'VBI Academy',
    category: 'AI & Machine Learning',
    enrolled: 961,
    rating: 5.0,
    level: 'Beginner',
    price: 0,
    isFree: true,
    isCompleted: true,  // ✅ Đã hoàn thành
    sections: 2,
    lessons: 6,
    videoDuration: '2 giờ 15 phút',
    hasCertificate: true,
    description: 'Ứng dụng AI vào công việc văn phòng hiệu quả.',
    instructor: MOCK_INSTRUCTORS['instructor-3'],
    lastUpdated: 'Cập nhật lần cuối 20 thg 9 năm 2024',
    objectives: [
      'Tự động hóa công việc văn phòng',
      'Sử dụng AI cho email',
      'Tạo báo cáo tự động',
      'Quản lý thời gian hiệu quả'
    ],
    sectionsDetailed: createCompletedSections('AI Văn phòng'),  // ✅ All completed!
    totalVideos: 2
  },

  // Course 5-10: Có sections chi tiết
  {
    id: '5',
    title: 'Python Programming từ Zero đến Hero',
    thumbnail: '/images/tech1.jpg',
    provider: 'Code Master',
    category: 'Programming',
    enrolled: 45678,
    rating: 4.9,
    level: 'Beginner',
    price: 299000,
    isFree: false,
    isCompleted: false,
    sections: 2,
    lessons: 6,
    videoDuration: '2 giờ 20 phút',
    hasCertificate: true,
    description: 'Học Python từ cơ bản, phù hợp cho người mới bắt đầu lập trình.',
    instructor: MOCK_INSTRUCTORS['instructor-2'],
    lastUpdated: 'Cập nhật lần cuối 10 thg 12 năm 2024',
    objectives: [
      'Nắm vững cú pháp Python',
      'Lập trình hướng đối tượng',
      'Xử lý file và data',
      'Xây dựng ứng dụng thực tế'
    ],
    sectionsDetailed: COURSE_5_SECTIONS,
    totalVideos: 2
  },
  {
    id: '6',
    title: 'Docker và Kubernetes cho DevOps',
    thumbnail: '/images/tech2.jpg',
    provider: 'Tech Academy',
    category: 'DevOps',
    enrolled: 12345,
    rating: 4.7,
    level: 'Intermediate',
    price: 499000,
    isFree: false,
    isCompleted: false,
    sections: 2,
    lessons: 6,
    videoDuration: '2 giờ 40 phút',
    hasCertificate: true,
    description: 'Master containerization với Docker và orchestration với Kubernetes.',
    instructor: MOCK_INSTRUCTORS['instructor-6'],
    lastUpdated: 'Cập nhật lần cuối 18 thg 11 năm 2024',
    objectives: [
      'Hiểu về Container và Docker',
      'Deploy ứng dụng với K8s',
      'Quản lý cluster',
      'CI/CD với containers'
    ],
    sectionsDetailed: COURSE_6_SECTIONS,
    totalVideos: 2
  },
  {
    id: '7',
    title: 'React Native - Xây dựng App Mobile',
    thumbnail: '/images/tech1.jpg',
    provider: 'Dev School',
    category: 'Mobile Development',
    enrolled: 23456,
    rating: 4.8,
    level: 'Intermediate',
    price: 399000,
    isFree: false,
    isCompleted: false,
    sections: 2,
    lessons: 6,
    videoDuration: '2 giờ 15 phút',
    hasCertificate: true,
    description: 'Xây dựng ứng dụng mobile đa nền tảng với React Native.',
    instructor: MOCK_INSTRUCTORS['instructor-7'],
    lastUpdated: 'Cập nhật lần cuối 25 thg 11 năm 2024',
    objectives: [
      'Cài đặt môi trường RN',
      'Xây dựng UI components',
      'Navigation và routing',
      'Deploy lên Store'
    ],
    sectionsDetailed: COURSE_7_SECTIONS,
    totalVideos: 2
  },
  {
    id: '8',
    title: 'AWS Cloud Practitioner Essentials',
    thumbnail: '/images/tech2.jpg',
    provider: 'Cloud Academy',
    category: 'Cloud Computing',
    enrolled: 34567,
    rating: 4.9,
    level: 'Beginner',
    price: 0,
    isFree: true,
    isCompleted: false,
    sections: 2,
    lessons: 6,
    videoDuration: '2 giờ 35 phút',
    hasCertificate: true,
    description: 'Nền tảng AWS Cloud cho người mới bắt đầu.',
    instructor: MOCK_INSTRUCTORS['instructor-6'],
    lastUpdated: 'Cập nhật lần cuối 1 thg 12 năm 2024',
    objectives: [
      'Hiểu các dịch vụ AWS cơ bản',
      'Deploy ứng dụng lên cloud',
      'Quản lý security và IAM',
      'Tối ưu chi phí'
    ],
    sectionsDetailed: COURSE_8_SECTIONS,
    totalVideos: 2
  },
  {
    id: '9',
    title: 'Cybersecurity và Ethical Hacking',
    thumbnail: '/images/tech1.jpg',
    provider: 'Security Pro',
    category: 'Cybersecurity',
    enrolled: 15678,
    rating: 4.8,
    level: 'Advanced',
    price: 599000,
    isFree: false,
    isCompleted: false,
    sections: 2,
    lessons: 6,
    videoDuration: '2 giờ 35 phút',
    hasCertificate: true,
    description: 'Học về an ninh mạng và kỹ thuật ethical hacking.',
    instructor: MOCK_INSTRUCTORS['instructor-8'],
    lastUpdated: 'Cập nhật lần cuối 8 thg 12 năm 2024',
    objectives: [
      'Hiểu threats và vulnerabilities',
      'Penetration testing',
      'Security best practices',
      'Incident response'
    ],
    sectionsDetailed: COURSE_9_SECTIONS,
    totalVideos: 2
  },
  {
    id: '10',
    title: 'Flutter - Build Beautiful Apps',
    thumbnail: '/images/tech2.jpg',
    provider: 'Mobile Dev',
    category: 'Mobile Development',
    enrolled: 28901,
    rating: 4.7,
    level: 'Intermediate',
    price: 349000,
    isFree: false,
    isCompleted: false,
    sections: 2,
    lessons: 6,
    videoDuration: '2 giờ 25 phút',
    hasCertificate: true,
    description: 'Xây dựng ứng dụng mobile đẹp mắt với Flutter.',
    instructor: MOCK_INSTRUCTORS['instructor-7'],
    lastUpdated: 'Cập nhật lần cuối 15 thg 11 năm 2024',
    objectives: [
      'Dart language mastery',
      'Flutter widgets',
      'State management',
      'Deploy apps'
    ],
    sectionsDetailed: COURSE_10_SECTIONS,
    totalVideos: 2
  },

  // Courses 11-50: Template-based (để test pagination)
  ...Array.from({ length: 40 }, (_, i) => {
    const id = i + 11;
    const categories = ['AI & Machine Learning', 'Web Development', 'Mobile Development', 'Data Science', 'Blockchain', 'DevOps', 'Cybersecurity', 'Cloud Computing'];
    const levels: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];
    const category = categories[id % categories.length];
    const level = levels[id % levels.length];
    const isFree = id % 3 === 0;
    const instructorId = `instructor-${(id % 8) + 1}`;
    
    // ✅ FIX: Deterministic values instead of Math.random()
    const ratings = [4.5, 4.7, 4.8, 4.9, 5.0, 4.6, 4.4, 4.3];
    const rating = ratings[id % ratings.length];
    
    const baseEnrolled = 1000 + (id * 789);
    const enrolled = baseEnrolled % 50000;
    
    const basePrice = 100000 + (id * 12345);
    const price = isFree ? 0 : (basePrice % 500000) + 100000;
    
    const hours = (id % 3) + 1;
    const minutes = (id * 7) % 60;
    
    const isCompleted = id % 10 === 0;  // Course 20, 30, 40, 50 completed

    return {
      id: String(id),
      title: `${category} - Khóa học số ${id}`,
      thumbnail: `/images/tech${(id % 2) + 1}.jpg`,
      provider: ['VBI Academy', 'Tech Academy', 'Code Master', 'Dev School'][id % 4],
      category: category,
      enrolled: enrolled,
      rating: rating,
      level: level,
      price: price,
      isFree: isFree,
      isCompleted: isCompleted,
      sections: 2,
      lessons: 6,
      videoDuration: `${hours} giờ ${minutes} phút`,
      hasCertificate: id % 2 === 0,
      description: `Khóa học ${category} chuyên sâu với ${id} modules thực hành. Phù hợp cho level ${level}.`,
      instructor: MOCK_INSTRUCTORS[instructorId],
      lastUpdated: `Cập nhật lần cuối ${((id % 28) + 1)} thg ${((id % 12) + 1)} năm 2024`,
      objectives: [
        `Nắm vững kiến thức ${category}`,
        'Thực hành với dự án thực tế',
        'Xây dựng portfolio chuyên nghiệp',
        'Chuẩn bị cho công việc'
      ],
      // ✅ FIX: Dùng createCompletedSections nếu isCompleted = true
      sectionsDetailed: isCompleted 
        ? createCompletedSections(category)
        : createGenericSections(category),
      totalVideos: 2
    } as Course;
  })
];

// ============================================
// HELPER FUNCTIONS
// ============================================


export function getAllCourses(): Course[] {
  return MOCK_COURSES;
}

export function getCoursesByCategory(category: string): Course[] {
  return MOCK_COURSES.filter(course => course.category === category);
}


export function getFeaturedCourses(limit: number = 6): Course[] {
  return [...MOCK_COURSES]
    .sort((a, b) => b.enrolled - a.enrolled)
    .slice(0, limit);
}

export function getCoursesByLevel(level: 'Beginner' | 'Intermediate' | 'Advanced'): Course[] {
  return MOCK_COURSES.filter(course => course.level === level);
}

export function getFreeCourses(): Course[] {
  return MOCK_COURSES.filter(course => course.isFree);
}

export function getPaidCourses(): Course[] {
  return MOCK_COURSES.filter(course => !course.isFree);
}
// ============================================
// COURSE LOADING HELPERS (For Lesson Detail Page)
// ============================================

/**
 * Convert MOCK_COURSES array to map for O(1) lookup
 * Tạo map từ array để tăng performance khi tìm course theo ID
 */
const COURSES_MAP: Record<string, Course> = MOCK_COURSES.reduce((acc, course) => {
  acc[course.id] = course;
  return acc;
}, {} as Record<string, Course>);

/**
 * Get course by ID - QUAN TRỌNG NHẤT!
 * Lấy thông tin khóa học theo ID
 * 
 * @param courseId - ID của khóa học (string)
 * @returns Course object hoặc undefined nếu không tìm thấy
 * 
 * @example
 * const course = getCourseById('1');
 * if (course) {
 *   console.log(course.title);
 * }
 */
export function getCourseById(courseId: string): Course | undefined {
  return COURSES_MAP[courseId];
}

/**
 * Check if course exists
 * Kiểm tra xem khóa học có tồn tại không
 * 
 * @param courseId - ID của khóa học
 * @returns true nếu khóa học tồn tại
 */
export function courseExists(courseId: string): boolean {
  return courseId in COURSES_MAP;
}

/**
 * Get course with detailed sections
 * Lấy khóa học với sections chi tiết (cho lesson detail page)
 * 
 * @param courseId - ID của khóa học
 * @returns Course với sectionsDetailed hoặc undefined
 */
export function getCourseWithSections(courseId: string): Course | undefined {
  const course = COURSES_MAP[courseId];
  
  if (course && !course.sectionsDetailed) {
    console.warn(`Course ${courseId} không có sectionsDetailed`);
  }
  
  return course;
}

/**
 * Get instructor courses
 * Lấy tất cả khóa học của một giảng viên
 */
export function getInstructorCourses(instructorId: string): Course[] {
  return MOCK_COURSES.filter(course => course.instructor?.id === instructorId);
}

/**
 * Search courses by keyword
 * Tìm kiếm khóa học theo từ khóa (title, description, category)
 */
export function searchCourses(keyword: string): Course[] {
  const lowerKeyword = keyword.toLowerCase();
  
  return MOCK_COURSES.filter(course => 
    course.title.toLowerCase().includes(lowerKeyword) ||
    course.description.toLowerCase().includes(lowerKeyword) ||
    course.category.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * Get related courses
 * Lấy các khóa học liên quan (cùng category hoặc instructor)
 */
export function getRelatedCourses(courseId: string, limit: number = 4): Course[] {
  const course = COURSES_MAP[courseId];
  if (!course) return [];
  
  const related = MOCK_COURSES
    .filter(c => c.id !== courseId)
    .sort((a, b) => {
      if (a.category === course.category && a.instructor?.id === course.instructor?.id) {
        if (b.category === course.category && b.instructor?.id === course.instructor?.id) return 0;
        return -1;
      }
      if (b.category === course.category && b.instructor?.id === course.instructor?.id) return 1;
      
      if (a.category === course.category && b.category !== course.category) return -1;
      if (b.category === course.category && a.category !== course.category) return 1;
      
      if (a.instructor?.id === course.instructor?.id && b.instructor?.id !== course.instructor?.id) return -1;
      if (b.instructor?.id === course.instructor?.id && a.instructor?.id !== course.instructor?.id) return 1;
      
      return b.rating - a.rating;
    })
    .slice(0, limit);
  
  return related;
}

/**
 * Get course statistics
 * Lấy thống kê của khóa học
 */
export function getCourseStats(courseId: string): {
  totalSections: number;
  totalLessons: number;
  totalVideos: number;
  totalQuizzes: number;
  totalTextLessons: number;
  estimatedDuration: string;
} | null {
  const course = COURSES_MAP[courseId];
  if (!course || !course.sectionsDetailed) return null;
  
  let totalLessons = 0;
  let totalVideos = 0;
  let totalQuizzes = 0;
  let totalTextLessons = 0;
  
  course.sectionsDetailed.forEach(section => {
    totalLessons += section.lessons.length;
    
    section.lessons.forEach(lesson => {
      if (lesson.type === 'video') totalVideos++;
      else if (lesson.type === 'quiz') totalQuizzes++;
      else if (lesson.type === 'text') totalTextLessons++;
    });
  });
  
  return {
    totalSections: course.sectionsDetailed.length,
    totalLessons,
    totalVideos,
    totalQuizzes,
    totalTextLessons,
    estimatedDuration: course.videoDuration
  };
}

/**
 * Get multiple courses by IDs
 */
export function getCoursesByIds(courseIds: string[]): Course[] {
  return courseIds
    .map(id => COURSES_MAP[id])
    .filter((course): course is Course => course !== undefined);
}

/**
 * Get total courses count
 */
export function getTotalCoursesCount(): number {
  return MOCK_COURSES.length;
}

/**
 * Get all course IDs
 */
export function getAllCourseIds(): string[] {
  return Object.keys(COURSES_MAP);
}
// ============================================
// TYPE ADAPTER FOR PAGE.TSX COMPATIBILITY
// ============================================

/**
 * CourseForPage - Type tương thích với page.tsx
 * Simplified Course type để dùng trong lesson detail page
 */
export interface CourseForPage {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  objectives: string[];
  lastUpdated: string;
  sections: Section[];  // Use sectionsDetailed from mock Course
}

/**
 * Adapt Course for page.tsx compatibility
 * Convert Course từ mock-courses sang format page.tsx expect
 * 
 * @param course - Course object from MOCK_COURSES
 * @returns CourseForPage object
 * 
 * @example
 * const course = getCourseById('1');
 * const adapted = adaptCourseForPage(course);
 * // adapted.sections → từ course.sectionsDetailed
 */
export function adaptCourseForPage(course: Course): CourseForPage {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    instructor: course.instructor ? {
      id: course.instructor.id,
      name: course.instructor.name,
      avatar: course.instructor.avatar
    } : {
      id: 'unknown',
      name: 'Unknown Instructor',
      avatar: '/images/default-avatar.jpg'
    },
    objectives: course.objectives || [],
    lastUpdated: course.lastUpdated || 'Not updated',
    sections: course.sectionsDetailed || []
  };
}


/**
 * Get course by ID and adapt for page - ALL-IN-ONE HELPER
 * Kết hợp getCourseById + adaptCourseForPage
 * 
 * @param courseId - Course ID
 * @returns Adapted CourseForPage or undefined
 * 
 * @example
 * // ONE-LINER to get adapted course
 * const course = getCourseForPageById('1');
 * if (course) {
 *   course.sections.map(...)  // ✅ sections is array
 * }
 */
export function getCourseForPageById(courseId: string): CourseForPage | undefined {
  const course = getCourseById(courseId);
  return course ? adaptCourseForPage(course) : undefined;
}