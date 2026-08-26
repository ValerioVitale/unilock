document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll for Buttons and Nav Links
    const navLinks = document.querySelectorAll('.nav-link, .hero-btn');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
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

    // 2. Intersection Observer for Active Links, Fade-in & Mobile Navbar Carousel Sync with Gradient Opacity
    const observerOptions = {
        threshold: 0.6 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.fade-in').forEach(el => {
                    el.classList.add('visible');
                });
                
                let id = entry.target.getAttribute('id');
                
                if (id === 'overview-section-portrait-1' || id === 'overview-section-portrait-2') {
                    id = 'overview-section';
                } else if (id === 'lore-section-portrait-1' || id === 'lore-section-portrait-2' || id === 'lore-section-portrait-3') {
                    id = 'lore-section';
                }
                
                const activeHref = `#${id}`;
                const allNavLinks = Array.from(document.querySelectorAll('.nav-link'));
                
                allNavLinks.forEach((link, index) => {
                    const isActive = link.getAttribute('href') === activeHref;
                    link.classList.toggle('active', isActive);
                    
                    // Rimuove le vecchie classi di adiacenza
                    link.classList.remove('nav-adjacent-1', 'nav-adjacent-2');
                    
                    if (isActive) {
                        // Se siamo in modalità mobile/portrait, centra automaticamente la voce attiva nel carosello della navbar
                        if (window.innerWidth <= 768) {
                            link.scrollIntoView({
                                behavior: 'smooth',
                                inline: 'center',
                                block: 'nearest'
                            });
                        }
                    }
                });

                // Calcola e assegna le classi di trasparenza basate sulla distanza dall'indice attivo (solo su mobile)
                if (window.innerWidth <= 768) {
                    const activeIndex = allNavLinks.findIndex(link => link.classList.contains('active'));
                    if (activeIndex !== -1) {
                        allNavLinks.forEach((link, index) => {
                            const distance = Math.abs(index - activeIndex);
                            if (distance === 1) {
                                link.classList.add('nav-adjacent-1');
                            } else if (distance >= 2) {
                                link.classList.add('nav-adjacent-2');
                            }
                        });
                    }
                }
            }
        });
    }, observerOptions);

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

    // ======================= DISABILITA TASTO DESTRO, TRASCINAMENTO E COPIA =======================
    
    // Blocca il menu del tasto destro su tutto il documento
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Forza il blocco del trascinamento per qualsiasi immagine via codice
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });
    document.addEventListener('drop', (e) => {
        e.preventDefault();
    });

    // Blocca le combinazioni di tasti per copia, taglia e strumenti sviluppatore
    document.addEventListener('keydown', (e) => {
        if (
            e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'u') ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) ||
            e.key === 'F12'
        ) {
            e.preventDefault();
            return false;
        }
    });

});