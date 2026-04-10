document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. ДОЖДЬ ==========
  //  let rainInterval = null; // Глобальная переменная для интервала

//function createRain() {
   // const rainContainer = document.getElementById('rain');
    //if (!rainContainer) {
        //console.error(' Контейнер #rain не найден');
        //return;
   // }
    
   // console.log(' Запуск дождя...');
    
    // Очищаем старый интервал, если он был
  //  if (rainInterval) {
        //clearInterval(rainInterval);
      //  rainInterval = null;
  //  }
    
    // Очищаем контейнер от старых капель
 //   rainContainer.innerHTML = '';
    
  //  const numberOfDrops = window.innerWidth < 768 ? 60 : 120;
 //   const dropSizes = ['small', 'medium', 'large'];
    
    // Создаём начальные капли
  //  for (let i = 0; i < numberOfDrops; i++) {
     //   const drop = document.createElement('div');
       // drop.classList.add('drop');
      //  const sizeClass = dropSizes[Math.floor(Math.random() * dropSizes.length)];
      //  drop.classList.add(sizeClass);
     //   drop.style.left = `${Math.random() * 100}%`;  // ← Исправлено: добавлены кавычки
     //   drop.style.animationDelay = `${Math.random() * 10}s`;  // ← Исправлено
     //   drop.style.animationDuration = `${0.5 + Math.random() * 1}s`;  // ← Исправлено
      //  rainContainer.appendChild(drop);
  //  }
    
    // Интервал для добавления новых капель (сохраняем ID для очистки)
   // rainInterval = setInterval(() => {
        // Проверяем, существует ли ещё контейнер
     //   if (!rainContainer || !rainContainer.parentNode) {
        //    if (rainInterval) {
         //       clearInterval(rainInterval);
         //       rainInterval = null;
        //    }
        //    return;
    //    }
        
        // Ограничиваем количество капель (удаляем самые старые)
     //   while (rainContainer.children.length > 250) {
      //      const oldest = rainContainer.children[0];
      //      if (oldest) oldest.remove();
    //    }
        
        // Добавляем новую каплю
    //    const newDrop = document.createElement('div');
    //    newDrop.classList.add('drop');
    //    const sizeClass = dropSizes[Math.floor(Math.random() * dropSizes.length)];
    //    newDrop.classList.add(sizeClass);
    //    newDrop.style.left = `${Math.random() * 100}%`;  // ← Исправлено
    //    newDrop.style.animationDelay = '0s';
   //     newDrop.style.animationDuration = `${0.5 + Math.random() * 1}s`;  // ← Исправлено
    //    rainContainer.appendChild(newDrop);
  //  }, 150);
    
  //  console.log(` Создано ${numberOfDrops} капель`);
//}

// Очистка при уходе со страницы
//function stopRain() {
//    if (rainInterval) {
 //       clearInterval(rainInterval);
  //      rainInterval = null;
    //    console.log(' Дождь остановлен');
 //   }
  //  const rainContainer = document.getElementById('rain');
  //  if (rainContainer) {
 //       rainContainer.innerHTML = '';
 //   }
//}

// Запускаем дождь
//createRain();

// Останавливаем дождь при уходе со страницы
//window.addEventListener('beforeunload', stopRain);
    // ========== tsParticles ДОЖДЬ (через изображение) ==========
tsParticles.load({
    id: "rain-container",
    options: {
        fpsLimit: 60,
        particles: {
            number: {
                value: 100,
                density: { enable: true, area: 800 }
            },
            color: { value: "#aaddff" },
            shape: {
                type: "image",
                options: {
                    image: {
                        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cpath d='M5,0 C5,0 1,4 1,7 C1,9 2,10 5,10 C8,10 9,9 9,7 C9,4 5,0 5,0 Z' fill='%23aaddff' opacity='0.8'/%3E%3C/svg%3E",
                        width: 4,
                        height: 4
                    }
                }
            },
            opacity: {
                value: 0.2,
                random: true,
                animation: { enable: true, speed: 0.5, minimumValue: 0.4 }
            },
            size: {
                value: { min: 1, max: 4 },
                random: true
            },
            move: {
                enable: true,
                speed: 20,
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
   // function addFireTo1991Card() {
       // const card1991 = document.querySelector('.year-card[data-year="1991"]');
      //  if (card1991 && !card1991.querySelector('.fire-overlay')) {
          //  const fireOverlay = document.createElement('div');
          //  fireOverlay.className = 'fire-overlay';
          //  card1991.appendChild(fireOverlay);
            
          //  setInterval(() => {
               // if (fireOverlay) {
                   // const intensity = 0.6 + Math.random() * 0.4;
               //     fireOverlay.style.opacity = intensity;
              //  }
          //  }, 150);
     //   }
 //   }
  //  addFireTo1991Card();
    
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
