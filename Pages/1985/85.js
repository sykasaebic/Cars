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
//    const yearElement = document.querySelector('.year-header h1');
//    if (yearElement) {
//        yearElement.addEventListener('mouseenter', () => {
//            yearElement.style.textShadow = '0 0 80px rgba(201, 168, 123, 0.8)';
//        });
//        yearElement.addEventListener('mouseleave', () => {
//            yearElement.style.textShadow = '';
//        });
//    }
});
