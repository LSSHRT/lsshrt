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

// Animer les tags technologiques
function animateTags() {
    const tags = document.querySelectorAll('.tag-item');
    if (!tags.length || typeof gsap === 'undefined') return;
    
    try {
        // Initialiser les tags
        gsap.set(tags, {
            opacity: 0,
            y: 20,
            scale: 0.8
        });
        
        // Créer une timeline pour l'animation séquentielle
        const tagsTl = gsap.timeline({
            delay: 1.8
        });
        
        // Animation du conteneur parent pour assurer un bon centrage
        const tagsContainer = document.querySelector('.animated-tags');
        if (tagsContainer) {
            tagsTl.fromTo(tagsContainer, {
                opacity: 0,
                y: 10
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
        
        // Animer chaque tag depuis le centre
        tags.forEach((tag, index) => {
            tagsTl.fromTo(tag, {
                opacity: 0,
                y: 0,
                scale: 0.7,
                x: 0
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                x: 0,
                duration: 0.5,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    // Ajouter un léger effet de flottement après l'apparition
                    gsap.to(tag, {
                        y: 'random(-3, 3)',
                        x: 'random(-2, 2)',
                        rotation: 'random(-2, 2)',
                        duration: 2 + Math.random(),
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: Math.random() * 0.3
                    });
                }
            }, index * 0.08); // Timing plus rapide pour une apparition plus uniforme
        });
        
        // Ajouter un effet d'interaction au survol
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                gsap.to(tag, {
                    scale: 1.1,
                    backgroundColor: 'rgba(99, 102, 241, 0.3)',
                    boxShadow: '0 5px 15px rgba(99, 102, 241, 0.3)',
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
            
            tag.addEventListener('mouseleave', () => {
                gsap.to(tag, {
                    scale: 1,
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    boxShadow: 'none',
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
        });
    } catch (error) {
        console.warn('Erreur lors de l\'animation des tags:', error);
    }
}

// Animation d'intro
function animateIntro() {
    if (typeof gsap === 'undefined') {
        forceElementsVisibility();
        return;
    }
    
    try {
        // Timeline principale pour coordonner toutes les animations
        const mainTl = gsap.timeline();
        
        // Animer le contenu hero avec un effet de glassmorphism
        mainTl.fromTo('.hero-content', {
            opacity: 0,
            y: 20,
            backdropFilter: 'blur(0px)'
        }, {
            opacity: 1,
            y: 0,
            backdropFilter: 'blur(10px)',
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animer le badge avec effet de pulsation
        mainTl.fromTo('.badge', {
            opacity: 0,
            y: -20,
            scale: 0.8
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, "-=0.8");
        
        // Animer le titre hero
        animateHeroTitle();
        
        // Animer le texte de la machine à écrire
        animateTypewriter();
        
        // Animer les tags technologiques
        animateTags();
        
        // Animer le bouton CTA avec effet de rebond
        mainTl.fromTo('.cta-button', {
            opacity: 0,
            y: 20,
            scale: 0.95
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.6,
            ease: 'back.out(1.7)',
            onComplete: () => {
                // Ajouter un effet de rebond subtil et permanent
                gsap.to('.cta-button', {
                    y: -8,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        });
        
        // Animer l'indicateur de défilement
        mainTl.fromTo('.scroll-indicator', {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out'
        }, "-=0.4");
        
        // Animer les formes flottantes
        animateFloatingShapes();
        
        // Effet parallaxe amélioré
        initParallaxEffect();
    } catch (error) {
        console.warn('Erreur lors de l\'animation d\'intro:', error);
        forceElementsVisibility();
    }
}

// Animation du titre hero
function animateHeroTitle() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    // S'assurer que le titre est visible immédiatement
    heroTitle.style.opacity = '1';
    heroTitle.style.visibility = 'visible';
    heroTitle.style.transform = 'none';
    
    try {
        if (typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
            // Vérifier si SplitType est déjà appliqué pour éviter les doublons
            if (!heroTitle.querySelector('.char')) {
                // Décomposer le titre en mots et caractères
                const splitter = new SplitType('.hero-title', {
                    types: 'words,chars',
                    tagName: 'span'
                });
                
                // Vérifier si le split a fonctionné
                const words = heroTitle.querySelectorAll('.word');
                const chars = heroTitle.querySelectorAll('.char');
                
                if (chars && chars.length > 0) {
                    // Réinitialiser d'abord l'état
                    gsap.set([words, chars], {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotationX: 0,
                        clearProps: "all"
                    });
                    
                    // Animation principale - mélange d'effets
                    const timeline = gsap.timeline({
                        onComplete: () => {
                            // S'assurer que le titre reste visible
                            heroTitle.style.opacity = '1';
                            heroTitle.style.visibility = 'visible';
                        }
                    });
                    
                    // Animation des mots
                    timeline.fromTo(words, {
                        opacity: 0,
                        y: -50,
                        scale: 0.8,
                        rotation: -5
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        stagger: 0.15,
                        duration: 1,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    
                    // Animation des caractères une fois que les mots sont positionnés
                    timeline.fromTo(chars, {
                        opacity: 0.5,
                        scale: 0.9,
                        color: '#6366f1'
                    }, {
                        opacity: 1,
                        scale: 1,
                        color: 'white',
                        stagger: {
                            amount: 0.3,
                            from: "random"
                        },
                        duration: 0.5,
                        ease: 'power2.out'
                    }, "-=0.5");
                    
                    // Animation spéciale pour le mot "highlight"
                    const highlight = heroTitle.querySelector('.highlight');
                    if (highlight) {
                        const highlightChars = highlight.querySelectorAll('.char');
                        if (highlightChars.length) {
                            timeline.fromTo(highlightChars, {
                                opacity: 0.7,
                                scale: 1,
                                color: 'white'
                            }, {
                                opacity: 1,
                                scale: 1.1,
                                color: '#6366f1',
                                stagger: 0.05,
                                duration: 0.4,
                                ease: 'back.out(2)',
                                yoyo: true,
                                repeat: 1
                            }, "-=0.3");
                        }
                    }
                    
                    // Effet de suivi pour l'esperluette "&" (si elle existe)
                    const ampersand = Array.from(chars).find(char => char.textContent === '&');
                    if (ampersand) {
                        timeline.to(ampersand, {
                            scale: 1.2,
                            rotation: 5,
                            color: '#6366f1',
                            duration: 0.5,
                            ease: 'back.out(3)',
                            yoyo: true,
                            repeat: 1
                        }, "-=0.2");
                    }
                } else {
                    // Fallback si le splitting échoue
                    simpleTitleAnimation(heroTitle);
                }
            } else {
                // SplitType déjà appliqué, animer les éléments existants
                const chars = heroTitle.querySelectorAll('.char');
                if (chars && chars.length > 0) {
                    gsap.fromTo(chars, {
                        opacity: 0,
                        y: 'random(-50, 50)',
                        rotationX: 'random(-90, 90)'
                    }, {
                        opacity: 1,
                        y: 0,
                        rotationX: 0,
                        stagger: 0.03,
                        duration: 0.8,
                        ease: 'back.out(1.7)'
                    });
                } else {
                    simpleTitleAnimation(heroTitle);
                }
            }
        } else {
            // Fallback simple
            simpleTitleAnimation(heroTitle);
        }
    } catch (error) {
        console.error('Erreur lors de l\'animation du titre:', error);
        
        // Assurer que le titre est visible en cas d'erreur
        heroTitle.style.opacity = '1';
        heroTitle.style.visibility = 'visible';
        heroTitle.style.transform = 'none';
    }
}

// Animation simple pour le titre en cas de problème avec SplitType
function simpleTitleAnimation(heroTitle) {
    heroTitle.style.opacity = '1';
    heroTitle.style.visibility = 'visible';
    heroTitle.style.transform = 'none';
    
    if (typeof gsap !== 'undefined') {
        gsap.fromTo(heroTitle, {
            opacity: 0,
            y: 30,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        });
        
        // Animation spéciale pour le mot "highlight"
        const highlight = heroTitle.querySelector('.highlight');
        if (highlight) {
            gsap.fromTo(highlight, {
                opacity: 0.7,
                color: 'white'
            }, {
                opacity: 1,
                color: '#6366f1',
                duration: 0.8,
                delay: 0.5,
                ease: 'power2.out'
            });
        }
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

// Effet de parallaxe amélioré 
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero || typeof gsap === 'undefined') return;
    
    try {
        // Gérer le déplacement de la souris
        hero.addEventListener('mousemove', e => {
            // Calculer la position relative de la souris
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            
            // Animer le contenu hero en fonction de la position de la souris
            gsap.to('.hero-content', {
                x: x * -30,
                y: y * -20,
                duration: 1,
                ease: 'power2.out'
            });
            
            // Animer les tags avec différentes profondeurs
            gsap.to('.tag-item', {
                x: x * -50,
                y: y * -30,
                rotation: x * y * 5,
                duration: 1,
                ease: 'power2.out',
                stagger: 0.05
            });
            
            // Animer les formes avec des profondeurs variées
            gsap.utils.toArray('.shape').forEach(shape => {
                const speed = shape.getAttribute('data-speed') || 0.1;
                gsap.to(shape, {
                    x: x * 100 * speed,
                    y: y * 100 * speed,
                    rotation: x * y * 20 * speed,
                    duration: 1,
                    ease: 'power2.out'
                });
            });
        });
    } catch (error) {
        console.warn('Erreur lors de l\'initialisation du parallaxe:', error);
    }
}

// Nouvelles animations style Figma
function initFigmaStyleAnimations() {
    if (typeof gsap === 'undefined') return;
    
    try {
        // Animation style Figma pour les cartes de service
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            // Animation d'entrée plus sophistiquée
            const icon = card.querySelector('.service-icon');
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            const link = card.querySelector('.service-link');
            
            // Timeline pour chaque carte
            const cardTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
            
            cardTl.fromTo(card, {
                y: 50,
                opacity: 0,
                scale: 0.9,
                borderRadius: "30px 0 30px 0"
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                borderRadius: "15px",
                duration: 0.8,
                ease: "elastic.out(1, 0.7)",
                delay: index * 0.1
            });
            
            if (icon) {
                cardTl.fromTo(icon, {
                    scale: 0.5,
                    opacity: 0,
                    rotate: -30
                }, {
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    duration: 0.7,
                    ease: "back.out(2)"
                }, "-=0.5");
                
                // Animation d'icône qui pulse et flotte légèrement
                gsap.to(icon, {
                    y: -5,
                    scale: 1.05,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
            
            // Animation séquentielle du texte
            cardTl.fromTo([title, desc, link], {
                y: 20,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.4");
            
            // Animation d'effet de survol style Figma
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                if (icon) {
                    gsap.to(icon, {
                        rotate: 5,
                        scale: 1.1,
                        duration: 0.4,
                        ease: "back.out(2)"
                    });
                }
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                    duration: 0.5,
                    ease: "power3.out"
                });
                
                if (icon) {
                    gsap.to(icon, {
                        rotate: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Animation style morphing pour les statistiques
        animateStatItems();
        
        // Animation style Figma pour les éléments de contact
        animateContactItems();
        
        // Animation style Figma pour le portfolio
        enhancePortfolioAnimations();
        
        // Animation style Figma pour les formes flottantes
        enhanceFloatingShapes();
        
        // Animation du footer style Figma
        animateFooter();
        
    } catch (error) {
        console.warn('Erreur dans les animations style Figma:', error);
    }
}

// Animation style morphing pour les statistiques
function animateStatItems() {
    const statItems = document.querySelectorAll('.stat-item');
    if (!statItems.length) return;
    
    try {
        statItems.forEach((stat, index) => {
            // Animation d'entrée avec morphing des formes
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stat,
                    start: "top 85%"
                }
            });
            
            const icon = stat.querySelector('.stat-icon');
            const number = stat.querySelector('.stat-number');
            const label = stat.querySelector('.stat-label');
            
            // Animation d'entrée avec des formes qui se transforment
            tl.fromTo(stat, {
                opacity: 0,
                scale: 0.7,
                borderRadius: "50%"
            }, {
                opacity: 1,
                scale: 1,
                borderRadius: "15px",
                duration: 0.8,
                ease: "elastic.out(1, 0.7)",
                delay: index * 0.1
            });
            
            if (icon) {
                tl.fromTo(icon, {
                    scale: 0,
                    opacity: 0,
                    rotate: 90
                }, {
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, "-=0.5");
                
                // Animation perpétuelle de l'icône
                gsap.to(icon, {
                    rotate: 360,
                    duration: 8,
                    repeat: -1,
                    ease: "linear"
                });
            }
            
            // Animation du nombre et du texte
            if (number && label) {
                tl.fromTo([number, label], {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1
                }, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power3.out"
                }, "-=0.3");
            }
            
            // Animation au survol plus élaborée
            stat.addEventListener('mouseenter', () => {
                gsap.to(stat, {
                    y: -10,
                    boxShadow: "0 15px 30px rgba(99, 102, 241, 0.3)",
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                if (icon) {
                    gsap.to(icon, {
                        scale: 1.2,
                        color: "#6366f1",
                        rotate: "+=40",
                        duration: 0.4,
                        ease: "back.out(2)"
                    });
                }
            });
            
            stat.addEventListener('mouseleave', () => {
                gsap.to(stat, {
                    y: 0,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                    duration: 0.5,
                    ease: "power3.out"
                });
                
                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        color: "",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
    } catch (error) {
        console.warn('Erreur dans les animations de statistiques:', error);
    }
}

// Animation améliorée pour les éléments de contact
function animateContactItems() {
    const contactItems = document.querySelectorAll('.contact-item');
    if (!contactItems.length) return;
    
    try {
        contactItems.forEach((item, index) => {
            const icon = item.querySelector('.contact-icon');
            const text = item.querySelector('.contact-text');
            
            // Timeline pour chaque élément de contact
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                }
            });
            
            // Animation initiale avec rebond directionnel
            tl.fromTo(item, {
                x: -50,
                opacity: 0,
                scale: 0.9
            }, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                delay: index * 0.15,
                ease: "back.out(1.7)"
            });
            
            if (icon) {
                // Animation de l'icône avec rotation
                tl.fromTo(icon, {
                    scale: 0,
                    opacity: 0,
                    rotate: -90,
                    borderRadius: "0%"
                }, {
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    borderRadius: "50%",
                    duration: 0.6,
                    ease: "elastic.out(1, 0.7)"
                }, "-=0.4");
                
                // Animation d'arrière-plan de l'icône
                tl.fromTo(icon, {
                    backgroundPosition: "0% 50%"
                }, {
                    backgroundPosition: "100% 50%",
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
            
            if (text) {
                tl.fromTo(text.children, {
                    y: 20,
                    opacity: 0
                }, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.5,
                    ease: "power3.out"
                }, "-=0.3");
            }
            
            // Animation au survol style Figma
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    y: -5,
                    scale: 1.03,
                    boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)",
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                if (icon) {
                    gsap.to(icon, {
                        scale: 1.2,
                        rotate: 15,
                        backgroundColor: "#6366f1",
                        color: "white",
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    y: 0,
                    scale: 1,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
                    duration: 0.3,
                    ease: "power3.out"
                });
                
                if (icon) {
                    gsap.to(icon, {
                        scale: 1,
                        rotate: 0,
                        backgroundColor: "",
                        color: "",
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
        
        // Animation du témoignage style Figma
        const testimonial = document.querySelector('.testimonial');
        if (testimonial) {
            const quoteIcon = testimonial.querySelector('.quote-icon');
            const quoteText = testimonial.querySelector('.quote-text');
            const author = testimonial.querySelector('.quote-author');
            
            const testimonialTl = gsap.timeline({
                scrollTrigger: {
                    trigger: testimonial,
                    start: "top 85%"
                }
            });
            
            testimonialTl.fromTo(testimonial, {
                y: 30,
                opacity: 0,
                scale: 0.95
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out"
            });
            
            if (quoteIcon) {
                testimonialTl.fromTo(quoteIcon, {
                    scale: 0,
                    opacity: 0,
                    rotate: -45
                }, {
                    scale: 1,
                    opacity: 0.2,
                    rotate: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)"
                }, "-=0.5");
                
                // Animation perpétuelle de l'icône
                gsap.to(quoteIcon, {
                    rotate: 10,
                    scale: 1.1,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
            
            if (quoteText) {
                testimonialTl.fromTo(quoteText, {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.3");
            }
            
            if (author) {
                testimonialTl.fromTo(author, {
                    opacity: 0,
                    x: -20
                }, {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power3.out"
                }, "-=0.2");
            }
            
            // Animation au survol
            testimonial.addEventListener('mouseenter', () => {
                gsap.to(testimonial, {
                    y: -5,
                    scale: 1.01,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    duration: 0.3,
                    ease: "power2.out"
                });
                
                if (quoteIcon) {
                    gsap.to(quoteIcon, {
                        scale: 1.3,
                        opacity: 0.4,
                        rotate: 15,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                }
            });
            
            testimonial.addEventListener('mouseleave', () => {
                gsap.to(testimonial, {
                    y: 0,
                    scale: 1,
                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
                    duration: 0.3,
                    ease: "power3.out"
                });
                
                if (quoteIcon) {
                    gsap.to(quoteIcon, {
                        scale: 1,
                        opacity: 0.2,
                        rotate: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        }
    } catch (error) {
        console.warn('Erreur dans les animations de contact:', error);
    }
}

// Animation améliorée pour les éléments du portfolio
function enhancePortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (!portfolioItems.length) return;
    
    try {
        // Animation des filtres du portfolio
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length) {
            gsap.fromTo(filterBtns, {
                y: 20,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: '.portfolio-filter',
                    start: "top 85%"
                }
            });
            
            // Animation du bouton actif
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const currentActive = document.querySelector('.filter-btn.active');
                    if (currentActive !== btn) {
                        gsap.to(currentActive, {
                            backgroundColor: 'transparent',
                            color: '#333',
                            scale: 1,
                            duration: 0.3
                        });
                        
                        currentActive.classList.remove('active');
                        btn.classList.add('active');
                        
                        gsap.fromTo(btn, {
                            scale: 0.9
                        }, {
                            backgroundColor: '#6366f1',
                            color: 'white',
                            scale: 1,
                            duration: 0.4,
                            ease: "back.out(1.7)"
                        });
                        
                        // Animation de filtrage des éléments
                        const filterValue = btn.getAttribute('data-filter');
                        filterPortfolioItems(filterValue);
                    }
                });
                
                // Animation au survol
                btn.addEventListener('mouseenter', () => {
                    if (!btn.classList.contains('active')) {
                        gsap.to(btn, {
                            backgroundColor: 'rgba(99, 102, 241, 0.1)',
                            scale: 1.05,
                            duration: 0.3
                        });
                    }
                });
                
                btn.addEventListener('mouseleave', () => {
                    if (!btn.classList.contains('active')) {
                        gsap.to(btn, {
                            backgroundColor: 'transparent',
                            scale: 1,
                            duration: 0.3
                        });
                    }
                });
            });
        }
        
        // Animation des éléments du portfolio
        portfolioItems.forEach((item, index) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%"
                }
            });
            
            // Animation d'entrée style Figma
            tl.fromTo(item, {
                y: 50,
                opacity: 0,
                scale: 0.9,
                rotationY: 10,
                transformOrigin: "center"
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                rotationY: 0,
                duration: 0.7,
                delay: index * 0.1,
                ease: "power3.out"
            });
            
            // Animation au survol style Figma
            item.addEventListener('mouseenter', () => {
                const overlay = item.querySelector('.portfolio-overlay');
                const img = item.querySelector('img');
                
                if (img) {
                    gsap.to(img, {
                        scale: 1.1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
                
                if (overlay) {
                    gsap.to(overlay, {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                    
                    const elements = overlay.querySelectorAll('.portfolio-category, h3, p, .portfolio-btn');
                    gsap.fromTo(elements, {
                        y: 20,
                        opacity: 0
                    }, {
                        y: 0,
                        opacity: 1,
                        stagger: 0.08,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                    });
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const overlay = item.querySelector('.portfolio-overlay');
                const img = item.querySelector('img');
                
                if (img) {
                    gsap.to(img, {
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
                
                if (overlay) {
                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.in"
                    });
                }
            });
        });
        
        // Animation CTA du portfolio
        const portfolioCta = document.querySelector('.portfolio-cta');
        if (portfolioCta) {
            gsap.fromTo(portfolioCta, {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                scrollTrigger: {
                    trigger: portfolioCta,
                    start: "top 90%"
                },
                ease: "power3.out"
            });
        }
    } catch (error) {
        console.warn('Erreur dans les animations du portfolio:', error);
    }
}

// Gestion du filtre de portfolio
function filterPortfolioItems(filter) {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            // Animation d'apparition
            gsap.fromTo(item, {
                scale: 0.8,
                opacity: 0,
                y: 20
            }, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.7)",
                onStart: () => {
                    item.style.display = 'block';
                }
            });
        } else {
            // Animation de disparition
            gsap.to(item, {
                scale: 0.8,
                opacity: 0,
                y: -20,
                duration: 0.4,
                ease: "power3.in",
                onComplete: () => {
                    item.style.display = 'none';
                }
            });
        }
    });
}

// Animation améliorée des formes flottantes
function enhanceFloatingShapes() {
    const shapes = document.querySelectorAll('.floating-shapes .shape');
    if (!shapes.length) return;
    
    try {
        shapes.forEach((shape, index) => {
            // Réinitialiser les animations précédentes
            gsap.killTweensOf(shape);
            
            // Animation initiale
            gsap.fromTo(shape, {
                opacity: 0,
                scale: 0.5,
                x: 0,
                y: 0
            }, {
                opacity: 1,
                scale: 1,
                duration: 1,
                delay: index * 0.2,
                ease: "elastic.out(1, 0.7)"
            });
            
            // Animation de mouvement complexe avec plusieurs paramètres
            const speedFactor = parseFloat(shape.getAttribute('data-speed')) || 0.5;
            const randomX = Math.random() * 100 - 50;
            const randomY = Math.random() * 60 - 30;
            
            // Timeline pour des mouvements complexes
            const moveTl = gsap.timeline({
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            
            // Animation principal avec courbe Bézier
            moveTl.to(shape, {
                motionPath: {
                    path: [
                        {x: randomX * 0.5, y: randomY * 0.8},
                        {x: randomX * 0.8, y: -randomY * 0.5},
                        {x: -randomX * 0.7, y: randomY * 0.2},
                        {x: randomX * 0.3, y: randomY * 0.9},
                        {x: 0, y: 0}
                    ],
                    autoRotate: true,
                    curviness: 2
                },
                duration: 15 + Math.random() * 10,
                repeat: -1
            });
            
            // Animation de rotation et d'échelle
            gsap.to(shape, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });
            
            gsap.to(shape, {
                scale: 0.8 + Math.random() * 0.4,
                opacity: 0.7 + Math.random() * 0.3,
                duration: 4 + Math.random() * 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            
            // Effet de blur qui varie
            gsap.to(shape, {
                filter: `blur(${Math.random() * 3 + 1}px)`,
                duration: 5 + Math.random() * 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    } catch (error) {
        console.warn('Erreur dans les animations des formes flottantes:', error);
    }
}

// Animation du footer style Figma
function animateFooter() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    try {
        // Animation d'apparition générale
        gsap.fromTo(footer, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: footer,
                start: "top bottom",
                end: "top 80%",
                scrub: 0.5
            },
            ease: "power2.out"
        });
        
        // Animation du logo
        const footerLogo = footer.querySelector('.footer-logo');
        if (footerLogo) {
            gsap.fromTo(footerLogo, {
                opacity: 0,
                y: 20,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                scrollTrigger: {
                    trigger: footer,
                    start: "top 90%"
                },
                ease: "back.out(1.7)"
            });
        }
        
        // Animation des liens de navigation
        const footerNav = footer.querySelector('.footer-nav');
        if (footerNav) {
            const navLinks = footerNav.querySelectorAll('a');
            gsap.fromTo(navLinks, {
                opacity: 0,
                x: -20
            }, {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: footerNav,
                    start: "top 90%"
                },
                ease: "power3.out"
            });
        }
        
        // Animation des icônes sociales
        const socialLinks = footer.querySelectorAll('.social-link');
        if (socialLinks.length) {
            gsap.fromTo(socialLinks, {
                opacity: 0,
                scale: 0,
                rotation: -45
            }, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                stagger: 0.1,
                duration: 0.6,
                scrollTrigger: {
                    trigger: footer.querySelector('.footer-social'),
                    start: "top 90%"
                },
                ease: "back.out(1.7)"
            });
            
            // Animation au survol des icônes sociales
            socialLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, {
                        scale: 1.2,
                        rotation: 10,
                        backgroundColor: '#6366f1',
                        color: 'white',
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });
                
                link.addEventListener('mouseleave', () => {
                    gsap.to(link, {
                        scale: 1,
                        rotation: 0,
                        backgroundColor: '',
                        color: '',
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });
        }
        
        // Animation du copyright avec effet de texte
        const copyright = footer.querySelector('.copyright');
        if (copyright) {
            gsap.fromTo(copyright, {
                opacity: 0,
                y: 10
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                scrollTrigger: {
                    trigger: copyright,
                    start: "top 95%"
                },
                ease: "power2.out"
            });
        }
    } catch (error) {
        console.warn('Erreur dans les animations du footer:', error);
    }
}

// Appeler cette fonction lors de l'initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation des animations style Figma...');
    
    try {
        // Ajouter aux animations existantes
        setTimeout(() => {
            initFigmaStyleAnimations();
        }, 500);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des animations Figma:', error);
    }
}); 