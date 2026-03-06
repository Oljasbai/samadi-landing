// ========================================
// SAMADI - Interactive JavaScript
// Modern Landing Page Functionality
// ========================================

// ========== WAIT FOR DOM CONTENT TO LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE NAVIGATION ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    });
    
    // ========== SMOOTH SCROLL FOR NAVIGATION LINKS ==========
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ========== ANIMATED COUNTER FOR STATS ==========
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString('ru-RU');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('ru-RU');
            }
        };
        
        updateCounter();
    }
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe all stat numbers
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ========== BACK TO TOP BUTTON ==========
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== ACTIVE NAVIGATION LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and elements
    const animatedElements = document.querySelectorAll('.about-card, .stat-card, .geography-card, .competency-card, .partner-card, .integration-card, .contact-item');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(element);
    });
    
    // ========== FORM SUBMISSION ==========
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Simulate form submission
            // In production, you would send this to a server
            console.log('Form submitted with data:', Object.fromEntries(formData));
            
            // Show success message
            alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
            
            // Reset form
            contactForm.reset();
        });
        
        // Form input validation feedback
        const formInputs = contactForm.querySelectorAll('.form-input');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = 'var(--success)';
                } else if (this.hasAttribute('required')) {
                    this.style.borderColor = 'var(--danger)';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--accent-color)';
            });
        });
    }
    
    // ========== PARALLAX EFFECT FOR HERO SECTION ==========
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // ========== LAZY LOADING FOR IMAGES ==========
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ========== PRELOAD CRITICAL IMAGES ==========
    const criticalImages = [
        'https://sspark.genspark.ai/cfimages?u1=zsW2uYFTrFdasKusB3sFzAOJjlptQB2iAWXQwu4quDBHeK4%2BomCAhibS5%2BYderPyyLFGqlPrJrozweHGD89TFIv%2BX%2FyqP8XIfRdOrh25juCpVUuch62J91B72iV5We2%2FGdCZo4cjflwITOO5qMuKWru1d%2BUx4iSGxM2yMNN16w%3D%3D&u2=CLsTBYVOkDvBd3ET&width=2560'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // ========== MOUSE PARALLAX EFFECT ==========
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.about-card, .stat-card, .geography-card, .partner-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Only apply if mouse is over the card
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        });
    });
    
    // Reset card transform when mouse leaves
    document.querySelectorAll('.about-card, .stat-card, .geography-card, .partner-card').forEach(card => {
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ========== TYPING EFFECT FOR HERO SUBTITLE ==========
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 100);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeText, 1000);
    }
    
    // ========== SCROLL PROGRESS INDICATOR ==========
    const createScrollProgressBar = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, var(--accent-color), var(--accent-light));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = (window.pageYOffset / documentHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    createScrollProgressBar();
    
    // ========== PERFORMANCE MONITORING ==========
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }
    
    // ========== CONSOLE MESSAGE ==========
    console.log('%c🏢 САМАДИ - Группа Компаний', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
    console.log('%cСоздано с ❤️ для ведущего дистрибьютора Казахстана', 'font-size: 14px; color: #0A2540;');
    console.log('%cWebsite Version: 1.0.0', 'font-size: 12px; color: #6C757D;');
    
});

// ========== SERVICE WORKER REGISTRATION (for PWA capabilities) ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}