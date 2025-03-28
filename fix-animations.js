/**
 * Script de correction pour les animations
 * S'exécute immédiatement avant le chargement complet de la page
 * pour garantir la visibilité des éléments critiques
 */

// Fonction auto-exécutée pour éviter les conflits de noms
(function() {
    // Assurer que les éléments clés sont visibles dès le début
    function fixCriticalElements() {
        // Liste des sélecteurs d'éléments critiques
        const criticalElements = [
            '.hero-title',
            '.hero-content',
            '.typewriter',
            '.badge',
            '.cta-button',
            '.section-header',
            '.service-card',
            '.portfolio-item'
        ];
        
        // Appliquer les styles de visibilité
        criticalElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            if (elements.length) {
                elements.forEach(el => {
                    if (el) {
                        el.style.opacity = '1';
                        el.style.visibility = 'visible';
                        el.style.transform = 'none';
                    }
                });
            }
        });
        
        // Assurer spécifiquement que le titre est visible et correctement stylé
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.display = 'block';
            heroTitle.style.color = 'white';
            heroTitle.style.opacity = '1';
            heroTitle.style.visibility = 'visible';
            heroTitle.style.transform = 'none';
        }
        
        // Désactiver les animations problématiques si nécessaire
        const html = document.documentElement;
        if (html && !html.classList.contains('js-fixed')) {
            html.classList.add('js-fixed');
        }
    }
    
    // Exécuter immédiatement pour éviter le FOUC
    fixCriticalElements();
    
    // Ré-exécuter lorsque le DOM est chargé
    document.addEventListener('DOMContentLoaded', fixCriticalElements);
    
    // Intercepter les erreurs GSAP qui pourraient affecter la visibilité
    window.addEventListener('error', function(event) {
        // Si l'erreur concerne GSAP, s'assurer que les éléments restent visibles
        if (event.filename && (
            event.filename.includes('gsap') || 
            event.message.includes('gsap') || 
            event.message.includes('SplitType')
        )) {
            console.warn('Erreur GSAP interceptée, correction appliquée:', event.message);
            fixCriticalElements();
        }
    }, true);
    
    // S'assurer que tout reste visible après le chargement complet
    window.addEventListener('load', function() {
        fixCriticalElements();
        
        // Masquer le préchargeur
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
        
        // Ajouter la classe loaded
        document.body.classList.add('loaded');
        document.body.classList.remove('loading');
    });
})(); 