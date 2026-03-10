// ========================================
// XAPI - Premium Interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavbarScroll();
    initSmoothScroll();
    initContactForm();
    initParallaxOrbs();
});

// ========================================
// Scroll Reveal Animation
// ========================================

function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.service-card, .tech-item, .feature-item, .about-card, .cta-card, .section-header'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${(index % 4) * 0.1}s`;
        observer.observe(el);
    });
}

// ========================================
// Navbar Scroll Effect
// ========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.nav-container');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(5, 5, 7, 0.9)';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(5, 5, 7, 0.7)';
            navbar.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
}

// ========================================
// Smooth Scroll
// ========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Contact Form
// ========================================

function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            // Loading state
            btn.innerHTML = `
                <span>Wird gesendet...</span>
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round">
                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                    </path>
                </svg>
            `;
            btn.disabled = true;
            
            // Simulate send (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success state
            btn.innerHTML = `
                <span>Gesendet!</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            `;
            btn.style.background = '#28c840';
            
            // Reset after delay
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 3000);
        });
    }
}

// ========================================
// Parallax Orbs (subtle mouse movement)
// ========================================

function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
}

// ========================================
// Utility: Throttle
// ========================================

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
