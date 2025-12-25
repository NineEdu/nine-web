import './about-us.css';

export default function AboutUsPage() {
  // ========================================
  // HARDCODED VERSION - No Backend Integration Needed
  // This is a static landing page for final project
  // ========================================

  return (
    <div className="about-page">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="hero-section">
        <div className="hero-container">
          {/* Title */}
          <h2 className="hero-subtitle">
            VBI ACADEMY
          </h2>
          
          {/* Subtitle */}
          <h1 className="hero-title">
            TOP 1 WEB3 DEVELOPER ACADEMY IN VIETNAM
          </h1>
          
          {/* Hero Image */}
          <div className="hero-image-wrapper">
            <img 
              src="./images/aboutUs_wall.png" 
              alt="VBI Academy Team"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ABOUT US SECTION */}
      {/* ============================================ */}
      <section className="about-section">
        <div className="about-container">
          {/* Heading */}
          <h2 className="about-heading">
            ABOUT US
          </h2>
          
          {/* Description */}
          <p className="about-description">
            Learning experiences at VBI Academy equip developers to become well-rounded 
            professionals with cutting-edge technical skills and hands-on experience, driving 
            Web3 innovation on a global scale.
          </p>

          {/* Vision & Mission Cards */}
          <div className="cards-grid">
            {/* Vision Card */}
            <div className="card">
              {/* Star Icon - SVG from heroicons.com */}
              <div className="card-icon-wrapper">
                <svg className="card-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Title */}
              <h3 className="card-title">Vision</h3>
              
              {/* Description */}
              <p className="card-description">
                Become the Top 1 provider of high quality human resources in the 
                APAC region for Blockchain and Web3.
              </p>
            </div>

            {/* Mission Card */}
            <div className="card">
              {/* Heart Icon - SVG from heroicons.com */}
              <div className="card-icon-wrapper">
                <svg className="card-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </div>
              
              {/* Title */}
              <h3 className="card-title">Mission</h3>
              
              {/* Description */}
              <p className="card-description">
                Training and providing high-quality human resources in the Web3 and 
                Blockchain fields, helping businesses and ecosystems achieve rapid and 
                sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CORE VALUES SECTION */}
      {/* ============================================ */}
      <section className="core-values-section">
        <div className="core-values-container">
          <div className="core-values-grid">
            {/* Left side - Text */}
            <div>
              {/* Heading */}
              <h2 className="core-values-heading">
                CORE VALUE
              </h2>
              
              {/* Description */}
              <p className="core-values-description">
                VBI Academy has identified five core values that will help us achieve our vision 
                and therefore our team is always encouraged to adopt these values wherever possible.
              </p>
            </div>

            {/* Right side - Values Diagram */}
            <div className="diagram-container">
              <div className="diagram-container">
  <img 
    src="/images/core_vl.jpg" 
    alt="Core Values" 
    className="core-values-image"
  />
</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}