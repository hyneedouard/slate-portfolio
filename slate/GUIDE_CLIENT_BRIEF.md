# 📋 GUIDE COMPLET : RECUEILLIR LES INFOS CLIENTS POUR CRÉER LEUR SITE

Ce guide vous aide à poser les **bonnes questions** et à obtenir **toutes les informations nécessaires** pour créer le site web du client efficacement avec l'aide de l'IA.

---

## 🎯 OBJECTIFS DU BRIEF CLIENT

1. **Comprendre le projet** en profondeur
2. **Éviter les allers-retours** inutiles
3. **Avoir toutes les infos** pour travailler avec l'IA
4. **Gagner du temps** sur le développement

---

## 📞 ÉTAPE 1 : PREMIER CONTACT (APPEL OU EMAIL)

### ✅ Questions à poser lors du premier échange

#### 1.1 Informations générales
- ✓ Nom complet du client
- ✓ Entreprise/Projet
- ✓ Secteur d'activité
- ✓ Email + Téléphone

#### 1.2 Le projet en 3 questions clés

**Question 1 : Quel est l'objectif principal du site ?**
- Exemples de réponses attendues :
  - ☐ Présenter mon activité (site vitrine)
  - ☐ Vendre des produits/services
  - ☐ Générer des leads/contacts
  - ☐ Portfolio/présentation de travaux
  - ☐ Blog/Magazine
  - ☐ Application web interactive

**Question 2 : Qui est votre cible (visiteurs du site) ?**
- Exemples :
  - ☐ Particuliers (B2C)
  - ☐ Entreprises (B2B)
  - ☐ Recruteurs
  - ☐ Grand public
  - ☐ Niche spécifique (préciser)

**Question 3 : Avez-vous des sites d'inspiration ?**
- Demandez 2-3 URLs de sites qu'ils aiment
- Demandez CE QU'ILS AIMENT sur ces sites (design, fonctionnalités, etc.)

---

## 📊 ÉTAPE 2 : BRIEF DÉTAILLÉ (QUESTIONNAIRE STRUCTURÉ)

### 2.1 STRUCTURE DU SITE

**Combien de pages souhaitez-vous ?**
- [ ] 1 page (Landing Page)
- [ ] 3-5 pages (Site vitrine)
- [ ] 6-10 pages (Site complexe)
- [ ] Plus de 10 pages

**Quelles pages sont nécessaires ? (Exemples)**
- [ ] Accueil
- [ ] À propos / Qui sommes-nous
- [ ] Services / Produits
- [ ] Portfolio / Réalisations
- [ ] Témoignages / Avis clients
- [ ] Blog
- [ ] Contact
- [ ] Autres (préciser) : _______

---

### 2.2 FONCTIONNALITÉS REQUISES

**Cochez les fonctionnalités nécessaires :**

#### Navigation & Interaction
- [ ] Menu de navigation fixe/sticky
- [ ] Menu burger (mobile)
- [ ] Boutons d'appel à l'action (CTA)
- [ ] Liens vers réseaux sociaux
- [ ] Barre de recherche
- [ ] Sélecteur de langue

#### Formulaires
- [ ] Formulaire de contact simple
- [ ] Formulaire de devis/demande
- [ ] Newsletter (inscription email)
- [ ] Système de réservation/prise de rendez-vous

#### Contenus dynamiques
- [ ] Slider/Carrousel d'images
- [ ] Galerie photos
- [ ] Vidéos intégrées (YouTube, Vimeo)
- [ ] Cartes interactives (Google Maps)
- [ ] Témoignages/avis clients
- [ ] FAQ (accordéon)
- [ ] Compteurs/statistiques animés

#### E-commerce (si applicable)
- [ ] Catalogue produits
- [ ] Panier d'achat
- [ ] Paiement en ligne (Stripe, PayPal)
- [ ] Gestion compte client

#### Autres
- [ ] Mode sombre (dark mode)
- [ ] Animations au scroll
- [ ] Chatbot/support
- [ ] Espace membre/connexion
- [ ] _______________________

---

### 2.3 CONTENU & ASSETS

**⚠️ TRÈS IMPORTANT : Demandez ce que le client possède déjà !**

#### Textes
- **Le client a-t-il déjà ses textes ?**
  - [ ] Oui, tous les textes sont prêts → **Demandez-les !**
  - [ ] Partiellement → Préciser ce qui manque
  - [ ] Non → Vous devrez créer du contenu placeholder

#### Images / Médias
- **Le client a-t-il des photos/images ?**
  - [ ] Oui, toutes les images sont prêtes → **Demandez-les !**
  - [ ] Partiellement
  - [ ] Non → Utiliser Unsplash/stock images

#### Logo
- **Le client a-t-il un logo ?**
  - [ ] Oui → **Demandez-le en format vectoriel (SVG, AI, PDF) ou PNG haute qualité**
  - [ ] Non → Créer un logo texte simple ou proposer un service de création

#### Charte graphique / Couleurs
- **Le client a-t-il des couleurs de marque ?**
  - [ ] Oui → **Noter les codes couleurs** (ex: #FF5733, #0EA5E9)
  - [ ] Non → Proposer une palette basée sur les préférences

---

### 2.4 DESIGN & STYLE

**Quel style de design préfère le client ?**

Montrez ces options (vous pouvez créer un board Pinterest) :
- [ ] **Minimaliste** (épuré, beaucoup d'espace blanc)
- [ ] **Moderne** (gradients, ombres, glassmorphism)
- [ ] **Professionnel/Corporate** (sérieux, structuré)
- [ ] **Créatif/Artistique** (couleurs vives, formes organiques)
- [ ] **Élégant/Luxe** (doré, noir, typographies sophistiquées)
- [ ] **Ludique/Fun** (illustrations, animations)
- [ ] **Technique/Tech** (futuriste, dark theme)

**Typographie (polices) :**
- **Le client a-t-il des polices préférées ?**
  - [ ] Oui → Préciser : _______
  - [ ] Non → Proposer des Google Fonts populaires

---

### 2.5 RESPONSIVE & APPAREILS

**Sur quels appareils le site doit-il fonctionner parfaitement ?**
- [ ] Desktop (ordinateur)
- [ ] Tablette
- [ ] Mobile (smartphone)
- [ ] Tous (RECOMMANDÉ)

**Priorité mobile ?**
- [ ] Mobile-first (la majorité des visiteurs sont sur mobile)
- [ ] Desktop-first (usage principalement sur ordinateur)
- [ ] Équilibré

---

### 2.6 DEADLINE & BUDGET

**Quelle est la date limite ?**
- Date souhaitée : ___/___/______
- Date impérative : ___/___/______

**Le client est-il flexible sur les délais ?**
- [ ] Oui
- [ ] Non (préciser pourquoi : événement, lancement, etc.)

---

## 🤖 ÉTAPE 3 : PRÉPARER LE PROMPT POUR L'IA (FIGMA MAKE / CLAUDE)

Une fois que vous avez toutes les infos, créez un **brief structuré** comme ceci :

### Modèle de prompt pour l'IA

```
Crée un site web [type de site] pour [nom du client/projet].

OBJECTIF : [Objectif principal du site]

STRUCTURE :
- Page 1 : Accueil avec [éléments spécifiques]
- Page 2 : [Nom de la page] avec [contenu]
- Page 3 : [etc.]

FONCTIONNALITÉS REQUISES :
- [Fonctionnalité 1]
- [Fonctionnalité 2]
- [etc.]

DESIGN :
- Style : [Minimaliste/Moderne/etc.]
- Couleurs principales : [#code1, #code2, #code3]
- Police : [Nom de la police Google Font]

CONTENU :
- Textes : [J'ai les textes / Créer du contenu placeholder réaliste]
- Images : [Utiliser Unsplash pour photos de [thématique]]
- Logo : [J'ai le logo / Créer un logo texte simple avec "NomDuClient"]

RESPONSIVE :
- Le site doit être parfaitement responsive mobile/tablette/desktop
- Priorité : [Mobile-first / Desktop-first]

EXEMPLES/INSPIRATIONS :
- [URL 1] : J'aime [ce que vous aimez]
- [URL 2] : J'aime [ce que vous aimez]
```

---

## 📝 ÉTAPE 4 : CHECKLIST AVANT DE DÉMARRER

Avant de commencer à créer le site avec l'IA, **vérifiez que vous avez :**

### ✅ Informations obligatoires
- [ ] Objectif clair du site
- [ ] Nombre de pages défini
- [ ] Liste des fonctionnalités clés
- [ ] Style de design validé
- [ ] Couleurs définies (ou palette proposée)
- [ ] Responsive confirmé (mobile/desktop)

### ✅ Assets fournis par le client
- [ ] Logo (si disponible)
- [ ] Images (ou liste de thématiques pour Unsplash)
- [ ] Textes (ou contenu placeholder à créer)
- [ ] Codes couleurs (si charte existante)

### ✅ Validation client
- [ ] Le client a validé le brief
- [ ] Le client a confirmé les fonctionnalités
- [ ] La deadline est claire

---

## 🚀 ÉTAPE 5 : PENDANT LE DÉVELOPPEMENT AVEC L'IA

### Bonnes pratiques pour travailler avec l'IA

#### 1. **Commencez par la structure globale**
```
Crée d'abord la structure HTML/React de base avec :
- Header avec navigation
- Section Hero
- Sections principales
- Footer
```

#### 2. **Ajoutez les fonctionnalités progressivement**
```
Maintenant ajoute un formulaire de contact dans la section Contact
```

#### 3. **Itérez sur le design**
```
Change la couleur principale de #000000 à #0EA5E9
Augmente l'espacement entre les sections
Rends le Hero plus impactant avec un titre plus grand
```

#### 4. **Testez le responsive**
```
Vérifie que tout fonctionne bien sur mobile
Corrige le menu qui déborde sur petit écran
```

---

## 💡 CONSEILS & ASTUCES

### ❌ Erreurs à éviter

1. **Ne pas demander assez de détails au client**
   - Résultat : Vous devrez revenir vers lui plusieurs fois
   - Solution : Utilisez ce guide pour tout demander dès le départ

2. **Commencer sans avoir les assets**
   - Résultat : Vous créez avec du placeholder puis devez tout refaire
   - Solution : Demandez TOUT avant (logo, images, textes)

3. **Ne pas valider le brief**
   - Résultat : Vous créez quelque chose que le client n'aime pas
   - Solution : Faites valider le brief écrit + montrez des inspirations

4. **Accepter "Faites ce que vous voulez"**
   - Résultat : Le client sera déçu car ce n'est pas ce qu'il imaginait
   - Solution : FORCEZ le client à choisir parmi des options (montrez 3 exemples de styles)

### ✅ Bonnes pratiques

1. **Créez un brief partagé (Google Doc/Notion)**
   - Le client peut le compléter à son rythme
   - Vous avez tout en un seul endroit

2. **Demandez des exemples visuels**
   - "Envoyez-moi 3 sites que vous aimez"
   - Plus facile que d'expliquer avec des mots

3. **Proposez 2-3 options pour chaque décision**
   - Couleurs : "Préférez-vous bleu, vert ou rouge ?"
   - Style : "Montrez 3 screenshots de styles différents"

4. **Fixez des jalons de validation**
   - Validation 1 : Structure et navigation
   - Validation 2 : Design et couleurs
   - Validation 3 : Contenu et fonctionnalités
   - Validation finale

---

## 📋 TEMPLATES DE QUESTIONS PAR TYPE DE PROJET

### 🏢 Site Vitrine d'Entreprise

**Questions spécifiques :**
- Quels sont vos services principaux ? (3-5 services max)
- Avez-vous des témoignages clients ?
- Voulez-vous afficher votre équipe ?
- Avez-vous des certifications/labels à mettre en avant ?
- Souhaitez-vous un blog d'actualités ?

### 🛒 Site E-commerce

**Questions spécifiques :**
- Combien de produits à afficher ?
- Avez-vous les photos produits ?
- Quels moyens de paiement ? (Carte, PayPal, Virement)
- Gestion des stocks nécessaire ?
- Livraison : zones géographiques ?
- CGV déjà rédigées ?

### 🎨 Portfolio / Site Personnel

**Questions spécifiques :**
- Combien de projets à présenter ?
- Format : images, vidéos, descriptions ?
- CV/Parcours à intégrer ?
- Blog personnel ?
- Quelles compétences mettre en avant ?

### 🍕 Restaurant / Commerce Local

**Questions spécifiques :**
- Menu/Carte disponible ?
- Photos des plats/produits ?
- Système de réservation nécessaire ?
- Click & Collect / Livraison ?
- Horaires d'ouverture
- Adresse + carte Google Maps

---

## 🎯 CHECKLIST FINALE AVANT LIVRAISON

Avant de livrer le site au client, vérifiez :

### Fonctionnel
- [ ] Tous les liens fonctionnent (navigation, externes, ancres)
- [ ] Formulaires testés (validation, messages d'erreur)
- [ ] Boutons/CTA fonctionnels
- [ ] Responsive parfait sur mobile/tablette/desktop
- [ ] Temps de chargement acceptable
- [ ] Pas d'erreurs console (F12)

### Contenu
- [ ] Tous les textes sont corrects (orthographe, grammaire)
- [ ] Images optimisées (pas de fichiers trop lourds)
- [ ] Logo bien intégré
- [ ] Informations de contact correctes
- [ ] Réseaux sociaux liés

### Design
- [ ] Cohérence des couleurs
- [ ] Typographie harmonieuse
- [ ] Espacements équilibrés
- [ ] Contrastes suffisants (accessibilité)
- [ ] Animations fluides (pas de lag)

### Légal (si e-commerce)
- [ ] Mentions légales
- [ ] Politique de confidentialité (RGPD)
- [ ] CGV
- [ ] Bandeau cookies

### Technique
- [ ] Code propre et commenté
- [ ] Pas de console.log() oubliés
- [ ] Favicon ajouté
- [ ] Méta-descriptions pour SEO
- [ ] Compatibilité navigateurs (Chrome, Firefox, Safari, Edge)

---

## 📞 TEMPLATE EMAIL : DEMANDE DE BRIEF INITIAL

Voici un email type à envoyer après la commande :

---

**Objet : [Nom du projet] - Brief pour démarrer votre site web 🚀**

Bonjour [Prénom],

Merci pour votre commande du package **[Starter/Professional/Premium]** !

Pour démarrer votre projet dans les meilleures conditions, j'ai besoin de quelques informations complémentaires.

**Pouvez-vous me fournir :**

1️⃣ **Objectif du site**
   - Que souhaitez-vous que vos visiteurs fassent sur le site ? (acheter, contacter, s'informer, etc.)

2️⃣ **Structure souhaitée**
   - Combien de pages ? Quelles pages ? (ex: Accueil, Services, Contact)

3️⃣ **Design et inspirations**
   - Envoyez-moi 2-3 URLs de sites que vous aimez (je m'inspirerai du style)
   - Avez-vous des couleurs de marque ? (codes couleur si possible)

4️⃣ **Assets (très important)**
   - Logo : oui/non ? Si oui, envoyez-le en haute qualité (PNG ou SVG)
   - Images : avez-vous des photos ? Si oui, partagez-les
   - Textes : avez-vous déjà les textes des pages ? Si oui, envoyez-les

5️⃣ **Fonctionnalités**
   - Formulaire de contact ? Newsletter ? Réservation en ligne ? Autre ?

6️⃣ **Deadline**
   - Y a-t-il une date impérative de livraison ?

**👉 Pour gagner du temps, remplissez ce brief en ligne :**
[Lien vers Google Form ou Notion]

Je reste disponible pour un appel si vous préférez en discuter de vive voix !

À très vite,
[Votre nom]

---

## 🎓 CONCLUSION

Avec ce guide, vous avez **toutes les clés** pour :
- ✅ Poser les bonnes questions aux clients
- ✅ Obtenir toutes les informations nécessaires
- ✅ Créer des sites rapidement avec l'IA
- ✅ Éviter les allers-retours et pertes de temps

**Rappel : Plus votre brief est précis, plus l'IA créera exactement ce que vous voulez !**

---

📌 **ASTUCE BONUS : Créez un Google Form avec toutes ces questions !**

Envoyez simplement le lien au client → Il remplit → Vous avez toutes les infos structurées !

---

**🚀 Bon courage pour vos projets !**
