// ============================================
// FILE: lib/mock-data/types.ts
// ============================================
// TypeScript interfaces for the course system
// These types will be used across all components and API integrations

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  status: 'completed' | 'in-progress' | 'available' | 'locked';
  orderIndex?: number;
  
  // Video fields
  videoUrl?: string;
  videoType?: 'youtube' | 'server';
  
  // Text fields
  content?: string;
  textContent?: string;
  
  // Quiz fields
  quizId?: string;
  quizData?: any;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
  orderIndex?: number;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  followers: number;
  courses: number;
  posts: number;
}

// ============================================
// COURSE INTERFACE - Used in both list and detail pages
// ============================================
export interface Course {
  // Basic Info
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  
  // Classification
  provider: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  
  // Stats
  enrolled: number;
  rating: number;
  
  // Pricing
  price: number;
  isFree: boolean;
  
  // Structure (for list page)
  sections: number;        // Total number of sections
  lessons: number;         // Total number of lessons
  videoDuration: string;
  hasCertificate: boolean;
  
  // Status
  isCompleted?: boolean;
  
  // Detailed Info (for detail page)
  instructor?: Instructor;
  lastUpdated?: string;
  objectives?: string[];
  sectionsDetailed?: Section[];  // Full section data with lessons
  totalVideos?: number;
}

// ============================================
// API & BACKEND INTEGRATION TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UserLessonProgress {
  userId: string;
  lessonId: string;
  status: 'completed' | 'in-progress' | 'available';
  completedAt?: string;
  lastAccessedAt?: string;
  progress?: number;
}

export interface UserCourseProgress {
  userId: string;
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  lastAccessedAt: string;
  enrolledAt: string;
}

// ============================================
// FILTER & SEARCH TYPES
// ============================================

export interface CourseFilters {
  category?: string;
  level?: string;
  provider?: string;
  hasCertificate?: boolean;
  search?: string;
}

export interface CourseSearchParams {
  query: string;
  filters?: CourseFilters;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'enrolled' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}