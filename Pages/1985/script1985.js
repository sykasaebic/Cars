document.addEventListener('DOMContentLoaded', function() {
    
    // АККОРДЕОНЫ
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
                if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);
            }, 10);
        });
    });
    
    // Эффект для года (только свечение, без движения)
    const yearElement = document.querySelector('.year-header h1');
    if (yearElement) {
        yearElement.addEventListener('mouseenter', () => {
            yearElement.style.textShadow = '0 0 80px rgba(201, 168, 123, 0.8)';
        });
        yearElement.addEventListener('mouseleave', () => {
            yearElement.style.textShadow = '';
        });
    }
    
    // ===== КНОПКА ЗВУКА ВЕТРА =====
    const oldSoundBtn = document.getElementById('soundControl');
    if (oldSoundBtn) oldSoundBtn.remove();
    
    const soundControl = document.createElement('button');
    soundControl.id = 'soundControl';
    soundControl.className = 'sound-control';
    soundControl.innerHTML = '🔇';
    document.body.appendChild(soundControl);
    
    soundControl.style.position = 'fixed';
    soundControl.style.bottom = '30px';
    soundControl.style.right = '30px';
    soundControl.style.zIndex = '1001';
    soundControl.style.background = 'rgba(0,0,0,0.6)';
    soundControl.style.backdropFilter = 'blur(8px)';
    soundControl.style.border = '1px solid rgba(201, 168, 123, 0.3)';
    soundControl.style.borderRadius = '50%';
    soundControl.style.width = '50px';
    soundControl.style.height = '50px';
    soundControl.style.cursor = 'pointer';
    soundControl.style.transition = 'all 0.2s ease';
    soundControl.style.display = 'flex';
    soundControl.style.alignItems = 'center';
    soundControl.style.justifyContent = 'center';
    soundControl.style.fontSize = '1.5rem';
    
    let windBase = null, windGusts = null, windHowl = null;
    let isSoundOn = false;
    
    const soundFiles = {
        base: '../../sounds/wind_base.wav',
        gusts: '../../sounds/wind_gusts.wav',
        howl: '../../sounds/wind_howl.wav'
    };
    
    function initWindSounds() {
        if (windBase) return;
        windBase = new Howl({ src: [soundFiles.base], loop: true, volume: 0.1, html5: true });
        windGusts = new Howl({ src: [soundFiles.gusts], loop: true, volume: 0.05, rate: 0.85, html5: true });
        windHowl = new Howl({ src: [soundFiles.howl], loop: true, volume: 0.03, rate: 0.7, html5: true });
    }
    
    soundControl.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        if (isSoundOn) {
            initWindSounds();
            windBase?.play();
            windGusts?.play();
            windHowl?.play();
            soundControl.innerHTML = '🌬️';
            soundControl.style.background = 'rgba(170, 62, 62, 0.7)';
        } else {
            windBase?.stop();
            windGusts?.stop();
            windHowl?.stop();
            soundControl.innerHTML = '🔇';
            soundControl.style.background = 'rgba(0,0,0,0.6)';
        }
    });
    
    console.log('✅ Страница 1985 загружена (без параллакса мыши)');
});
