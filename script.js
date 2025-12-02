// Menu
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function openMenu() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) {
        closeMenu();
    }
});

// Enhanced Smooth Scroll
function initSmoothScroll() {
    const header = document.querySelector('header');
    const menuLinks = document.querySelectorAll('.menu-items a[href^="#"]');
    
    if (!header) return;
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            closeMenu();
            
            setTimeout(() => {
                const headerHeight = header.offsetHeight;
                const offset = headerHeight + 0;
                
                const targetRect = target.getBoundingClientRect();
                const targetPosition = targetRect.top + window.pageYOffset - offset;
                
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 700;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    const ease = progress < 0.5 
                        ? 4 * progress * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    } else {
                        window.scrollTo(0, targetPosition);
                    }
                }
                
                requestAnimationFrame(animation);
                
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '0.6';
                setTimeout(() => {
                    this.style.opacity = '';
                }, 300);
                
            }, 300);
        });
    });
}

initSmoothScroll();

// Video
document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const video = document.getElementById('video');
    const closeVideoBtn = document.getElementById('closeVideoBtn');

    if (!openBtn || !videoOverlay) return;

    openBtn.addEventListener('click', function() {
        videoOverlay.classList.add('active');
        video.play();
    });

    closeVideoBtn.addEventListener('click', function() {
        videoOverlay.classList.remove('active');
        video.pause();
        video.currentTime = 0;
    });

    videoOverlay.addEventListener('click', function(e) {
        if (e.target === videoOverlay) {
            videoOverlay.classList.remove('active');
            video.pause();
            video.currentTime = 0;
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoOverlay.classList.contains('active')) {
            videoOverlay.classList.remove('active');
            video.pause();
            video.currentTime = 0;
        }
    });
});

// ============= TIMELINE CAROUSEL =============
const timelineSection = document.querySelector('#time-line');
if (timelineSection) {
    const items = timelineSection.querySelectorAll('.carousel-item');
    const dots = timelineSection.querySelectorAll('.dot');
    const prevBtn = timelineSection.querySelector('.nav-arrow.prev');
    const nextBtn = timelineSection.querySelector('.nav-arrow.next');
    const wrapper = timelineSection.querySelector('.carousel-wrapper');
    let currentIndex = 0;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next');
            
            const description = item.querySelector('.item-description');
            const btn = item.querySelector('.view-more-btn');
            if (description && description.classList.contains('show')) {
                description.classList.remove('show');
                btn.textContent = 'Xem thêm';
                btn.classList.remove('active');
                wrapper.classList.remove('expanded');
            }
            
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === currentIndex - 1 || (currentIndex === 0 && index === items.length - 1)) {
                item.classList.add('prev');
            } else if (index === currentIndex + 1 || (currentIndex === items.length - 1 && index === 0)) {
                item.classList.add('next');
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // View more buttons - CHỈ cho timeline
    timelineSection.querySelectorAll('.view-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const description = btn.nextElementSibling;
            const isExpanding = !description.classList.contains('show');
            
            description.classList.toggle('show');
            btn.textContent = description.classList.contains('show') ? 'Thu gọn' : 'Xem thêm';
            btn.classList.toggle('active');
            
            if (isExpanding) {
                wrapper.classList.add('expanded');
            } else {
                wrapper.classList.remove('expanded');
            }
        });
    });

    // Click on side items
    items.forEach((item) => {
        item.addEventListener('click', (e) => {
            if (item.classList.contains('active')) {
                return;
            }
            
            if (item.classList.contains('prev')) {
                e.stopPropagation();
                prevSlide();
            }
            
            if (item.classList.contains('next')) {
                e.stopPropagation();
                nextSlide();
            }
        });
        
        item.addEventListener('mouseenter', () => {
            if (item.classList.contains('prev') || item.classList.contains('next')) {
                item.style.cursor = 'pointer';
            }
        });
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        const activeItem = timelineSection.querySelector('.carousel-item.active');
        if (activeItem && !activeItem.contains(e.target) && !e.target.closest('.nav-arrow')) {
            const description = activeItem.querySelector('.item-description');
            const btn = activeItem.querySelector('.view-more-btn');
            
            if (description && description.classList.contains('show')) {
                description.classList.remove('show');
                btn.textContent = 'Xem thêm';
                btn.classList.remove('active');
                wrapper.classList.remove('expanded');
            }
        }
    });



    updateCarousel();
}

// ============= THÀNH TỰU CAROUSEL =============
const achievementSection = document.querySelector('#thanh-tuu');
if (achievementSection) {
    const achievementCards = achievementSection.querySelectorAll('.achievement-card');
    const achievementDots = achievementSection.querySelectorAll('.achievement-dot');
    const achievementWrapper = achievementSection.querySelector('.achievement-carousel-wrapper');
    const prevArrow = achievementSection.querySelector('.achievement-arrow.prev');
    const nextArrow = achievementSection.querySelector('.achievement-arrow.next');
    let currentAchievementIndex = 0;

    function updateAchievementCarousel() {
        achievementCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentAchievementIndex) {
                card.classList.add('active');
            }
        });

        achievementDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentAchievementIndex);
        });
    }

    function closeAchievementDescription(card) {
        const description = card.querySelector('.achievement-description');
        const btn = card.querySelector('.view-more-btn');
        if (description && description.classList.contains('show')) {
            description.classList.remove('show');
            btn.textContent = 'Xem thêm';
            btn.classList.remove('active');
            card.classList.remove('expanded');
            achievementWrapper.classList.remove('expanded');
        }
    }

    // Click on cards
    achievementCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (currentAchievementIndex !== index) {
                closeAchievementDescription(achievementCards[currentAchievementIndex]);
                currentAchievementIndex = index;
                updateAchievementCarousel();
            }
        });
    });

    // Arrow navigation
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            closeAchievementDescription(achievementCards[currentAchievementIndex]);
            currentAchievementIndex = (currentAchievementIndex - 1 + achievementCards.length) % achievementCards.length;
            updateAchievementCarousel();
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            closeAchievementDescription(achievementCards[currentAchievementIndex]);
            currentAchievementIndex = (currentAchievementIndex + 1) % achievementCards.length;
            updateAchievementCarousel();
        });
    }

    // Dots navigation
    achievementDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentAchievementIndex !== index) {
                closeAchievementDescription(achievementCards[currentAchievementIndex]);
                currentAchievementIndex = index;
                updateAchievementCarousel();
            }
        });
    });

    // View more buttons - CHỈ cho achievement
    achievementSection.querySelectorAll('.view-more-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.achievement-card');
            
            if (!card.classList.contains('active')) return;

            const description = card.querySelector('.achievement-description');
            const isExpanding = !description.classList.contains('show');
            
            description.classList.toggle('show');
            btn.textContent = description.classList.contains('show') ? 'Thu gọn' : 'Xem thêm';
            btn.classList.toggle('active');

            if (isExpanding) {
                card.classList.add('expanded');
                achievementWrapper.classList.add('expanded');
            } else {
                card.classList.remove('expanded');
                achievementWrapper.classList.remove('expanded');
            }
        });
    });



    

    updateAchievementCarousel();
}

// ============= CHINH-UY CAROUSEL =============
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

    // Add event listeners to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlideChinhUy();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlideChinhUy();
        });
    }

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

// ============= CHUYỂN ĐỔI SỐ =============
const techObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, delay);
            techObserver.unobserve(entry.target);
        }
    });
}, techObserverOptions);

document.querySelectorAll('.tech-card').forEach(card => {
    techObserver.observe(card);
    
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--red-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'transparent';
    });
});

