// Preloader avec animation améliorée type Figma
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Animation de chargement fluide
        gsap.to('.loader', {
            rotation: 360,
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1
        });
        
        // Animation de texte du loader
        const loaderText = document.querySelector('.loader-text');
        if (loaderText) {
            const textTimeline = gsap.timeline({repeat: -1});
            textTimeline.to(loaderText, {
                backgroundPosition: '100% 0',
                duration: 2,
                ease: "steps(10)"
            });
        }
        
        // Transition de sortie avec effet de flou
        setTimeout(() => {
            const exitTl = gsap.timeline({
                onComplete: () => {
                    preloader.style.display = 'none';
                    // Démarrer les animations d'intro
                    startIntroAnimation();
                }
            });
            
            exitTl.to(preloader, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut"
            });
        }, 2000); // Temps de chargement simulé
    } else {
        startIntroAnimation();
    }
});

// Animation d'intro améliorée (style Figma)
function startIntroAnimation() {
    // Timeline principale
    const mainTl = gsap.timeline();
    
    // Animation du titre avec effet de découpage
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Utiliser SplitType au lieu de SplitText
        const splitter = new SplitType('.hero-title', {types: 'chars, words', tagName: 'span'});
        const chars = heroTitle.querySelectorAll('.char');
        
        // Animation avancée des caractères
        mainTl.fromTo(chars, {
            opacity: 0,
            y: function() { return Math.random() * 100 - 50; },
            rotationX: function() { return Math.random() * 180 - 90; },
            scale: 0.7
        }, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            stagger: {
                each: 0.03,
                from: "random"
            },
            duration: 1.2,
            ease: 'elastic.out(1, 0.75)'
        });
    } else {
        // Fallback simple
        mainTl.fromTo('.hero-title', {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    // Animation de machine à écrire pour le sous-titre
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        typewriter.innerHTML = ''; // Clear text
        const originalText = "Création de solutions numériques sur mesure";
        typewriter.style.width = "auto";
        typewriter.style.opacity = "1";
        
        let i = 0;
        mainTl.to({}, {
            duration: 0.1,
            onComplete: function() {
                const typingTl = gsap.timeline();
                
                // Effet de saisie progressive
                function typeChar() {
                    if (i < originalText.length) {
                        typewriter.innerHTML += originalText.charAt(i);
                        i++;
                        setTimeout(typeChar, 50 + Math.random() * 40);
                    } else {
                        // Ajouter un effet de cursor
                        gsap.to(typewriter, {
                            borderColor: 'transparent',
                            duration: 0.8,
                            repeat: -1,
                            yoyo: true,
                            ease: 'power2.inOut'
                        });
                        
                        // Animer le bouton CTA
                        gsap.fromTo('.cta-button', {
                            opacity: 0,
                            y: 20,
                            scale: 0.95
                        }, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.8,
                            ease: 'back.out(1.7)'
                        });
                        
                        // Animation de l'indicateur de défilement
                        gsap.fromTo('.scroll-indicator', {
                            opacity: 0,
                            y: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            delay: 0.3,
                            ease: 'power2.out'
                        });
                    }
                }
                
                typeChar();
            }
        }, "+=0.5");
    }
    
    // Initialiser les formes flottantes avec des animations plus douces
    initFloatingShapes();
}

// Animation des formes flottantes améliorée
function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    // Formes flottantes plus organiques
    shapes.forEach((shape, index) => {
        const speed = shape.getAttribute('data-speed') || 1;
        const size = parseFloat(window.getComputedStyle(shape).width);
        const randomDuration = 5 + Math.random() * 5; // Durée aléatoire pour chaque forme
        
        // Créer une timeline unique pour chaque forme
        const shapeTl = gsap.timeline({repeat: -1, yoyo: true});
        
        // Animation de mouvement organique
        shapeTl.to(shape, {
            y: `${30 * speed * (Math.random() > 0.5 ? 1 : -1)}`,
            x: `${20 * speed * (Math.random() > 0.5 ? 1 : -1)}`,
            rotation: Math.random() * 20 - 10,
            duration: randomDuration,
            ease: 'sine.inOut'
        });
        
        // Animation de pulsation légère
        gsap.to(shape, {
            scale: 0.95 + Math.random() * 0.2,
            opacity: 0.7 + Math.random() * 0.3,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random()
        });
        
        // Ajouter des effets de flou et de rotation
        shape.style.filter = `blur(${Math.random() * 2}px)`;
        shape.style.transform = `rotate(${Math.random() * 360}deg)`;
    });
}

// Initialisation de l'effet de parallaxe avancé
function initParallax() {
    const parallaxContainer = document.querySelector('.parallax-container');
    if (parallaxContainer) {
        // Effet de profondeur 3D
        window.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.shape');
            const heroContent = document.querySelector('.hero-content');
            
            // Calculer la position relative de la souris
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            // Effet de mouvement léger sur le contenu principal
            if (heroContent) {
                gsap.to(heroContent, {
                    x: (x - 0.5) * 10,
                    y: (y - 0.5) * 10,
                    duration: 1,
                    ease: 'power1.out'
                });
            }
            
            // Effet parallaxe sur les formes avec différentes profondeurs
            shapes.forEach(shape => {
                const speed = shape.getAttribute('data-speed') || 0.05;
                const xPos = (x - 0.5) * 100 * speed;
                const yPos = (y - 0.5) * 100 * speed;
                
                gsap.to(shape, {
                    x: xPos,
                    y: yPos,
                    rotation: (x - 0.5) * 10 * speed,
                    duration: 1,
                    ease: 'power1.out'
                });
            });
        });
    }
}

// Animations au défilement améliorées (style Figma)
function initScrollAnimations() {
    // S'assurer que ScrollTrigger est enregistré
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Enregistrer explicitement ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Animer les en-têtes de section avec plus d'impact
        gsap.utils.toArray('.section-header').forEach(header => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    markers: false
                }
            });
            
            // Animation du tag avec effet rebond
            tl.fromTo(header.querySelector('.section-tag'), {
                y: 30,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: 'back.out(1.7)'
            })
            // Animation du titre avec léger effet 3D
            .fromTo(header.querySelector('.section-title'), {
                y: 40,
                opacity: 0,
                rotationX: 10
            }, {
                y: 0,
                opacity: 1,
                rotationX: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, "-=0.4")
            // Animation de la ligne avec effet élastique
            .fromTo(header.querySelector('.section-line'), {
                width: 0,
                scaleX: 0
            }, {
                width: '70px',
                scaleX: 1,
                duration: 0.8,
                ease: 'elastic.out(1, 0.75)'
            }, "-=0.4");
        });
        
        // Animation des cartes de service avec effet d'apparition séquentielle
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            const delay = card.dataset.delay || index * 0.15;
            const icon = card.querySelector('.service-icon');
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            const link = card.querySelector('.service-link');
            
            const cardTl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
            
            // Animation séquentielle des éléments internes
            cardTl.fromTo(card, {
                y: 50,
                opacity: 0,
                scale: 0.9
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: 'power2.out',
                clearProps: "transform"
            })
            .fromTo(icon, {
                y: 20,
                opacity: 0,
                scale: 0.5
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            }, "-=0.4")
            .fromTo(title, {
                y: 15,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            }, "-=0.3")
            .fromTo(desc, {
                y: 10,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            }, "-=0.2")
            .fromTo(link, {
                y: 10,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: 'power2.out'
            }, "-=0.2");
        });
        
        // Animation du portfolio avec effet de grille
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            const portfolioItems = portfolioGrid.querySelectorAll('.portfolio-item');
            
            // Animation globale de la grille
            gsap.fromTo(portfolioGrid, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: portfolioGrid,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
            
            // Animation des éléments du portfolio
            portfolioItems.forEach((item, index) => {
                const delay = 0.1 + (index * 0.08);
                
                gsap.fromTo(item, {
                    opacity: 0,
                    scale: 0.85,
                    y: 30
                }, {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.7,
                    delay: delay,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: portfolioGrid,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
                
                // Animation au survol des éléments du portfolio
                item.addEventListener('mouseenter', () => {
                    gsap.to(item.querySelector('img'), {
                        scale: 1.1,
                        duration: 0.4,
                        ease: 'power1.out'
                    });
                    
                    gsap.to(item.querySelector('.portfolio-overlay'), {
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power1.out'
                    });
                    
                    const elements = [
                        item.querySelector('.portfolio-category'),
                        item.querySelector('.portfolio-overlay h3'),
                        item.querySelector('.portfolio-overlay p'),
                        item.querySelector('.portfolio-btn')
                    ];
                    
                    elements.forEach((el, i) => {
                        if (el) {
                            gsap.to(el, {
                                y: 0,
                                opacity: 1,
                                duration: 0.4,
                                delay: i * 0.1,
                                ease: 'back.out(1.7)'
                            });
                        }
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(item.querySelector('.portfolio-overlay'), {
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power1.in'
                    });
                    
                    const elements = [
                        item.querySelector('.portfolio-category'),
                        item.querySelector('.portfolio-overlay h3'),
                        item.querySelector('.portfolio-overlay p'),
                        item.querySelector('.portfolio-btn')
                    ];
                    
                    elements.forEach((el, i) => {
                        if (el) {
                            gsap.to(el, {
                                y: i === 0 ? -20 : i === 3 ? 10 : 15 * (i - 1.5),
                                opacity: 0,
                                duration: 0.3,
                                ease: 'power1.in'
                            });
                        }
                    });
                });
            });
        }
        
        // Animation des éléments de contact
        gsap.utils.toArray('.contact-item').forEach((item, index) => {
            const delay = item.dataset.delay || index * 0.2;
            
            gsap.fromTo(item, {
                x: -50,
                opacity: 0,
                scale: 0.95
            }, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
            
            // Animation de l'icône au survol
            const icon = item.querySelector('.contact-icon');
            if (icon) {
                item.addEventListener('mouseenter', () => {
                    gsap.to(icon, {
                        rotation: 15,
                        scale: 1.1,
                        boxShadow: '0 15px 30px rgba(108, 92, 231, 0.4)',
                        duration: 0.4,
                        ease: 'back.out(1.7)'
                    });
                });
                
                item.addEventListener('mouseleave', () => {
                    gsap.to(icon, {
                        rotation: 0,
                        scale: 1,
                        boxShadow: '0 10px 20px rgba(108, 92, 231, 0.3)',
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                });
            }
        });
        
        // Animation témoignage
        const testimonial = document.querySelector('.testimonial');
        if (testimonial) {
            const testimonialTl = gsap.timeline({
                scrollTrigger: {
                    trigger: testimonial,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
            
            testimonialTl.fromTo(testimonial, {
                y: 50,
                opacity: 0,
                scale: 0.95
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out'
            })
            .fromTo(testimonial.querySelector('.quote-icon'), {
                scale: 0.5,
                opacity: 0
            }, {
                scale: 1,
                opacity: 0.2,
                duration: 0.6,
                ease: 'back.out(1.7)'
            }, "-=0.6")
            .fromTo(testimonial.querySelector('.quote-text'), {
                opacity: 0,
                y: 20
            }, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, "-=0.4")
            .fromTo(testimonial.querySelector('.quote-author'), {
                opacity: 0,
                x: -20
            }, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power2.out'
            }, "-=0.3");
        }
        
        // Animation du formulaire de contact
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const formElements = [
                contactForm.querySelector('.form-header'),
                ...contactForm.querySelectorAll('.form-group'),
                contactForm.querySelector('.submit-button')
            ];
            
            const formTl = gsap.timeline({
                scrollTrigger: {
                    trigger: contactForm,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
            
            formTl.fromTo(contactForm, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
            
            formElements.forEach((el, i) => {
                if (el) {
                    formTl.fromTo(el, {
                        opacity: 0,
                        y: 20
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.out'
                    }, `-=${i > 0 ? 0.3 : 0}`);
                }
            });
        }
        
        // Animation des compteurs statistiques
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const statItems = statsSection.querySelectorAll('.stat-item');
            
            gsap.utils.toArray('[data-animation="counter"]').forEach((counter, index) => {
                const target = parseInt(counter.getAttribute('data-target'));
                const numberElement = counter.querySelector('.stat-number');
                
                if (numberElement && target) {
                    // Animation d'apparition des éléments
                    gsap.fromTo(counter, {
                        opacity: 0,
                        y: 30
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        delay: index * 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: statsSection,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        }
                    });
                    
                    // Animation du compteur avec accélération
                    ScrollTrigger.create({
                        trigger: statsSection,
                        start: "top 85%",
                        onEnter: () => {
                            let startValue = 0;
                            let duration = 2.5;
                            
                            // Fonction d'interpolation personnalisée pour simulation d'accélération
                            const updateCounter = () => {
                                const progress = Math.min(1, elapsed / (duration * 1000));
                                // Fonction d'accélération puis décélération
                                const easedProgress = progress < 0.5 
                                    ? 4 * progress * progress * progress 
                                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                                const currentValue = Math.round(startValue + (target - startValue) * easedProgress);
                                numberElement.textContent = currentValue;
                                
                                if (progress < 1) {
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    numberElement.textContent = target;
                                }
                                
                                elapsed += 16; // Approximation de 60fps
                            };
                            
                            let elapsed = 0;
                            requestAnimationFrame(updateCounter);
                        },
                        once: true
                    });
                }
            });
        }
    } else {
        console.error("GSAP ou ScrollTrigger n'est pas disponible");
    }
}

// Filtre Portfolio amélioré avec animations fluides
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        // Animation initiale des boutons de filtre
        gsap.fromTo(filterButtons, {
            opacity: 0,
            y: 20,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(1.5)',
            scrollTrigger: {
                trigger: '.portfolio-filter',
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
        
        // Fonction pour animer les changements de filtre
        const filterPortfolio = (filterValue) => {
            const filteredItems = [];
            const hiddenItems = [];
            
            portfolioItems.forEach(item => {
                // Reset initial pour éviter les conflits d'animation
                gsap.set(item, { clearProps: "all" });
                
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    filteredItems.push(item);
                } else {
                    hiddenItems.push(item);
                }
            });
            
            // Masquer d'abord les éléments filtrés
            const hideTl = gsap.timeline({
                onComplete: () => {
                    // Puis afficher les éléments correspondants
                    gsap.to(filteredItems, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: "back.out(1.7)",
                        clearProps: "visibility"
                    });
                }
            });
            
            hideTl.to(hiddenItems, {
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                stagger: 0.02,
                ease: "power2.in",
                onComplete: () => {
                    hiddenItems.forEach(item => {
                        item.style.visibility = 'hidden';
                    });
                }
            });
        };
        
        // Gestionnaire d'événement pour les boutons de filtre
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Mettre à jour l'état actif avec animation
                const currentActive = document.querySelector('.filter-btn.active');
                
                if (currentActive !== button) {
                    // Animer le bouton actuel
                    gsap.to(currentActive, {
                        backgroundColor: 'transparent',
                        color: '#333',
                        duration: 0.3,
                        ease: 'power1.out',
                        onComplete: () => {
                            currentActive.classList.remove('active');
                        }
                    });
                    
                    // Animer le nouveau bouton actif
                    button.classList.add('active');
                    gsap.fromTo(button, {
                        scale: 0.9
                    }, {
                        scale: 1,
                        duration: 0.4,
                        ease: 'back.out(1.7)'
                    });
                    
                    // Appliquer le filtre avec animation
                    filterPortfolio(button.dataset.filter);
                }
            });
            
            // Animation au survol des boutons
            button.addEventListener('mouseenter', () => {
                if (!button.classList.contains('active')) {
                    gsap.to(button, {
                        backgroundColor: 'rgba(108, 92, 231, 0.1)',
                        scale: 1.05,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                }
            });
            
            button.addEventListener('mouseleave', () => {
                if (!button.classList.contains('active')) {
                    gsap.to(button, {
                        backgroundColor: 'transparent',
                        scale: 1,
                        duration: 0.3,
                        ease: 'power1.out'
                    });
                }
            });
        });
    }
}

// Bouton retour en haut amélioré
function initBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Variable pour suivre l'état visible
        let isVisible = false;
        
        // Observer le défilement avec des animations plus fluides
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                if (!isVisible) {
                    isVisible = true;
                    gsap.fromTo(backToTopBtn, {
                        opacity: 0,
                        y: 20,
                        scale: 0.5,
                        rotation: -90
                    }, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        duration: 0.5,
                        ease: 'back.out(1.7)',
                        onStart: () => {
                            backToTopBtn.style.visibility = 'visible';
                        }
                    });
                }
            } else {
                if (isVisible) {
                    isVisible = false;
                    gsap.to(backToTopBtn, {
                        opacity: 0,
                        y: 20,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            backToTopBtn.style.visibility = 'hidden';
                        }
                    });
                }
            }
        });
        
        // Animation au survol
        backToTopBtn.addEventListener('mouseenter', () => {
            gsap.to(backToTopBtn, {
                backgroundColor: '#a29bfe',
                boxShadow: '0 15px 30px rgba(108, 92, 231, 0.6)',
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(backToTopBtn.querySelector('svg'), {
                y: -3,
                duration: 0.5,
                ease: 'back.out(1.7)',
                repeat: 1,
                yoyo: true
            });
        });
        
        backToTopBtn.addEventListener('mouseleave', () => {
            gsap.to(backToTopBtn, {
                backgroundColor: '',
                boxShadow: '',
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Animation de défilement fluide jusqu'en haut
        backToTopBtn.addEventListener('click', () => {
            // Animation du bouton au clic
            gsap.to(backToTopBtn, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
            
            // Défilement fluide vers le haut
            gsap.to(window, {
                duration: 1.5, 
                scrollTo: {
                    y: 0,
                    autoKill: false
                },
                ease: "power4.inOut"
            });
        });
    }
}

// Menu mobile avec animation avancée
function initMobileMenu() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (burger && navLinks) {
        const menuTl = gsap.timeline({ paused: true });
        
        // Animation d'ouverture du menu
        menuTl.to(navLinks, {
            x: 0,
            duration: 0.6,
            ease: 'power3.out'
        });
        
        // Animation séquentielle des liens de navigation
        menuTl.fromTo(navItems, {
            x: 50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.4,
            ease: 'back.out(1.7)'
        }, "-=0.3");
        
        // Toggle du menu avec animation des lignes du burger
        burger.addEventListener('click', () => {
            burger.classList.toggle('toggle');
            
            if (navLinks.classList.contains('active')) {
                // Fermer le menu
                navLinks.classList.remove('active');
                gsap.to(navLinks, {
                    x: '100%',
                    duration: 0.6,
                    ease: 'power3.inOut'
                });
            } else {
                // Ouvrir le menu
                navLinks.classList.add('active');
                menuTl.restart();
            }
        });
        
        // Fermer le menu au clic sur un lien
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    burger.classList.remove('toggle');
                    navLinks.classList.remove('active');
                    gsap.to(navLinks, {
                        x: '100%',
                        duration: 0.6,
                        ease: 'power3.inOut'
                    });
                }
            });
        });
    }
}

// Amélioration du défilement fluide
function initSmoothScrolling() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Défiler avec une courbe d'accélération naturelle
                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 70,
                        autoKill: false
                    },
                    ease: "expo.out"
                });
                
                // Ajouter l'URL à l'historique
                window.history.pushState(null, null, targetId);
            }
        });
    });
}

// Animation des champs du formulaire
function initFormAnimations() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        // Animation des étiquettes au focus
        input.addEventListener('focus', () => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                gsap.to(label, {
                    y: -5,
                    color: '#6c5ce7',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            
            // Animation du champ lui-même
            gsap.to(input, {
                borderColor: '#6c5ce7',
                boxShadow: '0 0 0 4px rgba(108, 92, 231, 0.1)',
                y: -3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Retour à l'état initial au blur
        input.addEventListener('blur', () => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (input.value === '') {
                    gsap.to(label, {
                        y: 0,
                        color: '#333',
                        fontSize: '1rem',
                        fontWeight: '500',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(label, {
                        color: '#333',
                        duration: 0.3
                    });
                }
            }
            
            // Animation du champ au blur
            if (input.value === '') {
                gsap.to(input, {
                    borderColor: '#ddd',
                    boxShadow: 'none',
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(input, {
                    borderColor: '#6c5ce7',
                    boxShadow: 'none',
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Animation de soumission du formulaire avec retour visuel
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animer le bouton de soumission
            const submitButton = this.querySelector('.submit-button');
            if (submitButton) {
                gsap.timeline()
                    .to(submitButton, {
                        scale: 0.95,
                        duration: 0.1,
                        ease: 'power1.in'
                    })
                    .to(submitButton, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'back.out(2)'
                    });
            }
            
            // Collecter les données du formulaire
            const formData = new FormData(this);
            const formEntries = Object.fromEntries(formData.entries());
            
            // Simuler l'envoi du formulaire
            console.log('Données du formulaire:', formEntries);
            
            // Animation de succès
            const successTl = gsap.timeline();
            
            // Désactiver les champs pendant l'animation
            formInputs.forEach(input => {
                input.disabled = true;
            });
            
            // Animation du formulaire
            successTl.to(contactForm, {
                y: -10,
                opacity: 0.7,
                duration: 0.3,
                ease: 'power2.in'
            })
            .to(contactForm, {
                y: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out'
            })
            .set(contactForm, {
                height: contactForm.offsetHeight,
                overflow: 'hidden'
            })
            .fromTo('<div class="form-success"><div class="success-icon"><i class="fas fa-check-circle"></i></div><h3>Message envoyé!</h3><p>Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p><button class="reset-btn">Envoyer un autre message</button></div>', {
                opacity: 0,
                y: 30,
                scale: 0.9
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
                onComplete: () => {
                    // Ajouter la div au DOM
                    const successEl = document.querySelector('.form-success');
                    if (successEl) {
                        // Gestionnaire pour réinitialiser le formulaire
                        const resetBtn = successEl.querySelector('.reset-btn');
                        if (resetBtn) {
                            resetBtn.addEventListener('click', () => {
                                // Animation inverse
                                gsap.timeline()
                                    .to(successEl, {
                                        opacity: 0,
                                        y: -30,
                                        duration: 0.3,
                                        ease: 'power2.in',
                                        onComplete: () => {
                                            successEl.remove();
                                        }
                                    })
                                    .to(contactForm, {
                                        height: 'auto',
                                        opacity: 1,
                                        duration: 0.5,
                                        ease: 'power2.out',
                                        onComplete: () => {
                                            // Réactiver les champs
                                            formInputs.forEach(input => {
                                                input.disabled = false;
                                            });
                                            contactForm.reset();
                                        }
                                    });
                            });
                        }
                    }
                }
            });
            
            // Insérer le message de succès dans le DOM
            const successElement = document.createElement('div');
            successElement.className = 'form-success';
            successElement.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Message envoyé!</h3>
                <p>Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
                <button class="reset-btn">Envoyer un autre message</button>
            `;
            
            // Styles CSS pour l'élément de succès
            successElement.style.display = 'flex';
            successElement.style.flexDirection = 'column';
            successElement.style.alignItems = 'center';
            successElement.style.justifyContent = 'center';
            successElement.style.textAlign = 'center';
            successElement.style.position = 'absolute';
            successElement.style.top = '50%';
            successElement.style.left = '50%';
            successElement.style.transform = 'translate(-50%, -50%)';
            successElement.style.width = '100%';
            successElement.style.padding = '2rem';
            
            // Attendre la fin de l'animation pour insérer
            setTimeout(() => {
                contactForm.parentNode.insertBefore(successElement, contactForm);
                contactForm.style.visibility = 'hidden';
            }, 600);
        });
    }
}

// Initialisation des animations de fond avancées
function initAdvancedEffects() {
    // Effet de particules flottantes (simulation légère)
    const shapes = document.querySelectorAll('.shape');
    
    // Suivre la position de la souris pour les effets d'attraction
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation fluide des formes avec "attraction" vers le curseur
    shapes.forEach((shape, index) => {
        const speed = shape.getAttribute('data-speed') || Math.random() * 0.1;
        let x = 0;
        let y = 0;
        let vx = Math.random() * 2 - 1;
        let vy = Math.random() * 2 - 1;
        
        function animateParticle() {
            // Distance par rapport à la souris
            const dx = mouseX - (shape.getBoundingClientRect().left + shape.offsetWidth / 2);
            const dy = mouseY - (shape.getBoundingClientRect().top + shape.offsetHeight / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Effet d'attraction si proche de la souris
            if (distance < 300) {
                const attraction = (1 - distance / 300) * 0.05;
                vx += dx * attraction;
                vy += dy * attraction;
            }
            
            // Amortissement et limite de vitesse
            vx *= 0.95;
            vy *= 0.95;
            const maxSpeed = 2;
            if (Math.abs(vx) > maxSpeed) vx = maxSpeed * Math.sign(vx);
            if (Math.abs(vy) > maxSpeed) vy = maxSpeed * Math.sign(vy);
            
            // Mettre à jour la position
            x += vx;
            y += vy;
            
            // Limites de l'écran avec rebond
            const rect = shape.getBoundingClientRect();
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - rect.height;
            
            if (x < 0 || x > maxX) {
                vx *= -0.5;
                x = x < 0 ? 0 : maxX;
            }
            
            if (y < 0 || y > maxY) {
                vy *= -0.5;
                y = y < 0 ? 0 : maxY;
            }
            
            // Appliquer la position avec une transformation pour de meilleures performances
            gsap.set(shape, {
                xPercent: x / maxX * 100,
                yPercent: y / maxY * 100,
                rotation: x + y
            });
            
            requestAnimationFrame(animateParticle);
        }
        
        // Démarrer l'animation
        animateParticle();
    });
}

// Gestion des animations Lottie
function initLottieAnimations() {
    // Sélectionner tous les éléments Lottie pour ajouter des interactions
    const lottieElements = document.querySelectorAll('lottie-player');
    
    // Parcourir tous les éléments Lottie
    lottieElements.forEach(lottie => {
        try {
            // S'assurer que l'animation est chargée
            if (!lottie.isLoaded) {
                lottie.addEventListener('ready', () => {
                    setupLottieInteraction(lottie);
                });
            } else {
                setupLottieInteraction(lottie);
            }
        } catch (error) {
            console.error("Erreur avec l'animation Lottie:", error);
        }
    });
    
    // Animation spéciale pour le logo
    const logoLottie = document.querySelector('.lottie-logo');
    if (logoLottie) {
        const logoContainer = logoLottie.closest('.logo-container');
        if (logoContainer) {
            logoContainer.addEventListener('mouseenter', () => {
                try {
                    logoLottie.setDirection(1);
                    logoLottie.play();
                    logoLottie.setSpeed(1.5);
                } catch (error) {
                    console.warn("Erreur d'animation du logo au survol:", error);
                }
            });
            
            logoContainer.addEventListener('mouseleave', () => {
                try {
                    logoLottie.setDirection(-1);
                    logoLottie.play();
                    logoLottie.setSpeed(2);
                } catch (error) {
                    console.warn("Erreur d'animation du logo à la sortie:", error);
                }
            });
        }
    }
}

// Fonction auxiliaire pour configurer les interactions Lottie
function setupLottieInteraction(lottie) {
    try {
        // Détection de la classe pour appliquer les interactions appropriées
        if (lottie.classList.contains('lottie-contact-icon')) {
            // Animations au survol pour les icônes de contact
            const parentItem = lottie.closest('.contact-item');
            if (parentItem) {
                parentItem.addEventListener('mouseenter', () => {
                    try {
                        lottie.setDirection(1);
                        lottie.play();
                        lottie.setSpeed(1.5);
                    } catch (error) {
                        console.warn("Erreur d'animation au survol:", error);
                    }
                });
                
                parentItem.addEventListener('mouseleave', () => {
                    try {
                        lottie.setDirection(-1);
                        lottie.play();
                        lottie.setSpeed(2);
                    } catch (error) {
                        console.warn("Erreur d'animation à la sortie:", error);
                    }
                });
            }
        } else if (lottie.classList.contains('lottie-social-icon')) {
            // Animations au survol pour les icônes sociales
            const parentLink = lottie.closest('.social-link');
            if (parentLink) {
                parentLink.addEventListener('mouseenter', () => {
                    try {
                        lottie.setDirection(1);
                        lottie.play();
                        lottie.setSpeed(1.5);
                    } catch (error) {
                        console.warn("Erreur d'animation au survol:", error);
                    }
                });
                
                parentLink.addEventListener('mouseleave', () => {
                    try {
                        lottie.setDirection(-1);
                        lottie.play();
                        lottie.setSpeed(2);
                    } catch (error) {
                        console.warn("Erreur d'animation à la sortie:", error);
                    }
                });
            }
        } else if (lottie.classList.contains('lottie-icon')) {
            // Animations au survol pour les icônes de service
            const parentCard = lottie.closest('.service-card');
            if (parentCard) {
                parentCard.addEventListener('mouseenter', () => {
                    try {
                        lottie.setDirection(1);
                        lottie.play();
                        lottie.setSpeed(1.5);
                    } catch (error) {
                        console.warn("Erreur d'animation au survol:", error);
                    }
                });
                
                parentCard.addEventListener('mouseleave', () => {
                    try {
                        // Reprendre l'animation normale
                        lottie.setDirection(1);
                        lottie.setSpeed(1);
                    } catch (error) {
                        console.warn("Erreur d'animation à la sortie:", error);
                    }
                });
            }
        } else if (lottie.classList.contains('lottie-back-top')) {
            // Animation au survol pour le bouton retour en haut
            const backBtn = lottie.closest('.back-to-top');
            if (backBtn) {
                backBtn.addEventListener('mouseenter', () => {
                    try {
                        lottie.setDirection(1);
                        lottie.play();
                        lottie.setSpeed(1.5);
                    } catch (error) {
                        console.warn("Erreur d'animation au survol:", error);
                    }
                });
                
                backBtn.addEventListener('mouseleave', () => {
                    try {
                        lottie.setDirection(-1);
                        lottie.play();
                        lottie.setSpeed(2);
                    } catch (error) {
                        console.warn("Erreur d'animation à la sortie:", error);
                    }
                });
            }
        }
    } catch (error) {
        console.error("Erreur lors de la configuration de l'interaction Lottie:", error);
    }
}

// Initialisation principale avec gestion des erreurs
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialiser GSAP et ses plugins
        if (typeof gsap !== 'undefined') {
            if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
            if (typeof TextPlugin !== 'undefined') gsap.registerPlugin(TextPlugin);
            if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
        } else {
            console.warn('GSAP non disponible - les animations sont désactivées');
        }
        
        // Fix: Initialiser les animations de base immédiatement 
        initBasicAnimations();
        
        // Vérifier si le préchargeur existe
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.add('loaded');
                    // Lancer les animations d'intro immédiatement 
                    initIntroAnimations();
                }, 500);
            }, 1000);
        } else {
            document.body.classList.add('loaded');
            initIntroAnimations();
        }
        
        // Initialiser les autres fonctionnalités
        initScrollBasedAnimations();
        initBackToTopButton();
        initMobileMenu();
        initSmoothScroll();
        initPortfolioFilter();
        initContactForm();
        initLottieFallbacks();
        
    } catch (error) {
        console.error('Erreur d\'initialisation:', error);
    }
});

// Fournir des valeurs par défaut pour les animations dès le début
function initBasicAnimations() {
    try {
        // Forcer l'affichage des éléments critiques
        const criticalElements = [
            '.hero-title', 
            '.hero-content',
            '.typewriter', 
            '.badge',
            '.cta-button', 
            '.section-header',
            '.service-card', 
            '.portfolio-item', 
            '.contact-item', 
            '.stat-item',
            '.testimonial',
            '.contact-form'
        ];
        
        criticalElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el) {
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                    el.style.visibility = 'visible';
                }
            });
        });
    } catch (error) {
        console.warn('Erreur initBasicAnimations:', error);
    }
}

// Animation d'intro simplifiée et robuste
function initIntroAnimations() {
    try {
        // Animation du titre principal
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'none';
        }
        
        // Animation de la description
        const typewriter = document.querySelector('.typewriter');
        if (typewriter) {
            typewriter.style.opacity = '1';
            
            const typewriterText = typewriter.textContent;
            if (typeof gsap !== 'undefined' && typeof TextPlugin !== 'undefined') {
                typewriter.textContent = '';
                gsap.to(typewriter, {
                    duration: 2,
                    text: typewriterText,
                    ease: "none",
                    delay: 0.5
                });
            }
        }
        
        // Animation badge
        const badge = document.querySelector('.badge');
        if (badge) {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }
        
        // Bouton CTA
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.style.opacity = '1';
            ctaButton.style.transform = 'none';
        }
        
        // Indication de défilement
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateY(0)';
        }
        
        // Initialiser les formes flottantes de manière plus simple
        initFloatingShapes();
    } catch (error) {
        console.warn('Erreur initIntroAnimations:', error);
    }
}

// Initialisation des formes flottantes avec des styles
function initFloatingShapes() {
    try {
        const shapes = document.querySelectorAll('.shape');
        if (shapes.length === 0) return;
        
        shapes.forEach((shape, index) => {
            // Position aléatoire
            const randomX = Math.floor(Math.random() * 60) - 30;
            const randomY = Math.floor(Math.random() * 60) - 30;
            
            // Appliquer les propriétés directement avec des styles
            shape.style.opacity = '1';
            shape.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
            
            // Animation simple avec des classes CSS
            shape.classList.add('animated-shape');
        });
    } catch (error) {
        console.warn('Erreur initFloatingShapes:', error);
    }
}

// Animations des éléments au scroll avec IntersectionObserver
function initScrollBasedAnimations() {
    try {
        // Vérifier si IntersectionObserver est supporté
        if (!('IntersectionObserver' in window)) {
            // Fallback: montrer tous les éléments
            const animElements = document.querySelectorAll('[data-animation]');
            animElements.forEach(el => el.style.opacity = '1');
            return;
        }
        
        // Configuration de l'observateur
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        // Créer l'observateur
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ajouter une classe visible
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    
                    // Arrêter d'observer cet élément
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observer les éléments avec attribut data-animation
        const animElements = document.querySelectorAll('[data-animation]');
        animElements.forEach(el => observer.observe(el));
        
        // Animation des compteurs
        initCounters();
    } catch (error) {
        console.warn('Erreur initScrollBasedAnimations:', error);
    }
}

// Animation des compteurs
function initCounters() {
    try {
        const counterElements = document.querySelectorAll('[data-target]');
        if (counterElements.length === 0) return;
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target) || 0;
                    let count = 0;
                    const duration = 2000; // ms
                    const increment = Math.ceil(target / (duration / 33)); // ~30 fps
                    
                    const counter = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            el.textContent = target;
                            clearInterval(counter);
                        } else {
                            el.textContent = count;
                        }
                    }, 33);
                    
                    counterObserver.unobserve(el);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counterElements.forEach(el => counterObserver.observe(el));
    } catch (error) {
        console.warn('Erreur initCounters:', error);
    }
}

// Filtrage des éléments du portfolio simplifié
function initPortfolioFilter() {
    try {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (filterButtons.length === 0 || portfolioItems.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Gestion de l'état actif
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filtrage simple
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    } catch (error) {
        console.warn('Erreur initPortfolioFilter:', error);
    }
}

// Bouton de retour en haut
function initBackToTopButton() {
    try {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } catch (error) {
        console.warn('Erreur initBackToTopButton:', error);
    }
}

// Menu mobile simplifié
function initMobileMenu() {
    try {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-item');
        
        if (!burger || !navLinks) return;
        
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
        
        // Fermer le menu au clic sur un lien
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    } catch (error) {
        console.warn('Erreur initMobileMenu:', error);
    }
}

// Défilement fluide pour les liens d'ancrage
function initSmoothScroll() {
    try {
        const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 70; // Offset pour la navigation fixe
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    } catch (error) {
        console.warn('Erreur initSmoothScroll:', error);
    }
}

// Formulaire de contact
function initContactForm() {
    try {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'envoi du formulaire
            const submitButton = form.querySelector('button[type="submit"]');
            if (!submitButton) return;
            
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Envoi en cours...</span>';
            submitButton.disabled = true;
            
            // Simuler un délai
            setTimeout(() => {
                submitButton.innerHTML = '<span>Envoyé avec succès!</span>';
                submitButton.classList.add('success');
                form.reset();
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('success');
                }, 3000);
            }, 1500);
        });
    } catch (error) {
        console.warn('Erreur initContactForm:', error);
    }
}

// Remplacer les Lottie non chargés par des fallbacks
function initLottieFallbacks() {
    try {
        document.querySelectorAll('lottie-player').forEach(player => {
            // Créer un élément de fallback
            const fallback = document.createElement('div');
            const className = player.className;
            fallback.className = className + ' lottie-fallback';
            
            // Définir l'icône en fonction de la classe
            if (className.includes('lottie-icon')) {
                fallback.innerHTML = '⚙️';
            } else if (className.includes('lottie-contact-icon')) {
                fallback.innerHTML = '📧';
            } else if (className.includes('lottie-stat-icon')) {
                fallback.innerHTML = '📊';
            } else if (className.includes('lottie-social-icon')) {
                fallback.innerHTML = '🔗';
            } else if (className.includes('lottie-logo')) {
                fallback.innerHTML = '🚀';
            } else if (className.includes('lottie-back-top')) {
                fallback.innerHTML = '↑';
            } else {
                fallback.innerHTML = '✨';
            }
            
            // Si player n'est pas défini correctement, le remplacer
            if (!player.shadowRoot || player.hasAttribute('error')) {
                player.parentNode.replaceChild(fallback, player);
            }
        });
    } catch (error) {
        console.warn('Erreur initLottieFallbacks:', error);
    }
} 