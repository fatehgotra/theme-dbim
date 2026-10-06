document.addEventListener("DOMContentLoaded", function() {
    // 1. Text Resize functionality
    const btnDecrease = document.getElementById('btn-text-decrease');
    const btnNormal = document.getElementById('btn-text-normal');
    const btnIncrease = document.getElementById('btn-text-increase');
    const body = document.body;
    
    let currentSize = 100; // percentage
    
    if (btnDecrease && btnNormal && btnIncrease) {
        btnDecrease.addEventListener('click', () => {
            if(currentSize > 80) {
                currentSize -= 10;
                body.style.fontSize = currentSize + '%';
            }
        });
        
        btnNormal.addEventListener('click', () => {
            currentSize = 100;
            body.style.fontSize = '100%';
        });
        
        btnIncrease.addEventListener('click', () => {
            if(currentSize < 130) {
                currentSize += 10;
                body.style.fontSize = currentSize + '%';
            }
        });
    }

    // 2. High Contrast Toggle
    const btnHighContrast = document.getElementById('btn-high-contrast');
    const btnNormalContrast = document.getElementById('btn-normal-contrast');
    
    if (btnHighContrast && btnNormalContrast) {
        btnHighContrast.addEventListener('click', () => {
            document.documentElement.setAttribute('data-theme', 'high-contrast');
            btnHighContrast.classList.add('d-none');
            btnNormalContrast.classList.remove('d-none');
            localStorage.setItem('theme', 'high-contrast');
        });
        
        btnNormalContrast.addEventListener('click', () => {
            document.documentElement.removeAttribute('data-theme');
            btnNormalContrast.classList.add('d-none');
            btnHighContrast.classList.remove('d-none');
            localStorage.setItem('theme', 'normal');
        });
        
        // Check saved theme
        if(localStorage.getItem('theme') === 'high-contrast') {
            btnHighContrast.click();
        }
    }

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById("btn-back-to-top");
    
    if(backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });
        
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 4. Announcements Ticker Controls
    const tickerContent = document.getElementById('announcement-ticker');
    const btnPause = document.getElementById('ticker-pause');
    const btnPlay = document.getElementById('ticker-play');
    
    if (tickerContent && btnPause && btnPlay) {
        btnPause.addEventListener('click', () => {
            tickerContent.style.animationPlayState = 'paused';
        });
        
        btnPlay.addEventListener('click', () => {
            tickerContent.style.animationPlayState = 'running';
        });
    }

    // 5. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');
                
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString();
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            
            // Intersection Observer to trigger on scroll
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    updateCount();
                    observer.disconnect();
                }
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    };
    
    if(counters.length > 0) {
        animateCounters();
    }
});
