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
        console.log('✅ AOS инициализирован');
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
        console.log('✅ Swiper инициализирован');
    }
    
    // ========== 3. ИНИЦИАЛИЗАЦИЯ tsParticles (ДОЖДЬ) ==========
let particlesInstance = null;

function initRain() {
    const rainContainer = document.getElementById('rain-container');
    if (!rainContainer) {
        console.error('Контейнер #rain-container не найден');
        return;
    }
    
    // Проверяем, загружена ли библиотека tsParticles
    if (typeof tsParticles === 'undefined') {
        console.error('Библиотека tsParticles не загружена');
        return;
    }
    
    console.log('Запуск tsParticles');
    
    
    tsParticles.load({
        id: "rain-container",
        options: {
            particles: {
                number: { 
                    value: 150,  //  было 250
                    density: { enable: true, area: 800 } 
                },
                color: { value: ["#ffffff", "#e0e0e0", "#c0c0c0"] },
                shape: { type: "circle" },
                opacity: { 
                    value: 0.6, 
                    random: true,
                    animation: { enable: true, speed: 0.5, minimumValue: 0.2 }
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
                    outModes: { default: "out" }
                }
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
        console.log('tsParticles дождь успешно запущен');
    }).catch(error => {
        console.error('Ошибка запуска tsParticles:', error);
    });
}

// Запускаем дождь
initRain();

// Очистка при уходе со страницы
window.addEventListener('beforeunload', () => {
    if (particlesInstance && particlesInstance.destroy) {
        particlesInstance.destroy();
        console.log('🌧️ tsParticles дождь остановлен');
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
    
    // ========== 5. GSAP АНИМАЦИИ (если есть) ==========
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
        
        console.log('✅ GSAP анимации запущены');
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
    
    // ========== 7. МОДАЛЬНОЕ ОКНО ДЛЯ ВИДЕО ==========
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal && videoContainer) {
        window.openVideo = function(videoId) {
            if (!videoId) return;
            videoContainer.innerHTML = '';
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'autoplay; encrypted-media');
            iframe.setAttribute('allowfullscreen', '');
            videoContainer.appendChild(iframe);
            modal.style.display = 'flex';
        };
        
        window.closeVideo = function() {
            modal.style.display = 'none';
            videoContainer.innerHTML = '';
        };
        
        const videoThumbs = document.querySelectorAll('.video-thumb');
        videoThumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const videoId = thumb.getAttribute('data-video');
                window.openVideo(videoId);
            });
        });
        
        if (closeModal) closeModal.addEventListener('click', window.closeVideo);
        window.addEventListener('click', (e) => { if (e.target === modal) window.closeVideo(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.style.display === 'flex') window.closeVideo(); });
    }
    
    // ========== 8. ОГОНЬ НА КАРТОЧКЕ 1991 ==========
    function addFireTo1991Card() {
        const card1991 = document.querySelector('.year-card[data-year="1991"]');
        if (card1991 && !card1991.querySelector('.fire-overlay')) {
            const fireOverlay = document.createElement('div');
            fireOverlay.className = 'fire-overlay';
            card1991.appendChild(fireOverlay);
            
            setInterval(() => {
                if (fireOverlay) {
                    const intensity = 0.6 + Math.random() * 0.4;
                    fireOverlay.style.opacity = intensity;
                }
            }, 150);
        }
    }
    addFireTo1991Card();
    
    // ========== 9. СТАРОЕ РАДИО ==========
    if (!document.querySelector('.radio-effect')) {
        const radioEffect = document.createElement('div');
        radioEffect.className = 'radio-effect';
        radioEffect.innerHTML = '<span class="radio-dot"></span><span>Эфир: хроника распада</span>';
        document.body.appendChild(radioEffect);
        
        radioEffect.addEventListener('click', () => {
            const toast = document.createElement('div');
            toast.textContent = '📻 "Говорит Москва... В эфире программа "Время"';
            toast.style.position = 'fixed';
            toast.style.bottom = '100px';
            toast.style.left = '30px';
            toast.style.background = 'rgba(0,0,0,0.7)';
            toast.style.backdropFilter = 'blur(8px)';
            toast.style.padding = '8px 16px';
            toast.style.borderRadius = '20px';
            toast.style.fontSize = '0.7rem';
            toast.style.zIndex = '1002';
            toast.style.borderLeft = '3px solid #aa3e3e';
            toast.style.color = 'white';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        });
    }
    
    // ========== 10. ЦИТАТЫ ДЛЯ КАРТОЧЕК ==========
    const quotes = {
        1985: '"Начало перемен, которых ждали" — из выступления Горбачева',
        1987: '"Гласность — это право знать правду"',
        1989: '"Первый съезд народных депутатов открыл новую эпоху"',
        1990: '"Отмена 6-й статьи — конец монополии КПСС"',
        1991: '"Страна, в которой мы жили, перестала существовать" — Б. Ельцин',
        1992: '"Шоковая терапия" — цена перехода к рынку',
        1993: '"Конституционный кризис разделил страну"'
    };
    
    const yearCards = document.querySelectorAll('.year-card');
    yearCards.forEach(card => {
        const year = card.getAttribute('data-year');
        if (quotes[year] && !card.querySelector('.quote-tooltip')) {
            const quoteDiv = document.createElement('div');
            quoteDiv.className = 'quote-tooltip';
            quoteDiv.textContent = quotes[year];
            card.appendChild(quoteDiv);
        }
    });
    
    console.log('✅ Сайт полностью загружен, все эффекты активированы!');
});
