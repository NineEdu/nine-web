'use client';

import './courses.css';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  ArrowsUpDownIcon,
  HeartIcon,
  XMarkIcon,
  CheckCircleIcon,
  UserGroupIcon,
  PlayIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useMemo } from 'react';

// ============================================
// IMPORT TYPES & DATA
// ============================================
import { Course } from '@/lib/mock-data/types';
import { getAllCourses, searchCourses as searchCoursesData } from '@/lib/mock-data/mock-courses';

export default function CoursesPage() {
  // ============================================
  // HELPER FUNCTION - Truncate text to 3 lines
  // ============================================
  const truncateText = (text: string, maxLength: number = 150): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [showIncompletedOnly, setShowIncompletedOnly] = useState(false);

  // Collapsible sections state
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  // Sort state
  const [sortBy, setSortBy] = useState<string>('newest');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  // ============================================
  // GET COURSES FROM MOCK DATA
  // ============================================
  const allCourses = getAllCourses();

  // ============================================
  // DYNAMIC FILTERS - Extract from actual data
  // ============================================
  const { categories, levels, providers } = useMemo(() => {
    // Extract unique categories
    const categorySet = new Set<string>();
    allCourses.forEach(course => {
      if (course.category) {
        categorySet.add(course.category);
      }
    });

    // Extract unique levels
    const levelSet = new Set<string>();
    allCourses.forEach(course => {
      if (course.level) {
        levelSet.add(course.level);
      }
    });

    // Extract unique providers
    const providerSet = new Set<string>();
    allCourses.forEach(course => {
      if (course.provider) {
        providerSet.add(course.provider);
      }
    });

    return {
      categories: Array.from(categorySet).sort(),
      levels: ['Beginner', 'Intermediate', 'Advanced'], // Keep order
      providers: Array.from(providerSet).sort()
    };
  }, [allCourses]);

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'popular', label: 'Phổ biến nhất' },
    { value: 'rating', label: 'Đánh giá cao nhất' },
    { value: 'price-high', label: 'Giá cao → thấp' },
    { value: 'price-low', label: 'Giá thấp → cao' }
  ];

  // ============================================
  // LOAD FAVORITES FROM LOCALSTORAGE
  // ============================================
  useEffect(() => {
    const savedFavorites = localStorage.getItem('courseFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // ============================================
  // FILTERING & SORTING LOGIC
  // ============================================
  const getFilteredAndSortedCourses = (): Course[] => {
    let filtered = [...allCourses];

    // Search filter
    if (searchQuery) {
      filtered = searchCoursesData(searchQuery);
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course => 
        selectedCategories.includes(course.category)
      );
    }

    // Level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter(course => 
        selectedLevels.includes(course.level)
      );
    }

    // Provider filter
    if (selectedProviders.length > 0) {
      filtered = filtered.filter(course => 
        selectedProviders.includes(course.provider)
      );
    }

    // Completion status filter
    if (showCompletedOnly) {
      filtered = filtered.filter(course => course.isCompleted);
    }
    if (showIncompletedOnly) {
      filtered = filtered.filter(course => !course.isCompleted);
    }

    // Sorting
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.enrolled - a.enrolled);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'newest':
      default:
        break;
    }

    return filtered;
  };

  const filteredCourses = getFilteredAndSortedCourses();

  // ============================================
  // PAGINATION LOGIC
  // ============================================
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedLevels, selectedProviders, showCompletedOnly, showIncompletedOnly, sortBy]);

  // ============================================
  // HANDLERS
  // ============================================
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const toggleProvider = (provider: string) => {
    setSelectedProviders(prev =>
      prev.includes(provider)
        ? prev.filter(p => p !== provider)
        : [...prev, provider]
    );
  };

  const toggleSection = (section: string) => {
    setCollapsedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedProviders([]);
    setShowCompletedOnly(false);
    setShowIncompletedOnly(false);
    setSearchQuery('');
    setSortBy('newest');
  };

  const toggleFavorite = (courseId: string) => {
    let newFavorites: string[];
    if (favorites.includes(courseId)) {
      newFavorites = favorites.filter(id => id !== courseId);
    } else {
      newFavorites = [...favorites, courseId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('courseFavorites', JSON.stringify(newFavorites));
  };

  const hasActiveFilters = selectedCategories.length > 0 || 
                          selectedLevels.length > 0 || 
                          selectedProviders.length > 0 ||
                          showCompletedOnly || 
                          showIncompletedOnly;

  return (
    <div className="courses-container">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <div className="courses-header">
        <h1 className="courses-title">Khóa học</h1>
        
        {/* Search, Filter, Sort Bar */}
        <div className="courses-controls">
          {/* Search */}
          <div className="search-box">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="search-clear"
                onClick={() => setSearchQuery('')}
              >
                <XMarkIcon />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button 
            className={`control-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <AdjustmentsHorizontalIcon className="btn-icon" />
            <span>Bộ lọc</span>
            {hasActiveFilters && <span className="filter-badge">{
              selectedCategories.length + selectedLevels.length + selectedProviders.length +
              (showCompletedOnly ? 1 : 0) + (showIncompletedOnly ? 1 : 0)
            }</span>}
          </button>

          {/* Sort Button with Dropdown */}
          <div className="sort-dropdown">
            <button
              className={`control-btn ${showSort ? 'active' : ''}`}
              onClick={() => setShowSort(!showSort)}
            >
              <ArrowsUpDownIcon className="btn-icon" />
              <span>Sắp xếp</span>
            </button>

            {/* Sort Panel - Dropdown */}
            {showSort && (
              <div className="sort-panel">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSort(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* FILTER SIDEBAR WITH OVERLAY */}
      {/* ============================================ */}
      {showFilters && (
        <>
          {/* Overlay */}
          <div className="filter-overlay" onClick={() => setShowFilters(false)}></div>
          
          {/* Sidebar */}
          <div className="filter-panel">
            {/* Header */}
            <div className="filter-header">
              <h3>Lọc</h3>
              <button className="close-btn" onClick={() => setShowFilters(false)}>
                <XMarkIcon className="close-icon" />
              </button>
            </div>

            {/* Content */}
            <div className="filter-content">
              {/* Categories - DYNAMIC */}
              <div className={`filter-group ${collapsedSections.includes('categories') ? 'collapsed' : ''}`}>
                <div className="filter-group-header" onClick={() => toggleSection('categories')}>
                  <h4>Phân loại</h4>
                  <button className="reset-link" onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategories([]);
                  }}>
                    Đặt lại tất cả
                  </button>
                  <ChevronDownIcon className="chevron-icon" />
                </div>
                <div className="filter-options">
                  {categories.map(category => (
                    <label key={category} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Levels - DYNAMIC */}
              <div className={`filter-group ${collapsedSections.includes('levels') ? 'collapsed' : ''}`}>
                <div className="filter-group-header" onClick={() => toggleSection('levels')}>
                  <h4>Cấp độ</h4>
                  <button className="reset-link" onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLevels([]);
                  }}>
                    Đặt lại tất cả
                  </button>
                  <ChevronDownIcon className="chevron-icon" />
                </div>
                <div className="filter-options">
                  {levels.map(level => (
                    <label key={level} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(level)}
                        onChange={() => toggleLevel(level)}
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Providers - DYNAMIC (NEW) */}
              <div className={`filter-group ${collapsedSections.includes('providers') ? 'collapsed' : ''}`}>
                <div className="filter-group-header" onClick={() => toggleSection('providers')}>
                  <h4>Nhà cung cấp</h4>
                  <button className="reset-link" onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProviders([]);
                  }}>
                    Đặt lại tất cả
                  </button>
                  <ChevronDownIcon className="chevron-icon" />
                </div>
                <div className="filter-options">
                  {providers.map(provider => (
                    <label key={provider} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedProviders.includes(provider)}
                        onChange={() => toggleProvider(provider)}
                      />
                      <span>{provider}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Completion Status */}
              <div className={`filter-group ${collapsedSections.includes('status') ? 'collapsed' : ''}`}>
                <div className="filter-group-header" onClick={() => toggleSection('status')}>
                  <h4>Các khóa học hoàn thành</h4>
                  <button className="reset-link" onClick={(e) => {
                    e.stopPropagation();
                    setShowCompletedOnly(false);
                    setShowIncompletedOnly(false);
                  }}>
                    Đặt lại tất cả
                  </button>
                  <ChevronDownIcon className="chevron-icon" />
                </div>
                <div className="filter-options">
                  <label className="filter-option">
                    <input
                      type="checkbox"
                      checked={showCompletedOnly}
                      onChange={(e) => {
                        setShowCompletedOnly(e.target.checked);
                        if (e.target.checked) setShowIncompletedOnly(false);
                      }}
                    />
                    <span>Các khóa học hoàn thành</span>
                  </label>
                  <label className="filter-option">
                    <input
                      type="checkbox"
                      checked={showIncompletedOnly}
                      onChange={(e) => {
                        setShowIncompletedOnly(e.target.checked);
                        if (e.target.checked) setShowCompletedOnly(false);
                      }}
                    />
                    <span>Các khóa học chưa hoàn thành</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="filter-footer">
              <button className="reset-all-btn" onClick={clearAllFilters}>
                Đặt lại tất cả
              </button>
              <button className="apply-btn" onClick={() => setShowFilters(false)}>
                Áp dụng
              </button>
            </div>
          </div>
        </>
      )}

      {/* ============================================ */}
      {/* RESULTS SUMMARY */}
      {/* ============================================ */}
      <div className="results-summary">
        <p>Hiển thị {currentCourses.length} trên tổng số {filteredCourses.length} khóa học</p>
      </div>

      {/* ============================================ */}
      {/* COURSES GRID */}
      {/* ============================================ */}
      {currentCourses.length === 0 ? (
        <div className="no-results">
          <p>Không tìm thấy khóa học nào phù hợp với bộ lọc của bạn.</p>
          <button className="clear-filters-btn" onClick={clearAllFilters}>
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {currentCourses.map((course) => (
            <div 
              key={course.id} 
              className="course-card"
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
            >
              <a href={`/courses/${course.id}/1`} className="course-link">
                <div className="course-thumbnail">
                  <img src={course.thumbnail} alt={course.title} />
                </div>

                <div className="course-content">
                  <h3 className="course-title">{course.title}</h3>
                  
                  <div className="course-provider">{course.provider}</div>

                  <div className="course-meta">
                    <div className="course-rating">
                      <span className="rating-value">
                        <StarSolidIcon className="star-icon" />
                        {course.rating.toFixed(1)}</span>
                      <span className="rating-count">({course.enrolled.toLocaleString()})</span>
                    </div>
                    <div className="course-level">{course.level}</div>
                  </div>

                  <div className="course-price">
                    {course.isFree ? (
                      <span className="price-free">Miễn phí</span>
                    ) : (
                      <span className="price-value">{course.price.toLocaleString('vi-VN')} ₫</span>
                    )}
                  </div>
                </div>
              </a>

              {/* Hover Card */}
              {hoveredCourse === course.id && (
                <div className="hover-card">
                  <h3 className="hover-title">{course.title}</h3>

                  {course.isCompleted && (
                    <div className="completed-badge">
                      <CheckCircleIcon className="badge-icon" />
                      Nội dung đã hoàn thành
                    </div>
                  )}

                  <p className="hover-description">{truncateText(course.description, 150)}</p>

                  <div className="hover-info">
                    {course.hasCertificate && (
                      <div className="info-item">
                        <DocumentTextIcon className="info-icon" />
                        <span>Giấy chứng nhận hoàn thành</span>
                      </div>
                    )}

                    <div className="info-item">
                      <DocumentTextIcon className="info-icon" />
                      <span>{course.sections} Phần, {course.lessons} Bài học</span>
                    </div>

                    <div className="info-item">
                      <PlayIcon className="info-icon" />
                      <span>{course.videoDuration}</span>
                    </div>

                    <div className="info-item">
                      <UserGroupIcon className="info-icon" />
                      <span>{course.enrolled.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="hover-actions">
                    <a href={`/courses/${course.id}/1`} className="start-btn">
                      Bắt đầu khóa học
                    </a>
                    <button
                      className="favorite-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(course.id);
                      }}
                    >
                      {favorites.includes(course.id) ? (
                        <HeartSolidIcon className="heart-icon filled" />
                      ) : (
                        <HeartIcon className="heart-icon" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ============================================ */}
      {/* PAGINATION */}
      {/* ============================================ */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            ← Trước
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
}