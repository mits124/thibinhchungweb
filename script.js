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

// Enhanced Smooth Scroll với Animation Easing
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
            
            // Đóng menu trước
            closeMenu();
            
            // Đợi animation đóng menu (300ms)
            setTimeout(() => {
                // Tính toán vị trí với offset header
                const headerHeight = header.offsetHeight;
                const offset = headerHeight + 0; // Thêm khoảng cách nếu cần
                
                const targetRect = target.getBoundingClientRect();
                const targetPosition = targetRect.top + window.pageYOffset - offset;
                
                // Animation parameters
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 700; // Thời gian animation (ms)
                let start = null;
                
                // Animation function với easing
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Easing function (ease-in-out cubic) cho chuyển động mượt
                    const ease = progress < 0.5 
                        ? 4 * progress * progress * progress 
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + distance * ease);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    } else {
                        // Đảm bảo vị trí cuối cùng chính xác
                        window.scrollTo(0, targetPosition);
                    }
                }
                
                requestAnimationFrame(animation);
                
                // Visual feedback cho link được click
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '0.6';
                setTimeout(() => {
                    this.style.opacity = '';
                }, 300);
                
            }, 300);
        });
    });
}

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

// Carousel
const items = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');
const wrapper = document.querySelector('.carousel-wrapper');
let currentIndex = 0;

function updateCarousel() {
    items.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');
        
        const description = item.querySelector('.item-description');
        const btn = item.querySelector('.view-more-btn');
        if (description.classList.contains('show')) {
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

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

document.querySelectorAll('.carousel-item .view-more-btn').forEach(btn => {
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

document.addEventListener('click', (e) => {
    const activeItem = document.querySelector('.carousel-item.active');
    if (activeItem && !activeItem.contains(e.target)) {
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

let autoPlayInterval = setInterval(nextSlide, 5000);

wrapper.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

wrapper.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

updateCarousel();

// Thành tựu - Observer cho stat cards
        const achievementCards = document.querySelectorAll('.achievement-card');
        const achievementDots = document.querySelectorAll('.achievement-dot');
        const achievementWrapper = document.querySelector('.achievement-carousel-wrapper');
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

        function closeDescription(card) {
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
                    closeDescription(achievementCards[currentAchievementIndex]);
                    currentAchievementIndex = index;
                    updateAchievementCarousel();
                }
            });
        });

        // Arrow navigation
        const prevArrow = document.querySelector('.achievement-arrow.prev');
        const nextArrow = document.querySelector('.achievement-arrow.next');
        prevArrow.addEventListener('click', () => {
            currentAchievementIndex = (currentAchievementIndex - 1 + achievementCards.length) % achievementCards.length;
            updateAchievementCarousel();
        });

        nextArrow.addEventListener('click', () => {
            currentAchievementIndex = (currentAchievementIndex + 1) % achievementCards.length;
            updateAchievementCarousel();
        });

        // Dots navigation
        achievementDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (currentAchievementIndex !== index) {
                    closeDescription(achievementCards[currentAchievementIndex]);
                    currentAchievementIndex = index;
                    updateAchievementCarousel();
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                closeDescription(achievementCards[currentAchievementIndex]);
                currentAchievementIndex = (currentAchievementIndex - 1 + achievementCards.length) % achievementCards.length;
                updateAchievementCarousel();
            }
            if (e.key === 'ArrowRight') {
                closeDescription(achievementCards[currentAchievementIndex]);
                currentAchievementIndex = (currentAchievementIndex + 1) % achievementCards.length;
                updateAchievementCarousel();
            }
        });

        // View more buttons
        document.querySelectorAll('.view-more-btn').forEach(btn => {
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
        let achievementAutoPlay = setInterval(() => {
            closeDescription(achievementCards[currentAchievementIndex]);
            currentAchievementIndex = (currentAchievementIndex + 1) % achievementCards.length;
            updateAchievementCarousel();
        }, 5000);

        // Pause on hover
        achievementWrapper.addEventListener('mouseenter', () => {
            clearInterval(achievementAutoPlay);
        });

        achievementWrapper.addEventListener('mouseleave', () => {
            achievementAutoPlay = setInterval(() => {
                closeDescription(achievementCards[currentAchievementIndex]);
                currentAchievementIndex = (currentAchievementIndex + 1) % achievementCards.length;
                updateAchievementCarousel();
            }, 5000);
        });

        // Initialize
        updateAchievementCarousel();


// Chuyển đổi số - Observer cho tech cards
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
});

document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--red-color)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'transparent';
    });
});