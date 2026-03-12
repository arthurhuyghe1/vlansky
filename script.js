document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const copyBtn = document.getElementById('copy-ip-btn');
    const ipAddress = copyBtn.getAttribute('data-ip');
    const tooltip = copyBtn.querySelector('.tooltip');
    const copyIcon = copyBtn.querySelector('.copy-icon');
    
    // Copy IP Functionality
    copyBtn.addEventListener('click', async () => {
        try {
            // Write to clipboard
            await navigator.clipboard.writeText(ipAddress);
            
            // Visual feedback success
            copyBtn.classList.add('copied');
            tooltip.textContent = "IP Copiée !";
            copyIcon.classList.remove('fa-copy');
            copyIcon.classList.remove('fa-regular');
            copyIcon.classList.add('fa-solid');
            copyIcon.classList.add('fa-check');
            
            // Revert after 2.5 seconds
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                tooltip.textContent = "Copier l'IP";
                copyIcon.classList.remove('fa-solid');
                copyIcon.classList.remove('fa-check');
                copyIcon.classList.add('fa-regular');
                copyIcon.classList.add('fa-copy');
            }, 2500);
            
        } catch (err) {
            console.error('Erreur lors de la copie de l\'IP: ', err);
            tooltip.textContent = "Erreur de copie";
            
            setTimeout(() => {
                tooltip.textContent = "Copier l'IP";
            }, 2000);
        }
    });
    
    // Optional: Interactive glow follow mouse on cards
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Subtly move the glow effect towards the mouse cursor
            const glow = card.querySelector('.glow-effect');
            if(glow) {
                // If the element has a specific glow class, we can adjust the radial gradient center
                if(glow.classList.contains('cyan-glow')) {
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 255, 0.4) 0%, transparent 60%)`;
                } else if(glow.classList.contains('magenta-glow')) {
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 0, 255, 0.4) 0%, transparent 60%)`;
                } else if(glow.classList.contains('dual-glow')) {
                    // For dual glow, maybe just standard hover is enough since it's complex, 
                    // but we can add a subtle combined effect
                    glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 255, 0.3) 0%, transparent 40%),
                                             radial-gradient(circle at ${rect.width - x}px ${rect.height - y}px, rgba(255, 0, 255, 0.3) 0%, transparent 40%)`;
                }
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.glow-effect');
            if(glow) {
                glow.style.background = ''; // Reset to CSS default
            }
        });
    });
    
});
