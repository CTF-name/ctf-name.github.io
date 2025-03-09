document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const indicator = document.querySelector('.progress-line');
    const telegramDemo = document.getElementById('telegram-demo');
    const chatWindow = telegramDemo.querySelector('.chat-window');

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

        const branchLines = document.querySelectorAll('.branch-line');
        if (activeSlide.id === 'branch-choice') {
            branchLines.forEach(line => line.classList.add('active'));
        } else {
            branchLines.forEach(line => line.classList.remove('active'));
        }
    }

    function updateNav(activeId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').substring(1) === activeId);
        });
    }

    function updateTitle(activeSlide) {
        const titleMap = {
            'intro': '@webhookos_bot - Welcome',
            'features': '@webhookos_bot - Features',
            'data': '@webhookos_bot - Data',
            'start': '@webhookos_bot - Start',
            'corporate-intro': '@webhookos_bot - Corporate Intro',
            'corporate-add': '@webhookos_bot - Add Group',
            'corporate-features': '@webhookos_bot - Corporate Features',
            'corporate-start': '@webhookos_bot - Corporate Start'
        };
        document.title = titleMap[activeSlide.id] || '@webhookos_bot';
    }

    // Интерактивные изображения с наклоном за курсором
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
            const seconds = Math.floor(diff / 1000) % 60;

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

    // Переключение слайдеров
    document.querySelectorAll('.slider-nav').forEach(nav => {
        const slider = nav.previousElementSibling;
        const items = slider.querySelectorAll('.feature-item, .step-item');
        let currentIndex = 0;

        items[currentIndex].classList.add('active');

        nav.querySelector('.prev').addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            items[currentIndex].classList.add('active');
        });

        nav.querySelector('.next').addEventListener('click', () => {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        });
    });

    // Демонстрации
    const shows = {
        registration: `
            <div class="message user">/start</div>
            <div class="message bot"><img src="../int.gif" alt="Bot Icon"> Welcome! Navigate with buttons.<br>News: @notevm</div>
        `,
        feed: `
            <div class="message user">Feed</div>
            <div class="message bot"><img src="../int.gif" alt="Bot Icon"> Feed [1/5]:<br>Main: GroupName (group)<br>Post: Hello!<br>Date: 2025-02-28 12:00<br>Views: 1 <br> Likes: 0<br>Subs: 10<br>Desc: Welcome to our group...</div>
        `,
        groups: `
            <div class="message user">Groups</div>
            <div class="message bot"><img src="../int.gif" alt="Bot Icon"> Groups:<br>Owned:<br>- GroupName [Public] (active)<br>  Host: 0h Join: 1<br>  Desc: Welcome...</div>
        `,
        tickets: `
            <div class="message user">Admin Panel</div>
            <div class="message bot"><img src="../int.gif" alt="Bot Icon"> Admin for GroupName [Public]:<br>Tickets:<br>- #1 by ID:12345 (pending)<br>  At: 2025-02-28 12:00 <br> Exp: 2025-03-01 12:00<br>  Admin: @user</div>
        `,
        analytics: `
            <div class="message user">Groups</div>
            <div class="message bot"><img src="../int.gif" alt="Bot Icon"> Group: GroupName [Public]<br>Join: 5 Skip: 2 Like: 3<br>Views: 10<br>Subs: 15</div>
        `
    };

    document.querySelectorAll('.show-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            chatWindow.innerHTML = shows[btn.dataset.show];
            telegramDemo.classList.add('active');
            setTimeout(() => telegramDemo.classList.remove('active'), 5000);
        });
    });

    // Обработчики кнопок
    document.querySelectorAll('.start-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('#corporate-add, #features').scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'https://t.me/webhookos_bot';
        });
    });

    // Ветвление (для index.html)
    document.querySelectorAll('.branch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const branch = btn.dataset.branch;
            localStorage.setItem('activeBranch', branch);
        });
    });
});