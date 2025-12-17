document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Scroll for Buttons and Nav Links
    const navLinks = document.querySelectorAll('.nav-link, .hero-btn');
    
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // We use 'smooth' behavior. 
                // The CSS scroll-snap will take over once the element is in range.
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // 2. Intersection Observer for Active Links & Fade-in
    // Threshold is set to 0.6 so the "active" state switches 
    // when the section is mostly visible.
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
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    // Observe all sections and the landing area
    document.querySelectorAll('section, .landing').forEach(s => observer.observe(s));

    // NOTE: The 'wheel' event listener has been removed to fix the navigation delay.
});