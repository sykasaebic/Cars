document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. ДОЖДЬ ==========
    function createRain() {
    const rainContainer = document.getElementById('rain');
    if (!rainContainer) return;
    
    const MAX_DROPS = 150; // Уменьшил с 300 до 150 для производительности
    const dropSizes = ['small', 'medium', 'large'];
    let dropsQueue = []; // Очередь для FIFO удаления
    
    // Создаём начальные капли
    const initialDrops = window.innerWidth < 768 ? 60 : 100;
    for (let i = 0; i < initialDrops; i++) {
        addDrop();
    }
    
    function addDrop() {
        const drop = document.createElement('div');
        drop.classList.add('drop', dropSizes[Math.floor(Math.random() * dropSizes.length)]);
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        drop.style.animationDuration = `${0.8 + Math.random() * 1.2}s`;
        rainContainer.appendChild(drop);
        dropsQueue.push(drop);
        
        // Удаляем самые старые капли, если превысили лимит
        if (dropsQueue.length > MAX_DROPS) {
            const oldest = dropsQueue.shift();
            if (oldest && oldest.parentNode) oldest.remove();
        }
    }
    
    // Интервал для добавления новых капель (используем safeInterval)
    safeInterval(addDrop, 200);
}
    
    // ========== 2. АККОРДЕОНЫ ==========
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
    
    // ========== 3. ОГОНЬ НА КАРТОЧКЕ 1991 ==========
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
    
    // ========== 4. ЦИТАТЫ (УБРАНЫ, Т.К. НЕЧИТАЕМЫ) ==========
// Цитаты были удалены для улучшения читаемости интерфейса
    // ========== 5. СЧЕТЧИК ДНЕЙ ==========
    function updateDaysCounter() {
        const collapseDate = new Date(1991, 11, 25);
        const today = new Date();
        const diffTime = Math.abs(today - collapseDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const counterElement = document.getElementById('counterValue');
        if (counterElement) counterElement.textContent = diffDays.toLocaleString();
    }
    updateDaysCounter();
    
    // ========== 6. ПЛАВНОЕ ПОЯВЛЕНИЕ КАРТОЧЕК ==========
    const cards = document.querySelectorAll('.year-card');
    cards.forEach((card, index) => {
        if (!card.style.animation) {
            card.style.opacity = '0';
            card.style.animation = `fadeInUpCards 0.5s ease forwards ${index * 0.1}s`;
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUpCards {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .year-card {
            opacity: 0;
        }
    `;
    if (!document.querySelector('style[data-rain-style]')) {
        style.setAttribute('data-rain-style', 'true');
        document.head.appendChild(style);
    }
    
    console.log('✅ Сайт загружен: дождь, нуар, аккордеоны — всё работает!');
});
let activeIntervals = [];

function safeInterval(fn, time) {
    const id = setInterval(fn, time);
    activeIntervals.push(id);
    return id;
}

// При уходе со страницы
window.addEventListener('beforeunload', () => {
    activeIntervals.forEach(clearInterval);
    activeIntervals = [];
});
