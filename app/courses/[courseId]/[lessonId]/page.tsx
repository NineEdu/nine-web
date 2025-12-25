'use client';

import './lessonId.css';
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  CalendarIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';

// ============================================
// IMPORT DATA FROM SEPARATE FILES
// ============================================
import type { 
  Quiz, 
  QuizQuestion
} from '@/lib/mock-data/mock-quizzes';
import {
  QUIZ_BLOCKCHAIN_BASIC,
  QUIZ_BLOCKCHAIN_ADVANCED 
} from '@/lib/mock-data/mock-quizzes';

import { getCourseForPageById, type CourseForPage } from '@/lib/mock-data/mock-courses';
import type { Section, Lesson } from '@/lib/mock-data/types';

// ============================================
// TYPES
  // ============================================
  // DATA STRUCTURE - BACKEND READY
  // ============================================
  // Current lesson status values:
  // - 'completed': User has finished this lesson
  // - 'in-progress': User is currently working on this
  // - 'available': User can access this lesson
  // - 'locked': User cannot access (previous lessons incomplete)
  //
  // Backend API should return lessons with these status values
  // based on user's progress. Frontend will use these to:
  // 1. Show green checkmark for completed
  // 2. Disable navigation for locked lessons
  // 3. Track overall course progress
  // ============================================

export default function LessonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;
  const sectionId = params?.sectionId as string;
  const lessonId = params?.lessonId as string;

  // ============================================
  // STATE
  // ============================================
  const [currentCourse, setCurrentCourse] = useState<CourseForPage | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [nextLessonInfo, setNextLessonInfo] = useState<{ sectionId: string; lessonId: string } | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number | number[] }>({});
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0, percentage: 0, passed: false });
  const [showExplanations, setShowExplanations] = useState(false);
  
  // Video completion tracking
  const [videoCompleted, setVideoCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const youtubePlayerRef = useRef<any>(null);
  const [videoProgress, setVideoProgress] = useState(0);

  // Course completion state
  const [showCourseCompletionModal, setShowCourseCompletionModal] = useState(false);

  // ============================================
  // LOAD COURSE BY ID
  // ============================================
  useEffect(() => {
    const course = getCourseForPageById(courseId);
    setCurrentCourse(course || null);
    
    if (!course) {
      console.error(`Course ${courseId} not found`);
    }
  }, [courseId]);

  

  // ============================================
  // LOAD LESSON
  // ============================================
  useEffect(() => {
    if (!currentCourse) {
      setCurrentLesson(null);
      return;
    }

    // Tìm lesson trong TẤT CẢ sections của course hiện tại
    let foundLesson: Lesson | null = null;
    
    for (const section of currentCourse.sections) {
      const lesson = section.lessons.find(l => l.id === lessonId);
      if (lesson) {
        foundLesson = lesson;
        break;
      }
    }
    
    
    // ✅ Assign quiz data for quiz type lessons
    if (foundLesson && foundLesson.type === 'quiz') {
      // Import all quizzes at the top:
      // QUIZ_BLOCKCHAIN_BASIC, QUIZ_BLOCKCHAIN_ADVANCED,
      // QUIZ_SMART_CONTRACT_BASIC, QUIZ_SOLIDITY_ADVANCED,
      // QUIZ_WEB3_BASIC, QUIZ_NFT_BASIC
      
      // Map based on lesson ID pattern
      if (lessonId === '1-3') {
        // Section 1 quizzes (Basic level)
        foundLesson.quizData = QUIZ_BLOCKCHAIN_BASIC;
      } else if (lessonId === '2-3') {
        // Section 2 quizzes (Advanced level)
        foundLesson.quizData = QUIZ_BLOCKCHAIN_ADVANCED;
      } else {
        // Fallback for any other quiz lessons
        foundLesson.quizData = QUIZ_BLOCKCHAIN_BASIC;
      }
      
      // Optional: Log for debugging
      console.log(`Quiz assigned: ${lessonId} → ${foundLesson.quizData?.title}`);
    }
    
    setCurrentLesson(foundLesson);
    
    // Reset states when lesson changes
    setVideoCompleted(false);
    setShowQuizResult(false);
    setShowExplanations(false);
    setQuizAnswers({});
    if (!foundLesson) {
      console.error(`Lesson ${lessonId} not found in course ${courseId}`);
    }
  }, [currentCourse, lessonId]);  // ✅ Depend vào currentCourse và lessonId

  // ============================================
  // HANDLERS
  // ============================================
  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // ============================================
  // BACKEND INTEGRATION NOTE:
  // ============================================
  // TODO: When integrating with backend API:
  // 1. Replace direct status mutation with API call
  // 2. Send completion data: { userId, courseId, lessonId, completedAt }
  // 3. Update local state after successful API response
  // 4. Handle errors and show appropriate messages
  // Example:
  // await api.post('/api/lesson/complete', {
  //   userId: user.id,
  //   courseId,
  //   lessonId: currentLesson.id,
  //   lessonType: currentLesson.type,
  //   completedAt: new Date().toISOString()
  // });
  // ============================================
  const markAsCompleted = () => {
    if (currentLesson) {
      currentLesson.status = 'completed';
      
      // Check if this is the last lesson
      if (isLastLesson()) {
        // Show course completion modal instead of toast
        setTimeout(() => {
          setShowCourseCompletionModal(true);
        }, 1000); // Delay to show regular toast first
      } else {
        // Regular lesson completion toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    }
  };

  // Check if current lesson is the last lesson in the course
  const isLastLesson = (): boolean => {
    if (!currentCourse || !currentLesson) return false;
    
    const allLessons: Lesson[] = [];
    currentCourse.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        allLessons.push(lesson);
      });
    });

    // Get the last lesson
    const lastLesson = allLessons[allLessons.length - 1];
    return lastLesson?.id === currentLesson.id;
  };
  
  // Handle course completion
  const handleCourseCompletion = () => {
    setShowCourseCompletionModal(false);
    
    // Redirect to course detail page after a short delay
    setTimeout(() => {
      router.push(`/courses/${courseId}/{sectionId}/`);
    }, 500);
  };

  const handleNavigateLesson = (targetSectionId: string, targetLessonId: string) => {
    router.push(`/courses/${courseId}/${targetSectionId}/${targetLessonId}`);
  };

  const getNextLesson = () => {
    if (!currentCourse) return null;

    const allLessons: Array<{ sectionId: string; lesson: Lesson }> = [];
    currentCourse.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        allLessons.push({ sectionId: section.id, lesson });
      });
    });

    const currentIndex = allLessons.findIndex(
      item => item.lesson.id === lessonId
    );

    if (currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1];
    }
    return null;
  };

  const getPreviousLesson = () => {
    if (!currentCourse) return null;

    const allLessons: Array<{ sectionId: string; lesson: Lesson }> = [];
    currentCourse.sections.forEach(section => {
      section.lessons.forEach(lesson => {
        allLessons.push({ sectionId: section.id, lesson });
      });
    });

    const currentIndex = allLessons.findIndex(
      item => item.lesson.id === lessonId
    );

    if (currentIndex > 0) {
      return allLessons[currentIndex - 1];
    }
    return null;
  };

  const handleNextClick = () => {
    const next = getNextLesson();
    if (next) {
      setNextLessonInfo({ sectionId: next.sectionId, lessonId: next.lesson.id });
      setShowConfirmDialog(true);
    }
  };

  const handlePreviousClick = () => {
    const prev = getPreviousLesson();
    if (prev) {
      handleNavigateLesson(prev.sectionId, prev.lesson.id);
    }
  };

  const confirmNavigation = () => {
    if (nextLessonInfo) {
      handleNavigateLesson(nextLessonInfo.sectionId, nextLessonInfo.lessonId);
      setShowConfirmDialog(false);
    }
  };
  // ============================================
  // VIDEO HANDLERS
  // ============================================
  const handleVideoEnd = () => {
    if (currentLesson && currentLesson.type === 'video' && !videoCompleted) {
      setVideoCompleted(true);
      markAsCompleted();
    }
  };
  
  // Track video progress - auto complete at 90%
  const handleVideoProgress = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (video.duration > 0) {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoProgress(progress);
      
      // Auto complete when reaching 90%
      if (progress >= 90 && !videoCompleted) {
        handleVideoEnd();
      }
    }
  };

  // ============================================
  // QUIZ HANDLERS
  // ============================================
  const handleQuizAnswer = (questionId: string, answer: number | number[]) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleQuizSubmit = () => {
    if (!currentLesson?.quizData) return;

    let correct = 0;
    const total = currentLesson.quizData.questions.length;

    currentLesson.quizData.questions.forEach((question: QuizQuestion) => {
      const userAnswer = quizAnswers[question.id];
      if (question.type === 'multiple-answer') {
        const correctArr = question.correctAnswer as number[];
        const userArr = userAnswer as number[];
        if (
          userArr &&
          userArr.length === correctArr.length &&
          userArr.every(a => correctArr.includes(a))
        ) {
          correct++;
        }
      } else {
        if (userAnswer === question.correctAnswer) {
          correct++;
        }
      }
    });

    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= (currentLesson.quizData.passingScore || 70);

    setQuizScore({ correct, total, percentage, passed });
    setShowQuizResult(true);

    if (passed) {
      markAsCompleted();
    }
  };

  // ============================================
  // RENDER FUNCTIONS
  // ============================================
  const renderLessonIcon = (type: string, status: string) => {
    if (status === 'completed') {
      return <CheckCircleSolidIcon className="lesson-icon completed" />;
    }

    switch (type) {
      case 'video':
        return <PlayIcon className="lesson-icon" />;
      case 'text':
        return <DocumentTextIcon className="lesson-icon" />;
      case 'quiz':
        return <QuestionMarkCircleIcon className="lesson-icon" />;
      default:
        return <PlayIcon className="lesson-icon" />;
    }
  };

  const renderVideoPlayer = (lesson: Lesson) => {
    if (lesson.videoType === 'youtube') {
      return (
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${lesson.videoUrl}?enablejsapi=1`}
            title={lesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {!videoCompleted && (
            <button className="btn-complete-video" onClick={handleVideoEnd}>
              Đánh dấu đã xem xong
            </button>
          )}
        </div>
      );
    } else {
      return (
        <div className="video-container">
          <video 
            ref={videoRef}
            controls
            onTimeUpdate={handleVideoProgress}
            onEnded={handleVideoEnd}
          >
            <source src={lesson.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {videoProgress > 0 && videoProgress < 90 && (
            <div className="video-progress-indicator">
              Tiến độ: {Math.round(videoProgress)}% (Tự động hoàn thành ở 90%)
            </div>
          )}
        </div>
      );
    }
  };

  const renderTextContent = (lesson: Lesson) => {
    return (
      <div className="text-content">
        <div className="text-content-body">
          {lesson.textContent?.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return <h1 key={index}>{line.substring(2)}</h1>;
            } else if (line.startsWith('## ')) {
              return <h2 key={index}>{line.substring(3)}</h2>;
            } else if (line.startsWith('### ')) {
              return <h3 key={index}>{line.substring(4)}</h3>;
            } else if (line.startsWith('- ')) {
              return <li key={index}>{line.substring(2)}</li>;
            } else if (line.includes('**')) {
              const parts = line.split('**');
              return (
                <p key={index}>
                  {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
                </p>
              );
            } else if (line.trim()) {
              return <p key={index}>{line}</p>;
            }
            return <br key={index} />;
          })}
        </div>
        <button className="btn-mark-complete" onClick={markAsCompleted}>
          <CheckCircleIcon className="btn-icon" />
          Đánh dấu hoàn thành
        </button>
      </div>
    );
  };

  const renderQuiz = (lesson: Lesson) => {
    if (!lesson.quizData) return null;

    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>{lesson.quizData.title}</h2>
          <p>{lesson.quizData.description}</p>
          <div className="quiz-meta">
            <div className="quiz-meta-item">
              <ClockIcon className="meta-icon" />
              <span>Thời gian: {lesson.quizData.duration} phút</span>
            </div>
            <div className="quiz-meta-item">
              <CheckCircleIcon className="meta-icon" />
              <span>Điểm đạt: {lesson.quizData.passingScore}%</span>
            </div>
          </div>
        </div>

        <div className="quiz-questions">
          {lesson.quizData.questions.map((question: QuizQuestion, qIndex: number) => (
            <div key={question.id} className="quiz-question">
              <h3 className="question-title">
                Câu {qIndex + 1}: {question.question}
              </h3>

              {question.type === 'multiple-answer' && (
                <p className="question-hint">(Chọn nhiều đáp án)</p>
              )}

              <div className="question-options">
                {question.options.map((option: string, oIndex) => {
                  const isSelected =
                    question.type === 'multiple-answer'
                      ? (quizAnswers[question.id] as number[] || []).includes(oIndex)
                      : quizAnswers[question.id] === oIndex;

                  return (
                    <label
                      key={oIndex}
                      className={`option-label ${isSelected ? 'selected' : ''}`}
                    >
                      <input
                        type={question.type === 'multiple-answer' ? 'checkbox' : 'radio'}
                        name={question.id}
                        checked={isSelected}
                        onChange={() => {
                          if (question.type === 'multiple-answer') {
                            const current = (quizAnswers[question.id] as number[]) || [];
                            const updated = current.includes(oIndex)
                              ? current.filter(i => i !== oIndex)
                              : [...current, oIndex];
                            handleQuizAnswer(question.id, updated);
                          } else {
                            handleQuizAnswer(question.id, oIndex);
                          }
                        }}
                      />
                      <span className="option-text">
                        {String.fromCharCode(65 + oIndex)}. {option}
                      </span>
                    </label>
                  );
                })}
              </div>

              {showExplanations && question.explanation && (
                <div className="question-explanation">
                  <strong>Đáp án đúng:</strong> {question.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="quiz-actions">
          <button className="btn-review" onClick={() => setShowExplanations(!showExplanations)} disabled={!showQuizResult}>
            {showExplanations ? 'Ẩn đáp án' : 'Xem đáp án'}
          </button>
          <button className="btn-submit-quiz" onClick={handleQuizSubmit}>
            Nộp bài
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // EARLY RETURNS FOR LOADING/ERROR STATES
  // ============================================
  
  // Course not found
  if (courseId && !currentCourse) {
    return (
      <div className="lesson-detail-page">
        <div className="lesson-main">
          <div style={{ 
            padding: '4rem 2rem', 
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
              Không tìm thấy khóa học
            </h1>
            <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
              Khóa học với ID "{courseId}" không tồn tại hoặc đã bị xóa.
            </p>
            <a 
              href="/courses"
              style={{
                display: 'inline-block',
                padding: '0.875rem 1.5rem',
                backgroundColor: '#1e3a8a',
                color: 'white',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              ← Quay lại danh sách khóa học
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Lesson not found
  if (currentCourse && !currentLesson) {
    return (
      <div className="lesson-detail-page">
        <div className="lesson-main">
          <div style={{ 
            padding: '4rem 2rem', 
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
              Không tìm thấy bài học
            </h1>
            <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
              Bài học với ID "{lessonId}" không tồn tại trong khóa học này.
            </p>
            <a 
              href={`/courses/${courseId}`}
              style={{
                display: 'inline-block',
                padding: '0.875rem 1.5rem',
                backgroundColor: '#1e3a8a',
                color: 'white',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              ← Quay lại khóa học
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (!currentCourse || !currentLesson) {
    return (
      <div className="lesson-detail-page">
        <div className="lesson-main">
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <p>Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  const previousLesson = getPreviousLesson();
  const nextLesson = getNextLesson();

  return (
    <div className="lesson-detail-page">
      {/* Mobile sidebar toggle */}
      <button className="mobile-sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
        ← Nội dung khóa học
      </button>

      {/* Main content */}
      <div className="lesson-main">
        {/* Lesson content */}
        <div className="lesson-content-area">
          {currentLesson.type === 'video' && renderVideoPlayer(currentLesson)}
          {currentLesson.type === 'text' && renderTextContent(currentLesson)}
          {currentLesson.type === 'quiz' && renderQuiz(currentLesson)}

          {/* Navigation buttons */}
          <div className="lesson-navigation">
            <button
              className="nav-btn prev"
              onClick={handlePreviousClick}
              disabled={!previousLesson}
            >
              <ChevronLeftIcon className="nav-icon" />
              Trước
            </button>

            <button className="nav-btn next" onClick={handleNextClick} disabled={!nextLesson}>
              Kế tiếp
              <ChevronRightIcon className="nav-icon" />
            </button>
          </div>

          {/* Description tab */}
          <div className="lesson-description-section">
            <button
              className="description-toggle"
              onClick={() => setShowDescription(!showDescription)}
            >
              <h2>Lesson {currentLesson.id}: {currentLesson.title}</h2>
              {showDescription ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>

            {showDescription && (
              <div className="description-content">
                <div className="course-info">
                  <h3>{currentCourse.title}</h3>
                  <p className={showFullDescription ? '' : 'truncated'}>
                    {currentCourse.description}
                  </p>
                  <button
                    className="show-more-btn"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                  </button>
                </div>

                <div className="instructor-info">
                  <h4>Giảng viên</h4>
                  <a href={`/instructors/${currentCourse.instructor.id}`} className="instructor-link">
                    <img
                      src={currentCourse.instructor.avatar}
                      alt={currentCourse.instructor.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64';
                      }}
                    />
                    <span>{currentCourse.instructor.name}</span>
                  </a>
                </div>

                <div className="course-objectives">
                  <h4>Bạn sẽ học được gì</h4>
                  <ul>
                    {currentCourse.objectives.map((obj, index) => (
                      <li key={index}>
                        <CheckCircleIcon className="check-icon" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="course-meta-info">
                  <CalendarIcon className="meta-icon" />
                  <span>{currentCourse.lastUpdated}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`lesson-sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h3>Nội dung khóa học</h3>
          <button className="close-sidebar" onClick={() => setShowSidebar(false)}>
            <XMarkIcon />
          </button>
        </div>

        <div className="sidebar-sections">
          {currentCourse.sections.map(section => (
            <div key={section.id} className="sidebar-section">
              <button
                className="section-header"
                onClick={() => toggleSection(section.id)}
              >
                <span>{section.title}</span>
                <ChevronDownIcon
                  className={collapsedSections.includes(section.id) ? 'collapsed' : ''}
                />
              </button>

              {!collapsedSections.includes(section.id) && (
                <div className="section-lessons">
                  {section.lessons.map(lesson => (
                    <button
                      key={lesson.id}
                      className={`lesson-item ${
                        lesson.id === lessonId ? 'active' : ''
                      } ${lesson.status}`}
                      onClick={() => handleNavigateLesson(section.id, lesson.id)}
                      disabled={lesson.status === 'locked'}
                    >
                      {renderLessonIcon(lesson.type, lesson.status)}
                      <div className="lesson-info">
                        <span className="lesson-title">{lesson.title}</span>
                        <span className="lesson-duration">{lesson.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Toast notification */}
      {showToast && (
        <div className="toast-notification">
          <CheckCircleSolidIcon className="toast-icon" />
          <span>Hoàn thành</span>
        </div>
      )}

      {/* Confirm dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay" onClick={() => setShowConfirmDialog(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Chuyển sang bài học tiếp theo?</h3>
            <p>Bạn có muốn chuyển sang bài học tiếp theo không?</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowConfirmDialog(false)}>
                Hủy
              </button>
              <button className="btn-confirm" onClick={confirmNavigation}>
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz result modal */}
      {showQuizResult && (
        <div className="modal-overlay" onClick={() => setShowQuizResult(false)}>
          <div className="modal-content quiz-result" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowQuizResult(false)}>
              <XMarkIcon />
            </button>

            <div className={`result-icon ${quizScore.passed ? 'passed' : 'failed'}`}>
              {quizScore.passed ? (
                <CheckCircleSolidIcon className="icon" />
              ) : (
                <XMarkIcon className="icon" />
              )}
            </div>

            <h3>{quizScore.passed ? 'Chúc mừng!' : 'Chưa đạt'}</h3>

            <div className="result-stats">
              <div className="stat-item">
                <span className="stat-label">Số câu đúng</span>
                <span className="stat-value">
                  {quizScore.correct}/{quizScore.total}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Điểm</span>
                <span className="stat-value">{quizScore.percentage}/100</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Kết quả</span>
                <span className={`stat-value ${quizScore.passed ? 'passed' : 'failed'}`}>
                  {quizScore.passed ? 'Đạt' : 'Không đạt'}
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn-view-answer" onClick={() => {
                setShowQuizResult(false);
                setShowExplanations(true);
              }}>
                Xem đáp án
              </button>
              <button className="btn-close-result" onClick={() => setShowQuizResult(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course Completion Modal */}
      {showCourseCompletionModal && (
        <div className="modal-overlay course-completion-overlay">
          <div className="modal-content course-completion-modal" onClick={(e) => e.stopPropagation()}>
            {/* Celebration Icon */}
            {/* <div className="completion-icon">
              <div className="trophy-container">
                <AcademicCapIcon className="trophy-icon" />
              </div>
              <div className="confetti">
                <span className="confetti-piece"></span>
                <span className="confetti-piece"></span>
                <span className="confetti-piece"></span>
                <span className="confetti-piece"></span>
                <span className="confetti-piece"></span>
                <span className="confetti-piece"></span>
              </div>
            </div> */}

            {/* Title */}
            <h2 className="completion-title">Chúc mừng!</h2>
            <h3 className="completion-subtitle">Bạn đã hoàn thành khóa học</h3>

            {/* Course Info */}
            {currentCourse && (
              <div className="completion-course-info">
                <p className="course-title">{currentCourse.title}</p>
                <div className="completion-stats">
                  <div className="stat-badge">
                    <CheckCircleSolidIcon className="stat-icon" />
                    <span>Tất cả bài học</span>
                  </div>
                  {/* {currentCourse.hasCertificate && (
                    <div className="stat-badge certificate">
                      <AcademicCapIcon className="stat-icon" />
                      <span>Nhận chứng chỉ</span>
                    </div> */}
                  {/* )} */}
                </div>
              </div>
            )}

            {/* Message */}
            {/* <p className="completion-message">
              Xuất sắc! Bạn đã hoàn thành toàn bộ nội dung khóa học.
            </p> */}

            {/* Action Button */}
            <div className="modal-actions">
              <button className="btn-back-to-course" onClick={handleCourseCompletion}>
                Quay lại trang khóa học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}