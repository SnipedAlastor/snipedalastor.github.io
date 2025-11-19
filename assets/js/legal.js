// === LEGAL PAGE - EXPANDABLE SECTIONS ===

function initLegalSections() {
    const sections = document.querySelectorAll('.legal-section');
    
    sections.forEach(section => {
        const header = section.querySelector('.legal-section-header');
        
        header.addEventListener('click', () => {
            // Toggle current section
            section.classList.toggle('open');
            
            sections.forEach(otherSection => {
                if (otherSection !== section) {
                    otherSection.classList.remove('open');
                }
            });
            
        });
    });
}

// Smooth scroll to section if hash in URL
function scrollToSection() {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Open the section
            targetSection.classList.add('open');
            
            // Scroll to it after a short delay
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initLegalSections();
    scrollToSection();
});
