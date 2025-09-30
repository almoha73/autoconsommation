// Presentation Navigation and Q&A System
class PresentationManager {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 18;
        this.slides = [];
        this.qaData = {};
        
        this.init();
    }

    init() {
        this.createAllSlides();
        this.setupNavigation();
        this.setupQA();
        this.setupKeyboardNavigation();
        this.updateProgress();
        this.populateQAData();
    }

    createAllSlides() {
        const slidesContainer = document.querySelector('.slides-container');
        const slidesData = this.getSlidesData();
        
        // Clear existing slides except the first 5 we already have
        const existingSlides = slidesContainer.querySelectorAll('.slide');
        for (let i = 5; i < existingSlides.length; i++) {
            existingSlides[i].remove();
        }
        
        // Create remaining slides
        for (let i = 6; i <= this.totalSlides; i++) {
            const slideData = slidesData[i - 1];
            const slideElement = this.createSlideElement(i, slideData);
            slidesContainer.appendChild(slideElement);
        }
        
        this.slides = document.querySelectorAll('.slide');
        this.setupSlideDots();
    }

    createSlideElement(slideNumber, data) {
        const slide = document.createElement('section');
        slide.className = 'slide';
        slide.setAttribute('data-slide', slideNumber);
        
        slide.innerHTML = `
            <div class="slide-content">
                <h1 class="slide-title">${data.title}</h1>
                ${this.generateSlideContent(data)}
            </div>
        `;
        
        return slide;
    }

    generateSlideContent(data) {
        if (data.points && data.points.length > 0) {
            return `
                <div class="slide-points">
                    ${data.points.map(point => `
                        <div class="point">
                            <span class="icon">${point.icon}</span>
                            <span>${point.text}</span>
                        </div>
                    `).join('')}
                </div>
                ${data.illustration ? `<div class="slide-illustration">${data.illustration}</div>` : ''}
            `;
        } else if (data.content) {
            return `<div class="slide-content-custom">${data.content}</div>`;
        } else {
            return `<div class="slide-illustration">${data.illustration || ''}</div>`;
        }
    }

    getSlidesData() {
        return [
            // Slides 1-5 already exist in HTML, so we start from slide 6
            {}, {}, {}, {}, {},
            
            // Slide 6
            {
                title: "Les différents usages de la production",
                points: [
                    { icon: "🚫", text: "Autoconsommation totale : Le client s'engage à ne rien ré-injecter" },
                    { icon: "⚡", text: "Autoconsommation partielle : Le cas le plus courant ! Surplus vendu ou stocké" },
                    { icon: "📊", text: "Injection totale : Supprimée pour ≤9 kWc depuis mars 2025" }
                ],
                speech: "Nous avons trois modes d'utilisation. L'autoconsommation totale convient aux petites installations où tout est consommé sur place. L'autoconsommation partielle est le choix le plus judicieux : vous consommez en priorité, et le surplus génère des revenus complémentaires. L'injection totale, où toute la production était vendue, n'est plus proposée pour les petites installations depuis mars 2025 - l'État privilégie maintenant l'autoconsommation."
            },
            
            // Slide 7
            {
                title: "Que Faire du Surplus ?",
                points: [
                    { icon: "💰", text: "Le surplus d'énergie solaire est valorisé" },
                    { icon: "🔌", text: "Vendre le surplus d'électricité au réseau" },
                    { icon: "🔋", text: "Stocker l'énergie pour usage ultérieur" },
                    { icon: "📈", text: "Rentabiliser l'installation solaire" }
                ],
                speech: "Votre surplus, c'est de l'argent ! Deux options s'offrent à vous : la vente immédiate à EDF OA au tarif garanti de 0,04 €/kWh, ou le stockage sur batterie pour une utilisation nocturne. Le stockage augmente votre autonomie mais représente un investissement supplémentaire. La vente, elle, génère un revenu passif de 40 à 80 euros par an pour une installation de 3 kWc. L'objectif : zéro gaspillage énergétique !"
            },
            
            // Slide 8
            {
                title: "Parcours Administratif Simplifié",
                points: [
                    { icon: "📋", text: "Demande préalable de raccordement nécessaire" },
                    { icon: "🏛️", text: "Obtenir toutes les autorisations d'urbanisme" },
                    { icon: "👷", text: "Choisir un installateur qualifié RGE" },
                    { icon: "📄", text: "Déposer une déclaration complète de votre installation" }
                ],
                speech: "Rassurez-vous, les démarches sont aujourd'hui largement simplifiées ! En 2 à 4 mois maximum, votre projet aboutit. D'abord, l'autorisation d'urbanisme en mairie - souvent un simple formulaire. Puis, votre installateur RGE se charge des démarches techniques avec Enedis. Enfin, la validation Consuel assure la conformité électrique. Votre installateur vous accompagne à chaque étape, vous n'êtes jamais seul dans ce parcours."
            },
            
            // Slide 9
            {
                title: "Acteurs clés du projet",
                content: `
                    <div class="actors-grid">
                        <div class="actor-card">
                            <div class="actor-icon">🏛️</div>
                            <h3>MAIRIE</h3>
                            <p>Autorisation d'Urbanisme</p>
                        </div>
                        <div class="actor-card">
                            <div class="actor-icon">⚡</div>
                            <h3>ENEDIS</h3>
                            <p>Gestionnaire du Réseau</p>
                        </div>
                        <div class="actor-card">
                            <div class="actor-icon">🔒</div>
                            <h3>CONSUEL</h3>
                            <p>Contrôleur de la Sécurité</p>
                        </div>
                    </div>
                `,
                speech: "Trois acteurs publics veillent à la réussite de votre projet. La mairie valide l'aspect esthétique et urbanistique - ils sont de plus en plus favorables au solaire ! Enedis, le gestionnaire du réseau, assure l'intégration technique en toute sécurité. Consuel certifie que l'installation respecte les normes électriques les plus strictes. Ces trois gardiens garantissent un projet sûr, légal et durable."
            },
            
            // Slide 10
            {
                title: "MAIRIE",
                points: [
                    { icon: "📋", text: "Déclaration Préalable de Travaux (DP) pour installations sur toit" },
                    { icon: "📏", text: "Pour installations au sol >3 kWc ou >1,80m de haut" },
                    { icon: "⏱️", text: "Délai d'instruction : 1 mois" },
                    { icon: "✅", text: "Exception : kits au sol <3 kWc et <1,80m = aucune démarche" }
                ],
                speech: "La mairie, votre premier interlocuteur. Pour la plupart d'entre vous avec une installation sur toiture, il suffit d'une Déclaration Préalable - un formulaire gratuit, traité en 1 mois maximum. Silence de l'administration = acceptation ! Les petits kits de jardin bénéficient d'une totale liberté. Même dans les centres historiques, des solutions esthétiques existent. Les mentalités ont évolué : le solaire fait partie du paysage urbain de demain."
            },
            
            // Slide 11
            {
                title: "Déclarer à Enedis",
                points: [
                    { icon: "📄", text: "Convention d'Autoconsommation Sans Injection (CACSI)" },
                    { icon: "🔌", text: "Contrat de Raccordement complet (CRAE)" },
                    { icon: "💰", text: "Bénéficier des aides avec votre contrat CRAE" }
                ],
                speech: "Enedis, votre partenaire technique incontournable. Si vous ne vendez rien, la CACSI suffit - c'est gratuit et simple. Pour vendre votre surplus et toucher les aides, le CRAE s'impose. Enedis installe gratuitement le compteur Linky bidirectionnel, véritable cerveau de votre installation. Leur expertise garantit une intégration parfaite au réseau électrique national. Leur mission : votre sécurité et votre raccordement optimal."
            },
            
            // Slide 12
            {
                title: "CONSUEL",
                points: [
                    { icon: "🔍", text: "Validation de la conformité électrique" },
                    { icon: "⚡", text: "Obligatoire pour injection réseau ou >3 kWc" },
                    { icon: "📋", text: "L'installateur remplit une attestation technique" },
                    { icon: "✅", text: "Un inspecteur valide la conformité" }
                ],
                speech: "Consuel, le garant de votre sécurité électrique. Cet organisme indépendant vérifie que votre installation respecte scrupuleusement la norme NF C15-100. L'inspection, menée par un expert qualifié, contrôle chaque connexion, chaque protection. C'est votre assurance vie électrique ! Sans ce précieux sésame, impossible de bénéficier des aides ou de vendre votre surplus. Consuel, c'est 40 ans d'expertise au service de votre tranquillité."
            },
            
            // Slide 13
            {
                title: "Mise en Service Enedis",
                points: [
                    { icon: "📱", text: "Activation à distance avec Linky" },
                    { icon: "🔄", text: "Remplacement de l'ancien compteur si nécessaire" },
                    { icon: "🆓", text: "Mise en place gratuite" },
                    { icon: "💳", text: "Coût pris en charge par le TURPE" }
                ],
                speech: "La dernière ligne droite ! Une fois Consuel validé, Enedis active votre installation à distance - la magie du compteur Linky. Si vous n'en avez pas encore, ils l'installent gratuitement lors du raccordement. En quelques clics depuis leur centre de contrôle, votre maison devient productrice d'énergie. Le TURPE, cette petite ligne sur votre facture, finance cette révolution technologique. Votre transition énergétique commence maintenant !"
            },
            
            // Slide 14
            {
                title: "Aides et Incitations 2025",
                points: [
                    { icon: "🎯", text: "L'État encourage l'autoconsommation solaire" },
                    { icon: "💰", text: "Prime autoconsommation : 80 €/kWc pour ≤9 kWc (Q3 2025)" },
                    { icon: "📊", text: "Tarif d'achat surplus garanti 20 ans : 0,04 €/kWh" },
                    { icon: "🏆", text: "Versement en une fois pour les petites installations" }
                ],
                speech: "2025 : l'année de l'accélération solaire ! L'État mise tout sur l'autoconsommation avec des aides revalorisées. Pour une installation de 3 kWc, comptez 240 euros de prime versée en une fois - fini l'étalement sur 5 ans ! Le tarif d'achat de 0,04 €/kWh peut paraître modeste, mais il est garanti 20 ans - une sécurité inégalée. Ces dispositifs transforment l'investissement solaire en placement rentable et sûr."
            },
            
            // Slide 15
            {
                title: "Exemple Concret d'Aides",
                content: `
                    <div class="example-card">
                        <h3>Installation 3 kWc</h3>
                        <div class="calculation">
                            <div class="calc-line">
                                <span>Prime autoconsommation :</span>
                                <span class="amount">240 €</span>
                            </div>
                            <div class="calc-line">
                                <span>Revenus surplus annuels :</span>
                                <span class="amount">40-80 €</span>
                            </div>
                            <div class="calc-line">
                                <span>Économies facture annuelles :</span>
                                <span class="amount">300-600 €</span>
                            </div>
                            <div class="calc-total">
                                <span>Retour sur investissement :</span>
                                <span class="amount">7-10 ans</span>
                            </div>
                        </div>
                    </div>
                `,
                speech: "Voici un exemple concret pour une installation de 3 kWc - la plus populaire. La prime de 240 euros allège immédiatement l'investissement. Les revenus de surplus, bien que modestes, s'accumulent sur 20 ans. Mais l'essentiel, ce sont vos économies directes : 300 à 600 euros par an d'électricité gratuite ! Résultat : un retour sur investissement en 7 à 10 ans, puis 15 ans de profits purs. Un placement que votre banquier vous envierait !"
            },
            
            // Slide 16
            {
                title: "TVA et Fiscalité Solaire",
                points: [
                    { icon: "📉", text: "TVA 5,5% pour ≤9 kWc avec critères environnementaux (dès octobre 2025)" },
                    { icon: "🏠", text: "TVA 10% pour ≤3 kWc, logement >2 ans et installateur RGE" },
                    { icon: "📊", text: "TVA 20% par défaut pour les autres cas" },
                    { icon: "🌱", text: "Critères : panneaux bas carbone + système de gestion énergie" }
                ],
                speech: "Révolution fiscale en octobre 2025 ! La TVA chute à 5,5% pour les installations exemplaires : panneaux bas carbone et système de gestion énergétique intégré. Cette mesure récompense les choix éco-responsables et pousse l'industrie vers l'excellence environnementale. Pour les installations classiques de moins de 3 kWc, la TVA reste à 10% - déjà très favorable. Cette politique fiscale rend le solaire accessible au plus grand nombre."
            },
            
            // Slide 17
            {
                title: "Fiscalité vente électricité",
                points: [
                    { icon: "🆓", text: "Exonération d'impôt pour revenus de surplus ≤3 kWc" },
                    { icon: "📋", text: "Déclaration en BIC pour >3 kWc, souvent exonéré si <305 €/an" },
                    { icon: "🚫", text: "Pas de CSG/CRDS pour particuliers" },
                    { icon: "💼", text: "Régime fiscal ultra-simplifié" }
                ],
                speech: "Excellente nouvelle fiscale ! Pour la majorité d'entre vous avec des installations de 3 kWc ou moins, vos revenus solaires sont totalement exonérés d'impôt - aucune déclaration, aucun calcul compliqué. Pour les installations plus importantes, même si une déclaration est requise, les revenus restent souvent exonérés grâce aux seuils généreux. L'État a voulu un régime ultra-simplifié : produire de l'énergie verte ne doit pas être un casse-tête administratif !"
            },
            
            // Slide 18
            {
                title: "Merci ! Questions ?",
                content: `
                    <div class="conclusion-content">
                        <div class="summary-stats">
                            <div class="stat">
                                <div class="stat-number">7-10 ans</div>
                                <div class="stat-label">Retour sur investissement</div>
                            </div>
                            <div class="stat">
                                <div class="stat-number">50%</div>
                                <div class="stat-label">Réduction facture</div>
                            </div>
                            <div class="stat">
                                <div class="stat-number">25 ans</div>
                                <div class="stat-label">Durée de vie garantie</div>
                            </div>
                        </div>
                        <div class="cta-message">
                            <h3>L'avenir énergétique commence sur votre toit !</h3>
                            <p>Contactez-nous pour un devis personnalisé en 2025</p>
                        </div>
                    </div>
                `,
                speech: "Nous voici au terme de notre voyage dans l'univers solaire ! L'autoconsommation n'est plus une utopie, c'est une réalité accessible, rentable et responsable. En 2025, toutes les conditions sont réunies : aides attractives, démarches simplifiées, technologies matures. Votre toit recèle un potentiel énergétique et financier considérable. L'avenir appartient aux prosumers - ces citoyens qui produisent leur propre énergie. Alors, prêts à rejoindre la révolution solaire ?"
            }
        ];
    }

    setupNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.addEventListener('click', () => this.previousSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.updateNavigationButtons();
    }

    setupSlideDots() {
        const dotsContainer = document.getElementById('slide-dots');
        dotsContainer.innerHTML = '';
        
        for (let i = 1; i <= this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === this.currentSlide ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides);
                    break;
            }
        });
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    goToSlide(slideNumber) {
        if (slideNumber < 1 || slideNumber > this.totalSlides) return;
        
        // Remove active class from current slide
        const currentSlideElement = document.querySelector('.slide.active');
        if (currentSlideElement) {
            currentSlideElement.classList.remove('active');
        }
        
        // Add active class to new slide
        const newSlideElement = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (newSlideElement) {
            newSlideElement.classList.add('active');
        }
        
        this.currentSlide = slideNumber;
        this.updateProgress();
        this.updateNavigationButtons();
        this.updateSlideDots();
        this.updateQAForCurrentSlide();
    }

    updateProgress() {
        const progress = document.getElementById('progress');
        const currentSlideSpan = document.getElementById('current-slide');
        
        const percentage = (this.currentSlide / this.totalSlides) * 100;
        progress.style.width = `${percentage}%`;
        currentSlideSpan.textContent = this.currentSlide;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.disabled = this.currentSlide === 1;
        nextBtn.disabled = this.currentSlide === this.totalSlides;
    }

    updateSlideDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === this.currentSlide);
        });
    }

    setupQA() {
        const qaToggle = document.getElementById('qa-toggle');
        const qaPanel = document.getElementById('qa-panel');
        
        qaToggle.addEventListener('click', () => {
            qaPanel.classList.toggle('open');
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!qaPanel.contains(e.target) && !qaToggle.contains(e.target)) {
                qaPanel.classList.remove('open');
            }
        });
    }

    populateQAData() {
        this.qaData = {
            1: {
                title: "Autoconsommation ?",
                questions: [
                    {
                        q: "Qu'est-ce que l'autoconsommation solaire exactement ?",
                        a: "L'autoconsommation solaire consiste à produire de l'électricité via des panneaux photovoltaïques et à la consommer directement chez soi. C'est devenir à la fois producteur et consommateur d'énergie verte - un 'prosumer'. Le surplus peut être stocké ou vendu au réseau électrique."
                    },
                    {
                        q: "Est-ce rentable en France en 2025 ?",
                        a: "Absolument ! Avec la prime à l'autoconsommation de 80 €/kWc et la TVA réduite à 5,5% dès octobre 2025, le retour sur investissement se situe entre 7 et 10 ans. Ensuite, vous bénéficiez de 15 à 20 ans d'électricité quasi-gratuite."
                    },
                    {
                        q: "Puis-je installer ça moi-même ?",
                        a: "Pour bénéficier des aides et garantir la sécurité, faites appel à un installateur RGE. Les kits DIY existent pour de petites puissances mais nécessitent une déclaration et vérification de conformité."
                    },
                    {
                        q: "Ça marche partout en France ?",
                        a: "Oui ! Même dans le Nord grâce à la diffusion lumineuse. L'efficacité est optimale au Sud, mais les aides nationales s'appliquent partout."
                    }
                ]
            },
            2: {
                title: "Produire Vert",
                questions: [
                    {
                        q: "Combien puis-je économiser sur ma facture ?",
                        a: "Pour une installation de 3 kWc, vous réduisez votre facture de 30 à 50% annuellement, soit environ 300 à 600 € par an, selon votre consommation et l'ensoleillement local."
                    },
                    {
                        q: "Quels sont les impacts environnementaux ?",
                        a: "Les panneaux produisent de l'énergie verte sans émissions pendant leur fonctionnement. Leur impact de fabrication est compensé en 2-3 ans d'utilisation. Les nouveaux critères TVA 5,5% favorisent les panneaux bas carbone."
                    },
                    {
                        q: "Quelle autonomie puis-je atteindre ?",
                        a: "Avec batterie : 50-70% d'autonomie. Sans batterie : 30-40%. Le reste vient du réseau électrique traditionnel."
                    },
                    {
                        q: "Y a-t-il des subventions pour démarrer ?",
                        a: "Oui ! En Q3 2025, prime de 80 €/kWc pour ≤9 kWc, versée en une fois. Plus la TVA réduite et aides locales possibles."
                    }
                ]
            },
            3: {
                title: "Comprendre l'Autoconsommation",
                questions: [
                    {
                        q: "Comment fonctionne techniquement un panneau solaire ?",
                        a: "Les cellules photovoltaïques convertissent la lumière en courant continu, transformé en courant alternatif par un onduleur pour alimenter vos appareils ou être injecté au réseau."
                    },
                    {
                        q: "Que se passe-t-il la nuit ou par mauvais temps ?",
                        a: "Le réseau public prend automatiquement le relais. Avec une batterie, vous stockez l'énergie diurne pour usage nocturne."
                    },
                    {
                        q: "Ai-je besoin d'un compteur spécifique ?",
                        a: "Oui, un compteur Linky installé gratuitement par Enedis pour mesurer production et consommation bidirectionnelles."
                    },
                    {
                        q: "Compatible avec tous types de logements ?",
                        a: "Oui ! Maisons individuelles, appartements avec toits collectifs ou balcons (kits <1 kWc). Vérifiez les règles de copropriété."
                    }
                ]
            },
            4: {
                title: "Avantages de l'Autoconsommation",
                questions: [
                    {
                        q: "Réduire la facture de moitié, est-ce réaliste ?",
                        a: "Oui ! Pour une famille avec 3-6 kWc, en autoconsommant 30-50% de la production. Optimisez en utilisant vos appareils pendant la journée."
                    },
                    {
                        q: "Comment revendre le surplus ?",
                        a: "Via un contrat EDF OA à 0,04 €/kWh (Q3 2025) pour ≤9 kWc, garanti 20 ans. Simple et automatique."
                    },
                    {
                        q: "Impact sur la valeur immobilière ?",
                        a: "Une installation solaire peut augmenter la valeur de 3-5% selon des études, attirant les acheteurs éco-responsables."
                    },
                    {
                        q: "Y a-t-il des inconvénients fiscaux ?",
                        a: "Aucun ! Revenus de vente surplus ≤3 kWc exonérés d'impôt. Au-delà, souvent exonérés si <305 €/an."
                    }
                ]
            },
            5: {
                title: "Taux d'autoconsommation et d'autoproduction",
                questions: [
                    {
                        q: "Comment calculer mon taux d'autoconsommation ?",
                        a: "Production solaire consommée ÷ production totale. Utilisez l'app Enedis ou un système de gestion énergétique pour le suivre en temps réel."
                    },
                    {
                        q: "Peut-on atteindre 100% d'autoproduction ?",
                        a: "Difficile sans batterie et surdimensionnement, car la production est intermittente. Avec stockage, on vise 70-90% en été."
                    },
                    {
                        q: "Quels facteurs influencent ces taux ?",
                        a: "Orientation (sud idéal), inclinaison (30-35°), habitudes de consommation diurne, et présence d'une batterie de stockage."
                    },
                    {
                        q: "Comment améliorer ces taux ?",
                        a: "Programmez vos appareils (lave-linge, charge VE) pendant les pics de production, ou ajoutez un stockage virtuel via certains fournisseurs."
                    }
                ]
            },
            6: {
                title: "Les différents usages de la production",
                questions: [
                    {
                        q: "Différence entre autoconsommation totale et partielle ?",
                        a: "Totale : pas d'injection, tout consommé ou stocké. Partielle : surplus injecté et vendu. La partielle est plus rentable avec les primes actuelles."
                    },
                    {
                        q: "Puis-je passer d'un mode à l'autre ?",
                        a: "Oui, via modification du contrat Enedis, mais nécessite nouvelle déclaration et potentiellement un Consuel."
                    },
                    {
                        q: "Injection totale encore possible ?",
                        a: "Oui pour >9 kWc, mais supprimée pour ≤9 kWc depuis mars 2025. On privilégie maintenant l'autoconsommation avec vente surplus."
                    },
                    {
                        q: "Faut-il une batterie pour l'autoconsommation totale ?",
                        a: "Recommandé pour éviter les pertes, mais pas obligatoire si votre consommation correspond bien à la production diurne."
                    }
                ]
            },
            7: {
                title: "Que Faire du Surplus ?",
                questions: [
                    {
                        q: "Combien gagne-t-on en vendant le surplus ?",
                        a: "En Q3 2025 : 0,04 €/kWh via EDF OA pour ≤9 kWc. Pour 1000-2000 kWh/an de surplus sur 3 kWc, soit 40-80 €/an."
                    },
                    {
                        q: "Quelles batteries recommandez-vous ?",
                        a: "Batteries lithium-ion comme Tesla Powerwall (10-13 kWh, ~10000 €), avec garantie 10-15 ans. Ou solutions françaises comme Socomec."
                    },
                    {
                        q: "Coûts du stockage ?",
                        a: "5000-15000 € selon capacité, mais inclus dans la prime autoconsommation si intégré dès l'installation."
                    },
                    {
                        q: "Impact fiscal du surplus vendu ?",
                        a: "Exonéré d'impôt si ≤3 kWc. Sinon, déclaré en BIC mais souvent exonéré si revenus modestes (<305 €/an)."
                    }
                ]
            },
            8: {
                title: "Parcours Administratif Simplifié",
                questions: [
                    {
                        q: "Combien de temps prend le parcours administratif ?",
                        a: "2-4 mois en moyenne : 1 mois pour l'urbanisme en mairie, 1-2 mois pour Enedis et Consuel. Votre installateur RGE vous accompagne."
                    },
                    {
                        q: "Qu'est-ce qu'un installateur RGE ?",
                        a: "Reconnu Garant de l'Environnement, certifié pour les énergies renouvelables. Obligatoire pour bénéficier des aides. Vérifiez sur france-renov.gouv.fr."
                    },
                    {
                        q: "Documents nécessaires ?",
                        a: "Plan d'implantation, photos du toit, fiche technique des panneaux, formulaire Cerfa pour la mairie. Votre installateur prépare le dossier."
                    },
                    {
                        q: "Y a-t-il des frais administratifs ?",
                        a: "Non pour la déclaration urbanisme. Raccordement Enedis gratuit pour petites puissances. Consuel ~150-200 € souvent inclus par l'installateur."
                    }
                ]
            },
            9: {
                title: "Acteurs clés du projet",
                questions: [
                    {
                        q: "Pourquoi impliquer ces trois acteurs ?",
                        a: "Mairie pour conformité urbanistique, Enedis pour intégration réseau sécurisée, Consuel pour respect de la norme NF C15-100. Chacun garantit un aspect essentiel."
                    },
                    {
                        q: "Puis-je contourner l'un d'eux ?",
                        a: "Non pour installations >1 kWc. Sans eux, pas d'aides, pas de légalité, pas de sécurité. Ils sont vos alliés, pas des obstacles."
                    },
                    {
                        q: "Comment les contacter ?",
                        a: "Mairie : directement au service urbanisme. Enedis : enedis.fr/raccordement. Consuel : consuel.com. Votre installateur RGE gère souvent ces contacts."
                    },
                    {
                        q: "Rôle d'EDF dans tout ça ?",
                        a: "EDF OA gère uniquement l'achat du surplus électrique. Enedis s'occupe de tout l'aspect technique et raccordement réseau."
                    }
                ]
            },
            10: {
                title: "MAIRIE",
                questions: [
                    {
                        q: "Quand ai-je besoin d'une Déclaration Préalable ?",
                        a: "Pour toute installation visible sur toiture, sauf kits au sol <3 kWc et <1,80m de hauteur qui sont libres de démarches."
                    },
                    {
                        q: "Délai de réponse de la mairie ?",
                        a: "1 mois maximum. Silence de l'administration = acceptation tacite. Vous pouvez commencer les travaux sans réponse explicite."
                    },
                    {
                        q: "Coûts pour la Déclaration Préalable ?",
                        a: "Totalement gratuit ! Juste le formulaire Cerfa 13703 à remplir et déposer. Aucun frais de dossier."
                    },
                    {
                        q: "Et si je suis en zone classée ?",
                        a: "Consultez l'Architecte des Bâtiments de France. Solutions esthétiques possibles : panneaux intégrés au bâti, tuiles solaires..."
                    }
                ]
            },
            11: {
                title: "Déclarer à Enedis",
                questions: [
                    {
                        q: "Différence entre CACSI et CRAE ?",
                        a: "CACSI pour autoconsommation pure (gratuit, simple). CRAE pour vente surplus (inclut comptage bidirectionnel et accès aux aides)."
                    },
                    {
                        q: "Délai de traitement Enedis ?",
                        a: "1-2 mois après déclaration complète, avec étude technique personnalisée de votre raccordement."
                    },
                    {
                        q: "Frais de raccordement ?",
                        a: "Gratuit pour puissances <36 kVA en autoconsommation ! C'est inclus dans le TURPE que vous payez déjà sur votre facture."
                    },
                    {
                        q: "Puis-je changer de contrat plus tard ?",
                        a: "Oui, via demande de modification à Enedis. Possible de passer de CACSI à CRAE si vous voulez vendre votre surplus."
                    }
                ]
            },
            12: {
                title: "CONSUEL",
                questions: [
                    {
                        q: "Quand le Consuel est-il obligatoire ?",
                        a: "Pour toute injection réseau ou installation >3 kWc. En dessous sans injection, une auto-attestation de l'installateur suffit."
                    },
                    {
                        q: "Coût de l'inspection Consuel ?",
                        a: "Environ 150-200 €, souvent inclus dans le devis global de votre installateur RGE. Ne négociez pas sur cette sécurité !"
                    },
                    {
                        q: "Délai d'intervention ?",
                        a: "2-4 semaines après demande. L'inspection dure 1-2h sur site pour vérifier chaque point de sécurité."
                    },
                    {
                        q: "Que vérifie exactement l'inspecteur ?",
                        a: "Conformité NF C15-100, qualité du câblage, protections surtensions, mise à la terre, étiquetage... Votre sécurité électrique totale."
                    }
                ]
            },
            13: {
                title: "Mise en Service Enedis",
                questions: [
                    {
                        q: "Linky est-il vraiment obligatoire ?",
                        a: "Oui pour l'autoconsommation avec injection, car il mesure les flux bidirectionnels. Impossible de vendre votre surplus sans Linky."
                    },
                    {
                        q: "Temps pour la mise en service ?",
                        a: "1-2 semaines après validation Consuel. Activation à distance en quelques clics depuis le centre de contrôle Enedis."
                    },
                    {
                        q: "C'est vraiment gratuit ?",
                        a: "Oui ! Financé par le TURPE (tarif d'utilisation du réseau) que vous payez déjà. Aucun surcoût pour devenir producteur."
                    },
                    {
                        q: "Problèmes possibles ?",
                        a: "Très rares. Vérifiez juste la compatibilité onduleur-Linky avec votre installateur. Les équipements modernes sont tous compatibles."
                    }
                ]
            },
            14: {
                title: "Aides et Incitations 2025",
                questions: [
                    {
                        q: "Montant exact de la prime en 2025 ?",
                        a: "Q3 2025 : 80 €/kWc pour ≤9 kWc (ex: 240 € pour 3 kWc), versée en une fois. 180 €/kWc pour 9-36 kWc, étalée sur 5 ans."
                    },
                    {
                        q: "Tarif d'achat du surplus garanti ?",
                        a: "0,04 €/kWh garanti 20 ans pour ≤9 kWc, avec plafond de 1600h de production par kWc installé par an."
                    },
                    {
                        q: "Autres aides disponibles ?",
                        a: "MaPrimeRénov' dans certains cas, éco-PTZ, aides régionales (jusqu'à 1000 € dans certaines régions), TVA réduite."
                    },
                    {
                        q: "Conditions d'éligibilité strictes ?",
                        a: "Installateur RGE obligatoire, raccordement Enedis, panneaux certifiés. La date de demande complète détermine le montant des aides."
                    }
                ]
            },
            15: {
                title: "Exemple Concret d'Aides",
                questions: [
                    {
                        q: "Comment demander concrètement la prime ?",
                        a: "Votre installateur RGE dépose la demande sur edf-oa.fr après mise en service. Vous n'avez rien à faire, c'est automatique !"
                    },
                    {
                        q: "Délai de versement de la prime ?",
                        a: "1-3 mois après validation du dossier complet. Versement en une fois sur votre compte pour les installations ≤9 kWc."
                    },
                    {
                        q: "Cumulable avec d'autres aides ?",
                        a: "Oui ! Prime + TVA réduite + aides locales + éco-PTZ dans certains cas. Votre installateur optimise le cumul pour vous."
                    },
                    {
                        q: "Pour les entreprises, c'est pareil ?",
                        a: "Aides similaires mais via appels d'offres CRE pour >100 kWc. Pour <100 kWc, même dispositif que les particuliers."
                    }
                ]
            },
            16: {
                title: "TVA et Fiscalité Solaire",
                questions: [
                    {
                        q: "Critères précis pour TVA 5,5% en 2025 ?",
                        a: "Dès octobre 2025, pour ≤9 kWc : panneaux bas carbone (<550 kg CO2/kWc) + système de gestion énergétique intégré + installateur RGE."
                    },
                    {
                        q: "Comment prouver les critères environnementaux ?",
                        a: "Certificats fabricants des panneaux + attestation installateur sur le système de gestion. Votre installateur RGE s'occupe des justificatifs."
                    },
                    {
                        q: "TVA appliquée sur quoi exactement ?",
                        a: "Main-d'œuvre ET matériel pour l'installation complète : panneaux, onduleurs, câblage, pose, raccordement, mise en service."
                    },
                    {
                        q: "Pour les batteries aussi ?",
                        a: "Oui si intégrées à l'installation solaire dès l'origine. Ajout ultérieur = TVA 20% sur la batterie seule."
                    }
                ]
            },
            17: {
                title: "Fiscalité vente électricité",
                questions: [
                    {
                        q: "Dois-je vraiment déclarer les revenus ?",
                        a: "Oui sur votre déclaration annuelle, mais exonérés totalement si ≤3 kWc. Case spécifique 'revenus photovoltaïques' dans la déclaration."
                    },
                    {
                        q: "Taxation pour installations >3 kWc ?",
                        a: "Déclarés en BIC (Bénéfices Industriels et Commerciaux), mais souvent exonérés via régime micro-entreprise si <305 €/an de revenus."
                    },
                    {
                        q: "CSG/CRDS s'appliquent ?",
                        a: "Non pour les particuliers en autoconsommation ! Contrairement aux revenus locatifs, les revenus photovoltaïques en sont exempts."
                    },
                    {
                        q: "Impact sur quotient familial ?",
                        a: "Aucun impact pour ≤3 kWc. Pour >3 kWc, revenus généralement si faibles qu'impact négligeable sur l'impôt global."
                    }
                ]
            },
            18: {
                title: "Conclusion & Questions",
                questions: [
                    {
                        q: "Coût total réel pour installation type ?",
                        a: "8000-12000 € pour 3 kWc avant aides, soit 5000-8000 € net après prime 240 € et TVA réduite. Financement possible sur 10-15 ans."
                    },
                    {
                        q: "Garanties des panneaux ?",
                        a: "25 ans sur la production (garantie de rendement), 10-12 ans sur le produit (garantie constructeur). Onduleurs : 5-10 ans extensible."
                    },
                    {
                        q: "Évolutions à venir ?",
                        a: "TVA 5,5% généralisée dès octobre 2025, renforcement normes éco, développement stockage virtuel, smart grids communautaires."
                    },
                    {
                        q: "Où trouver un installateur fiable ?",
                        a: "Annuaire officiel sur france-renov.gouv.fr, photovoltaique.info, ou QualiPV. Exigez plusieurs devis, vérifiez assurances et références."
                    },
                    {
                        q: "Rentabilité si je suis locataire ?",
                        a: "Possible avec accord propriétaire écrit. Kits de balcon <1 kWc autorisés. Aides limitées mais économies immédiates sur factures."
                    }
                ]
            }
        };
    }

    updateQAForCurrentSlide() {
        const qaContent = document.getElementById('qa-content');
        const slideQA = this.qaData[this.currentSlide];
        
        if (slideQA) {
            qaContent.innerHTML = `
                <div class="qa-section">
                    <h4>Questions pour : ${slideQA.title}</h4>
                    ${slideQA.questions.map(item => `
                        <div class="qa-item">
                            <div class="qa-question">Q: ${item.q}</div>
                            <div class="qa-answer">R: ${item.a}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            qaContent.innerHTML = `
                <div class="qa-section">
                    <h4>Aucune question spécifique pour cette slide</h4>
                    <p>Utilisez les flèches pour naviguer vers d'autres slides avec des Q&A détaillées.</p>
                </div>
            `;
        }
        
        // Update speaker notes based on current slide
        this.updateSpeakerNotes();
    }

    updateSpeakerNotes() {
        let speakerNotesDiv = document.getElementById('speaker-notes-global');
        if (!speakerNotesDiv) {
            // Create the global speaker notes div if it doesn't exist
            speakerNotesDiv = document.createElement('div');
            speakerNotesDiv.id = 'speaker-notes-global';
            speakerNotesDiv.className = 'speaker-notes';
            document.querySelector('.presentation-container').appendChild(speakerNotesDiv);
        }
        
        const slidesData = this.getSlidesData();
        const currentSlideData = slidesData[this.currentSlide - 1];
        
        if (currentSlideData && currentSlideData.speech) {
            speakerNotesDiv.innerHTML = `
                <h3>Notes du présentateur :</h3>
                <p>${currentSlideData.speech}</p>
            `;
        } else {
            // Default speaker notes for the first 5 slides that are hardcoded
            const defaultNotes = {
                1: "Bonjour et bienvenue ! Aujourd'hui, nous explorons l'autoconsommation solaire - une révolution énergétique à portée de toit. Imaginez transformer votre maison en mini-centrale électrique, réduire drastiquement vos factures tout en contribuant à un avenir plus vert. L'autoconsommation, c'est simplement produire et consommer sa propre énergie grâce au soleil. Prêts à découvrir comment votre toit peut devenir votre meilleur investissement ?",
                2: "Voici les quatre piliers de l'autoconsommation solaire. Premier point : vous devenez producteur et consommateur - un 'prosumer'. Deuxième avantage majeur : vos économies peuvent atteindre 300 à 600 euros par an. Troisième bénéfice : chaque kWh produit évite l'émission de CO2. Enfin, l'autonomie énergétique vous protège des fluctuations tarifaires. C'est un investissement intelligent qui allie écologie et économie.",
                3: "Le principe est d'une simplicité géniale. Vos panneaux captent la lumière et la transforment en électricité. Cette énergie alimente en priorité vos appareils : frigo, éclairage, ordinateur. Si vous produisez plus que vous consommez, l'excédent peut être stocké ou revendu. À l'inverse, si vos besoins dépassent la production, le réseau électrique traditionnel prend automatiquement le relais. Vous restez connecté au réseau pour une sécurité totale.",
                4: "Les bénéfices sont multiples et concrets. Diviser votre facture par deux n'est pas un slogan, c'est une réalité pour de nombreux foyers équipés. L'indépendance énergétique vous protège des hausses tarifaires futures. Sur le plan environnemental, une installation de 3 kWc évite l'émission de 1,5 tonne de CO2 par an - l'équivalent de planter 15 arbres ! Enfin, votre bien immobilier gagne en attractivité : les acheteurs recherchent de plus en plus ces maisons 'énergétiquement autonomes'.",
                5: "Ces deux indicateurs sont cruciaux pour optimiser votre installation. L'autoconsommation mesure quelle part de votre production vous utilisez réellement. 30% est une moyenne correcte, mais on peut atteindre 50-60% en adaptant ses habitudes : faire tourner le lave-linge en journée, programmer le chauffe-eau pendant les pics de production. L'autoproduction indique votre niveau d'indépendance. Avec une batterie de stockage, vous pouvez doubler ce taux et atteindre 40-50% d'autonomie."
            };
            
            if (defaultNotes[this.currentSlide]) {
                speakerNotesDiv.innerHTML = `
                    <h3>Notes du présentateur :</h3>
                    <p>${defaultNotes[this.currentSlide]}</p>
                `;
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PresentationManager();
});

// Add CSS for dynamically created elements
const additionalCSS = `
    .actors-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        margin-top: 2rem;
    }
    
    .actor-card {
        background: rgba(255, 255, 255, 0.9);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }
    
    .actor-card:hover {
        transform: translateY(-5px);
    }
    
    .actor-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .actor-card h3 {
        color: var(--primary-purple);
        margin-bottom: 0.5rem;
    }
    
    .example-card {
        background: rgba(255, 255, 255, 0.95);
        padding: 3rem;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        margin: 0 auto;
    }
    
    .example-card h3 {
        color: var(--primary-purple);
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.8rem;
    }
    
    .calc-line {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .calc-total {
        display: flex;
        justify-content: space-between;
        margin-top: 1.5rem;
        padding: 1rem 0;
        border-top: 2px solid var(--primary-purple);
        font-weight: bold;
        font-size: 1.1rem;
    }
    
    .amount {
        color: var(--primary-purple);
        font-weight: bold;
    }
    
    .conclusion-content {
        text-align: center;
    }
    
    .summary-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 3rem;
    }
    
    .stat {
        background: rgba(255, 255, 255, 0.9);
        padding: 2rem;
        border-radius: 15px;
        min-width: 150px;
    }
    
    .stat-number {
        font-size: 2.5rem;
        font-weight: bold;
        color: var(--primary-purple);
        margin-bottom: 0.5rem;
    }
    
    .stat-label {
        color: var(--charcoal);
        font-size: 0.9rem;
    }
    
    .cta-message {
        background: var(--gradient-secondary);
        padding: 2rem;
        border-radius: 20px;
        color: var(--charcoal);
    }
    
    .cta-message h3 {
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);