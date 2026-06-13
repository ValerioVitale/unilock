document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll for Buttons and Nav Links
    const navLinks = document.querySelectorAll('.nav-link, .hero-btn');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // AGGIUSTAMENTO MOBILE: Se l'utente clicca su "#overview-section" ma è su mobile portrait, 
            // lo reindirizziamo alla prima delle due sezioni sdoppiate.
            let finalTargetId = targetId;
            if (targetId === '#overview-section' && window.innerWidth <= 768) {
                finalTargetId = '#overview-section-portrait-1';
            }
            
            const targetElement = document.querySelector(finalTargetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // 2. Intersection Observer for Active Links & Fade-in
    const observerOptions = {
        threshold: 0.6 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger fade-in animations
                entry.target.querySelectorAll('.fade-in').forEach(el => {
                    el.classList.add('visible');
                });
                
                // Update navigation active states
                let id = entry.target.getAttribute('id');
                
                // AGGIUSTAMENTO MOBILE: Se l'observer intercetta una delle due sezioni sdoppiate di Overview,
                // dice alla barra di navigazione di accendere il link standard "#overview-section"
                if (id === 'overview-section-portrait-1' || id === 'overview-section-portrait-2') {
                    id = 'overview-section';
                }
                
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    // Observe all sections and the landing area
    document.querySelectorAll('section, .landing').forEach(s => observer.observe(s));

    // 3. Card Flip Logic (Aggiornato per Desktop e Mobile)
    // Gestione Flip Carta Desktop
    const cardDesktop = document.getElementById('card-flipper');
    if (cardDesktop) {
        cardDesktop.addEventListener('click', () => {
            cardDesktop.classList.toggle('is-flipped');
        });
    }

    // Gestione Flip Carta Mobile Portrait
    const cardMobile = document.getElementById('card-flipper-mobile');
    if (cardMobile) {
        cardMobile.addEventListener('click', () => {
            cardMobile.classList.toggle('is-flipped');
        });
    }
});