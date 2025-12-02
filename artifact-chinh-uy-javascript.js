// ============= CHINH-UY CAROUSEL JAVASCRIPT =============
// JavaScript cho carousel Chính Ủy với tất cả class đã được thêm suffix -chinh-uy

const chinhUySection = document.querySelector('.commissar-section-chinh-uy');
if (chinhUySection) {
    const slides = chinhUySection.querySelectorAll('.carousel-slide-chinh-uy');
    const track = chinhUySection.querySelector('.carousel-track-chinh-uy');
    const indicatorsContainer = chinhUySection.querySelector('.carousel-indicators-chinh-uy');
    const prevBtn = chinhUySection.querySelector('.prev-chinh-uy');
    const nextBtn = chinhUySection.querySelector('.next-chinh-uy');
    let currentSlideIndex = 0;

    // Create indicators
    if (indicatorsContainer) {
        slides.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = 'indicator-chinh-uy';
            if (index === 0) indicator.classList.add('active-chinh-uy');
            indicator.addEventListener('click', () => {
                currentSlideIndex = index;
                updateChinhUyCarousel();
            });
            indicatorsContainer.appendChild(indicator);
        });
    }

    function updateChinhUyCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active-chinh-uy', 'prev-chinh-uy', 'next-chinh-uy');
            
            if (index === currentSlideIndex) {
                slide.classList.add('active-chinh-uy');
            } else if (index === currentSlideIndex - 1 || (currentSlideIndex === 0 && index === slides.length - 1)) {
                slide.classList.add('prev-chinh-uy');
            } else if (index === currentSlideIndex + 1 || (currentSlideIndex === slides.length - 1 && index === 0)) {
                slide.classList.add('next-chinh-uy');
            }
        });

        // Update indicators
        if (indicatorsContainer) {
            const indicators = indicatorsContainer.querySelectorAll('.indicator-chinh-uy');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active-chinh-uy', index === currentSlideIndex);
            });
        }
    }

    function nextSlideChinhUy() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateChinhUyCarousel();
    }

    function prevSlideChinhUy() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateChinhUyCarousel();
    }

    // Global function for onclick
    window.moveSlideChinhUy = function(direction) {
        if (direction === 1) {
            nextSlideChinhUy();
        } else {
            prevSlideChinhUy();
        }
    };

    if (prevBtn) prevBtn.addEventListener('click', prevSlideChinhUy);
    if (nextBtn) nextBtn.addEventListener('click', nextSlideChinhUy);

    // Click on side slides
    slides.forEach((slide) => {
        slide.addEventListener('click', (e) => {
            if (slide.classList.contains('active-chinh-uy')) {
                return;
            }
            
            if (slide.classList.contains('prev-chinh-uy')) {
                e.stopPropagation();
                prevSlideChinhUy();
            }
            
            if (slide.classList.contains('next-chinh-uy')) {
                e.stopPropagation();
                nextSlideChinhUy();
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (chinhUySection.getBoundingClientRect().top < window.innerHeight && 
            chinhUySection.getBoundingClientRect().bottom > 0) {
            if (e.key === 'ArrowLeft') {
                prevSlideChinhUy();
            } else if (e.key === 'ArrowRight') {
                nextSlideChinhUy();
            }
        }
    });

    // Initialize
    updateChinhUyCarousel();
}

