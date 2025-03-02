document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.querySelector('.chat-window');

    const shows = {
        feed: `
            <div class="message user">Feed</div>
            <div class="message bot">Feed [1/5]:<br>Main: GroupName (group)<br>Post: Hello!<br>Date: 2025-02-28 12:00<br>Views: 1 <br> Likes: 0<br>Subs: 10<br>Desc: Welcome to our group...</div>
        `,
        groups: `
            <div class="message user">Groups</div>
            <div class="message bot">Groups:<br>Following:<br>- GroupName [Public] (active)<br>  Host: 0h Join: 1<br>  Desc: Welcome...</div>
        `,
        referrals: `
            <div class="message user">Settings</div>
            <div class="message bot">Settings:<br>Notif: On <br> Global: On <br> Sort: Popularity <br> Random: Off <br> Invite</div>
            <div class="message user">Invite</div>
            <div class="message bot">Invite: <span class="copy-link">https://t.me/webhookos_bot?start=1586420654</span> <button class="copy-btn">Copy</button></div>
        `
    };

    document.querySelectorAll('.show-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            chatWindow.innerHTML = shows[btn.dataset.show];
            document.getElementById('telegram-demo').classList.add('active');
            setTimeout(() => document.getElementById('telegram-demo').classList.remove('active'), 5000);
        });
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});