document.addEventListener('DOMContentLoaded', () => {
    const telegramDemo = document.getElementById('telegram-demo');
    const indicator = document.querySelector('.progress-line');
    const slides = document.querySelectorAll('.slide');

    // Фон и частицы
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let hue = 0;
    function animateBackground() {
        hue = (hue + 0.5) % 360;
        document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 20%), hsl(${(hue + 90) % 360}, 70%, 40%))`;
        requestAnimationFrame(animateBackground);
    }

    animateBackground();

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            hue: Math.random() * 360
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 70%, 50%, 0.6)`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsla(${p.hue}, 70%, 50%, 0.8)`;
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Скролл и слайды
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateIndicator(entry.target);
                updateNav(entry.target.id);
                updateTitle(entry.target);
            }
        });
    }, { threshold: 0.5 });

    slides.forEach(slide => observer.observe(slide));

    function updateIndicator(activeSlide) {
        const index = Array.from(slides).indexOf(activeSlide);
        const height = window.innerHeight * (index + 1) / slides.length;
        indicator.style.height = `${height}px`;
    }

    function updateNav(activeId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === activeId);
        });
    }

    function updateTitle(activeSlide) {
        const titleMap = {
            'not-found': '@webhookos_bot - 404'
        };
        document.title = titleMap[activeSlide.id] || '@webhookos_bot';
    }

    // Интерактивные изображения
    document.querySelectorAll('.interactive-img').forEach(img => {
        img.draggable = true;
        img.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', 'https://t.me/webhookos_bot');
        });

        img.addEventListener('mousemove', e => {
            const rect = img.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateX = Math.min(30, Math.max(-30, mouseY / 5));
            const rotateY = Math.min(30, Math.max(-30, -mouseX / 5));

            img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });

    // Кнопка Home
    document.querySelector('.home-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    telegramDemo.addEventListener('click', () => {
        telegramDemo.classList.remove('active');
    });

    // Копирование ссылок
    document.addEventListener('click', e => {
        if (e.target.classList.contains('copy-btn')) {
            const link = e.target.previousElementSibling.textContent;
            navigator.clipboard.writeText(link).then(() => {
                e.target.textContent = 'Copied!';
                setTimeout(() => e.target.textContent = 'Copy', 2000);
            });
        }
    });
});