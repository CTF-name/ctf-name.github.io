document.addEventListener('DOMContentLoaded', () => {
    const personalBranch = document.querySelector('.personal-branch');
    const corporateBranch = document.querySelector('.corporate-branch');
    let activeBranch = localStorage.getItem('activeBranch') || null;
    const chatWindow = document.querySelector('.chat-window');
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
            'intro': '@webhookos_bot - Welcome',
            'start': '@webhookos_bot - Start'
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

    // Ветвление
    document.querySelectorAll('.branch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            activeBranch = btn.dataset.branch;
            localStorage.setItem('activeBranch', activeBranch);
            document.querySelector(`.${activeBranch}-branch`).classList.add('active');
        });
    });

    if (activeBranch) {
        document.querySelector(`.${activeBranch}-branch`).classList.add('active');
    }

    // Демо Telegram
    const shows = {
        registration: `
            <div class="message user">/start</div>
            <div class="message bot"><img src="int.gif" alt="Bot Icon"> Welcome! Navigate with buttons.<br>News: @notevm</div>
        `
    };

    document.querySelectorAll('.show-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            chatWindow.innerHTML = shows[btn.dataset.show];
            telegramDemo.classList.add('active');
            setTimeout(() => telegramDemo.classList.remove('active'), 5000);
        });
    });

    // Кнопка Start
    document.querySelector('.start-btn').addEventListener('click', () => {
        document.querySelector('#start').scrollIntoView({ behavior: 'smooth' });
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

    // Счётчик времени работы
    const startDate = new Date('2025-03-01');
    const counter = document.getElementById('uptime-counter');
    if (counter) {
        function updateCounter() {
            const now = new Date();
            const diff = now - startDate;
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) % 52;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 7;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const seconds = Math.floor(diff / (1000 * 60)) % 60;

            counter.innerHTML = `
                <span class="${seconds % 2 ? 'active' : ''}">${months} mo</span>
                <span class="${seconds % 2 ? 'active' : ''}">${weeks} wk</span>
                <span class="${seconds % 2 ? 'active' : ''}">${days} d</span>
                <span class="${seconds % 2 ? 'active' : ''}">${hours} h</span>
                <span class="${seconds % 2 ? 'active' : ''}">${minutes} min</span>
                <span class="${seconds % 2 ? 'active' : ''}">${seconds} s</span>
            `;
        }
        updateCounter();
        setInterval(updateCounter, 1000);
    }
});