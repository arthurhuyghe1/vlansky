document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const copyBtn = document.getElementById('copy-ip-btn');
    const ipAddress = copyBtn.getAttribute('data-ip');
    const tooltip = copyBtn.querySelector('.tooltip');
    const icon = copyBtn.querySelector('i');
    
    // Copy IP Functionality
    copyBtn.addEventListener('click', async () => {
        try {
            // Write to clipboard
            await navigator.clipboard.writeText(ipAddress);
            
            // Visual feedback success
            copyBtn.classList.add('copied');
            tooltip.textContent = "COPIÉE !";
            icon.classList.remove('fa-play');
            icon.classList.add('fa-check');
            
            // Add a temporary glitch effect class to the button
            copyBtn.classList.add('glitch');
            copyBtn.setAttribute('data-text', copyBtn.textContent.trim());
            
            // Revert after 2.5 seconds
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.classList.remove('glitch');
                tooltip.textContent = "Copier l'IP";
                icon.classList.remove('fa-check');
                icon.classList.add('fa-play');
            }, 2500);
            
        } catch (err) {
            console.error('Erreur lors de la copie de l\'IP: ', err);
            tooltip.textContent = "ERREUR";
            
            setTimeout(() => {
                tooltip.textContent = "Copier l'IP";
            }, 2000);
        }
    });

    // Optional subtle parallax on the grid background relative to mouse
    const gridBg = document.querySelector('.grid-background');
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; 
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        // Move the grid very slightly opposite to cursor
        gridBg.style.transform = `translate(${-x}px, ${-y}px)`;
    });
});
