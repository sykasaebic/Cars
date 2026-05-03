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
    })
})
