// дождь
// старая версия была на tsParticles и выглядела красивее
// но жрала проц на телефонах, пришлось переписать на дивах
/*
tsParticles.load({
    id: "rain-container",
    options: {
        fpsLimit: 60,
        particles: {
            number: { value: 100, density: { enable: true, area: 800 } },
            color: { value: "#aaddff" },
            shape: { type: "image", options: { image: { src: "data:image/svg+xml,..." } } },
            move: { enable: true, speed: 20, direction: "bottom", straight: true }
        }
    }
});
*/

(function() {
    var rain = document.getElementById('rain');
    if (!rain) {
        // на случай если контейнер не нашли (на страницах галереи например)
        console.log('контейнер дождя не найден, пропускаем');
        return;
    }
    
    var interval;
    var max = 150; // подобрано методом тыка, если менять — дождь или исчезает или стена воды
    var mobile = window.innerWidth < 768;
    var count = mobile ? 30 : 60;
    
    function drop(delay) {
        var d = document.createElement('div');
        d.className = 'drop ' + ['small','medium','large'][Math.floor(Math.random() * 3)];
        d.style.left = Math.random() * 100 + '%';
        d.style.animationDuration = (0.5 + Math.random()) + 's';
        if (delay) d.style.animationDelay = Math.random() * 10 + 's';
        d.onanimationend = function() { d.remove(); };
        return d;
    }
    
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) frag.appendChild(drop(true));
    rain.appendChild(frag);
    
    interval = setInterval(function() {
        if (!rain.isConnected) {
            clearInterval(interval);
            return;
        }
        while (rain.children.length > max) {
            rain.firstElementChild?.remove();
        }
        rain.appendChild(drop(false));
    }, 150);
    
    window.addEventListener('beforeunload', function() {
        clearInterval(interval);
        rain.replaceChildren();
    });
    
    console.log('дождь запущен, капель: ' + count);
})();

// аккордеоны и карточки
document.addEventListener('DOMContentLoaded', function() {
    
    // аккордеоны
    document.querySelectorAll('.accordion-header').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var item = btn.closest('.accordion-item');
            if (!item) return;
            var y = window.scrollY;
            
            document.querySelectorAll('.accordion-item.active').forEach(function(open) {
                if (open !== item) open.classList.remove('active');
            });
            item.classList.toggle('active');
            
            requestAnimationFrame(function() {
                if (window.scrollY !== y) window.scrollTo(0, y);
            });
        });
    });

    // анимация появления карточек
    var style = document.createElement('style');
    style.textContent = '@keyframes f{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(style);
    
    document.querySelectorAll('.year-card').forEach(function(card, i) {
        card.style.opacity = '0';
        card.style.animation = 'f .5s ease forwards ' + (i * 0.1) + 's';
    });
});

// параллакс фона (только на десктопе, на телефонах отключаем)
if (window.innerWidth > 768) {
    var bg = document.querySelector('.great-bg-for-page-ussr');
    // да, название класса странное, писал в 3 ночи
    if (bg) {
        document.addEventListener('mousemove', function(e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 20;
            var y = (e.clientY / window.innerHeight - 0.5) * 20;
            bg.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });
    }
}

// закомментил, но удалять жалко — вдруг пригодится
// ========== ОГОНЬ НА КАРТОЧКЕ 1991 ==========
// функция добавляла эффект огня на карточку 1991 года
// но тормозила на слабых ноутах, убрал
//
// function addFireToCard() {
//     var card = document.querySelector('.year-card[data-year="1991"]');
//     if (!card) return;
//     var fire = document.createElement('div');
//     fire.className = 'fire-overlay';
//     card.appendChild(fire);
//     setInterval(function() {
//         fire.style.opacity = 0.6 + Math.random() * 0.4;
//     }, 150);
// }
// addFireToCard();

// запасной вариант музыки если howler отвалится
// var audio = new Audio('sounds/Holl.mp3');
// audio.loop = true;
// audio.volume = 0.025;
// audio.play();
