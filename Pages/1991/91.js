document.addEventListener('DOMContentLoaded', function() {
    
    const card = document.querySelector('.blood-card');
    if (card) {
        let mouseX = 0, mouseY = 0;
        let cardX = 0, cardY = 0;
        
        document.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX = (e.clientX - centerX) / 40;
            mouseY = (e.clientY - centerY) / 40;
        });
        
        function animate3D() {
            cardX += (mouseX - cardX) * 0.1;
            cardY += (mouseY - cardY) * 0.1;
            card.style.transform = `perspective(1000px) rotateX(${cardY * 0.5}deg) rotateY(${cardX * 0.5}deg) translateY(-5px) scale(1.01)`;
            requestAnimationFrame(animate3D);
        }
        animate3D();
    }
    
    // Аккордеоны
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            
            const parent = this.parentElement;
            const scrollY = window.scrollY;
            
            // Закрываем другие открытые аккордеоны
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== parent && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущий
            parent.classList.toggle('active');
            
            // Фиксируем скролл (чтобы не прыгало)
            setTimeout(() => {
                if (window.scrollY !== scrollY) {
                    window.scrollTo(0, scrollY);
                }
            }, 10);
        });
    });
    
    // крутой эффект для заголовОЧКА
    const title = document.querySelector('.blood-title');
    if (title) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                title.style.textShadow = '3px 0 red, -3px 0 darkred';
                setTimeout(() => {
                    title.style.textShadow = '';
                }, 100);
            }
        }, 2000);
    }
    
    // Анимация появления аккордеона
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 400 + index * 150);
    });
    
    createBloodDrops();
});
