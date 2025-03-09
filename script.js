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

    // Инициализация темы
    function initializeTheme() {
        const themeToggle = document.getElementById('checkbox');
        const body = document.documentElement;
        
        // Проверяем сохраненную тему
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);
        themeToggle.checked = currentTheme === 'dark';

        // Обработчик переключения темы
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Обновляем цвета для всех элементов
            updateThemeColors(newTheme);
        });
    }

    // Обновление цветов темы
    function updateThemeColors(theme) {
        const root = document.documentElement;
        const isDark = theme === 'dark';
        
        root.style.setProperty('--neon-color', isDark ? '#64ffda' : '#00ff88');
        root.style.setProperty('--neon-color-rgb', isDark ? '100, 255, 218' : '0, 255, 136');
        root.style.setProperty('--primary-color-rgb', isDark ? '10, 25, 47' : '30, 60, 114');
        
        // Обновляем стили для интерактивных элементов
    document.querySelectorAll('.interactive-img').forEach(img => {
            img.style.boxShadow = `0 10px 30px rgba(0, 0, 0, ${isDark ? '0.3' : '0.15'}), 
                                  0 0 20px rgba(var(--neon-color-rgb), 0.3)`;
        });
    }

    // Обновление 3D трансформации
    function updateImageTransform(e, img) {
        if (!e) return;

            const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xRotation = ((y - rect.height / 2) / rect.height) * 20;
        const yRotation = ((x - rect.width / 2) / rect.width) * 20;
        
        img.style.transform = `
            perspective(1000px)
            rotateX(${-xRotation}deg)
            rotateY(${yRotation}deg)
            translateZ(30px)
        `;
    }

    // Инициализация 3D эффектов
    function initialize3DEffects() {
        const images = document.querySelectorAll('.interactive-img');
        
        images.forEach(img => {
            const container = img.parentElement;
            let isHovered = false;
            
            container.addEventListener('mouseenter', () => {
                isHovered = true;
                img.style.transition = 'transform 0.2s ease-out';
            });
            
            container.addEventListener('mouseleave', () => {
                isHovered = false;
                img.style.transition = 'transform 0.5s ease-out';
                img.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
            });
            
            container.addEventListener('mousemove', (e) => {
                if (!isHovered) return;
                updateImageTransform(e, img);
            });
        });
    }

    // Добавление иконок к текстовым блокам
    function addBotIcons() {
        const textBlocks = document.querySelectorAll('.text-block');
        const iconSvg = `
            <svg class="text-block-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
        `;
        
        textBlocks.forEach(block => {
            if (!block.querySelector('.text-block-icon')) {
                block.insertAdjacentHTML('afterbegin', iconSvg);
            }
        });
    }

    // Обновление перевода для всех элементов
    function updateTranslations(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                const originalHTML = element.innerHTML;
                
                // Сохраняем все HTML элементы и их атрибуты
                const spans = originalHTML.match(/<span[^>]*>.*?<\/span>/g) || [];
                const links = originalHTML.match(/<a[^>]*>.*?<\/a>/g) || [];
                const lineBreaks = originalHTML.match(/<br\s*\/?>/g) || [];
                const bolds = originalHTML.match(/<b>.*?<\/b>/g) || [];
                const italics = originalHTML.match(/<i>.*?<\/i>/g) || [];
                
                let newText = translations[lang][key];
                
                // Восстанавливаем переносы строк
                if (lineBreaks.length > 0) {
                    const originalParts = originalHTML.split(/<br\s*\/?>/);
                    const newParts = newText.split('\n');
                    
                    if (originalParts.length === newParts.length) {
                        newText = newParts.join('<br>');
                    }
                }
                
                // Восстанавливаем span элементы с их классами и атрибутами
                spans.forEach(span => {
                    const spanClass = span.match(/class="([^"]*)"/) ? span.match(/class="([^"]*)"/)[1] : '';
                    const spanText = span.match(/>([^<]*)</)[1];
                    const translationKey = spanText.trim();
                    const translatedText = translations[lang][translationKey] || spanText;
                    
                    // Сохраняем все атрибуты span
                    const spanAttributes = span.match(/<span([^>]*)>/)[1];
                    newText = newText.replace(translationKey, `<span${spanAttributes}>${translatedText}</span>`);
                });
                
                // Восстанавливаем ссылки с их атрибутами
                links.forEach(link => {
                    const href = link.match(/href="([^"]*)"/) ? link.match(/href="([^"]*)"/)[1] : '';
                    const linkClass = link.match(/class="([^"]*)"/) ? link.match(/class="([^"]*)"/)[1] : '';
                    const linkText = link.match(/>([^<]*)</)[1];
                    
                    // Сохраняем все атрибуты ссылки
                    const linkAttributes = link.match(/<a([^>]*)>/)[1];
                    newText = newText.replace(linkText, `<a${linkAttributes}>${linkText}</a>`);
                });
                
                // Восстанавливаем жирный текст
                bolds.forEach(bold => {
                    const boldText = bold.match(/>([^<]*)</)[1];
                    const translatedText = translations[lang][boldText] || boldText;
                    newText = newText.replace(boldText, `<b>${translatedText}</b>`);
                });
                
                // Восстанавливаем курсив
                italics.forEach(italic => {
                    const italicText = italic.match(/>([^<]*)</)[1];
                    const translatedText = translations[lang][italicText] || italicText;
                    newText = newText.replace(italicText, `<i>${translatedText}</i>`);
                });

                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = newText;
                } else {
                    element.innerHTML = newText;
                }
            }
        });
    }

    // Инициализация языка
    function initializeLanguage() {
        const currentLang = getCurrentLanguage();
        updateLanguageButtons(currentLang);
        updateTranslations(currentLang);
    }

    // Обновление кнопок языка
    function updateLanguageButtons(lang) {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Инициализация счетчика
    function initializeCounter() {
        const counter = document.getElementById('uptime-counter');
        if (!counter) return;

        const startDate = new Date('2025-03-01');
        
        function updateCounter() {
            const now = new Date();
            const diff = Math.max(0, now - startDate);
            
            const timeUnits = {
                months: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)),
                weeks: Math.floor((diff / (1000 * 60 * 60 * 24 * 7)) % 4),
                days: Math.floor((diff / (1000 * 60 * 60 * 24)) % 7),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            };

            const currentLang = getCurrentLanguage();
            counter.innerHTML = Object.entries(timeUnits)
                .map(([unit, value]) => `
                    <span class="${value % 2 ? 'active' : ''}" data-label="${translations[currentLang][unit]}">
                        ${String(value).padStart(2, '0')}
                    </span>
                `)
                .join('');
        }

        // Обновляем счетчик каждую секунду
        updateCounter();
        setInterval(updateCounter, 1000);
    }

    // Инициализация прокрутки наверх
    function initializeScrollToTop() {
        const footer = document.querySelector('.footer');
        if (!footer) return;

        footer.innerHTML += `
            <button class="scroll-top-btn" aria-label="Scroll to top">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
                </svg>
            </button>
        `;

        const scrollTopBtn = document.querySelector('.scroll-top-btn');
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Показываем/скрываем кнопку при прокрутке
        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
        });
    }

    // Инициализация всех компонентов
    initialize3DEffects();
    addBotIcons();
    initializeTheme();
    initializeLanguage();
    initializeCounter();
    initializeScrollToTop();
    
    // Обновляем перевод при загрузке
    updateTranslations(getCurrentLanguage());

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

    // Проверяем загрузку переводов
    if (typeof translations === 'undefined') {
        console.error('Translations not loaded. Loading default translations...');
        translations = {
            ru: {
                months: 'мес',
                weeks: 'нед',
                days: 'дн',
                hours: 'ч',
                minutes: 'мин',
                seconds: 'сек'
            },
            en: {
                months: 'mo',
                weeks: 'wk',
                days: 'd',
                hours: 'h',
                minutes: 'min',
                seconds: 's'
            }
        };
    }

    // Инициализация языка
    let currentLang = localStorage.getItem('lang') || 'en';
    const langButtons = document.querySelectorAll('.lang-btn');

    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        updateTranslations(lang);
        updateLanguageButtons(lang);
    }

    // Обработчики для кнопок языка
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
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
    }

    // Инициализация
    createStars();
    handleScroll();

    // Добавляем класс fade-in к элементам
    document.querySelectorAll('.content > *').forEach(element => {
        element.classList.add('fade-in');
    });

    // Обработчики событий
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Отключаем параллакс эффект для слайдов
    document.querySelectorAll('.slide').forEach(slide => {
        slide.style.transform = 'none';
        slide.style.transformStyle = 'flat';
    });

    // Инициализация языка при загрузке
    setLanguage(currentLang);
});

// Получение текущего языка
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Обновление языка
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    updateTranslations(lang);
    updateLanguageButtons(lang);
}