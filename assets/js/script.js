// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // Copy IP to Clipboard Logic
    const copyBtn = document.getElementById('copy-ip-btn');
    const feedbackMsg = document.getElementById('copy-feedback');
    const serverIP = 'play.vlansky.ovh';

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(serverIP).then(() => {
                // Visual Feedback
                copyBtn.classList.add('copied');
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> IP COPIÉE !';
                feedbackMsg.classList.add('show');
                
                // Play a subtle sound (optional/glitch sound effect)
                // const audio = new Audio('assets/sounds/ui-click.mp3');
                // audio.play().catch(e => console.log('Audio play blocked by browser.'));

                // Reset after 3 seconds
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = '<i class="fa-solid fa-gamepad"></i> COPIER L\'IP : ' + serverIP.toUpperCase();
                    feedbackMsg.classList.remove('show');
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                feedbackMsg.textContent = "Erreur lors de la copie.";
                feedbackMsg.style.color = "#ff0055";
                feedbackMsg.classList.add('show');
            });
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional Glitch Text Effect on hover (pure JS approach if CSS isn't enough)
    const glitchTexts = document.querySelectorAll('.glitch-hover');
    glitchTexts.forEach(txt => {
        txt.addEventListener('mouseover', () => {
            txt.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 2 - 1}px)`;
            setTimeout(() => {
                txt.style.transform = 'translate(0, 0)';
            }, 100);
        });
    });
});
