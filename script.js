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
    if (card.classList.contains('active')) {
        card.classList.remove('active');
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

function toggleSubEvent(btn) {
    const currentItem = btn.closest('.sub-event-item');
    const isIsOpen = currentItem.classList.contains('open');
    const allItems = document.querySelectorAll('.sub-event-item');
    allItems.forEach(item => {
        item.classList.remove('open');
    });
    if (!isIsOpen) {
        currentItem.classList.add('open');
    }
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
            "1. Đại đội Công binh 4, Trung đoàn 7, Bộ Tư lệnh Công binh. Tuyên dương lần thứ nhất ngày 01/01/1967.",
            "2. Tiểu đoàn công binh 25 thuộc Binh trạm 1 (sau là Binh trạm 31). Tuyên dương ngày 22/12/1967.",
            "3. Đại đội Công binh 2 thuộc Tiểu đoàn công binh 1, Binh trạm 32, Bộ Tư lệnh 559. Tuyên dương ngày 18/6/1969.",
            "4. Đại đội Công binh 16, Bộ Tư lệnh 559. Tuyên dương ngày 18/6/1969.",
            "5. Đại đội Công binh 1, Bắc Quảng Nam. Tuyên dương ngày 20/12/1969.",
            "6. Tiểu đoàn Công binh 33, Binh tram 32 Bộ Tư lệnh 559. Tuyên dương ngày 22/12/1969.",
            "7. Đại đội Công binh 2, Tiểu đoàn Công binh 27, Quân khu 4. Tuyên dương ngày 22/12/1969.",
            "8. Đại đội Công binh 1, Trung đoàn 7, Bộ Tư lệnh Công binh (sau này thuộc Trung đoàn 414). Tuyên dương ngày 22/12/1969.",
            "9. Đại đội Công binh 1, Tiểu đoàn 9, Sư đoàn 3, Quân khu 5. Tuyên dương ngày 15/02/1970.",
            "10. Trung đoàn Công binh 7, Bộ Tư lệnh Công binh. Tuyên dương lần thứ nhất ngày 25/8/1970.",
            "11. Tiểu đoàn Công binh 2, Binh trạm 12, Bộ Tư lệnh 559. Tuyên dương lần thứ nhất ngày 25/8/1970.",
            "12. Đại đội Công binh 12, Trung đoàn 217, Bộ Tư lệnh Công binh. Tuyên dương ngày 25/8/1970.",
            "13. Đại đội Công binh 11, Tiểu đoàn Công binh 75, Binh trạm 41, Bộ Tư lệnh 559. Tuyên dương ngày 25/8/1970.",
            "14. Tiểu đoàn Công binh 35, Binh trạm 33, Bộ Tư lệnh 559. Tuyên dương ngày 01/10/1971.",
            "15. Tiểu đoàn Công binh 2, Trung đoàn 229, Bộ Tư lệnh Công binh. Tuyên dương lần thứ nhất ngày 20/12/1972.",
            "16. Tiểu đoàn Công binh 27, Quân khu 4. Tuyên dương ngày 11/01/1973.",
            "17. Tiểu đoàn Công binh 2, Binh trạm 37, Bộ Tư lệnh 559. Tuyên dương ngày 11/01/1973.",
            "18. Trung đoàn Công binh 98, Bộ Tư lệnh Công binh. Tuyên dương ngày 03/9/1973.",
            "19. Tiểu đoàn Công binh 25, Sư 316 Đoàn Mộc Châu. Tuyên dương ngày 03/9/1973.",
            "20. Đại đội Công binh 5, Tiểu đoàn 2, Trung đoàn 219, Bộ Tư lệnh Công binh. Tuyên dương ngày 03/9/1973.",
            "21. Đại đội Công binh 8, Trung đoàn 219, Bộ Tư lệnh Công binh. Tuyên dương ngày 23/9/1973.",
            "22. Đại đội Công binh 1, Tiểu đoàn Công binh 15, Sư đoàn 2, Quân khu 5. Tuyên dương ngày 23/9/1973.",
            "23. Đại đội Công binh 10, Tiểu đoàn 739 (sau thuộc Đoàn 25), Bộ chỉ huy Miền. Tuyên dương ngày 20/12/1973.",
            "24. Đại đội Công binh 4, Trung đoàn Công binh 83, Quân khu 5. Tuyên dương ngày 20/12/1973.",
            "25. Đại đội Công binh 15, Trung đoàn 38, Sư đoàn 2, Quân khu 5. Tuyên dương ngày 20/12/1973.",
            "26. Đại đội Công binh 14, Tiểu đoàn 582, Trung đoàn 6, Quân khu Trị - Thiên. Tuyên dương ngày 20/12/1973.",
            "27. Tiểu đoàn Công binh 24, Binh trạm 16, Bộ Tư lệnh 559. Tuyên dương ngày 31/12/1973.",
            "28. Đại đội Công binh 10, Binh trạm 11, Tổng cục Hậu cần. Tuyên dương ngày 31/12/1973.",
            "29. Trung đoàn Công binh 83, Quân khu 5. Tuyên dương ngày 12/9/1975.",
            "30. Trung đoàn Công binh 99, Bộ Tư lệnh 559. Tuyên dương ngày 12/9/1975.",
            "31. Tiểu đoàn Công binh 2, Lữ đoàn Công binh 219, Quân đoàn 2. Tuyên dương ngày 12/9/1975.",
            "32. Tiểu đoàn Công binh 739, Trung đoàn 25 Đông Nam Bộ. Tuyên dương ngày 15/01/1976.",
            "33. Sư đoàn Công binh 470, Bộ Tư lệnh 559. Tuyên dương ngày 03/6/1976.",
            "34. Trung đoàn Công binh 4, Sư đoàn Công binh 470, Bộ Tư lệnh 559. Tuyên dương ngày 03/6/1976.",
            "35. Trung đoàn Công binh 14, Bộ Tư lệnh 559. Tuyên dương ngày 03/6/1976.",
            "36. Trung đoàn Công binh 531, Bộ Tư lệnh 559. Tuyên dương ngày 03/6/1976.",
            "37. Trung đoàn Công binh 35, Sư đoàn Công binh 472, Bộ Tư lệnh 559. Tuyên dương ngày 03/6/1976.",
            "38. Trung đoàn Công binh 542, Sư đoàn Công binh 473, Bộ Tư lệnh 559. Tuyên dương ngày 03/6/1976.",
            "39. Đại đội Công binh 2, Lữ đoàn Công binh 25, Quân đoàn 4. Tuyên dương ngày 03/6/1976.",
            "40. Đại đội Công binh 19, bộ đội địa phương Quảng Nam. Tuyên dương ngày 03/6/1976.",
            "41. Trung đoàn Công binh 217, Bộ Tư lệnh 559. Tuyên dương ngày 20/10/1976.",
            "42. Đại đội Công binh 8, nay thuộc Trung đoàn Công binh 131 Hải Quân. Tuyên dương ngày 20/10/1976.",
            "43. Đại đội Công binh 2, Trung đoàn Công binh 414, Quân khu 4. Tuyên dương ngày 20/10/1976.",
            "44. Đại đội Công binh 1, Trung đoàn Công binh 976, Bộ Tư lệnh 559. Tuyên dương ngày 20/10/1976.",
            "45. Trung đoàn Công binh 216, Bộ Tư lệnh Công binh. Tuyên dương ngày 06/11/1978.",
            "46. Đại đội Công binh 19, tỉnh Bình Định (Nghĩa Bình). Tuyên dương ngày 06/11/1978.",
            "47. Đại đội Công binh 1, Tiểu đoàn Công binh 15, Sư đoàn 3. Tuyên dương ngày 12/9/1975.",
            "48. Tiểu đoàn Công binh 2, Trung đoàn Công binh 7, Quân đoàn 3. Tuyên dương ngày 28/8/1981.",
            "49. Đại đội Công binh 10, Tiểu đoàn 4, Trung đoàn Công binh 7, Quân đoàn 3. Tuyên dương ngày 28/8/1981.",
            "50. Tiểu đoàn Công binh 15, Sư đoàn 4, Quân khu 9. Tuyên dương ngày 25/01/1983.",
            "51. Tiểu đoàn Công binh 15, Sư đoàn 309, Mặt trận 479. Tuyên dương ngày 25/01/1983.",
            "52. Tiểu đoàn Công binh 25, Trung đoàn 550, Quân đoàn 4. Tuyên dương ngày 25/01/1983.",
            "53. Tiểu đoàn Công binh 25, Lữ đoàn Công binh 513, Quân khu 3. Tuyên dương ngày 29/8/1985.",
            "54. Lữ đoàn Công binh 249, Bộ Tư lệnh Công binh. Tuyên dương ngày 29/8/1985.",
            "55. Lữ đoàn Công binh 229, Bộ Tư lệnh Công binh. Tuyên dương ngày 29/8/1985.",
            "56. Lữ đoàn Công binh 299, Quân đoàn 1. Tuyên dương ngày 29/8/1985.",
            "57. Trung đoàn Công binh 6, Binh đoàn 12. Tuyên dương ngày 29/8/1985.",
            "58. Trung đoàn Công binh 509, đoàn 384, Binh đoàn 12. Tuyên dương ngày 29/8/1985.",
            "59. Trung đoàn Công binh 550, Quân đoàn 4. Tuyên dương ngày 29/8/1985.",
            "60. Trung đoàn Công binh 219, Quân đoàn 2. Tuyên dương ngày 29/8/1985.",
            "61. Trung đoàn Công binh 513, Quân khu 3. Tuyên dương ngày 29/8/1985.",
            "62. Tiểu đoàn Công binh 25, Sư đoàn 302, Mặt trận 479. Tuyên dương ngày 29/8/1985.",
            "63. Trung đoàn Công binh 280, Quân khu 5. Tuyên dương ngày 30/9/1989.",
            "64. Tiểu đoàn Công binh 15, Sư đoàn 307, Quân khu 5. Tuyên dương ngày 30/9/1989.",
            "65. Trung đoàn Công binh 131, Quân chủng Hải Quân. Tuyên dương ngày 13/1/1989.",
            "66. Đại đội Công binh 8, Tiểu đoàn 3, Lữ đoàn 229, Bộ Tư lệnh Công binh. Tuyên dương ngày 13/12/1989.",
            "67. Trung đoàn Công binh 10, Bộ Tư lệnh 559. Tuyên dương ngày 31/12/1973.",
            "68. Lữ đoàn Công binh 28, Quân chủng Phòng không – Không quân. Tuyên dương ngày 12/12/2000.",
            "69. Tiểu đoàn Công binh 1, Lữ đoàn công binh công trình 229, Bộ Tư lệnh Công binh. Tuyên dương ngày 12/12/2000.",
            "70. Lữ đoàn Công binh vượt sông 239, Bộ Tư lệnh Công binh. Tuyên dương ngày 31/7/1998.",
            "71. Lữ đoàn Công binh 279, Bộ Tư lệnh Công binh. Tuyên dương ngày 22/12/2009.",
            "72. Trung đoàn bảo quản Công trình 72, Bộ Tư lệnh Công binh. Tuyên dương ngày 12/12/2000.",
            "73. Lữ đoàn Công binh 293, Bộ Tư lệnh Công binh. Tuyên dương ngày 07/1/2013.",
            "74. Tiểu đoàn Công trình 27, Trung đoàn xây dựng Công trình 293, Bộ Tư lệnh Công binh. Tuyên dương ngày 12/12/2000.",
            "75. Tiểu đoàn Vật cản 93, Bộ tư lệnh Công binh. Tuyên dương ngày 11/6/1999.",
            "76. Lữ đoàn Công binh 575, Quân khu 1. Tuyên dương ngày 11/6/1999.",
            "77. Lữ đoàn Công binh 543, Quân khu 2. Tuyên dương ngày 31/7/1998.",
            "78. Tiểu đoàn Công binh 17 thuộc Sư đoàn 316, Quân khu 2. Tuyên dương ngày 13/01/2003.",
            "79. Lữ đoàn Công binh 414, Quân khu 4. Tuyên dương ngày 31/7/1998.",
            "80. Lữ đoàn Công binh 270, Quân khu 5. Tuyên dương ngày 12/12/2000.",
            "81. Lữ đoàn Công binh 25, Quân khu 7. Tuyên dương ngày 21/12/2005.",
            "82. Lữ đoàn Công binh 25, Quân khu 9. Tuyên dương 22/12/2004.",
            "83. Tiểu đoàn Công binh 1, Trung đoàn Công binh 25, Quân khu 9. Tuyên dương ngày 30/8/1989.",
            "84. Công ty xây dựng Lũng Lô, Binh chủng Công binh (chuyển sang BTTM 12/2012). Tuyên dương Anh hùng lao động ngày 13/12/2013.",
            "85. Phòng Công trình Quốc phòng (Cục Công trình), Binh chủng Công binh. Tuyên dương ngày 23/5/2005.",
            "86. Xưởng 10 Công binh Bộ Tham mưu, Quân khu 3. Tuyên dương ngày 30/5/2009.",
            "87. Trung tâm Công nghệ xử lý bom mìn, Binh chủng Công binh. Tuyên dương ngày 21/12/2005.",
            "88. Trường Sỹ quan Công binh, Binh chủng Công binh. Tuyên dương ngày 15/3/2008.",
            "89. Ban quản lý Công trình DK1, Binh chủng Công binh. Tuyên dương ngày 18/12/2014.",
            "90. Đại đội khảo sát công binh 1, Bộ Tư lệnh 559. Tuyên dương ngày 20/10/1976.",
            "91. Binh chủng Công binh, Bộ Quốc phòng. Tuyên dương ngày 20/10/1976.",
            "92. Tiểu đoàn Công binh 25, Sư đoàn 5, Quân khu 7. Tuyên dương ngày 29/8/1985.",
            "93. Công binh xưởng, Bộ Chỉ huy quân sự tỉnh Sóc Trăng. Tuyên dương ngày 22/2/2010.",
            "94. Phòng Công binh Miền (nay là Phòng Công binh, Bộ Tham mưu), Quân khu 7. Tuyên dương ngày 16/12/2014.",
            "95. Đại đội Công binh 604, Bộ Chỉ huy quân sự tỉnh Sóc Trăng, Quân khu 9. Tuyên dương ngày 16/12/2014.",
            "96. Đội Công binh xưởng Quân giới, thị đội Long Khánh (nay là BCHQS thị xã Long Khánh, Đồng Nai). Tuyên dương ngày 27/4/2012.",
            "97. Tiểu đoàn Công binh 19, Sư đoàn 395, Quân khu 3. Tuyên dương ngày 21/12/2005.",
            "98. Đại đội Công binh 1, tỉnh Quảng Nam - Đà Nẵng. Tuyên dương lần thứ hai ngày 19/5/1972.",
            "99. Tiểu đoàn Công binh 2, Binh trạm 12 Bộ Tư lệnh 559. Tuyên dương lần thứ hai ngày 11/01/1973.",
            "100. Tiểu đoàn Công binh 2, Lữ đoàn Công binh 229, Bộ Tư lệnh Công binh. Tuyên dương lần thứ hai ngày 30/9/1989.",
            "101. Đại đội Công binh 4, Trung đoàn Công binh 7, Quân đoàn 3. Tuyên dương lần thứ hai ngày 15/01/1976.",
            "102. Đại đội Công binh 1, Tiểu đoàn 15, Sư đoàn 3. Tuyên dương lần thứ hai ngày 20/12/1979.",
            "103. Trung đoàn Công binh 7, Quân đoàn 3. Tuyên dương lần thứ hai ngày 21/12/1979.",
            "104. Trung đoàn Công binh 83, Bộ Tư lệnh Hải quân. Tuyên dương lần thứ hai ngày 20/12/1994.",
            "105. Lữ đoàn Công binh 513 Quân khu 3. Tuyên dương lần thứ hai ngày 20/12/1994.",
            "106. Lữ đoàn Công binh 249, Binh Chủng Công binh. Tuyên dương lần thứ hai ngày 23/12/2011.",
            "107. Binh chủng Công binh, Bộ Quốc phòng. Tuyên dương lần thứ hai ngày 13/12/2013.",
            "108. Trung đoàn Công binh 131, Quân chủng Hải quân. Tuyên dương lần thứ hai ngày 21/12/2005.",
            "109. Lữ đoàn Công binh 299, Quân đoàn 1. Tuyên dương lần thứ hai ngày 29/7/2015.",
            "110. Lữ đoàn Công binh 543, Quân khu 2. Tuyên dương lần thứ hai ngày 31/7/1998.",
            "111. Tiểu đoàn Công binh 25, Lữ đoàn Công binh 513, Quân khu 3. Tuyên dương lần thứ hai ngày 22/12/2004.",
            "112. Trung đoàn công binh 7, Quân đoàn 3. Tuyên dương lần thứ ba ngày 13/01/2003.",
            "113. Tiểu đoàn Công binh 25, Lữ đoàn Công binh 513, Quân khu 3. Tuyên dương lần thứ ba ngày 22/12/2004.",
            "114. Lữ đoàn Công binh 249, Binh chủng Công Binh. Tuyên dương lần thứ ba ngày 21/8/2025."
        ];

        const individualsData = [
            "1. Trần Văn Chuông, Đại đội phó Công binh Tỉnh đội Hà Nam (Quê: Bình Lục, Hà Nam). Tuyên dương 31/8/1955.",
            "2. Bùi Chát, Trung đội trưởng công binh Trung đoàn 93, Đại đoàn 324 (Quê: Hội An, Quảng Nam). Tuyên dương 31/8/1955.",
            "3. Chu Văn Khâm, Trung đội phó, Đại đội 56, Tiểu đoàn 206, Cục Vận tải (Quê: Vĩnh Tường, Vĩnh Phú). Tuyên dương 31/8/1955.",
            "4. Võ Văn Ngôm, Tiểu đội phó, Đại đội công binh tỉnh Mỹ Tho (Quê: Châu Thành, Trà Vinh). Tuyên dương 31/8/1955.",
            "5. Phan Tư, Đại đội trưởng, Trung đoàn 555, Cục Công binh (Quê: Yên Thành, Nghệ An). Tuyên dương 31/8/1955.",
            "6. Hoàng Văn Phác, Đại đội phó, Trung đoàn 333, Cục Công binh (Quê: Lạng Giang, Hà Bắc). Tuyên dương 07/5/1956.",
            "7. Trần Hiền Quang, Đại đội trưởng công binh (Quê: Châu Thành, Sóc Trăng). Tuyên dương 07/5/1956.",
            "8. Lưu Viết Thoảng, Chính trị viên phó đại đội, Cục Công binh (Quê: Yên Dũng, Hà Bắc). Tuyên dương 07/5/1956.",
            "9. Hồ Văn Bé, Trung đội trưởng công binh - đặc công tỉnh Tiền Giang (Quê: Chợ Gạo, Tiền Giang). Tuyên dương 05/5/1965.",
            "10. Hoàng Văn Nghiên, Thượng sĩ, Tiểu đội trưởng công binh, Bộ tư lệnh 559 (Quê: Hoà An, Cao Bằng). Tuyên dương 01/01/1967.",
            "11. Cao Văn Khang, Trung sĩ, Công binh đảo Cồn Cỏ, Quân khu 4 (Quê: Hoằng Hoá, Thanh Hoá). Tuyên dương 01/01/1967.",
            "12. Nông Văn Việt, Tiểu đội trưởng, Trung đoàn công binh 7 (Quê: Trùng Khánh, Cao Bằng). Tuyên dương 01/01/1967.",
            "13. Trần Ngọc Mật, Chuẩn úy, Trung đội trưởng công binh, Quân khu 4 (Quê: Thọ Xuân, Thanh Hoá). Tuyên dương 22/12/1969.",
            "14. Cao Tất Đắc, Chuẩn úy, Đội phó đội phá bom 89, Quân khu 4 (Quê: Hoằng Hoá, Thanh Hoá). Tuyên dương 18/6/1969.",
            "15. Vũ Tiến Đề, Chuẩn úy, Đội trưởng máy húc, Bộ tư lệnh 559 (Quê: Đông Quan, Thái Bình). Tuyên dương 22/12/1969.",
            "16. Tô Quang Lập, Thượng sĩ, Trung đội trưởng công binh, Bộ tư lệnh 559 (Quê: Lục Nam, Hà Bắc). Tuyên dương 22/12/1969.",
            "17. Bùi Ngọc Dương, Trung đội phó, Trung đoàn Công binh 7 (Quê: Hà Nội). Tuyên dương 23/11/1969.",
            "18. Nguyễn Văn Bích, Trung đội phó công binh Bắc Gia Định (Quê: Hóc Môn, Gia Định). Tuyên dương 01/01/1967.",
            "19. Nguyễn Văn Hùng, Trung đội phó công binh Bộ đội địa phương Tây Bắc Sài Gòn (Quê: Củ Chi, Gia Định). Tuyên dương 15/02/1970.",
            "20. Nguyễn Hữu Quang, Tiểu đoàn trưởng công binh Sư đoàn 3 (Quê: Phù Cát, Nghĩa Bình). Tuyên dương 15/02/1970.",
            "21. Lâm Tương, Trung đội phó công binh, Bộ đội địa phương tỉnh Sóc Trăng (Quê: Vĩnh Châu, Sóc Trăng). Tuyên dương 05/9/1970.",
            "22. Nông Văn Nghi, Trung úy, Trợ lý công binh tỉnh đội Lạng Sơn (Quê: Tràng Định, Lạng Sơn). Tuyên dương 25/8/1970.",
            "23. Nguyễn Văn Thân, Thượng sĩ, Tiểu đội trưởng công binh, Bộ tư lệnh 559 (Quê: Quế Võ, Hà Bắc). Tuyên dương 25/8/1970.",
            "24. Ma Văn Viên, Thượng sĩ, Tiểu đội trưởng Trung đoàn 289, Bộ tư lệnh Công binh (Quê: Định Hoá, Bắc Thái). Tuyên dương 25/8/1970.",
            "25. Nguyễn Văn Thoát, Thượng sĩ, Tiểu đội trưởng công binh, Bộ tư lệnh 559 (Quê: Bạch Thông, Bắc Thái). Tuyên dương 25/8/1970.",
            "26. Nguyễn Ngọc Sâm, Trung sĩ, Tiểu đội trưởng, Bộ tư lệnh Công binh (Quê: Văn Giang, Hải Hưng). Tuyên dương 25/8/1970.",
            "27. Hoàng Hữu Thanh, Chuẩn úy, Đại đội phó công binh, Bộ tư lệnh 559 (Quê: Đô Lương, Nghệ Tĩnh). Tuyên dương 01/10/1971.",
            "28. Trịnh Tố Tâm, Đại đội trưởng công binh Đoàn 4, Quân khu Trị - Thiên (Quê: Ứng Hoà, Hà Sơn Bình). Tuyên dương 20/9/1971.",
            "29. Lê Hữu Hãnh, Trung sĩ, Tiểu đội trưởng Đội 93, Bộ tư lệnh Công binh (Quê: Vĩnh Lộc, Thanh Hoá). Tuyên dương 01/10/1971.",
            "30. Hồ Thị Cảnh, Công nhân quốc phòng, Trung đoàn 217, Bộ tư lệnh Công binh (Quê: Quỳnh Lưu, Nghệ Tĩnh). Tuyên dương 01/10/1971.",
            "31. Cao Văn Hậu, Tiểu đội trưởng, Trung đoàn 229, Bộ tư lệnh Công binh (Quê: Anh Sơn, Nghệ Tĩnh). Tuyên dương 23/9/1973.",
            "32. Nguyễn Bá Tòng, Thiếu úy, Chính trị viên phó đại đội công binh, Bộ Tư lệnh 559 (Quê: Hữu Lũng, Lạng Sơn). Tuyên dương 11/01/1973.",
            "33. Hoàng Quang Tính, Thiếu úy, Đại đội phó công binh, Bộ tư lệnh 559 (Quê: Lục Ngạn, Hà Bắc). Tuyên dương 31/12/1973.",
            "34. Phạm Văn Cờ, Đại đội phó, Trung đoàn công binh 98, Bộ tư lệnh 559 (Quê: Gia Lộc, Hải Hưng). Tuyên dương 31/12/1973.",
            "35. Nguyễn Việt Hồng, Trung sĩ, Tiểu đội trưởng, d27 công binh, Bộ tư lệnh 559 (Quê: Thạch Hà, Nghệ Tĩnh). Tuyên dương 31/12/1973.",
            "36. Lê Công Tiến, Thiếu úy Đại đội trưởng Đại đội 2, Tiểu đoàn 17, Sư đoàn 390 (Quê: Yên Phong, Bắc Ninh). Tuyên dương 15/01/1976.",
            "37. Liệt sĩ Ngô Xuân Thu, Trung đội phó công binh, Bộ đội địa phương Quảng Đà (Quê: Kim Bảng, Hà Nam Ninh). Tuyên dương 15/01/1976.",
            "38. Nguyễn Văn Tư, Trung úy Trợ lý Công binh tỉnh Kiên Giang (Quê: Châu Thành, Cần Thơ). Tuyên dương 15/01/1976.",
            "39. Lê Huy Hoàng, Trung đội trưởng công binh Tổng cục Hậu cần (Quê: Nông Cống, Thanh hoá). Tuyên dương 15/01/1976.",
            "40. Lương Văn Biêng, Tiểu đội trưởng công binh, Trung đoàn 33, Quân khu 7 (Quê: Quân Hoá, Thanh Hoá). Tuyên dương 15/01/1976.",
            "41. Nguyễn Văn Tửu, Thiếu tá, Trung đoàn phó Trung đoàn 14, Bộ tư lệnh 559 (Quê: Nam Ninh, Hà Nam Ninh). Tuyên dương 3/6/1976.",
            "42. Liệt sĩ Nguyễn Thị Nhạ, Thượng sĩ Trung đội trưởng công binh, Trung đoàn 14 (Quê: Thanh Liêm, Hà Nam Ninh). Tuyên dương 6/11/1978.",
            "43. Trần Kim Xuân, Thượng úy Đội phá bom 93, Bộ tư lệnh Công binh (Quê: Lập Thạch, Vĩnh Phú). Tuyên dương 6/11/1978.",
            "44. Nguyễn Xuân Hinh, Trung úy, CTV phó tiểu đoàn, Lữ đoàn 239 (Quê: Hậu Lộc, Thanh Hoá). Tuyên dương 6/11/1978.",
            "45. Liệt sĩ Trần Văn Nuôi, Đại đội phó, Tiểu đoàn 525, Quân khu 7 (Quê: Cầu Ngang, Cửu Long). Tuyên dương 6/11/1978.",
            "46. Liệt sĩ Đoàn Bường, Thiếu úy, Trợ lý công binh huyện Thăng Bình (Quê: Thăng Bình, Quảng Nam). Tuyên dương 6/11/1978.",
            "47. Võ Thị Huy (tức Tín), Trung đội trưởng công binh tỉnh Nghĩa Bình (Quê: Hoài Nhơn, Nghĩa Bình). Tuyên dương 6/11/1978.",
            "48. Lê Duy Chín, Đại úy, Tiểu đoàn trưởng công binh tỉnh Đồng Nai (Quê: Nghi Xuân, Nghệ Tĩnh). Tuyên dương 6/11/1978.",
            "49. Mai Văn Ánh, Thượng úy, Đại đội trưởng công binh tỉnh Bến Tre (Quê: Châu Thành, Bến Tre). Tuyên dương 6/11/1978.",
            "50. Ngô Quang Điền, Trung úy, Chính trị viên Đại đội 10, Tiểu đoàn 739, Quân khu 7 (Quê: Nam Ninh, Hà Nam Ninh). Tuyên dương 6/11/1978.",
            "51. Đặng Công Nhân, Trung úy, Chính trị viên Đại đội công binh 512 Kiên Giang (Quê: Vĩnh Thuận, Kiên Giang). Tuyên dương 6/11/1978.",
            "52. Lê Văn Trung, Chuẩn úy, Trạm trưởng trạm sửa chữa, Trung đoàn 289 (Quê: Thiệu Yên, Thanh Hoá). Tuyên dương 6/11/1978.",
            "53. Hà Hồng Hồ, Thượng sĩ, Trung đội trưởng công binh tỉnh An Giang (Quê: Thanh Bình, Đồng Tháp). Tuyên dương 6/11/1978.",
            "54. Cầm Bá Trừng, Thượng sĩ, Đại đội phó công binh, Sư đoàn 472 (Quê: Thường Xuân, Thanh Hoá). Tuyên dương 6/11/1978.",
            "55. Trần Văn Lâm, Thượng sĩ, Trung đội phó Trung đoàn công binh 83, Quân khu 5 (Quê: Nga Sơn, Thanh Hoá). Tuyên dương 6/11/1978.",
            "56. Trần Ngọc Sơn, Binh nhất, Tiểu đội phó Đại đội 16, Trung đoàn 12, Sư đoàn 3 (Quê: Hai Bà Trưng, Hà Nội). Tuyên dương 20/12/1979.",
            "57. Nguyễn Nho Bông, Thượng úy, Tiểu đoàn trưởng công binh, Quân đoàn 14 (Quê: Nông Cống, Thanh Hoá). Tuyên dương 20/12/1979.",
            "58. Vũ Duy Vang, Thượng úy Tiểu đoàn công binh 278, Quân khu 7 (Quê: Đông Hưng, Thái Bình). Tuyên dương 20/12/1979.",
            "59. Vũ Trọng Cường, Phó đại đội trưởng quân sự, Đại đội 2, Tiểu đoàn Công binh 25 (Quê: Nam Trực, Nam Định). Tuyên dương 20/12/1979.",
            "60. Tòng Văn Kim, Trung sĩ, Tiểu đội trưởng công binh, công an vũ trang Lai Châu (Quê: Điện Biên, Lai Châu). Tuyên dương 20/12/1979.",
            "61. Dương Đức Thùng, Chuẩn úy, Đại đội trưởng công binh, Lữ đoàn 550 (Quê: Trà Lĩnh, Cao Bằng). Tuyên dương 25/01/1983.",
            "62. Nguyễn Quốc Thất, Thượng úy, Đại đội trưởng Đại đội 8, Trung đoàn 550 (Quê: Đô Lương, Nghệ An). Tuyên dương 29/4/1985.",
            "63. Trương Thị Hoa, Tổ trưởng Công binh xã Châu Thành, Phụng Hiệp, Cần Thơ (Quê: Phụng Hiệp, Cần Thơ). Tuyên dương 20/12/1994.",
            "64. Nguyễn Văn Lanh, Hạ sỹ, Tiểu đội trưởng xây dựng công trình tại đảo Gạc Ma (Quê: Lệ Thủy, Quảng Bình). Tuyên dương 13/12/1989.",
            "65. Hoàng Đăng Vinh, nguyên cán bộ Binh chủng Công binh (Quê: Phù Cừ, Hưng Yên). Tuyên dương 10/8/2015.",
            "66. Phan Đức Sử, nguyên cán bộ Lữ đoàn 229, Binh chủng Công binh (Quê: Ân Thi, Hưng Yên). Tuyên dương 10/8/2015.",
            "67. Nguyễn Phú Xuyên Khung, nguyên cán bộ Lữ đoàn 229 (Quê: Long Biên, Hà Nội). Tuyên dương 9/10/2014.",
            "68. Đỗ Vinh Thăng, nguyên cán bộ Lữ đoàn 249 (Quê: Phúc Yên, Vĩnh Phúc). Tuyên dương 9/10/2014.",
            "69. Lê Minh Trung, Huyện đội phó Điện Bàn, Quảng Nam (Quê: Điện Bàn, Quảng Nam). Tuyên dương 12/9/1975.",
            "70. Nguyễn Văn Bạch, Tiểu đội trưởng Đơn vị A83, Trung đoàn 151 (Quê: Vĩnh Yên, Vĩnh Phúc). Tuyên dương 23/2/2010.",
            "71. Hồ Văn Ngà, Đội trưởng Đội Công binh huyện Châu Thành, Long An (Quê: Châu Thành, Long An). Tuyên dương 23/02/2010.",
            "72. Đinh Quốc Phòng, Chiến sĩ Đại đội Công binh 19, tỉnh đội Quảng Nam (Quê: Xuân Trường, Nam Định). Tuyên dương 28/5/2010.",
            "73. Ninh Xuân Trường, Tiểu đội trưởng, Trung đoàn 95, Sư đoàn 2 (Quê: Lạng Giang, Bắc Giang). Tuyên dương 27/4/2012.",
            "74. Lại Ngọc Ngợi, Trung đội trưởng, Đại đội 19 Công binh, Tỉnh đội Quảng Nam (Quê: Hải Hậu, Nam Định). Tuyên dương 26/7/2012.",
            "75. Nguyễn Hữu Tề, Chính trị viên Đại đội 19 Công binh, Tỉnh đội Quảng Nam (Quê: Ý Yên, Nam Định). Tuyên dương 6/12/2012.",
            "76. Nguyễn Thành Chung, Trợ lý Công binh, Ban CHQS huyện Hải Hậu (Quê: Hải Hậu, Nam Định). Tuyên dương 9/10/2014.",
            "77. Du Long Thành (Năm Thành), Giám đốc Công binh xưởng, Tỉnh đội Sóc Trăng (Quê: Giá Rai, Bạc Liêu). Tuyên dương 9/10/2014.",
            "78. Đào Khắc Nhạn, Chính trị viên Đại đội Công binh F50, Tỉnh đội Phú Yên (Quê: Đông Hòa, Phú Yên). Tuyên dương 10/8/2015.",
            "79. Võ Công Đích, Tiểu đội trưởng Đại đội Công binh, Tỉnh đội Quảng Nam (Quê: Quế Sơn, Quảng Nam). Tuyên dương 26/4/2018.",
            "80. Nguyễn Văn Thậm, Tiểu đội trưởng Đại đội Công binh, Trung đoàn 1 (Quê: Bến Cát, Sông Bé). Tuyên dương 7/5/1956.",
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

// =========================================
// DATA SOURCES (Đã cập nhật nội dung mới)
// =========================================
const commandersData = [
    { name: "Hoàng Đạo Thúy", time: "1948-1948", rank: "Đại tá (1958)", role: "Công chính Giao thông Cục trưởng", details: "Cục trưởng Cục Quân huấn, Cục trưởng Cục Thông tin liên lạc.", img: "binh-chung/chinhuy/hoang-dao-thuy.jpg" },
    { name: "Lê Khắc", time: "1948-1951", rank: "Đại tá (1950)", role: "Công chính Giao thông Cục trưởng", details: "Bộ trưởng Bộ Ngoại Thương (1980-1986).", img: "binh-chung/chinhuy/le-khac.jpg" },
    { name: "Trần Đình Xu", time: "1956-1961", life: "(1921-1969)", rank: "Đại tá (1961)", role: "Công chính Giao thông Cục trưởng", details: "Tư lệnh Quân khu Sài Gòn-Gia Định.", img: "binh-chung/chinhuy/tran-dinh-xu.jpg" },
    { name: "Phạm Hoàng", time: "1965-1970", rank: "---", role: "Cục trưởng Cục Công binh", details: "Nguyên Tư lệnh Binh chủng Công binh.", img: "binh-chung/chinhuy/pham-hoang.jpg" },
    { name: "Trần Bá Đăng", time: "1970-1987", rank: "---", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/tran-ba-dang.jpg" },
    { name: "Vũ Trọng Hà", time: "1987-1989", rank: "Thiếu tướng", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/vu-trong-ha.jpg" },
    { name: "Nguyễn Hữu Yên", time: "1989-1995", rank: "Thiếu tướng (1990)", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/nguyen-huu-yen.jpg" },
    { name: "Đặng Văn Phúc", time: "1995-2000", rank: "Đại tá", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/dang-van-phuc.jpg" },
    { name: "Trương Quang Khánh", time: "2000-2004", rank: "Thượng tướng (2011)", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "Thứ trưởng Bộ Quốc phòng (2009-2016).", img: "binh-chung/chinhuy/truong-quang-khanh.jpg" },
    { name: "Hoàng Kiền", time: "2004-2007", rank: "Thiếu tướng (2006)", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "Trưởng Ban Quản lý Dự án 47, BTTM (2007-2014).", img: "binh-chung/chinhuy/hoang-kien.jpg" },
    { name: "Dương Đức Hòa", time: "2007-2010", rank: "Thiếu tướng (2007)", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "Tư lệnh Quân khu 2 (2011-2016).", img: "binh-chung/chinhuy/duong-duc-hoa.jpg" },
    { name: "Phạm Quang Xuân", time: "2010-2014", rank: "Trung tướng (2015)", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "Phó Giám đốc Học viện Quốc phòng (2014-2016).", img: "binh-chung/chinhuy/pham-quang-xuan.jpg" },
    { name: "Trần Hồng Minh", time: "2014-2016", rank: "Trung tướng (2018)", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "Bộ trưởng Bộ Xây dựng (2025-nay).", img: "binh-chung/chinhuy/tran-hong-minh.jpg" },
    { name: "Phùng Ngọc Sơn", time: "2016-6/2020", rank: "Thiếu tướng (2016)", role: "Nguyên Tư lệnh Binh chủng Công binh", details: "Phó chủ nhiệm kiêm TMT Tổng cục Kỹ thuật.", img: "binh-chung/chinhuy/phung-ngoc-son.jpg" },
    { name: "Trần Trung Hòa", time: "6/2020-nay", rank: "Thiếu tướng", role: "Tư lệnh Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/tran-trung-hoa.jpg" }
];

const commissarsData = [
    { name: "Đặng Quốc Bảo", time: "1962-1965", rank: "Thiếu tướng (1974)", role: "Nguyên Chính ủy Binh chủng Công binh", details: "Chánh VP TCCT, Trưởng ban Khoa giáo TW.", img: "binh-chung/chinhuy/dang-quoc-bao.jpg" },
    { name: "Chu Thanh Hương", time: "1965-1974", rank: "Thiếu tướng", role: "Nguyên Chính ủy Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/chu-thanh-huong.jpg" },
    { name: "Trần Thế Môn", time: "1974-1977", rank: "Thiếu tướng (1974)", role: "Nguyên Chính ủy Binh chủng Công binh", details: "Chánh án Tòa án Quân sự TW.", img: "binh-chung/chinhuy/tran-the-mon.jpg" },
    { name: "Nguyễn Huân", time: "1977-1982", rank: "Trung tướng", role: "Nguyên Chính ủy Binh chủng Công binh", details: "Chánh án Tòa án Quân sự TW.", img: "binh-chung/chinhuy/nguyen-huan.jpg" },
    { name: "Nguyễn Đình Ích", time: "1982-1983", rank: "Thiếu tướng", role: "Nguyên Chính ủy Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/nguyen-dinh-ich.jpg" },
    { name: "Trần Bình", time: "1983-1995", rank: "Thiếu tướng", role: "Nguyên Chính ủy Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/tran-binh.jpg" },
    { name: "Hoàng Khánh Hưng", time: "1995-2002", rank: "Trung tướng (2008)", role: "Nguyên Chính ủy Binh chủng Công binh", details: "Chính ủy Học viện Kỹ thuật Quân sự.", img: "binh-chung/chinhuy/hoang-khanh-hung.jpg" },
    { name: "Mai Ngọc Linh", time: "2002-2007", rank: "Thiếu tướng (2004)", role: "Nguyên Chính ủy Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/mai-ngoc-linh.jpg" },
    { name: "Hoàng Sĩ Nam", time: "2007-2013", rank: "Thiếu tướng (2008)", role: "Nguyên Chính ủy Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/hoang-si-nam.jpg" },
    { name: "Trần Xuân Mạnh", time: "2013-2017", rank: "Thiếu tướng (2013)", role: "Nguyên Chính ủy Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/tran-xuan-manh.jpg" },
    { name: "Lê Xuân Cát", time: "2017-6/2022", rank: "Thiếu tướng (12/2017)", role: "Nguyên Chính ủy Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/le-xuan-cat.jpg" },
    { name: "Đinh Ngọc Tường", time: "6/2022-nay", rank: "Thiếu tướng (11/2022)", role: "Chính ủy Binh chủng Công binh", details: "", img: "binh-chung/chinhuy/dinh-ngoc-tuong.jpg" }
];

// =========================================
// LOGIC CLASS: LeaderCarousel (Scroll Snap)
// =========================================

class LeaderCarousel {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.currentIndex = 0;
        this.isScrolling = false;

        // Configuration for Widths (MUST MATCH CSS)
        this.updateDimensions();
        this.init();
    }

    updateDimensions() {
        this.isMobile = window.innerWidth <= 768;
        this.cardWidth = this.isMobile ? 280 : 350;
        this.gap = this.isMobile ? 20 : 40;
        // The total space one item takes up
        this.stride = this.cardWidth + this.gap;
    }

    init() {
        if (!this.container) return; // Safety check

        // 1. Render Cards
        this.data.forEach((item, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'leader-card-item';
            wrapper.dataset.index = index;

            // Inner HTML (Template)
            wrapper.innerHTML = `
                <div class="slide-card-tu-lenh">
                    <div class="slide-number">${index + 1}</div>
                    <img src="${item.img}" alt="${item.name}" class="slide-image-tu-lenh" loading="lazy">
                    <div class="slide-content-tu-lenh">
                        <h3 class="slide-name-tu-lenh">${item.name}</h3>
                        <div class="info-row">
                            <span class="info-label">Thời gian:</span>
                            <span class="info-value">${item.time}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Cấp bậc:</span>
                            <span class="info-value"><span class="rank-badge">${item.rank || 'N/A'}</span></span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Chức vụ:</span>
                            <span class="info-value">${item.role}</span>
                        </div>
                        ${item.details ? `
                        <div class="info-row" style="border:none; padding-top:10px;">
                            <span class="info-label">Chức vụ cuối cùng:</span>
                            <span class="info-value" style="font-size:0.85rem; font-style:italic;">${item.details}</span>
                        </div>` : ''}
                    </div>
                </div>
            `;

            // CLICK TO NAVIGATE (Center logic)
            wrapper.addEventListener('click', () => {
                this.scrollToIndex(index);
            });

            this.container.appendChild(wrapper);
        });

        // 2. Set Initial State
        this.scrollToIndex(0);

        // 3. Add Wheel Listener (Scroll Jacking - Desktop)
        this.container.addEventListener('wheel', (evt) => {
            // Check for vertical scroll on desktop
            if (!this.isMobile && Math.abs(evt.deltaY) > Math.abs(evt.deltaX)) {
                evt.preventDefault();
                
                // Debounce/Throttle the scroll
                if (this.isScrolling) return;
                this.isScrolling = true;

                if (evt.deltaY > 0) {
                    // Scroll Right (Next)
                    this.scrollToIndex(Math.min(this.currentIndex + 1, this.data.length - 1));
                } else {
                    // Scroll Left (Prev)
                    this.scrollToIndex(Math.max(this.currentIndex - 1, 0));
                }

                // Unlock scroll after animation duration
                setTimeout(() => { this.isScrolling = false; }, 400);
            }
        }, { passive: false });

        // 4. Handle Resize
        window.addEventListener('resize', () => {
           this.updateDimensions();
           this.scrollToIndex(this.currentIndex);
        });
        
        // 5. Native Scroll Listener (For Touch/Swipe update active state)
        this.container.addEventListener('scroll', () => {
             clearTimeout(this.scrollTimeout);
             this.scrollTimeout = setTimeout(() => {
                 const centerPosition = this.container.scrollLeft;
                 // Calculate which index is closest to center
                 // We use Math.round to find the nearest snap point
                 const newIndex = Math.round(centerPosition / this.stride);
                 
                 if (newIndex !== this.currentIndex && newIndex >= 0 && newIndex < this.data.length) {
                     this.currentIndex = newIndex;
                     this.updateActiveClasses();
                 }
             }, 50);
        });
    }

    scrollToIndex(index) {
        this.currentIndex = index;
        const position = index * this.stride;
        
        this.container.scrollTo({
            left: position,
            behavior: 'smooth'
        });
        
        this.updateActiveClasses();
    }

    updateActiveClasses() {
        const items = this.container.querySelectorAll('.leader-card-item');
        items.forEach((item, idx) => {
            if (idx === this.currentIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
    new LeaderCarousel('container-tulenh', commandersData);
    new LeaderCarousel('container-chinhuy', commissarsData);
});

// Biến toàn cục lưu danh sách ảnh và vị trí hiện tại
let slideshowData = [];
let currentSlideIndex = 0;

// Hàm khởi tạo dữ liệu (Chạy 1 lần khi bấm nút)
function initSlideshowData() {
    slideshowData = []; // Reset dữ liệu
    
    // 1. Tìm tất cả các sự kiện con trong Timeline
    const items = document.querySelectorAll('.sub-event-item');
    
    // 2. Duyệt qua từng sự kiện để lấy thông tin
    items.forEach(item => {
        const imgEl = item.querySelector('.event-img');
        
        // Chỉ lấy những sự kiện CÓ ẢNH
        if (imgEl) {
            const dateEl = item.querySelector('.sub-date');
            const titleEl = item.querySelector('.sub-title');
            const descEl = item.querySelector('.sub-text');
            
            // Đẩy vào mảng dữ liệu
            slideshowData.push({
                src: imgEl.src, // Lấy đường dẫn ảnh thực tế trong thẻ img
                date: dateEl ? dateEl.innerText : '',
                title: titleEl ? titleEl.innerText : '',
                desc: descEl ? descEl.innerText : ''
            });
        }
    });
}

// Hàm BẮT ĐẦU trình chiếu
function startSlideshow() {
    // Luôn cập nhật dữ liệu mới nhất từ HTML
    initSlideshowData();
    
    if (slideshowData.length === 0) {
        alert("Chưa có ảnh nào trong Timeline để trình chiếu!");
        return;
    }
    
    // Mở Modal
    document.getElementById('slideshowModal').classList.add('active');
    
    // Bắt đầu từ ảnh đầu tiên (hoặc logic khác tùy ý)
    currentSlideIndex = 0; 
    renderSlide();
    
    // Thêm sự kiện bàn phím
    document.addEventListener('keydown', handleKeyInput);
}

// Hàm ĐÓNG trình chiếu
function closeSlideshow() {
    document.getElementById('slideshowModal').classList.remove('active');
    document.removeEventListener('keydown', handleKeyInput);
}

// Hàm HIỂN THỊ slide dựa trên currentSlideIndex
function renderSlide() {
    const data = slideshowData[currentSlideIndex];
    
    // Gán dữ liệu vào các thẻ HTML trong Modal
    document.getElementById('slideImg').src = data.src;
    document.getElementById('slideDate').innerText = data.date;
    document.getElementById('slideTitle').innerText = data.title;
    document.getElementById('slideDesc').innerText = data.desc;
    document.getElementById('slideCounter').innerText = 
        `Ảnh ${currentSlideIndex + 1} / ${slideshowData.length}`;
}

// Hàm CHUYỂN slide (Next/Prev)
function changeSlide(step) {
    currentSlideIndex += step;
    
    // Logic vòng lặp (về đầu hoặc về cuối)
    if (currentSlideIndex >= slideshowData.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slideshowData.length - 1;
    }
    
    renderSlide();
}

// Xử lý phím tắt (Mũi tên & ESC)
function handleKeyInput(e) {
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'Escape') closeSlideshow();
}
