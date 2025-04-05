// Переводы
const translations = {
    en: {
        "intro-title": "Hello Everyone! ",
        "intro-text": "We are excited to introduce our new Telegram bot designed to help you find chats and communities — the perfect assistant for everyone passionate about CTF competitions, cybersecurity, or simply looking for like-minded people to connect and grow with! (Honestly, we’ve just started building this system to have some fun and see how effective a small garage startup on Docker can be)",
        "start-btn": "Start Now",
        "features-title": "What Our Bot Can Do",
        "feature-1": "Active Chats Feed: Discover a list of current communities to find a team or discuss tasks.",
        "feature-2": "Recommendation System: Get tailored group and team suggestions based on your interests (e.g., crypto or reverse engineering).",
        "feature-3": "Favorite Chats Collection: Save your preferred groups for quick access anytime.",
        "feature-4": "Auto-Join Communities: Instantly join selected chats after registration.",
        "feature-5": "Event Notifications: Stay updated on new CTF events, chat updates, or team changes.",
        "feature-6": "The idea is multifunctional and can be used anywhere. Share your events today.",
        "tutorial-title": "How to Get Started",
        "tutorial-step-1-title": "Step 1: Get Started",
        "tutorial-step-1-text": "Find @webhookos_bot in Telegram and press Start.",
        "tutorial-step-2-title": "Step 2: Setup",
        "tutorial-step-2-text": "Choose your account type and configure basic settings.",
        "tutorial-step-3-title": "Step 3: Manage",
        "tutorial-step-3-text": "Start managing your groups and channels effortlessly.",
        "prev-btn": "Previous",
        "next-btn": "Next",
        "team-title": "Our Team",
        "team-founder": "Small beginner developer in the IT-specialty, working on improving the project and introducing more people into it. Developed this.",
        "team-developer": "The lead developer, who is also the host of our sites and work, essentially helps with promotion and work with containers.",
        "team-lid": "Our great security tester and developer, working on the content itself.",
        "updates-title": "Project Updates",
        "updates-text": "We’re thrilled to share the latest improvements to @webhookos_bot! Our service is now more efficient, reliable, and user-friendly. Bet it won’t crash now! ",
        "update-1": "Full integration and synchronization with Telegram.",
        "update-2": "Optimized database performance for faster responses.",
        "update-3": "Improved message processing to reduce API delays.",
        "update-4": "Fast asynchronous data handling for seamless multitasking.",
        "update-5": "Self-sustaining automation for long-term stability.",
        "update-6": "Simplified design with added features like images and metadata.",
        "idea-title": "Project Idea",
        "idea-text": "We recently surveyed the CTF community: 'Do you have a team?' The results showed common challenges: some lack specialists (e.g., cryptography experts), others are beginners seeking teammates, and many want to stay updated on events. That’s why we created this garage startup in a week — a simple solution to connect you with teams and chats in Telegram, especially when competition deadlines loom and you’re too lazy to search manually!",
        "footer-text": "Made with ❤️"
    },
    ru: {
        "intro-title": "Привет всем! ",
        "intro-text": "Мы рады представить нашего нового бота для поиска чатов в Telegram — идеального помощника для всех, кто увлечён CTF-соревнованиями, кибербезопасностью или просто хочет найти единомышленников для общения и роста! (Честно говоря, мы только начали развивать эту систему, чтобы немного повеселиться и посмотреть, насколько эффективным может быть маленький стартап на Docker)",
        "start-btn": "Начать сейчас",
        "features-title": "Что умеет наш бот",
        "feature-1": "Лента активных чатов: Список актуальных сообществ для поиска команды или обсуждения задач.",
        "feature-2": "Система рекомендаций: Предложения групп и команд на основе ваших интересов (например, криптография или реверс-инжиниринг).",
        "feature-3": "Коллекция избранных чатов: Сохраняйте любимые группы для быстрого доступа.",
        "feature-4": "Автоматическое добавление: Мгновенно присоединяйтесь к выбранным чатам после регистрации.",
        "feature-5": "Уведомления о событиях: Будьте в курсе новых CTF, обновлений чатов или изменений в командах.",
        "feature-6": "Идея многофункциональна, ее можно использовать где угодно. Поделитесь своими событиями сегодня.",
        "tutorial-title": "Как начать",
        "tutorial-step-1-title": "Шаг 1: Начало работы",
        "tutorial-step-1-text": "Найдите @webhookos_bot в Telegram и нажмите Start.",
        "tutorial-step-2-title": "Шаг 2: Настройка",
        "tutorial-step-2-text": "Выберите тип аккаунта и настройте основные параметры.",
        "tutorial-step-3-title": "Шаг 3: Управление",
        "tutorial-step-3-text": "Начните управлять своими группами и каналами без усилий.",
        "prev-btn": "Назад",
        "next-btn": "Вперёд",
        "team-title": "Наша команда",
        "team-founder": "Небольшой начинающий разработчик в сфере IT, работающий над улучшением проекта и привлечением в него большего количества людей. Разработал это.",
        "team-developer": "Ведущий разработчик, который также является хостером наших сайтов и работ, по сути, помогает с продвижением и работой с контейнерами.",
        "team-lid": "Наш замечательный тестировщик безопасности и разработчик, работающий над самим контентом.",
        "updates-title": "Обновления проекта",
        "updates-text": "Мы рады поделиться последними улучшениями @webhookos_bot! Сервис стал эффективнее, надёжнее и удобнее. Спорим, теперь он не упадёт! ",
        "update-1": "Полная интеграция и синхронизация с Telegram.",
        "update-2": "Оптимизация работы баз данных для повышения скорости.",
        "update-3": "Улучшение обработки сообщений для снижения задержек API.",
        "update-4": "Быстрая асинхронная обработка данных для плавной работы.",
        "update-5": "Автоматизация для долгосрочной устойчивости.",
        "update-6": "Упрощённый дизайн с новыми функциями, такими как изображения и метаданные.",
        "idea-title": "Идея проекта",
        "idea-text": "Мы провели опрос в CTF-сообществе: 'Есть ли у вас команда?' Результаты показали общие проблемы: кому-то не хватает специалистов (например, криптографов), кто-то новичок и ищет товарищей, а многие хотят быть в курсе событий. Поэтому мы создали этот стартап за неделю — простое решение для поиска команд и чатов в Telegram, особенно когда до соревнований мало времени, а вам лень искать вручную!",
        "footer-text": "Сделано с ❤️"
    }
};

// Функция обновления текста
function updateLanguage(lang) {
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Переключение языка
document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.lang-btn.active')?.classList.remove('active');
        button.classList.add('active');
        const lang = button.getAttribute('data-lang');
        updateLanguage(lang);
        localStorage.setItem('language', lang);
    });
});

// Переключение темы
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', () => {
    const theme = checkbox.checked ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// Прокрутка и видимость карточек
function checkSlides() {
    const slides = document.querySelectorAll('.slide');
    const triggerBottom = window.innerHeight * 0.8;
    slides.forEach(slide => {
        const slideTop = slide.getBoundingClientRect().top;
        if (slideTop < triggerBottom) {
            slide.classList.add('visible');
        } else {
            slide.classList.remove('visible');
        }
    });
}

// Слайдер для tutorial
const slides = document.querySelectorAll('.tutorial-slide');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

// Кнопка "Наверх"
const scrollTopBtn = document.querySelector('.scroll-top-btn');
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    const savedTheme = localStorage.getItem('theme') || 'light';

    updateLanguage(savedLang);
    document.querySelector(`.lang-btn[data-lang="${savedLang}"]`)?.classList.add('active');
    document.body.setAttribute('data-theme', savedTheme);
    checkbox.checked = savedTheme === 'dark';

    checkSlides();
    showSlide(currentSlide);
    window.addEventListener('scroll', checkSlides);
    window.addEventListener('resize', checkSlides);
});