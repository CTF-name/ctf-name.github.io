if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('ServiceWorker registration failed:', error);
            });
    });
}



let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-info bar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Create the install button and append it to the body
    createInstallButton();
});

function createInstallButton() {
    const installButton = document.createElement('button');
    installButton.innerText = 'Install App';
    installButton.classList.add('install-btn');
    installButton.style.position = 'fixed';
    installButton.style.bottom = '20px';
    installButton.style.left = '50%';
    installButton.style.transform = 'translateX(-50%)';
    installButton.style.zIndex = '1000';
    installButton.style.padding = '10px 20px';
    installButton.style.backgroundColor = '#1e3c72';
    installButton.style.color = '#ffffff';
    installButton.style.border = 'none';
    installButton.style.borderRadius = '5px';
    installButton.style.cursor = 'pointer';
    installButton.style.animation = 'pulse 2s infinite';

    installButton.addEventListener('click', () => {
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User  accepted the A2HS prompt');
            } else {
                console.log('User  dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });

    document.body.appendChild(installButton);
}

// Add CSS for the pulse animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);
