// Simple smooth scrolling (Existing Code)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll-triggered navigation bar
window.addEventListener('scroll', function() {
    const navBar = document.querySelector('.nav-bar');
    // Get the height of the hero section (This is our trigger point)
    const heroHeight = document.querySelector('.hero').offsetHeight;

    // Check if the user has scrolled past the full height of the hero section
    if (window.scrollY >= heroHeight) {
        // If scrolled past the hero, add the 'sticky' class
        // This will make it fixed, white background, and dark text (as per style.css)
        navBar.classList.add('sticky');
    } else {
        // If still in the hero section, remove the 'sticky' class
        // This makes it absolute, transparent, and white text (as per style.css)
        navBar.classList.remove('sticky');
    }
});