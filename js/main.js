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
    
// ========== 3. ИНИЦИАЛИЗАЦИЯ tsParticles (ДОЖДЬ) ==========
let particlesInstance = null;

function initRain() {
    const rainContainer = document.getElementById('rain-container');
    if (!rainContainer) {
        console.error('Контейнер #rain-container не найден');
        return;
    }
    
    if (typeof tsParticles === 'undefined') {
        console.error('Библиотека tsParticles не загружена');
        return;
    }
    
    console.log('Запуск ДОЖДЯ');
    
    tsParticles.load({
        id: "rain-container",
        options: {
            particles: {
                number: { 
                    value: 200,
                    density: { enable: true, area: 1000 } 
                },
                color: { value: "#ff0000" }, // Голубоватый оттенок пока красный для проверки
                shape: { 
                    type: "line",
                    options: {
                        line: {
                            length: 8,  // Длина капли
                            width: 2    // Толщина
                        }
                    }
                },
                opacity: { 
                    value: 1, // 0.7
                    random: true,
                    animation: { enable: true, speed: 0.8, minimumValue: 0.3 }
                },
                size: { 
                    value: { min: 1, max: 4 }, //1 и 2 
                    random: true 
                },
                move: {
                    enable: true,
                    speed: 12,  // Быстрее падает (капли)
                    direction: "bottom",
                    random: false,
                    straight: true,
                    outModes: { default: "out" },
                    trail: { enable: false }
                },
                wobble: { enable: false },  // Без покачиваний
                tilt: { enable: false }
            },
            interactivity: {
                events: {
                    onHover: { enable: false },
                    onClick: { enable: false }
                }
            },
            background: { color: "transparent" },
            fpsLimit: 60,
            detectRetina: true
        }
    }).then(container => {
        particlesInstance = container;
        console.log('ДОЖДЬ запущен');
    }).catch(error => {
        console.error('Ошибка:', error);
    });
}

initRain();

window.addEventListener('beforeunload', () => {
    if (particlesInstance && particlesInstance.destroy) {
        particlesInstance.destroy();
    }
});
    
    // ========== 4. СЧЕТЧИК ДНЕЙ ==========
    function updateDaysCounter() {
        const collapseDate = new Date(1991, 11, 25);
        const today = new Date();
        const diffTime = Math.abs(today - collapseDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const counterElement = document.getElementById('counterValue');
        if (counterElement) {
            counterElement.textContent = diffDays.toLocaleString();
        }
    }
    updateDaysCounter();
    
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
