document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll for Buttons and Nav Links
    const navLinks = document.querySelectorAll('.nav-link, .hero-btn');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // MODIFICATO: Reindirizzamento allo sdoppiamento mobile a 3 sub-sezioni per la Lore
            let finalTargetId = targetId;
            if (targetId === '#overview-section' && window.innerWidth <= 768) {
                finalTargetId = '#overview-section-portrait-1';
            } else if (targetId === '#lore-section' && window.innerWidth <= 768) {
                finalTargetId = '#lore-section-portrait-1';
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
                
                // MODIFICATO: Mappatura corretta delle 3 sub-sezioni della Lore sul menu principale
                if (id === 'overview-section-portrait-1' || id === 'overview-section-portrait-2') {
                    id = 'overview-section';
                } else if (id === 'lore-section-portrait-1' || id === 'lore-section-portrait-2' || id === 'lore-section-portrait-3') {
                    id = 'lore-section';
                }
                
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    // MODIFICATO: Inclusione di #lore-section-portrait-3 nell'Observer di tracciamento
    document.querySelectorAll('section, .landing, #overview-section-portrait-1, #overview-section-portrait-2, #lore-section-portrait-1, #lore-section-portrait-2, #lore-section-portrait-3').forEach(s => observer.observe(s));

    // 3. Card Flip Logic
    const cardDesktop = document.getElementById('card-flipper');
    if (cardDesktop) {
        cardDesktop.addEventListener('click', () => {
            cardDesktop.classList.toggle('is-flipped');
        });
    }

    const cardMobile = document.getElementById('card-flipper-mobile');
    if (cardMobile) {
        cardMobile.addEventListener('click', () => {
            cardMobile.classList.toggle('is-flipped');
        });
    }

    // 4. Logic di Swap per la Galleria/Carosello in Desktop Landscape
    const landscapeGalleryTrigger = document.getElementById('landscape-gallery-trigger');
    const cardsCarousel = document.getElementById('cards-carousel');

    if (landscapeGalleryTrigger && cardsCarousel) {
        landscapeGalleryTrigger.addEventListener('click', () => {
            if (window.innerWidth > 768) {
                landscapeGalleryTrigger.classList.add('hidden-gallery');
                cardsCarousel.classList.add('carousel-active');
            }
        });
    }
});