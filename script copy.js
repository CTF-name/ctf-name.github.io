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
        const gradient = `linear-gradient(135deg, hsl(${hue}, 70%, 20%), hsl(${(hue + 90) % 360}, 70%, 40%))`;
        document.body.style.background = gradient;

        // Синхронизация цвета текста с фоном
        const oppositeHue = (hue + 180) % 360; // Противоположный цвет на цветовом круге
        const highlightColor = `hsl(${oppositeHue}, 100%, 70%)`; // Яркий противоположный цвет
        document.querySelectorAll('.neon-highlight').forEach(element => {
            element.style.color = highlightColor;
            element.style.textShadow = `0 0 5px ${highlightColor}, 0 0 10px rgba(${oppositeHue}, 100, 70, 0.5)`;
        });

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
            'start': '@webhookos_bot - Start',
            'personal-feed': '@webhookos_bot - Feed',
            'personal-folders': '@webhookos_bot - Folders',
            'personal-referrals': '@webhookos_bot - Referrals',
            'personal-start': '@webhookos_bot - Personal Start',
            'corporate-monitoring': '@webhookos_bot - Monitoring',
            'corporate-tickets': '@webhookos_bot - Tickets',
            'corporate-analytics': '@webhookos_bot - Analytics',
            'corporate-start': '@webhookos_bot - Corporate Start',
            'finish': '@webhookos_bot - Finish',
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
            <div class="message bot"><img src="int.gif" alt="Bot Icon"> Welcome! Navigate with buttons.<br>News: @notevm</div>
        `,
        feed: `
            <div class="message user">Feed</div>
            <div class="message bot"><img src="int.gif" alt="Bot Icon"> Feed [1/5]:<br>Main: GroupName (group)<br>Post: Hello!<br>Date: 2025-02-28 12:00<br>Views: 1 <br> Likes: 0<br>Subs: 10<br>Desc: Welcome to our group...</div>
        `,
        groups: `
            <div class="message user">Groups</div>
            <div class="message bot"><img src="int.gif" alt="Bot Icon"> Groups:<br>Owned:<br>- GroupName [Public] (active)<br>  Host: 0h Join: 1<br>  Desc: Welcome...</div>
        `,
        referrals: `
            <div class="message user">Settings</div>
            <div class="message bot"><img src="int.gif" alt="Bot Icon"> Settings:<br>Notif: On <br> Global: On <br> Sort: Popularity <br> Random: Off <br> Invite</div>
            <div class="message user">Invite</div>
            <div class="message bot"><img src="int.gif" alt="Bot Icon"> Invite: <span class="copy-link">https://t.me/webhookos_bot?start=12345</span> <button class="copy-btn">Copy</button></div>
        `,
        tickets: `
            <div class="message user">Admin Panel</div>
            <div class="message bot"><img src="int.gif" alt="Bot Icon"> Admin for GroupName [Public]:<br>Tickets:<br>- #1 by ID:12345 (pending)<br>  At: 2025-02-28 12:00 <br> Exp: 2025-03-01 12:00<br>  Admin: @user</div>
        `,
        analytics: `
            <div class="message user">Groups</div>
            <div class="message bot"><img src="int.gif" alt="Bot Icon"> Group: GroupName [Public]<br>Join: 5 Skip: 2 Like: 3<br>Views: 10<br>Subs: 15</div>
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
            document.querySelector('#start').scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.querySelectorAll('.join-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'https://t.me/webhookos_bot';
        });
    });

    document.querySelectorAll('.home-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });

    // Ветвление (для index.html)
    document.querySelectorAll('.branch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const branch = btn.dataset.branch;
            localStorage.setItem('activeBranch', branch);
            document.querySelector(`.${branch}-branch`)?.classList.add('active');
        });
    });

    const activeBranch = localStorage.getItem('activeBranch');
    if (activeBranch && document.querySelector(`.${activeBranch}-branch`)) {
        document.querySelector(`.${activeBranch}-branch`).classList.add('active');
    }

    // Управление темой
    const themeToggle = document.getElementById('checkbox');
    const body = document.documentElement;

    // Проверяем сохраненную тему
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }

    // Обработчик переключения темы
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Создание звезд для параллакса
    function createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-container';
        document.body.appendChild(starsContainer);

        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'parallax-star';
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            starsContainer.appendChild(star);
        }
    }

    // Анимация при прокрутке
    function handleScroll() {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Анимация звезд
        document.body.classList.toggle('scroll-active', scrolled > 50);
        
        // Анимация появления элементов
        document.querySelectorAll('.fade-in').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('visible');
            }
        });
        
        // Обновление прогресс-бара
        const maxScroll = document.documentElement.scrollHeight - windowHeight;
        const progress = (scrolled / maxScroll) * 100;
        document.querySelector('.progress-line').style.width = `${progress}%`;
    }

    // Счетчик аптайма
    function updateUptime() {
        const startDate = new Date('2025-03-01').getTime();
        const now = new Date().getTime();
        const uptime = now - startDate;
        
        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
        
        const uptimeCounter = document.getElementById('uptime-counter');
        if (uptimeCounter) {
            uptimeCounter.innerHTML = `
                <span>${days}d</span>
                <span>${hours}h</span>
                <span>${minutes}m</span>
                <span>${seconds}s</span>
            `;
        }
    }

    // Инициализация
    document.addEventListener('DOMContentLoaded', () => {
        createStars();
        handleScroll();
        setInterval(updateUptime, 1000);
        
        // Добавляем класс fade-in к элементам
        document.querySelectorAll('.content > *').forEach(element => {
            element.classList.add('fade-in');
        });
    });

    // Обработчики событий
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
});