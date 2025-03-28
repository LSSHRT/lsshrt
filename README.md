# LSSHRT - Portfolio Interactif avec Animations Avancées

Un site web portfolio moderne et interactif présentant mes services de développement avec des animations avancées inspirées de Figma, intégrant GSAP pour des transitions fluides et des effets visuels spectaculaires.

## Fonctionnalités

- Design moderne avec animations avancées GSAP
- Curseur personnalisé et interactif
- Animations au défilement avec ScrollTrigger
- Filtrage dynamique du portfolio
- Effet de machine à écrire et transitions fluides
- Formes flottantes animées et effets parallax
- Entièrement responsive
- Optimisé pour le SEO

## Animations et Effets

- **Préchargeur animé** : Animation de chargement fluide au démarrage
- **Curseur personnalisé** : Curseur qui réagit au survol des éléments interactifs
- **Effet machine à écrire** : Animation de texte simulant la frappe
- **Formes flottantes** : Éléments de design qui se déplacent en arrière-plan
- **Animations au défilement** : Les éléments apparaissent avec style lors du défilement
- **Hover effects** : Effets au survol sur les services, projets et boutons
- **Filtrage animé** : Transition douce lors du filtrage des projets
- **Vagues animées** : Footer avec effet de vagues en SVG

## Technologies utilisées

- HTML5/CSS3
- JavaScript ES6+
- GSAP (GreenSock Animation Platform)
- ScrollTrigger
- TextPlugin
- ScrollToPlugin

## Structure du projet

```
.
├── index.html          # Page principale
├── styles.css          # Feuille de style CSS
├── script.js           # JavaScript pour les animations et fonctionnalités
├── images/             # Dossier pour les images
│   ├── hero-bg.jpg     # Image d'arrière-plan de la section héros
│   ├── project1.jpg    # Images de portfolio
│   └── ...
├── README.md           # Ce fichier
└── LICENSE             # Licence du projet
```

## Installation

1. Clonez ce dépôt sur votre machine locale :
   ```
   git clone https://github.com/votre-username/lsshrt.git
   ```

2. Assurez-vous d'avoir le dossier `images` avec les images nécessaires :
   - `hero-bg.jpg` (image d'arrière-plan pour la section héros)
   - `project1.jpg`, `project2.jpg`, `project3.jpg`, `project4.jpg` (images pour le portfolio)

3. Ouvrez `index.html` dans votre navigateur pour voir le site.

## Personnalisation

Vous pouvez facilement personnaliser ce site en modifiant les fichiers suivants :

- `index.html` : Modifiez le contenu, les titres, les descriptions, etc.
- `styles.css` : Changez les couleurs, les polices, les espacements, etc.
- `script.js` : Modifiez les animations ou ajoutez de nouvelles fonctionnalités.

### Variables CSS

Le site utilise des variables CSS pour faciliter la personnalisation :

```css
:root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --dark-color: #2d3436;
    --light-color: #ffffff;
    --gradient: linear-gradient(135deg, #6c5ce7, #a29bfe);
}
```

## Animations GSAP

### Animation d'introduction
```javascript
gsap.to('.hero-title', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
});
```

### Animation au défilement
```javascript
gsap.utils.toArray('.service-card').forEach((card, index) => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%"
        },
        y: 0,
        opacity: 1,
        delay: index * 0.2,
        duration: 0.7
    });
});
```

## Déploiement sur GitHub Pages

1. Créez un dépôt GitHub pour votre site.

2. Initialisez le dépôt Git dans votre dossier local et poussez les fichiers :
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-username/lsshrt.git
   git push -u origin main
   ```

3. Activez GitHub Pages dans les paramètres du dépôt :
   - Allez dans l'onglet "Settings" de votre dépôt
   - Faites défiler jusqu'à la section "GitHub Pages"
   - Dans Source, sélectionnez la branche "main" et dossier "/ (root)"
   - Cliquez sur "Save"

4. Votre site sera disponible à l'adresse `https://votre-username.github.io/lsshrt/`

## Ajouter un nom de domaine personnalisé

1. Achetez un nom de domaine auprès d'un registraire (Namecheap, OVH, etc.)

2. Dans les paramètres GitHub Pages, configurez votre domaine personnalisé.

3. Chez votre registraire, configurez les DNS avec un enregistrement CNAME ou des enregistrements A pointant vers GitHub Pages.

## Performance et Optimisation

Le site est optimisé pour une performance maximale :

- Animations GSAP optimisées pour ne pas alourdir le navigateur
- Chargement asynchrone des scripts JS
- Images optimisées pour un chargement rapide
- CSS minifié et structuré efficacement

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter :
- Email : votre-email@exemple.com
- Discord : lsshrt#0000
- GitHub : github.com/votre-username 