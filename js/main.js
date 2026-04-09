// ========== ГЛАВНЫЙ СКРИПТ САЙТА ==========
// Подключает все библиотеки и инициализирует эффекты

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. ИНИЦИАЛИЗАЦИЯ AOS (Анимация при скролле) ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
        console.log('AOS инициализирован');
    }
    
    // ========== 2. ИНИЦИАЛИЗАЦИЯ SWIPER (Горизонтальный таймлайн) ==========
    const swiperElement = document.querySelector('.timeline-swiper');
    if (swiperElement && typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.timeline-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            effect: 'slide',
            speed: 800
        });
        console.log('Swiper инициализирован');
    }
    
// ========== 3. tsParticles ДОЖДЬ  ==========
document.addEventListener('DOMContentLoaded', function() {
    const rainContainer = document.getElementById('rain-container');
    if (!rainContainer) {
        console.error(' Контейнер #rain-container не найден в main.js');
        return;
    }
    
    console.log(' main.js: пробуем запустить tsParticles дождь...');
    
    if (typeof tsParticles === 'undefined') {
        console.error(' tsParticles не загружен! Проверьте подключение библиотеки.');
        return;
    }
    
    // Очищаем контейнер
    rainContainer.innerHTML = '';
    
    // Запускаем дождь
    tsParticles.load({
        id: "rain-container",
        options: {
            fpsLimit: 60,
            particles: {
                number: {
                    value: 200,
                    density: {
                        enable: true,
                        area: 800
                    }
                },
                color: {
                    value: ["#88bbff", "#aaddff", "#6699cc"]
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.7,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 0.5,
                        minimumValue: 0.3
                    }
                },
                size: {
                    value: { min: 1, max: 3 },
                    random: true
                },
                move: {
                    enable: true,
                    speed: 8,
                    direction: "bottom",
                    random: false,
                    straight: true,
                    outModes: {
                        default: "out"
                    }
                }
            },
            interactivity: {
                events: {
                    onHover: { enable: false },
                    onClick: { enable: false }
                }
            },
            background: {
                color: "transparent"
            },
            fullScreen: {
                enable: false,
                zIndex: 9999
            }
        }
    }).then(() => {
        console.log(' tsParticles дождь УСПЕШНО запущен!');
    }).catch((error) => {
        console.error(' Ошибка tsParticles:', error);
    });
});
    
    // ========== 5. GSAP АНИМАЦИИ ==========
    if (typeof gsap !== 'undefined') {
        // Анимация заголовка
        gsap.fromTo(".glitch", 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        );
        
        gsap.fromTo(".subtitle", 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
        );
        
        gsap.fromTo(".description", 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" }
        );
        
        gsap.fromTo(".counter", 
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8, delay: 0.9, ease: "backOut" }
        );
        
        console.log('GSAP анимации запущены');
    }
    
    // ========== 6. АККОРДЕОНЫ (без дёрганья) ==========
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const scrollY = window.scrollY;
            
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== parent && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            
            parent.classList.toggle('active');
            
            setTimeout(() => {
                if (window.scrollY !== scrollY) {
                    window.scrollTo(0, scrollY);
                }
            }, 10);
        });
    });
    
    console.log('Сайт полностью загружен, все эффекты активированы');
});
