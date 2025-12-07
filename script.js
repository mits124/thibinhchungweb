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
    const closeVideoBtn = document.getElementById('closeVideoBtn');
    const iframe = document.getElementById('videoFrame');

    if (!openBtn || !videoOverlay) return;

    // Mở video
    openBtn.addEventListener('click', function() {
        videoOverlay.classList.add('active');
        videoOverlay.style.display = 'flex';
    });

    // Đóng video
    closeVideoBtn.addEventListener('click', function() {
        videoOverlay.classList.remove('active');
        videoOverlay.style.display = 'none';
        // Dừng video bằng cách reload iframe
        iframe.src = iframe.src;
    });

    // Đóng khi click ngoài video
    videoOverlay.addEventListener('click', function(e) {
        if (e.target === videoOverlay) {
            videoOverlay.classList.remove('active');
            videoOverlay.style.display = 'none';
            // Dừng video bằng cách reload iframe
            iframe.src = iframe.src;
        }
    });

    // Đóng bằng phím Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoOverlay.classList.contains('active')) {
            videoOverlay.classList.remove('active');
            videoOverlay.style.display = 'none';
            // Dừng video bằng cách reload iframe
            iframe.src = iframe.src;
        }
    });
});

// ============= TIMELINE CAROUSEL =============
function toggleDetails(btn) {
            const card = btn.closest('.era-card');
            const spanText = btn.firstChild; // The text node
            
            // Toggle active class
            if (card.classList.contains('active')) {
                card.classList.remove('active');
                // Use innerHTML to preserve the chevron span
                btn.innerHTML = 'Xem chi tiết <span class="chevron">▼</span>';
                btn.style.backgroundColor = "transparent";
                btn.style.color = "#8c1007";
            } else {
                card.classList.add('active');
                btn.innerHTML = 'Thu gọn <span class="chevron">▲</span>';
                btn.style.backgroundColor = "#8c1007";
                btn.style.color = "white";
            }
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

    // ============= TƯ LỆNH CAROUSEL =============
const tuLenhSection = document.querySelector('.commissar-section-tu-lenh');
if (tuLenhSection) {
    const slides = tuLenhSection.querySelectorAll('.carousel-slide-tu-lenh');
    const track = tuLenhSection.querySelector('.carousel-track-tu-lenh');
    const indicatorsContainer = tuLenhSection.querySelector('.carousel-indicators-tu-lenh');
    const prevBtn = tuLenhSection.querySelector('.prev-tu-lenh');
    const nextBtn = tuLenhSection.querySelector('.next-tu-lenh');
    let currentSlideIndex = 0;

    // Create indicators
    if (indicatorsContainer) {
        slides.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.className = 'indicator-tu-lenh';
            if (index === 0) indicator.classList.add('active-tu-lenh');
            indicator.addEventListener('click', () => {
                currentSlideIndex = index;
                updateTuLenhCarousel();
            });
            indicatorsContainer.appendChild(indicator);
        });
    }

    function updateTuLenhCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active-tu-lenh', 'prev-tu-lenh', 'next-tu-lenh');
            
            if (index === currentSlideIndex) {
                slide.classList.add('active-tu-lenh');
            } else if (index === currentSlideIndex - 1 || (currentSlideIndex === 0 && index === slides.length - 1)) {
                slide.classList.add('prev-tu-lenh');
            } else if (index === currentSlideIndex + 1 || (currentSlideIndex === slides.length - 1 && index === 0)) {
                slide.classList.add('next-tu-lenh');
            }
        });

        // Update indicators
        if (indicatorsContainer) {
            const indicators = indicatorsContainer.querySelectorAll('.indicator-tu-lenh');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active-tu-lenh', index === currentSlideIndex);
            });
        }
    }

    function nextSlideTuLenh() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateTuLenhCarousel();
    }

    function prevSlideTuLenh() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateTuLenhCarousel();
    }

    // Add event listeners to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlideTuLenh();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlideTuLenh();
        });
    }

    // Click on side slides
    slides.forEach((slide) => {
        slide.addEventListener('click', (e) => {
            if (slide.classList.contains('active-tu-lenh')) {
                return;
            }
            
            if (slide.classList.contains('prev-tu-lenh')) {
                e.stopPropagation();
                prevSlideTuLenh();
            }
            
            if (slide.classList.contains('next-tu-lenh')) {
                e.stopPropagation();
                nextSlideTuLenh();
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (tuLenhSection.getBoundingClientRect().top < window.innerHeight && 
            tuLenhSection.getBoundingClientRect().bottom > 0) {
            if (e.key === 'ArrowLeft') {
                prevSlideTuLenh();
            } else if (e.key === 'ArrowRight') {
                nextSlideTuLenh();
            }
        }
    });

    // Initialize
    updateTuLenhCarousel();
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

// ============= EQUIPMENT SECTION ANIMATION =============
document.addEventListener('DOMContentLoaded', function() {
            
            // 1. FILTERING LOGIC
            const filterBtns = document.querySelectorAll('.filter-btn');
            const cards = document.querySelectorAll('.eq-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active to clicked
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');

                    cards.forEach(card => {
                        // Reset animation for visual effect on filter change
                        card.classList.remove('animate'); 
                        
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.classList.remove('hidden');
                            // Trigger reflow to restart animation
                            void card.offsetWidth; 
                            card.classList.add('animate');
                        } else {
                            card.classList.add('hidden');
                        }
                    });
                });
            });

            // 2. SCROLL ANIMATION (OBSERVER)
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.getAttribute('data-delay') || 0;
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            cards.forEach(card => {
                observer.observe(card);
            });
        });


        // ============ AHLLVTND =============

    const collectivesData = [
            "Lữ đoàn 249, Bộ Tư lệnh Công binh. Được phong tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân vào ngày 21 tháng 8 năm 2025 (lần thứ ba, với thành tích có cả nhiệm vụ xây cầu phao).",
            "Binh chủng Công binh. Được phong tặng ngày 13 tháng 12 năm 2013 (lần thứ hai).",
            "Lữ đoàn 279, Bộ Tư lệnh Công binh. Được phong tặng ngày 22 tháng 12 năm 2009.",
            "Trường Sĩ quan Công binh. Được phong tặng ngày 13 tháng 3 năm 2008.",
            "Trung tâm Công nghệ xử lý bom mìn. Được phong tặng ngày 21 tháng 12 năm 2005.",
            "Trung tâm Công nghệ xử lý Bom mìn (BOMICEN), Binh chủng Công binh. Được Chủ tịch nước tuyên dương Anh hùng LLVTND thời kỳ đổi mới ngày 21 tháng 12 năm 2005.",
            "Đại đội Công binh tỉnh Phú Yên. Được phong tặng ngày 24 tháng 6 năm 2005.",
            "Phòng Công trình, Bộ Tư lệnh Công binh. Được phong tặng ngày 23 tháng 5 năm 2005.",
            "Tiểu đoàn 25, Lữ đoàn 513, Quân khu 3. Được phong tặng ngày 22 tháng 12 năm 2004.",
            "Lữ đoàn 25, Quân khu 9. Được phong tặng ngày 13 tháng 1 năm 2003.",
            "Tiểu đoàn 17, Sư đoàn 316, Quân khu 2. Được phong tặng ngày 13 tháng 1 năm 2003.",
            "Trung đoàn 7, Quân đoàn 3. Được phong tặng ngày 13 tháng 1 năm 2003 (lần thứ ba).",
            "Tiểu đoàn 27, Trung đoàn 293, Bộ Tư lệnh Công binh. Được phong tặng ngày 12 tháng 12 năm 2000.",
            "Lữ đoàn 270, Quân khu 5. Được phong tặng ngày 12 tháng 12 năm 2000.",
            "Lữ đoàn 28, Phòng không - Không quân. Được phong tặng ngày 12 tháng 12 năm 2000.",
            "Trung đoàn Bảo quản Công trình 72, Bộ Tư lệnh Công binh. Được phong tặng ngày 12 tháng 12 năm 2000.",
            "Tiểu đoàn 1, Lữ đoàn 229, Bộ Tư lệnh Công binh. Được phong tặng ngày 12 tháng 12 năm 2000.",
            "Tiểu đoàn Vật cản 93, Bộ Tư lệnh Công binh. Được phong tặng ngày 11 tháng 6 năm 1999.",
            "Lữ đoàn 575, Quân khu 1. Được phong tặng ngày 11 tháng 6 năm 1999.",
            "Lữ đoàn 239, Bộ Tư lệnh Công binh. Được phong tặng ngày 31 tháng 7 năm 1998.",
            "Tiểu đoàn 25, Lữ đoàn 414, Quân khu 4. Được phong tặng ngày 31 tháng 7 năm 1998.",
            "Lữ đoàn 543, Quân khu 2. Được phong tặng ngày 31 tháng 7 năm 1998.",
            "Lữ đoàn 414, Quân khu 4. Được phong tặng ngày 31 tháng 7 năm 1998.",
            "Lữ đoàn 513, Quân khu 3. Được phong tặng ngày 20 tháng 12 năm 1994 (lần thứ hai).",
            "Trung đoàn 83, Hải quân. Được phong tặng ngày 20 tháng 12 năm 1994 (lần thứ hai).",
            "Đại đội 8, Tiểu đoàn 3, Lữ đoàn 229, Bộ Tư lệnh Công binh. Được phong tặng ngày 13 tháng 12 năm 1989.",
            "Trung đoàn 131, Hải quân. Được phong tặng ngày 30 tháng 9 năm 1989.",
            "Tiểu đoàn 15, Sư đoàn 307, Quân khu 5. Được phong tặng ngày 30 tháng 9 năm 1989.",
            "Trung đoàn 280, Quân khu 5. Được phong tặng ngày 30 tháng 9 năm 1989.",
            "Tiểu đoàn 25, Sư đoàn 302 (Mặt trận 479). Được phong tặng ngày 29 tháng 8 năm 1985.",
            "Tiểu đoàn 25, Sư đoàn 5. Được phong tặng ngày 29 tháng 8 năm 1985.",
            "Tiểu đoàn 25, Sư đoàn 320. Được phong tặng ngày 29 tháng 8 năm 1985.",
            "Trung đoàn 509, Binh đoàn 12. Được phong tặng ngày 29 tháng 8 năm 1985.",
            "Trung đoàn 6, Binh đoàn 12. Được phong tặng ngày 29 tháng 8 năm 1985.",
            "Trung đoàn 513, Quân khu 3. Được phong tặng ngày 29 tháng 8 năm 1985.",
            "Trung đoàn 550, Quân đoàn 4. Được phong tặng ngày 29 tháng 8 năm 1985.",
            "Trung đoàn 219, Quân đoàn 2. Được phong tặng ngày 29 tháng 8 năm 1985.",
            "Lữ đoàn 299, Quân đoàn 1. Được phong tặng ngày 29 tháng 8 năm 1985.",
            "Binh chủng Công binh. Được phong tặng ngày 20 tháng 10 năm 1976.",
            "Đại đội 1, Trung đoàn 976, Bộ Tư lệnh 559. Được phong tặng ngày 20 tháng 10 năm 1976.",
            "Đại đội 2, Tiểu đoàn 4, Lữ đoàn 414, Quân khu 4. Được phong tặng ngày 20 tháng 10 năm 1976.",
            "Đại đội 8, Trung đoàn 131, Hải quân. Được phong tặng ngày 20 tháng 10 năm 1976.",
            "Trung đoàn 217, Bộ Tư lệnh 559. Được phong tặng ngày 20 tháng 10 năm 1976.",
            "Đại đội Khảo sát Công binh 1. Được phong tặng ngày 20 tháng 10 năm 1976.",
            "Đại đội 19, Bộ đội địa phương tỉnh Quảng Nam. Được phong tặng ngày 3 tháng 6 năm 1976.",
            "Đại đội 2, Tiểu đoàn 25, Trung đoàn 550, Quân đoàn 4. Được phong tặng ngày 3 tháng 6 năm 1976.",
            "Trung đoàn 542, Sư đoàn 473, Bộ Tư lệnh 559. Được phong tặng ngày 3 tháng 6 năm 1976.",
            "Trung đoàn 35, Sư đoàn 472, Bộ Tư lệnh 559. Được phong tặng ngày 3 tháng 6 năm 1976.",
            "Trung đoàn 531, Bộ Tư lệnh 559. Được phong tặng ngày 3 tháng 6 năm 1976.",
            "Trung đoàn 14, Bộ Tư lệnh 559. Được phong tặng ngày 3 tháng 6 năm 1976.",
            "Trung đoàn Công binh 4, Sư đoàn 470, Bộ Tư lệnh 559. Được phong tặng ngày 3 tháng 6 năm 1976.",
            "Tiểu đoàn 2, Trung đoàn 229, Bộ Tư lệnh Công binh. Được phong tặng ngày 20 tháng 12 năm 1972.",
            "Đại đội Công binh 1, Bộ đội địa phương tỉnh Quảng Đà. Được phong tặng ngày 19 tháng 5 năm 1972 (lần thứ hai).",
            "Tiểu đoàn Công binh 35, Binh trạm 33, Bộ Tư lệnh 559. Được phong tặng ngày 1 tháng 10 năm 1971.",
            "Đại đội Công binh 11, Tiểu đoàn 75, Binh trạm 41, Bộ Tư lệnh 559. Được phong tặng ngày 25 tháng 8 năm 1970.",
            "Tiểu đoàn Công binh 2, Binh trạm 12, Bộ Tư lệnh 559. Được phong tặng ngày 25 tháng 8 năm 1970.",
            "Đại đội Công binh 1, Bắc Quảng Trị. Được phong tặng ngày 25 tháng 8 năm 1970.",
            "Trung đoàn 7, Bộ Tư lệnh Công binh. Được phong tặng ngày 25 tháng 8 năm 1970 (lần thứ nhất).",
            "Đại đội 12, Trung đoàn 217, Bộ Tư lệnh Công binh. Được phong tặng ngày 25 tháng 8 năm 1970.",
            "Đại đội 1, Trung đoàn 7, Bộ Tư lệnh Công binh (nay thuộc Trung đoàn Công binh 414). Được phong tặng ngày 22 tháng 12 năm 1969.",
            "Tiểu đoàn Công binh 33, Binh trạm 32, Bộ Tư lệnh 559. Được phong tặng ngày 22 tháng 12 năm 1969.",
            "Đại đội 2, Tiểu đoàn Công binh 27 (nay thuộc Lữ đoàn Công binh 414) Quân khu 4. Được phong tặng ngày 22 tháng 12 năm 1969.",
            "Đại đội Công binh 1, Bộ đội địa phương tỉnh Quảng Đà. Được phong tặng ngày 20 tháng 12 năm 1969.",
            "Đại đội Công binh 16, Binh trạm 16, Bộ Tư lệnh 559. Được phong tặng ngày 18 tháng 6 năm 1969.",
            "Đại đội Công binh 2 thuộc Tiểu đoàn Công binh 31, Binh trạm 32, Bộ Tư lệnh 559. Được phong tặng ngày 18 tháng 6 năm 1969.",
            "Đại đội Công binh Đặc công nước tỉnh Cần Thơ. Được phong tặng năm 1969.",
            "Tiểu đoàn Công binh 25 thuộc Binh trạm 1 (sau là Binh trạm 31). Được phong tặng ngày 22 tháng 12 năm 1967.",
            "Đại đội 4, Trung đoàn Công binh 7, Bộ Tư lệnh Công binh. Được phong tặng lần thứ nhất ngày 1 tháng 1 năm 1967.",
            "Tiểu đoàn Công binh 25, Quân khu 4. Được phong tặng ngày 1 tháng 1 năm 1967."
        ];

        const individualsData = [
            "Võ Công Đích – Nguyên Tiểu đội trưởng, Đại đội Công binh, Tỉnh đội Quảng Nam (nay là Bộ CHQS tỉnh Quảng Nam), Quân khu 5 – được trao tặng danh hiệu Anh hùng LLVTND ngày 26/04/2018.",
            "Hoàng Kiền – Thiếu tướng, nguyên Tư lệnh Binh chủng Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 30/11/2015.",
            "Hoàng Đăng Vinh – Đại tá, nguyên Phó Hiệu trưởng về Chính trị, Trường Tập huấn cán bộ Công binh, Binh chủng Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 10/08/2015.",
            "Phan Đức Sử – Cựu chiến binh, nguyên chiến sĩ Lữ đoàn Công binh Sông Đà, đơn vị công binh chủ lực tham gia Chiến dịch Điện Biên Phủ – được trao tặng danh hiệu Anh hùng LLVTND ngày 10/08/2015.",
            "Đào Khắc Nhạn – Anh hùng LLVTND  – được trao tặng danh hiệu Anh hùng LLVTND ngày 10/08/2015.",
            "Nguyễn Phú Xuyên Khung – Anh hùng LLVTND  – được trao tặng danh hiệu Anh hùng LLVTND ngày 21/10/2014.",
            "Nguyễn Thành Chung – Anh hùng LLVTND  – được trao tặng danh hiệu Anh hùng LLVTND ngày 09/10/2014.",
            "Du Long Thành – Anh hùng LLVTND  – được trao tặng danh hiệu Anh hùng LLVTND ngày 09/10/2014.",
            "Nguyễn Phú Xuyên Khung – Anh hùng LLVTND  – được trao tặng danh hiệu Anh hùng LLVTND ngày 09/10/2014.",
            "Đỗ Vinh Thăng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 09/10/2014.",
            "Đỗ Vinh Thăng – Anh hùng LLVTND (Công binh, truy tặng) – được trao tặng danh hiệu Anh hùng LLVTND ngày 09/10/2014.",
            "Nguyễn Hữu Tể – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/12/2012.",
            "Lại Ngọc Ngợi – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 26/07/2012.",
            "Ninh Xuân Trường – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 27/04/2012.",
            "Đinh Quốc Phòng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 28/05/2010.",
            "Nguyễn Văn Bạch – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 23/02/2010.",
            "Hồ Văn Ngà – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 23/02/2010.",
            "Trương Thị Hoa – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 20/12/1994.",
            "Trương Thị Hoa – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 20/12/1994.",
            "Nguyễn Văn Lanh – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 13/12/1989.",
            "Nguyễn Văn Lanh – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND năm 1989 (ngày 13/12/1989).",
            "Nguyễn Quốc Thất – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 29/04/1985.",
            "Dương Đức Thùng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 25/01/1983.",
            "Trần Ngọc Sơn – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 20/12/1979.",
            "Nguyễn Nho Bông – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 20/12/1979.",
            "Vũ Duy Vang – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 20/12/1979.",
            "Vũ Trọng Cường – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 20/12/1979.",
            "Tông Văn Kim – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 20/12/1979.",
            "Nguyễn Thị Nhạ – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Trần Kim Xuân – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Nguyễn Xuân Hinh – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Trần Văn Nuôi – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Đoàn Bường – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Võ Thị Huy – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Lê Duy Chin – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Mai Văn Ánh – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Ngô Quang Điền – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Đặng Công Nhân – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Lê Văn Trung – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Hà Hồng Hổ – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Cầm Bá Trùng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Trần Văn Lâm – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 06/11/1978.",
            "Nguyễn Văn Tửu – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 03/06/1976.",
            "Nguyễn Văn Tửu – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 03/06/1976.",
            "Lê Công Tiến – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/01/1976.",
            "Ngô Xuân Thu – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/01/1976.",
            "Nguyễn Văn Tư – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/01/1976.",
            "Trương Văn Biêng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/01/1976.",
            "Lê Huy Hoàng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/01/1976.",
            "Ngô Xuân Thu – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/01/1976.",
            "Lê Huy Hoàng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/01/1976.",
            "Lương Văn Biêng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/01/1976.",
            "Nguyễn Văn Tư – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/01/1976.",
            "Lê Minh Trung – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 12/09/1975.",
            "Lê Minh Trung – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 12/09/1975.",
            "Hoàng Quang Tính – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/12/1973.",
            "Phạm Văn Cờ – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/12/1973.",
            "Nguyễn Viết Hồng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/12/1973.",
            "Nguyễn Việt Hồng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/12/1973.",
            "Hoàng Quang Tích – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/12/1973.",
            "Phạm Văn Cờ – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/12/1973.",
            "Cao Văn Hậu – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 23/09/1973.",
            "Nguyễn Bá Tòng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 11/01/1973.",
            "Hoàng Hữu Thanh – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/10/1971.",
            "Lê Hữu Hành – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/10/1971.",
            "Hồ Thị Cảnh – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/10/1971.",
            "Lê Hữu Hãnh – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/10/1971.",
            "Hồ Thị Cảnh – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/10/1971.",
            "Trịnh Tố Tâm – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 20/09/1971.",
            "Trịnh Tố Tâm – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 20/09/1971.",
            "Lâm Tương – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 05/09/1970.",
            "Nông Văn Nghi – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 25/08/1970.",
            "Nguyễn Văn Thân – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 25/08/1970.",
            "Ma Văn Viên – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 25/08/1970.",
            "Nguyễn Văn Thoát – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 25/08/1970.",
            "Nguyễn Ngọc Sâm – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 25/08/1970.",
            "Ma Văn Viên – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 25/08/1970.",
            "Nguyễn Văn Hùng – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/02/1970.",
            "Nguyễn Hữu Quang – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 15/02/1970.",
            "Trần Ngọc Mật – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 22/12/1969.",
            "Vũ Tiến Đề – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 22/12/1969.",
            "Tô Quang Lập – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 22/12/1969.",
            "Bùi Ngọc Dương – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 23/11/1969.",
            "Cao Tất Đắc – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 18/06/1969.",
            "Hoàng Văn Nghiên – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/01/1967.",
            "Cao Văn Khang – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/01/1967.",
            "Nông Văn Việt – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/01/1967.",
            "Nguyễn Văn Bích – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/01/1967.",
            "Nông Văn Việt – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 01/01/1967.",
            "Trần Văn Chuông – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1965.",
            "Hồ Văn Bé – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 05/05/1965.",
            "Hồ Văn Bé – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 05/05/1965.",
            "Hoàng Văn Phác – Đại đội phó, Trung đoàn 333, Cục Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 07/05/1956.",
            "Trần Hiền Quang – Đại đội trưởng Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 07/05/1956.",
            "Lưu Viết Thoạng – Chính trị viên phó Đại đội, Cục Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 07/05/1956.",
            "Nguyễn Văn Thậm – Anh hùng LLVTND – được trao tặng danh hiệu Anh hùng LLVTND ngày 07/05/1956.",
            "Hoàng Văn Phác – Đại đội phó, Trung đoàn 333, Cục Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 07/05/1956.",
            "Lưu Viết Thoảng – Chính trị viên phó Đại đội, Cục Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 07/05/1956.",
            "Trần Hiền Quang – Đại đội trưởng Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 07/05/1956.",
            "Trần Văn Chuông – Anh hùng LLVTND  – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1955.",
            "Bùi Chất – Trung đội trưởng Công binh, Trung đoàn 93, Đại đoàn 324 – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1955.",
            "Chu Văn Khâm – Trung đội phó, Đại đội 56, Tiểu đoàn Công binh 206, Cục Vận tải – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1955.",
            "Võ Văn Ngồm – Tiểu đội phó, Đại đội Công binh tỉnh Mỹ Tho – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1955.",
            "Phan Tư – Đại đội trưởng, Trung đoàn 555, Cục Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1955.",
            "Phan Tư – Đại đội trưởng, Trung đoàn 555, Cục Công binh – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1955.",
            "Chu Văn Khâm – Trung đội phó, Đại đội 56, Tiểu đoàn Công binh 206, Cục Vận tải – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1955.",
            "Võ Văn Ngôm – Tiểu đội phó, Đại đội Công binh tỉnh Mỹ Tho – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1955.",
            "Bùi Chát – Anh hùng LLVTND  – được trao tặng danh hiệu Anh hùng LLVTND ngày 31/08/1955."
        ];

        // =========================================
        // 2. STATE MANAGEMENT & LOGIC
        // =========================================
        
        // Constants
        const INITIAL_LIMIT = 10;
        const STEP_SIZE = 15;

        // Reactive State
        let state = {
            collectives: {
                limit: INITIAL_LIMIT,
                total: collectivesData.length
            },
            individuals: {
                limit: INITIAL_LIMIT,
                total: individualsData.length
            }
        };

        /**
         * Initialize Lists on Page Load
         */
        document.addEventListener('DOMContentLoaded', () => {
            // Render full list for Collectives but hide items > limit
            renderFullList('collectives', collectivesData);
            updateVisibility('collectives');

            // Render full list for Individuals but hide items > limit
            renderFullList('individuals', individualsData);
            updateVisibility('individuals');
        });

        /**
         * Renders the entire list into the DOM once.
         * Visibility is handled via CSS classes later.
         */
        function renderFullList(type, dataArray) {
            const listEl = document.getElementById(type + '-list');
            listEl.innerHTML = ''; // Clear existing

            dataArray.forEach((text, index) => {
                const li = document.createElement('li');
                li.className = 'hof-item';
                li.textContent = text;
                // Initially hide everything above initial limit
                if (index >= INITIAL_LIMIT) {
                    li.classList.add('hidden');
                }
                listEl.appendChild(li);
            });
        }

        /**
         * Updates the visibility of items based on current state limit.
         * Updates Buttons and Counter text.
         */
        function updateVisibility(type) {
            const currentLimit = state[type].limit;
            const total = state[type].total;
            const listEl = document.getElementById(type + '-list');
            const items = listEl.querySelectorAll('.hof-item');

            // 1. Toggle visibility
            items.forEach((item, index) => {
                if (index < currentLimit) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // 2. Update Counter Text
            const counterEl = document.getElementById(type + '-counter');
            const displaying = Math.min(currentLimit, total);
            counterEl.textContent = `Đang hiển thị ${displaying}/${total}`;

            // 3. Toggle Buttons
            const btnMore = document.getElementById(`btn-${type === 'collectives' ? 'col' : 'ind'}-more`);
            const btnLess = document.getElementById(`btn-${type === 'collectives' ? 'col' : 'ind'}-less`);

            // Show More: Hide if we are showing all items
            if (currentLimit >= total) {
                btnMore.classList.add('d-none');
            } else {
                btnMore.classList.remove('d-none');
            }

            // Show Less: Hide if we are at initial state
            if (currentLimit <= INITIAL_LIMIT) {
                btnLess.classList.add('d-none');
            } else {
                btnLess.classList.remove('d-none');
            }
        }

        /**
         * Handles Button Clicks (More / Less)
         */
        function updateList(type, action) {
            if (action === 'more') {
                state[type].limit += STEP_SIZE;
            } else if (action === 'less') {
                state[type].limit -= STEP_SIZE;
                // Ensure we never go below initial limit
                if (state[type].limit < INITIAL_LIMIT) {
                    state[type].limit = INITIAL_LIMIT;
                }
            }
            updateVisibility(type);
        }

        document.addEventListener('DOMContentLoaded', function() {
    // 1. SELECT DOM ELEMENTS
    const wrapper = document.querySelector('.achievement-carousel-wrapper');
    const track = document.querySelector('.achievement-track');
    const cards = document.querySelectorAll('.achievement-card');
    const dots = document.querySelectorAll('.achievement-dot');
    const prevBtn = document.querySelector('.achievement-arrow.prev');
    const nextBtn = document.querySelector('.achievement-arrow.next');
    const viewMoreBtns = document.querySelectorAll('.view-more-btn');

    // Safety check: Exit if essential elements are missing
    if (!wrapper || !track || cards.length === 0) return;

    // 2. STATE MANAGEMENT
    let currentIndex = 0;
    const totalItems = cards.length;

    // ==================================================
    // A. HELPER FUNCTION: RESET/COLLAPSE
    // ==================================================
    /**
     * Resets the layout and content of the currently active card
     * before switching to a new slide.
     */
    function resetCurrentCard() {
        const currentCard = cards[currentIndex];
        
        // 1. Remove expanded class from the specific Card
        currentCard.classList.remove('expanded');

        // 2. Remove expanded class from the Main Wrapper (resets layout height)
        wrapper.classList.remove('expanded');

        // 3. Hide the Description
        const desc = currentCard.querySelector('.achievement-description');
        if (desc) desc.classList.remove('show');

        // 4. Reset Button State and Text
        const btn = currentCard.querySelector('.view-more-btn');
        if (btn) {
            btn.classList.remove('active');
            btn.textContent = 'Xem thêm';
        }
    }

    // ==================================================
    // B. NAVIGATION LOGIC (CAROUSEL)
    // ==================================================
    // --- 4. ACHIEVEMENT CAROUSEL (FIXED) ---
    const achCards = document.querySelectorAll('.achievement-card');
    const achDots = document.querySelectorAll('.achievement-dot');
    const achNext = document.querySelector('.achievement-arrow.next');
    const achPrev = document.querySelector('.achievement-arrow.prev');
    const achWrapper = document.querySelector('.achievement-carousel-wrapper');
    
    if(achCards.length > 0) {
        let achIndex = 0;
        const totalAch = achCards.length;

        function updateAchCarousel(newIndex) {
            // Reset card cũ
            const currentCard = document.querySelector('.achievement-card.active');
            if(currentCard) {
                currentCard.classList.remove('expanded');
                currentCard.querySelector('.achievement-description').classList.remove('show');
                const btn = currentCard.querySelector('.view-more-btn');
                if(btn) { btn.classList.remove('active'); btn.textContent = 'Xem thêm'; }
            }
            if(achWrapper) achWrapper.classList.remove('expanded');

            // Đổi active
            achCards[achIndex].classList.remove('active');
            achDots[achIndex].classList.remove('active');
            
            achIndex = (newIndex + totalAch) % totalAch;
            
            achCards[achIndex].classList.add('active');
            achDots[achIndex].classList.add('active');
        }

        if(achNext) achNext.addEventListener('click', () => updateAchCarousel(achIndex + 1));
        if(achPrev) achPrev.addEventListener('click', () => updateAchCarousel(achIndex - 1));
        achDots.forEach((dot, idx) => dot.addEventListener('click', () => updateAchCarousel(idx)));
        
        // Click vào card để active
        achCards.forEach((card, idx) => {
            card.addEventListener('click', (e) => {
                if(achIndex !== idx) updateAchCarousel(idx);
            });
        });

        // View More Toggle
        document.querySelectorAll('.view-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.achievement-card');
                const desc = card.querySelector('.achievement-description');
                const expanding = !desc.classList.contains('show');
                
                desc.classList.toggle('show');
                card.classList.toggle('expanded');
                if(achWrapper) achWrapper.classList.toggle('expanded');
                btn.textContent = expanding ? 'Thu gọn' : 'Xem thêm';
                btn.classList.toggle('active');
            });
        });
    }
});
