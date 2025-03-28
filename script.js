/**
 * LSSHRT - Script principal
 * Gestion des animations et interactions
 */

// Fonction d'initialisation principale
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation du script...');
    
    // Forcer immédiatement la visibilité des éléments critiques
    forceElementsVisibility();
    
    // Initialiser les plugins GSAP avec gestion d'erreurs
    initGSAP();
    
    // Gérer le préchargeur
    handlePreloader();
    
    // Initialiser les fonctionnalités principales
    try {
        // Menu mobile
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        
        if (burger && navLinks) {
            burger.addEventListener('click', function() {
                burger.classList.toggle('toggle');
                navLinks.classList.toggle('active');
            });
            
            // Fermer le menu au clic sur un lien
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', function() {
                    burger.classList.remove('toggle');
                    navLinks.classList.remove('active');
                });
            });
        }
        
        // Filtre de portfolio
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (filterBtns.length && portfolioItems.length) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Mettre à jour le bouton actif
                    document.querySelector('.filter-btn.active').classList.remove('active');
                    this.classList.add('active');
                    
                    // Filtrer les éléments
                    const filter = this.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                            item.style.opacity = '1';
                        } else {
                            item.style.display = 'none';
                            item.style.opacity = '0';
                        }
                    });
                });
            });
        }
        
        // Défilement fluide pour les ancres
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Bouton retour en haut
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });
            
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Animation des compteurs pour les statistiques
        animateCounters();
        
        // Curseur personnalisé pour les écrans larges
        if (window.innerWidth > 768) {
            initCustomCursor();
        }
        
        // Ajouter des animations au survol
        addHoverEffects();
        
        // Animation des sections au défilement
        initScrollAnimations();
        
        // Formulaire de contact
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const submitBtn = this.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.classList.add('success');
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
                    
                    setTimeout(() => {
                        submitBtn.classList.remove('success');
                        submitBtn.innerHTML = '<span>Envoyer</span><i class="fas fa-paper-plane"></i>';
                        contactForm.reset();
                    }, 3000);
                }
            });
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des fonctionnalités:', error);
    }
});

// S'assurer que toutes les animations fonctionnent après le chargement complet
window.addEventListener('load', function() {
    console.log('Page entièrement chargée');
    document.body.classList.add('loaded');
    
    // Masquer définitivement le préchargeur
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.display = 'none';
    }
    
    // Réinitialiser les animations pour s'assurer qu'elles fonctionnent
    forceElementsVisibility();
    
    // Retry les animations GSAP
    if (typeof gsap !== 'undefined') {
        try {
            // Animer les formes flottantes
            animateFloatingShapes();
            
            // Animer les entrées des sections
            initScrollAnimations();
            
            // Démarrer l'animation du titre si la fonction existe
            if (typeof SplitType !== 'undefined') {
                animateHeroTitle();
            }
        } catch (error) {
            console.warn('Erreur lors de la réinitialisation des animations GSAP:', error);
        }
    }
});

// Forcer la visibilité des éléments importants
function forceElementsVisibility() {
    const criticalElements = [
        '.hero-content',
        '.hero-title',
        '.typewriter',
        '.badge',
        '.cta-button',
        '.section-header',
        '.service-card',
        '.portfolio-item',
        '.stat-item',
        '.contact-item',
        '.contact-form',
        '[data-animation]'
    ];
    
    criticalElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            if (element) {
                element.style.opacity = '1';
                element.style.visibility = 'visible';
                element.style.transform = 'none';
            }
        });
    });
    
    // Ajouter la classe is-visible aux éléments animés
    document.querySelectorAll('[data-animation]').forEach(element => {
        element.classList.add('is-visible');
    });
}

// Initialiser GSAP et ses plugins
function initGSAP() {
    try {
        // Vérifier si GSAP est disponible
        if (typeof gsap === 'undefined') {
            console.warn('GSAP non disponible - animations désactivées');
            document.body.classList.add('no-gsap');
            return false;
        }
        
        console.log('GSAP disponible');
        
        // Enregistrer les plugins avec vérification
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            console.log('ScrollTrigger enregistré');
        }
        
        if (typeof TextPlugin !== 'undefined') {
            gsap.registerPlugin(TextPlugin);
            console.log('TextPlugin enregistré');
        }
        
        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.registerPlugin(ScrollToPlugin);
            console.log('ScrollToPlugin enregistré');
        }
        
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de GSAP:', error);
        document.body.classList.add('no-gsap');
        return false;
    }
}

// Gérer le préchargeur
function handlePreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    try {
        if (typeof gsap !== 'undefined') {
            // Animation de rotation du loader
            gsap.to('.loader', {
                rotation: 360,
                duration: 1.5,
                ease: "power2.inOut",
                repeat: -1
            });
            
            // Masquer le préchargeur après un court délai
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        preloader.style.display = 'none';
                        // Démarrer les animations d'intro
                        animateIntro();
                    }
                });
            }, 1000); // Délai réduit pour une meilleure expérience
        } else {
            // Fallback sans GSAP
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Forcer la visibilité des éléments
                    forceElementsVisibility();
                }, 800);
            }, 1000);
        }
    } catch (error) {
        console.warn('Erreur avec le préchargeur:', error);
        // Fallback en cas d'erreur
        preloader.style.opacity = '0';
        preloader.style.display = 'none';
    }
}

// Animation d'intro
function animateIntro() {
    if (typeof gsap === 'undefined') {
        forceElementsVisibility();
        return;
    }
    
    try {
        // Animer le contenu hero
        gsap.fromTo('.hero-content', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animer le badge
        gsap.fromTo('.badge', {
            opacity: 0,
            y: -20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'back.out(1.7)'
        });
        
        // Animer le titre hero
        animateHeroTitle();
        
        // Animer le texte de la machine à écrire
        animateTypewriter();
        
        // Animer le bouton CTA
        gsap.fromTo('.cta-button', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.8,
            ease: 'back.out(1.7)'
        });
        
        // Animer l'indicateur de défilement
        gsap.fromTo('.scroll-indicator', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1,
            ease: 'power2.out'
        });
        
        // Animer les formes flottantes
        animateFloatingShapes();
    } catch (error) {
        console.warn('Erreur lors de l\'animation d\'intro:', error);
        forceElementsVisibility();
    }
}

// Animation du titre hero
function animateHeroTitle() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    try {
        if (typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
            const splitter = new SplitType('.hero-title', {types: 'chars', tagName: 'span'});
            const chars = heroTitle.querySelectorAll('.char');
            
            if (chars.length) {
                gsap.fromTo(chars, {
                    opacity: 0,
                    y: 20,
                    rotationX: 20
                }, {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    stagger: 0.03,
                    duration: 0.8,
                    delay: 0.4,
                    ease: 'back.out(1.7)'
                });
            } else {
                // Fallback si SplitType échoue
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'none';
            }
        } else {
            // Fallback simple
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'none';
            
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(heroTitle, {
                    opacity: 0,
                    y: 30
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.4,
                    ease: 'power2.out'
                });
            }
        }
    } catch (error) {
        console.warn('Erreur lors de l\'animation du titre:', error);
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'none';
    }
}

// Animation de machine à écrire
function animateTypewriter() {
    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;
    
    try {
        if (typeof gsap !== 'undefined' && typeof TextPlugin !== 'undefined') {
            const typewriterText = typewriter.textContent || "Développement web, bots et scripts";
            typewriter.textContent = '';
            typewriter.style.opacity = '1';
            
            gsap.to(typewriter, {
                duration: 2,
                text: typewriterText,
                delay: 0.6,
                ease: "none"
            });
        } else {
            // Fallback sans GSAP
            typewriter.style.opacity = '1';
        }
    } catch (error) {
        console.warn('Erreur lors de l\'animation typewriter:', error);
        typewriter.style.opacity = '1';
    }
}

// Animation des formes flottantes
function animateFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    if (!shapes.length || typeof gsap === 'undefined') return;
    
    try {
        shapes.forEach((shape, index) => {
            const speed = shape.getAttribute('data-speed') || Math.random() * 0.1 + 0.05;
            const delay = index * 0.1;
            
            // Animation de flottement
            gsap.to(shape, {
                y: "random(-30, 30)",
                x: "random(-20, 20)",
                rotation: "random(-15, 15)",
                duration: 5 + Math.random() * 5,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            
            // Animation de pulsation
            gsap.to(shape, {
                scale: 0.9 + Math.random() * 0.2,
                opacity: 0.8 + Math.random() * 0.2,
                duration: 2 + Math.random() * 2,
                delay: delay,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
            
            // Effet de parallaxe sur les formes
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth - 0.5;
                const mouseY = e.clientY / window.innerHeight - 0.5;
                
                gsap.to(shape, {
                    x: mouseX * 50 * speed,
                    y: mouseY * 50 * speed,
                    duration: 1,
                    ease: 'power1.out'
                });
            });
        });
    } catch (error) {
        console.warn('Erreur lors de l\'animation des formes flottantes:', error);
    }
}

// Animation des sections au défilement
function initScrollAnimations() {
    // Si ScrollTrigger n'est pas disponible, utiliser l'Intersection Observer API
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        initIntersectionObserver();
        return;
    }
    
    try {
        // Animation des en-têtes de section
        gsap.utils.toArray('.section-header').forEach(header => {
            ScrollTrigger.create({
                trigger: header,
                start: "top 80%",
                onEnter: () => {
                    header.classList.add('is-visible');
                    
                    gsap.fromTo(header.querySelector('.section-tag'), {
                        y: 30, opacity: 0
                    }, {
                        y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.7)'
                    });
                    
                    gsap.fromTo(header.querySelector('.section-title'), {
                        y: 30, opacity: 0
                    }, {
                        y: 0, opacity: 1, duration: 0.7, delay: 0.2, ease: 'power3.out'
                    });
                    
                    gsap.fromTo(header.querySelector('.section-line'), {
                        width: 0
                    }, {
                        width: '70px', duration: 0.7, delay: 0.4, ease: 'power3.out'
                    });
                }
            });
        });
        
        // Animation des cartes de service
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            ScrollTrigger.create({
                trigger: card,
                start: "top 85%",
                onEnter: () => {
                    card.classList.add('is-visible');
                    
                    gsap.fromTo(card, {
                        y: 50, opacity: 0
                    }, {
                        y: 0, opacity: 1, duration: 0.7, delay: index * 0.1, ease: 'back.out(1.7)'
                    });
                }
            });
        });
        
        // Animation des éléments du portfolio
        gsap.utils.toArray('.portfolio-item').forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: "top 85%",
                onEnter: () => {
                    item.classList.add('is-visible');
                    
                    gsap.fromTo(item, {
                        y: 50, opacity: 0, scale: 0.95
                    }, {
                        y: 0, opacity: 1, scale: 1, duration: 0.7, delay: index * 0.1, ease: 'back.out(1.7)'
                    });
                }
            });
        });
        
        // Animation des éléments de contact
        gsap.utils.toArray('.contact-item').forEach((item, index) => {
            ScrollTrigger.create({
                trigger: item,
                start: "top 85%",
                onEnter: () => {
                    item.classList.add('is-visible');
                    
                    gsap.fromTo(item, {
                        x: -30, opacity: 0
                    }, {
                        x: 0, opacity: 1, duration: 0.7, delay: index * 0.1, ease: 'back.out(1.7)'
                    });
                }
            });
        });
        
        // Animation du formulaire de contact
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            ScrollTrigger.create({
                trigger: contactForm,
                start: "top 85%",
                onEnter: () => {
                    contactForm.classList.add('is-visible');
                    
                    gsap.fromTo(contactForm, {
                        y: 50, opacity: 0
                    }, {
                        y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.7)'
                    });
                }
            });
        }
    } catch (error) {
        console.warn('Erreur lors de l\'initialisation des animations au défilement:', error);
        // Rendre tous les éléments visibles en cas d'erreur
        document.querySelectorAll('.section-header, .service-card, .portfolio-item, .contact-item, .contact-form').forEach(element => {
            element.classList.add('is-visible');
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
}

// Fallback pour les animations au défilement utilisant Intersection Observer
function initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
        // Rendre tous les éléments visibles si IntersectionObserver n'est pas disponible
        document.querySelectorAll('.section-header, .service-card, .portfolio-item, .contact-item, .contact-form, [data-animation]').forEach(element => {
            element.classList.add('is-visible');
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
        return;
    }
    
    try {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observer tous les éléments animés
        document.querySelectorAll('.section-header, .service-card, .portfolio-item, .contact-item, .contact-form, [data-animation]').forEach(element => {
            observer.observe(element);
        });
    } catch (error) {
        console.warn('Erreur avec IntersectionObserver:', error);
        // Rendre tous les éléments visibles en cas d'erreur
        document.querySelectorAll('.section-header, .service-card, .portfolio-item, .contact-item, .contact-form, [data-animation]').forEach(element => {
            element.classList.add('is-visible');
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    }
}

// Animation des compteurs pour les statistiques
function animateCounters() {
    const statItems = document.querySelectorAll('[data-animation="counter"]');
    if (!statItems.length) return;
    
    try {
        if (typeof IntersectionObserver !== 'undefined') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-target'));
                        const numberElement = entry.target.querySelector('.stat-number');
                        
                        if (numberElement && target) {
                            let start = 0;
                            const duration = 2000; // 2 secondes
                            const increment = target / (duration / 16); // Mise à jour à 60 FPS
                            
                            const counter = setInterval(() => {
                                start += increment;
                                if (start >= target) {
                                    numberElement.textContent = target;
                                    clearInterval(counter);
                                } else {
                                    numberElement.textContent = Math.floor(start);
                                }
                            }, 16);
                        }
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });
            
            statItems.forEach(item => {
                observer.observe(item);
            });
        } else {
            // Fallback sans IntersectionObserver
            statItems.forEach(item => {
                const target = parseInt(item.getAttribute('data-target'));
                const numberElement = item.querySelector('.stat-number');
                
                if (numberElement && target) {
                    numberElement.textContent = target;
                }
            });
        }
    } catch (error) {
        console.warn('Erreur lors de l\'animation des compteurs:', error);
        // Afficher directement les valeurs en cas d'erreur
        statItems.forEach(item => {
            const target = item.getAttribute('data-target');
            const numberElement = item.querySelector('.stat-number');
            
            if (numberElement && target) {
                numberElement.textContent = target;
            }
        });
    }
}

// Initialisation du curseur personnalisé
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (!cursor || !cursorOutline) return;
    
    try {
        document.body.classList.add('custom-cursor');
        
        const moveCursor = (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursor.style.left = posX + 'px';
            cursor.style.top = posY + 'px';
            
            cursorOutline.style.left = posX + 'px';
            cursorOutline.style.top = posY + 'px';
        };
        
        window.addEventListener('mousemove', moveCursor);
        
        // Effet au survol des éléments interactifs
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .contact-item, .social-link, input, textarea, select, .filter-btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorOutline.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorOutline.classList.remove('active');
            });
        });
    } catch (error) {
        console.warn('Erreur avec le curseur personnalisé:', error);
        // Masquer le curseur personnalisé en cas d'erreur
        if (cursor) cursor.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    }
}

// Ajouter des effets de survol
function addHoverEffects() {
    try {
        // Effet au survol des cartes de service
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hovered');
            });
        });
        
        // Effet au survol des éléments de portfolio
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                const overlay = item.querySelector('.portfolio-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const overlay = item.querySelector('.portfolio-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                }
            });
        });
    } catch (error) {
        console.warn('Erreur lors de l\'ajout des effets de survol:', error);
    }
}