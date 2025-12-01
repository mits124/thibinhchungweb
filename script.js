// ============= MENU =============
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

// ============= SMOOTH SCROLL =============
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

// ============= VIDEO =============
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

// ============= SWIPE HANDLER CLASS =============
class SwipeHandler {
    constructor(element, onSwipeLeft, onSwipeRight) {
        this.element = element;
        this.onSwipeLeft = onSwipeLeft;
        this.onSwipeRight = onSwipeRight;
        this.startX = 0;
        this.startY = 0;
        this.distX = 0;
        this.distY = 0;
        this.threshold = 50;
        this.restraint = 100;
        this.allowedTime = 300;
        this.startTime = 0;
        
        this.init();
    }
    
    init() {
        this.element.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.element.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.element.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    }
    
    handleTouchStart(e) {
        const touch = e.touches[0];
        this.startX = touch.pageX;
        this.startY = touch.pageY;
        this.startTime = new Date().getTime();
    }
    
    handleTouchMove(e) {
        if (Math.abs(e.touches[0].pageX - this.startX) > 10) {
            e.preventDefault();
        }
    }
    
    handleTouchEnd(e) {
        const touch = e.changedTouches[0];
        this.distX = touch.pageX - this.startX;
        this.distY = touch.pageY - this.startY;
        const elapsedTime = new Date().getTime() - this.startTime;
        
        if (elapsedTime <= this.allowedTime) {
            if (Math.abs(this.distX) >= this.threshold && Math.abs(this.distY) <= this.restraint) {
                if (this.distX < 0) {
                    this.onSwipeLeft();
                } else {
                    this.onSwipeRight();
                }
            }
        }
    }
}

// ============= TIMELINE WITH SWIPE =============
const timelineSection = document.querySelector('#time-line');
if (timelineSection) {
    const items = timelineSection.querySelectorAll('.carousel-item');
    const dots = timelineSection.querySelectorAll('.dot');
    const prevBtn = timelineSection.querySelector('.nav-arrow.prev');
    const nextBtn = timelineSection.querySelector('.nav-arrow.next');
    const wrapper = timelineSection.querySelector('.carousel-wrapper');
    const title = timelineSection.querySelector('.timeline-title');
    let currentIndex = 0;

    // Add counter to title
    if (title) {
        title.setAttribute('data-count', `${currentIndex + 1}/${items.length}`);
    }

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

        // Update counter
        if (title) {
            title.setAttribute('data-count', `${currentIndex + 1}/${items.length}`);
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    // Initialize swipe handler
    new SwipeHandler(wrapper, nextSlide, prevSlide);

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // View more buttons
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

    // Click on side items (for desktop/tablet)
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
    });

    // Auto play
    let autoPlayInterval = setInterval(nextSlide, 5000);
    let isTouching = false;

    wrapper.addEventListener('touchstart', () => {
        isTouching = true;
        clearInterval(autoPlayInterval);
    });

    wrapper.addEventListener('touchend', () => {
        setTimeout(() => {
            isTouching = false;
            autoPlayInterval = setInterval(nextSlide, 5000);
        }, 3000);
    });

    wrapper.addEventListener('mouseenter', () => {
        if (!isTouching) clearInterval(autoPlayInterval);
    });

    wrapper.addEventListener('mouseleave', () => {
        if (!isTouching) autoPlayInterval = setInterval(nextSlide, 5000);
    });

    updateCarousel();
}

// ============= ACHIEVEMENT WITH SWIPE =============
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

    function nextAchievement() {
        closeAchievementDescription(achievementCards[currentAchievementIndex]);
        currentAchievementIndex = (currentAchievementIndex + 1) % achievementCards.length;
        updateAchievementCarousel();
    }

    function prevAchievement() {
        closeAchievementDescription(achievementCards[currentAchievementIndex]);
        currentAchievementIndex = (currentAchievementIndex - 1 + achievementCards.length) % achievementCards.length;
        updateAchievementCarousel();
    }

    // Initialize swipe handler
    new SwipeHandler(achievementWrapper, nextAchievement, prevAchievement);

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
    if (prevArrow) prevArrow.addEventListener('click', prevAchievement);
    if (nextArrow) nextArrow.addEventListener('click', nextAchievement);

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

    // View more buttons
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

    // Auto play
    let achievementAutoPlay = setInterval(nextAchievement, 5000);
    let isAchievementTouching = false;

    achievementWrapper.addEventListener('touchstart', () => {
        isAchievementTouching = true;
        clearInterval(achievementAutoPlay);
    });

    achievementWrapper.addEventListener('touchend', () => {
        setTimeout(() => {
            isAchievementTouching = false;
            achievementAutoPlay = setInterval(nextAchievement, 5000);
        }, 3000);
    });

    achievementWrapper.addEventListener('mouseenter', () => {
        if (!isAchievementTouching) clearInterval(achievementAutoPlay);
    });

    achievementWrapper.addEventListener('mouseleave', () => {
        if (!isAchievementTouching) {
            achievementAutoPlay = setInterval(nextAchievement, 5000);
        }
    });

    updateAchievementCarousel();
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

// ============= VISUAL FEEDBACK =============
document.querySelectorAll('.achievement-card, .carousel-item').forEach(element => {
    element.addEventListener('touchstart', function(e) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(140, 16, 7, 0.3)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        
        const rect = this.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        ripple.style.opacity = '1';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(10)';
            ripple.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});