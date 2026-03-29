// ========== ПАРАЛАКС-ХРОНИКА ==========
(function() {
    // Эффект паралакса при прокрутке
    const parallaxSections = document.querySelectorAll('.parallax-section');
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        parallaxSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            const sectionCenter = (sectionTop + sectionBottom) / 2;
            const viewportCenter = windowHeight / 2;
            
            // Определяем видимость секции
            if (sectionTop < windowHeight - 100 && sectionBottom > 100) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
            
            // Паралакс для фона
            const bg = section.querySelector('.parallax-bg');
            if (bg) {
                const speed = 0.3;
                const yPos = -(scrollY * speed) % 100;
                bg.style.transform = `translateY(${yPos}px) scale(1.05)`;
            }
            
            // 3D-наклон при приближении
            const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
            const maxTilt = 5;
            const tilt = Math.min(maxTilt, (1 - distanceFromCenter / viewportCenter) * maxTilt);
            
            const content = section.querySelector('.parallax-content');
            if (content && distanceFromCenter < viewportCenter) {
                content.style.transform = `perspective(1000px) rotateX(${tilt * 0.3}deg) rotateY(${tilt * 0.2}deg) translateY(-5px)`;
            } else if (content) {
                content.style.transform = '';
            }
        });
    }
    
    // Запускаем при скролле
    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    updateParallax();
    
    console.log('✅ Паралакс-хроника активирована');
})();