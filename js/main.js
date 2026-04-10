// ========== ГЛАВНЫЙ СКРИПТ САЙТА ==========
// Подключает все библиотеки и инициализирует эффекты

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== СЧЁТЧИК ДНЕЙ ==========
function updateDaysCounter() {
    const collapseDate = new Date(1991, 11, 25);
    const today = new Date();
    const diffTime = Math.abs(today - collapseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const counterElement = document.getElementById('counterValue');
    if (counterElement) {
        counterElement.textContent = diffDays.toLocaleString();
        console.log('Счётчик обновлён:', diffDays);
    }
}
updateDaysCounter(); // ← ВЫЗОВ!
    
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
    
// ========== tsParticles ДОЖДЬ (через изображение) ==========
tsParticles.load({
    id: "rain-container",
    options: {
        fpsLimit: 60,
        particles: {
            number: {
                value: 120,
                density: { enable: true, area: 800 }
            },
            color: { value: "#aaddff" },
            shape: {
                type: "image",
                options: {
                    image: {
                        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath d='M5,0 C5,0 1,4 1,7 C1,9 2,10 5,10 C8,10 9,9 9,7 C9,4 5,0 5,0 Z' fill='%23aaddff' opacity='0.8'/%3E%3C/svg%3E",
                        width: 8,
                        height: 8
                    }
                }
            },
            opacity: {
                value: 0.8,
                random: true,
                animation: { enable: true, speed: 0.5, minimumValue: 0.4 }
            },
            size: {
                value: { min: 6, max: 10 },
                random: true
            },
            move: {
                enable: true,
                speed: 10,
                direction: "bottom",
                random: false,
                straight: true,
                outModes: { default: "out" }
            }
        },
        background: { color: "transparent" },
        fullScreen: { enable: false, zIndex: 9999 }
    }
}).then(() => console.log('Дождь из капель запущен'));
    
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
