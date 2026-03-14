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

    // Terminal Animation Logic
    const terminal = document.getElementById('cyber-terminal');
    if (terminal) {
        const lines = [
            { text: "INITIALIZING V-OS v2.0.4...", type: "sys", delay: 800 },
            { text: "Connecting to play.vlansky.ovh", type: "sys", delay: 500 },
            { text: "[OK] Connection established. Latency: 12ms", type: "succ", delay: 600 },
            { text: "Loading modules: Slimefun, InfinityExpansion, ExoticGarden...", type: "sys", delay: 1000 },
            { text: "WARNING: High energy signature detected in Sector 7", type: "warn", delay: 800 },
            { text: "Bypassing security protocols...", type: "magenta", delay: 1200 },
            { text: "Accessing Server Store Database...", type: "cyan", delay: 600 },
            { text: "[ERROR] Unauthorized access attempt blocked.", type: "err", delay: 1000 },
            { text: "Re-routing neural pathways...", type: "sys", delay: 800 },
            { text: "Welcome to Vlansky, Operative.", type: "succ", delay: 2000 },
            { text: "Awaiting input...", type: "sys", delay: 3000 }
        ];

        let currentLine = 0;
        
        function typeLine(lineData) {
            if (currentLine >= lines.length) {
                setTimeout(() => {
                    terminal.innerHTML = '';
                    currentLine = 0;
                    typeLine(lines[0]);
                }, 5000);
                return;
            }

            const lineElem = document.createElement('div');
            lineElem.className = `term-line ${lineData.type}`;
            terminal.appendChild(lineElem);
            
            const cursor = document.createElement('span');
            cursor.className = 'term-cursor';
            terminal.appendChild(cursor);

            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < lineData.text.length) {
                    lineElem.textContent += lineData.text.charAt(charIndex);
                    charIndex++;
                    terminal.scrollTop = terminal.scrollHeight;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        // Safety check in case cursor was already removed or terminal cleared
                        if(terminal.contains(cursor)) {
                            terminal.removeChild(cursor);
                        }
                        currentLine++;
                        typeLine(lines[currentLine]);
                    }, lineData.delay);
                }
            }, 30);
        }

        const observer = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                terminal.innerHTML = '';
                typeLine(lines[0]);
                observer.unobserve(terminal);
            }
        }, { threshold: 0.5 });
        observer.observe(terminal);
    }
});
