import { X } from 'lucide-react';

interface LegalPagesProps {
  page: 'privacy' | 'cgv' | 'mentions' | null;
  onClose: () => void;
}

export function LegalPages({ page, onClose }: LegalPagesProps) {
  if (!page) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto p-6">
      <div className="bg-white rounded-lg w-full max-w-4xl my-8 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-lg">
          <h2 className="text-2xl font-bold text-slate-900">
            {page === 'privacy' && 'Politique de confidentialité'}
            {page === 'cgv' && 'Conditions Générales de Vente'}
            {page === 'mentions' && 'Mentions Légales'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 prose prose-slate max-w-none">
          {page === 'privacy' && <PrivacyPolicy />}
          {page === 'cgv' && <CGV />}
          {page === 'mentions' && <MentionsLegales />}
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="space-y-6 text-slate-700">
      <p className="text-sm text-slate-500">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">1. Collecte des données personnelles</h3>
        <p className="mb-3">
          Dans le cadre de notre activité de création de sites web, nous collectons les données personnelles 
          suivantes uniquement lors de la passation d'une commande :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Nom et prénom</li>
          <li>Adresse email</li>
          <li>Numéro de téléphone</li>
          <li>Nom de l'entreprise (optionnel)</li>
          <li>Informations relatives au projet commandé</li>
          <li>Informations de facturation</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">2. Finalité du traitement</h3>
        <p className="mb-3">Vos données personnelles sont collectées pour :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Traiter et gérer vos commandes</li>
          <li>Vous contacter concernant votre projet</li>
          <li>Établir des factures</li>
          <li>Respecter nos obligations légales et comptables</li>
          <li>Améliorer nos services (avec votre consentement)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">3. Base légale du traitement</h3>
        <p>
          Le traitement de vos données repose sur :
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>L'exécution du contrat</strong> : traitement de votre commande</li>
          <li><strong>Obligations légales</strong> : facturation, comptabilité</li>
          <li><strong>Votre consentement</strong> : communications marketing (si accepté)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">4. Durée de conservation</h3>
        <p className="mb-3">Vos données sont conservées pendant :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Données de commande</strong> : 10 ans (obligation comptable)</li>
          <li><strong>Données de facturation</strong> : 10 ans (obligation fiscale)</li>
          <li><strong>Données marketing</strong> : 3 ans maximum (si consentement donné)</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">5. Vos droits RGPD</h3>
        <p className="mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
          <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
          <li><strong>Droit à l'effacement</strong> : supprimer vos données (sous conditions)</li>
          <li><strong>Droit à la portabilité</strong> : récupérer vos données</li>
          <li><strong>Droit d'opposition</strong> : s'opposer au traitement</li>
          <li><strong>Droit de limitation</strong> : limiter le traitement</li>
        </ul>
        <p className="mt-4">
          Pour exercer ces droits, contactez-nous à : <strong>contact@votremail.com</strong>
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">6. Sécurité des données</h3>
        <p>
          Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour 
          protéger vos données contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, 
          l'altération ou la destruction.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Chiffrement SSL/TLS pour toutes les transmissions</li>
          <li>Paiements sécurisés via Stripe (certifié PCI-DSS)</li>
          <li>Accès restreint aux données personnelles</li>
          <li>Sauvegardes régulières et sécurisées</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">7. Cookies</h3>
        <p>
          Ce site utilise uniquement des cookies essentiels au fonctionnement du site. 
          Aucun cookie de tracking ou publicitaire n'est utilisé sans votre consentement explicite.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">8. Partage des données</h3>
        <p className="mb-3">
          Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Stripe</strong> : pour le traitement des paiements (soumis à leur politique de confidentialité)</li>
          <li><strong>Hébergeur</strong> : pour l'hébergement sécurisé des données</li>
          <li><strong>Autorités légales</strong> : si requis par la loi</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">9. Contact</h3>
        <p>
          Pour toute question concernant cette politique de confidentialité ou vos données personnelles :
        </p>
        <p className="mt-3">
          <strong>Email :</strong> contact@votremail.com<br />
          <strong>Téléphone :</strong> +32 X XX XX XX XX
        </p>
        <p className="mt-3">
          <strong>Autorité de contrôle en Belgique :</strong><br />
          Autorité de protection des données (APD)<br />
          Rue de la Presse, 35<br />
          1000 Bruxelles<br />
          Email : contact@apd-gba.be<br />
          Site web : <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-slate-900 underline">www.autoriteprotectiondonnees.be</a>
        </p>
      </section>
    </div>
  );
}

function CGV() {
  return (
    <div className="space-y-6 text-slate-700">
      <p className="text-sm text-slate-500">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">1. Objet</h3>
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre 
          [Votre dénomination] (ci-après "le Prestataire"), numéro d'entreprise BCE [BE 0XXX.XXX.XXX], 
          et toute personne physique ou morale souhaitant procéder à l'achat de services de développement 
          web (ci-après "le Client").
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">2. Services proposés</h3>
        <p className="mb-3">Le Prestataire propose trois formules de création de sites web :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Starter (1200€ HTVA)</strong> : Landing page responsive (1 page), livraison 2-3 jours</li>
          <li><strong>Professional (2800€ HTVA)</strong> : Site multi-pages (jusqu'à 5 pages), livraison 4-7 jours</li>
          <li><strong>Premium (5500€ HTVA)</strong> : Application web complexe, livraison 10-15 jours</li>
        </ul>
        <p className="mt-3">
          Les prestations incluent uniquement le développement frontend. Aucun service backend n'est inclus 
          sauf mention contraire dans un devis personnalisé.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">3. Commande et paiement</h3>
        <p className="mb-3">
          La commande est ferme et définitive dès validation du paiement en ligne via Stripe.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Paiement : 100% à la commande</li>
          <li>Moyens de paiement acceptés : Carte bancaire, PayPal via Stripe</li>
          <li><strong>Prix TVAC = Prix HTVA + TVA (21%)</strong></li>
          <li>Facture : émise automatiquement après paiement avec mention de la TVA et du numéro BCE</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">4. Processus de réalisation</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Paiement</strong> : Validation de la commande</li>
          <li><strong>Brief</strong> : Appel ou échange email sous 24h pour définir les besoins précis</li>
          <li><strong>Développement</strong> : Création du site selon les délais annoncés</li>
          <li><strong>Révisions</strong> : Selon le package choisi (1 à illimitées)</li>
          <li><strong>Livraison</strong> : Code source + documentation fournis</li>
        </ol>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">5. Délais de livraison</h3>
        <p>
          Les délais indiqués sont donnés à titre indicatif. Ils courent à compter de la validation du brief 
          par le Client. Un retard de livraison ne peut donner lieu à annulation de la commande ni à versement 
          de dommages et intérêts, sauf retard supérieur à 15 jours ouvrables.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">6. Révisions</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Starter</strong> : 1 révision incluse</li>
          <li><strong>Professional</strong> : 3 révisions incluses</li>
          <li><strong>Premium</strong> : Révisions illimitées</li>
        </ul>
        <p className="mt-3">
          Les révisions doivent porter sur le périmètre initial. Toute demande de nouvelle fonctionnalité 
          fera l'objet d'un devis complémentaire.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">7. Propriété intellectuelle</h3>
        <p className="mb-3">
          <strong>Transfert des droits :</strong> Le code source livré devient la propriété exclusive du Client 
          dès paiement intégral. Le Client dispose d'un droit d'utilisation, de modification et de reproduction 
          sans limite.
        </p>
        <p>
          <strong>Réutilisation :</strong> Le Prestataire se réserve le droit de présenter le projet réalisé 
          dans son portfolio, sauf demande contraire écrite du Client.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">8. Droit de rétractation</h3>
        <p>
          Conformément à la loi belge du 21 novembre 2017 relative à la vente de biens et à la fourniture 
          de contenu numérique et de services numériques aux consommateurs, le consommateur dispose d'un 
          délai de rétractation de 14 jours calendrier à compter de la conclusion du contrat.
        </p>
        <p className="mt-3">
          <strong>Exception :</strong> Le droit de rétractation ne s'applique pas aux prestations de services 
          pleinement exécutées avant la fin du délai de rétractation et dont l'exécution a commencé avec 
          l'accord préalable exprès du consommateur et la reconnaissance par celui-ci qu'il perdra son droit 
          de rétractation dès que le professionnel aura pleinement exécuté le contrat.
        </p>
        <p className="mt-3">
          <strong>En pratique :</strong> Si vous souhaitez que nous commencions immédiatement après la commande, 
          vous devez expressément nous en informer et accepter de renoncer à votre droit de rétractation. 
          Sans cet accord, le développement débutera après le délai de 14 jours.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">9. Garanties</h3>
        <p className="mb-3">Le Prestataire garantit :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Le bon fonctionnement du code livré sur les navigateurs modernes</li>
          <li>La conformité du code aux standards web actuels</li>
          <li>La correction des bugs signalés pendant la période de support</li>
        </ul>
        <p className="mt-3">
          <strong>Limites :</strong> Le Prestataire ne garantit pas la compatibilité avec d'anciens navigateurs 
          (Internet Explorer, etc.) sauf spécification contraire.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">10. Responsabilité</h3>
        <p>
          La responsabilité du Prestataire est limitée au montant de la commande. Le Prestataire ne saurait 
          être tenu responsable des dommages indirects (perte de chiffre d'affaires, perte de données, etc.).
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">11. Litiges et médiation</h3>
        <p>
          Les présentes CGV sont soumises au droit belge. En cas de litige, une solution amiable sera 
          recherchée avant toute action judiciaire. À défaut, les tribunaux belges seront seuls compétents.
        </p>
        <p className="mt-3">
          <strong>Service de médiation :</strong> En cas de litige, le consommateur peut s'adresser gratuitement 
          au Service de Médiation pour le Consommateur :<br />
          <strong>Adresse :</strong> North Gate II, Boulevard du Roi Albert II, 8 Boîte 1, 1000 Bruxelles<br />
          <strong>Site web :</strong> <a href="https://www.mediationconsommateur.be" target="_blank" rel="noopener noreferrer" className="text-slate-900 underline">www.mediationconsommateur.be</a>
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">12. Contact</h3>
        <p>
          Pour toute question relative aux présentes CGV :<br />
          <strong>Email :</strong> contact@votremail.com<br />
          <strong>Téléphone :</strong> +32 X XX XX XX XX
        </p>
      </section>

      <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-900 mb-3">⚠️ À COMPLÉTER AVANT MISE EN LIGNE</h3>
        <p className="text-sm text-yellow-800">
          Complétez les informations entre crochets [comme ceci] avec vos données réelles (numéro BCE, 
          coordonnées, etc.). Ces CGV sont conformes à la législation belge sur le commerce électronique.
        </p>
      </section>
    </div>
  );
}

function MentionsLegales() {
  return (
    <div className="space-y-6 text-slate-700">
      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">1. Éditeur du site</h3>
        <p>
          <strong>Dénomination :</strong> [Votre nom ou dénomination sociale]<br />
          <strong>Forme juridique :</strong> [Indépendant à titre principal/complémentaire / SPRL / SRL / etc.]<br />
          <strong>Numéro d'entreprise BCE :</strong> [BE 0XXX.XXX.XXX]<br />
          <strong>Numéro de TVA :</strong> [BE 0XXX.XXX.XXX]<br />
          <strong>Adresse du siège :</strong> [Votre adresse complète en Belgique]<br />
          <strong>Email :</strong> contact@votremail.com<br />
          <strong>Téléphone :</strong> +32 X XX XX XX XX
        </p>
        <p className="mt-3">
          <strong>Caisse d'assurances sociales :</strong> [Nom de votre guichet d'entreprise - Securex, Partena, UCM, etc.]
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">2. Responsable de la publication</h3>
        <p>
          <strong>Nom :</strong> [Votre nom]<br />
          <strong>Email :</strong> contact@votremail.com
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">3. Hébergement</h3>
        <p>
          <strong>Hébergeur :</strong> [Nom de votre hébergeur - ex: Vercel, Netlify, etc.]<br />
          <strong>Adresse :</strong> [Adresse de l'hébergeur]
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">4. Propriété intellectuelle</h3>
        <p>
          L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé par le droit 
          d'auteur belge et européen, le droit des marques et/ou tout autre droit de propriété intellectuelle. 
          Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale 
          ou partielle du site ou de son contenu, par quelque procédé que ce soit, est interdite sans 
          autorisation écrite préalable.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">5. Données personnelles</h3>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi belge du 
          30 juillet 2018 relative à la protection des personnes physiques à l'égard des traitements de 
          données à caractère personnel, vous disposez d'un droit d'accès, de rectification, de suppression 
          et de portabilité de vos données personnelles.
        </p>
        <p className="mt-3">
          Pour exercer ces droits, contactez-nous à : <strong>contact@votremail.com</strong>
        </p>
        <p className="mt-3">
          En cas de litige, vous pouvez introduire une réclamation auprès de l'Autorité de protection des 
          données (APD) : <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className="text-slate-900 underline">www.autoriteprotectiondonnees.be</a>
        </p>
        <p className="mt-3">
          Consulter notre <a href="#politique-confidentialite" className="text-slate-900 underline">
            Politique de confidentialité
          </a> pour plus d'informations.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">6. Cookies</h3>
        <p>
          Ce site utilise des cookies nécessaires à son fonctionnement. Conformément à la législation belge 
          sur les cookies, vous pouvez paramétrer votre navigateur pour refuser les cookies. Cependant, 
          cela peut affecter le fonctionnement du site.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">7. Limitation de responsabilité</h3>
        <p>
          L'éditeur ne saurait être tenu responsable des erreurs, d'une absence de disponibilité des 
          informations et/ou de la présence de virus sur son site. L'utilisateur est seul responsable de 
          l'utilisation qu'il fait du contenu et des informations présentes sur le site.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-slate-900 mb-4">8. Droit applicable et juridiction compétente</h3>
        <p>
          Les présentes mentions légales sont régies par le droit belge. En cas de litige, les tribunaux 
          belges seront seuls compétents.
        </p>
      </section>

      <section className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-900 mb-3">⚠️ À COMPLÉTER AVANT MISE EN LIGNE</h3>
        <p className="text-sm text-yellow-800 mb-3">
          Les informations entre crochets [comme ceci] doivent être remplacées par vos informations légales 
          réelles. Ces informations sont <strong>obligatoires en Belgique</strong> selon la loi sur le commerce électronique.
        </p>
        <p className="text-sm text-yellow-800">
          <strong>Documents nécessaires :</strong> Numéro d'entreprise BCE, numéro de TVA (obtenus lors de votre 
          inscription au guichet d'entreprise).
        </p>
      </section>
    </div>
  );
}