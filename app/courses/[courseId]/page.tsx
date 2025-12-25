'use client';

import './courseId.css';
import { 
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  ChevronDownIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  PlayIcon,
  BookOpenIcon,
  HeartIcon,
  ShareIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

// ============================================
// IMPORT TYPES & DATA
// ============================================
import { Course } from '@/lib/mock-data/types';
import { getCourseById } from '@/lib/mock-data/mock-courses';

export default function CourseDetailPage() {
  // ============================================
  // GET PARAMS & LOAD DATA
  // ============================================
  const params = useParams();
  const courseId = params?.courseId as string;
  

  // LOAD COURSE FROM MOCK DATA
  // BACKEND TODO: Replace with API call GET /api/courses/:id
  const courseData = getCourseById(courseId);

  // ============================================
  // HANDLE COURSE NOT FOUND
  // ============================================
  if (!courseData) {
    return (
      <div className="error-container" style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Không tìm thấy khóa học
        </h1>
        <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
          Khóa học với ID "{courseId}" không tồn tại hoặc đã bị xóa.
        </p>
        <a 
          href="/courses" 
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1e3a8a',
            color: 'white',
            borderRadius: '0.5rem',
            textDecoration: 'none'
          }}
        >
          ← Quay lại danh sách khóa học
        </a>
      </div>
    );
  }

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // ============================================
  // CALCULATE PROGRESS
  // ============================================
  useEffect(() => {
    if (courseData.isCompleted) {
      setProgress(100);
      return;
    }
    
    if (!courseData.sectionsDetailed) {
      setProgress(0);
      return;
    }
    
    const allLessons = courseData.sectionsDetailed.flatMap(section => section.lessons);
    const completedLessons = allLessons.filter(lesson => lesson.status === 'completed').length;
    const progressPercentage = allLessons.length > 0 
      ? Math.round((completedLessons / allLessons.length) * 100)
      : 0;
    setProgress(progressPercentage);
  }, [courseData]);

  // ============================================
  // LOAD FAVORITE STATUS
  // ============================================
  useEffect(() => {
    const favorites = localStorage.getItem('courseFavorites');
    if (favorites) {
      const favArray = JSON.parse(favorites);
      setIsFavorite(favArray.includes(courseId));
    }
  }, [courseId]);

  // ============================================
  // HANDLERS
  // ============================================
  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const toggleFavorite = () => {
    const favorites = localStorage.getItem('courseFavorites');
    let favArray: string[] = favorites ? JSON.parse(favorites) : [];
    
    if (isFavorite) {
      favArray = favArray.filter(id => id !== courseId);
    } else {
      favArray.push(courseId);
    }
    
    localStorage.setItem('courseFavorites', JSON.stringify(favArray));
    setIsFavorite(!isFavorite);
  };

  const getFirstAvailableLesson = () => {
    if (!courseData.sectionsDetailed || courseData.sectionsDetailed.length === 0) {
      return { lessonId: '1-1' };
    }
    
    for (const section of courseData.sectionsDetailed) {
      for (const lesson of section.lessons) {
        if (lesson.status !== 'completed') {
          return { lessonId: lesson.id };
        }
      }
    }
    
    // If all completed, return first lesson
    const firstSection = courseData.sectionsDetailed[0];
    return { 
      lessonId: firstSection.lessons[0].id 
    };
  };

  const firstLesson = getFirstAvailableLesson();

  // ============================================
  // RENDER LESSON ICON BY TYPE
  // ============================================
  const renderLessonIcon = (type: 'video' | 'text' | 'quiz') => {
    switch (type) {
      case 'video':
        return <VideoCameraIcon className="lesson-icon video" />;
      case 'text':
        return <DocumentTextIcon className="lesson-icon text" />;
      case 'quiz':
        return <QuestionMarkCircleIcon className="lesson-icon quiz" />;
      default:
        return <VideoCameraIcon className="lesson-icon video" />;
    }
  };

  // ============================================
  // RENDER LESSON STATUS
  // ============================================
  const renderLessonStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="lesson-status completed">
            <CheckCircleIcon className="status-icon" />
            <span>Đã học</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="lesson-status in-progress">
            <PlayIcon className="status-icon" />
            <span>Đang học</span>
          </div>
        );
      case 'available':
        return (
          <div className="lesson-status not-started">
            <ClockIcon className="status-icon" />
            <span>Chưa học</span>
          </div>
        );
      default:
        return null;
    }
  };

  // ============================================
  // GET TOTAL LESSONS COUNT
  // ============================================
  const totalLessons = courseData.sectionsDetailed
    ? courseData.sectionsDetailed.reduce((acc, section) => acc + section.lessons.length, 0)
    : courseData.lessons;

  const completedLessonsCount = courseData.isCompleted
    ? totalLessons
    : courseData.sectionsDetailed
    ? courseData.sectionsDetailed.flatMap(s => s.lessons).filter(l => l.status === 'completed').length
    : 0;


  const totalVideoLessons = courseData.sectionsDetailed
    ? courseData.sectionsDetailed.flatMap(s => s.lessons).filter(l => l.type === 'video').length
    : courseData.totalVideos || 0;

  const totalQuizzes = courseData.sectionsDetailed
    ? courseData.sectionsDetailed.flatMap(s => s.lessons).filter(l => l.type === 'quiz').length
    : 0;

  return (
    <div className="course-detail-page">
      {/* ============================================ */}
      {/* HERO HEADER */}
      {/* ============================================ */}
      <section className="course-hero">
        <div className="hero-container">
          <h1 className="course-title">{courseData.title}</h1>
          
          <p className="course-description">{courseData.description}</p>

          <div className="course-meta-bar">
            <div className="meta-badge">
              <AcademicCapIcon className="meta-badge-icon" />
              <span>{courseData.level}</span>
            </div>
            <div className="meta-badge">
              <UserGroupIcon className="meta-badge-icon" />
              <span>{courseData.enrolled} Người học</span>
            </div>
          </div>

          {courseData.instructor && (
            <div className="instructor-section">
              <span className="instructor-label">Giảng viên:</span>
              <a 
                href={`/instructors/${courseData.instructor.id}`} 
                className="instructor-link"
              >
                <img 
                  src={courseData.instructor.avatar} 
                  alt={courseData.instructor.name}
                  className="instructor-avatar"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
                  }}
                />
                <span>{courseData.instructor.name}</span>
              </a>
            </div>
          )}

          {courseData.lastUpdated && (
            <div className="last-updated">
              <CalendarIcon className="calendar-icon" />
              <span>{courseData.lastUpdated}</span>
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* MAIN CONTENT AREA */}
      {/* ============================================ */}
      <div className="content-wrapper">
        <div className="main-content">
          {/* Learning Objectives */}
          {courseData.objectives && courseData.objectives.length > 0 && (
            <section className="objectives-section">
              <h2 className="section-title">Bạn Sẽ Nhận Được Gì Từ Khóa Học</h2>
              <div className="objectives-list">
                {courseData.objectives.map((objective, index) => (
                  <div key={index} className="objective-item">
                    <CheckCircleIcon className="objective-icon" />
                    <p className="objective-text">{objective}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Course Info */}
          <section className="course-info-section">
            <h2 className="section-title">Thông Tin Chi Tiết</h2>
            <div className={`info-content ${showFullDescription ? '' : 'collapsed'}`}>
              <p className="info-text">
                <strong>{courseData.title}</strong>
              </p>
              <p className="info-text" style={{ marginTop: '1rem' }}>
                <strong>Giới thiệu:</strong> {courseData.description}
              </p>
              <p className="info-text" style={{ marginTop: '1rem' }}>
                <strong>Đối tượng học viên:</strong> Khóa học được thiết kế dành cho những người muốn nâng cao kỹ năng trong lĩnh vực này.
              </p>
              <p className="info-text" style={{ marginTop: '1rem' }}>
                <strong>Sau khóa học, học viên sẽ:</strong> Nắm vững các kiến thức và kỹ năng cần thiết để áp dụng vào thực tế công việc.
              </p>
            </div>
            <button 
              className={`show-more-btn ${showFullDescription ? 'expanded' : ''}`}
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              <span>{showFullDescription ? 'Thu gọn' : 'Xem thêm'}</span>
              <ChevronDownIcon className="show-more-icon" />
            </button>
          </section>

          {/* Instructor Info */}
          {courseData.instructor && (
            <section className="instructor-info-section">
              <h2 className="section-title">Thông Tin Giảng Viên</h2>
              <div className="instructor-card">
                <img 
                  src={courseData.instructor.avatar} 
                  alt={courseData.instructor.name}
                  className="instructor-avatar-large"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/128';
                  }}
                />
                <div className="instructor-details">
                  <h3 className="instructor-name">
                    <a 
                      href={`/instructors/${courseData.instructor.id}`}
                      className="instructor-name-link"
                    >
                      {courseData.instructor.name}
                    </a>
                  </h3>
                  <div className="instructor-stats">
                    <div className="instructor-stat">
                      <span className="stat-value">{courseData.instructor.followers}</span>
                      <span>Người theo dõi</span>
                    </div>
                    <div className="instructor-stat">
                      <span className="stat-value">{courseData.instructor.courses}</span>
                      <span>Khóa học</span>
                    </div>
                    <div className="instructor-stat">
                      <span className="stat-value">{courseData.instructor.posts}</span>
                      <span>Bài viết</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Course Curriculum */}
          {courseData.sectionsDetailed && courseData.sectionsDetailed.length > 0 && (
            <section className="curriculum-section">
              <h2 className="section-title">Nội Dung Khóa Học</h2>
              <div className="curriculum-list">
                {courseData.sectionsDetailed.map((section) => (
                  <div 
                    key={section.id}
                    className={`section-accordion ${activeSection === section.id ? 'active' : ''}`}
                  >
                    <div 
                      className="section-header"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="section-header-left">
                        <span className="section-number">Phần {section.id}:</span>
                        <span className="section-name">{section.title}</span>
                      </div>
                      <div className="section-header-right">
                        <span className="section-meta">
                          {section.lessons.length} bài học • {section.duration}
                        </span>
                        <ChevronDownIcon className="chevron-icon" />
                      </div>
                    </div>

                    <div className="lessons-list">
                      {section.lessons.map((lesson) => (
                        <a
                          key={lesson.id}
                          href={`/courses/${courseId}/${lesson.id}`}
                          className="lesson-item"
                        >
                          {renderLessonIcon(lesson.type)}
                          <div className="lesson-details">
                            <div className="lesson-title">{lesson.title}</div>
                            <div className="lesson-duration">
                              <ClockIcon style={{ width: '0.875rem', height: '0.875rem', display: 'inline', marginRight: '0.25rem' }} />
                              {lesson.duration}
                            </div>
                          </div>
                          {renderLessonStatus(lesson.status)}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Support Section */}
          <section className="support-section">
            <h2 className="section-title">Kênh Hỗ Trợ</h2>
            <a href="https://zalo.me/g/nhricoqj987" className="support-link" target="_blank" rel="noopener noreferrer">
              <ChatBubbleLeftRightIcon className="support-icon" />
              <span>zalo.me/g/nhricoqj987</span>
            </a>
          </section>
        </div>

        {/* ============================================ */}
        {/* SIDEBAR */}
        {/* ============================================ */}
        <aside className="sidebar">
          {/* Course Card */}
          <div className="course-card-widget">
            <div className="card-thumbnail">
              <img 
                src={courseData.thumbnail} 
                alt={courseData.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200/1e3a8a/ffffff?text=Course+Thumbnail';
                }}
              />
            </div>
            <div className="card-content">
              <h3 className="card-section-title">Khóa Học Bao Gồm:</h3>
              <div className="card-info-list">
                <div className="card-info-item">
                  <BookOpenIcon className="card-info-icon" />
                  <span>{courseData.sections} Phần, {totalLessons} Bài học</span>
                </div>
                <div className="card-info-item">
                  <VideoCameraIcon className="card-info-icon" />
                  <span>{totalVideoLessons} bài giảng video</span>
                </div>
                {totalQuizzes > 0 && (
                  <div className="card-info-item">
                    <QuestionMarkCircleIcon className="card-info-icon" />
                    <span>{totalQuizzes} bài kiểm tra</span>
                  </div>
                )}
                {courseData.hasCertificate && (
                  <div className="card-info-item">
                    <DocumentTextIcon className="card-info-icon" />
                    <span>Giấy chứng nhận hoàn thành</span>
                  </div>
                )}
              </div>
              <div className="card-actions">
                <a 
                  href={`/courses/${courseId}/${firstLesson.lessonId}`}
                  className="btn-start"
                >
                  <PlayIcon className="btn-icon" />
                  Bắt đầu khóa học
                </a>
                <button 
                  className={`btn-favorite ${isFavorite ? 'active' : ''}`}
                  onClick={toggleFavorite}
                  title={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="btn-favorite-icon" />
                  ) : (
                    <HeartIcon className="btn-favorite-icon" />
                  )}
                </button>
                <button 
                  className="btn-share"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: courseData.title,
                        text: courseData.description,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Đã sao chép link khóa học!');
                    }
                  }}
                  title="Chia sẻ"
                >
                  <ShareIcon className="btn-share-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Widget */}
          <div className="progress-widget">
            <div className="progress-header">
              <span className="progress-title">Tiến độ học tập</span>
              <span className="progress-percentage">{progress}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-stats">
              <span>{completedLessonsCount} / {totalLessons} bài học</span>
              <span>Hoàn thành</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}