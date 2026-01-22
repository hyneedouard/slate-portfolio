# 💳 GUIDE D'INTÉGRATION STRIPE

Ce guide vous explique comment connecter **Stripe** à votre site pour accepter de **vrais paiements**.

---

## 🎯 POURQUOI STRIPE ?

- ✅ **Sécurisé** : Certifié PCI-DSS Level 1
- ✅ **Rapide** : Intégration en 30 minutes
- ✅ **Complet** : Cartes bancaires, PayPal, Apple Pay, Google Pay
- ✅ **International** : 135+ devises supportées
- ✅ **Pas d'abonnement** : Seulement 1,4% + 0,25€ par transaction réussie en Europe

---

## 📋 PRÉREQUIS

### 1. Créer un compte Stripe

1. Allez sur [https://stripe.com](https://stripe.com)
2. Cliquez sur **"Démarrer"**
3. Remplissez le formulaire d'inscription
4. Confirmez votre email

### 2. Activer votre compte

Pour recevoir de vrais paiements, vous devez fournir :
- Informations d'entreprise (SIRET, adresse)
- Pièce d'identité
- Coordonnées bancaires (RIB)

**⚠️ En attendant, vous pouvez utiliser le mode TEST !**

---

## 🔑 RÉCUPÉRER VOS CLÉS API STRIPE

1. Connectez-vous à [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Allez dans **"Développeurs"** → **"Clés API"**
3. Vous verrez 2 types de clés :

### 🧪 MODE TEST (pour développement)
- **Clé publique de test** : `pk_test_xxxxx`
- **Clé secrète de test** : `sk_test_xxxxx`

### 💰 MODE PRODUCTION (pour vrais paiements)
- **Clé publique** : `pk_live_xxxxx`
- **Clé secrète** : `sk_live_xxxxx`

**💡 Commencez toujours en mode TEST !**

---

## 🚀 INTÉGRATION DANS VOTRE SITE

### Option 1 : Stripe Checkout (RECOMMANDÉ - le plus simple)

Stripe Checkout crée une page de paiement hébergée et sécurisée par Stripe.

#### Avantages :
- ✅ Pas de gestion de formulaire de paiement
- ✅ Interface Stripe (100% sécurisée)
- ✅ Support Apple Pay, Google Pay automatique
- ✅ Responsive mobile parfait

#### Étapes :

1. **Installez Stripe**
```bash
npm install @stripe/stripe-js
```

2. **Modifiez votre formulaire de commande**

Dans `/src/app/components/OrderForm.tsx`, remplacez la fonction `handlePayment` :

```typescript
import { loadStripe } from '@stripe/stripe-js';

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('pk_test_VOTRE_CLE_PUBLIQUE_TEST');

const handlePayment = async () => {
  setIsProcessing(true);

  try {
    const stripe = await stripePromise;
    
    // 1. Créer une session de paiement Stripe (backend requis)
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageName,
        price: totalTTC,
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        orderData: formData, // Toutes les infos du formulaire
      }),
    });

    const session = await response.json();

    // 2. Rediriger vers Stripe Checkout
    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.error('Erreur paiement:', error);
    alert('Erreur lors du paiement. Veuillez réessayer.');
  } finally {
    setIsProcessing(false);
  }
};
```

3. **Créez l'endpoint backend** (avec Supabase Edge Functions ou Vercel)

**⚠️ IMPORTANT : Vous DEVEZ avoir un backend pour créer la session Stripe (pour des raisons de sécurité)**

Exemple avec Supabase Edge Function :

```typescript
// supabase/functions/create-checkout-session/index.ts
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_VOTRE_CLE_SECRETE_TEST', {
  apiVersion: '2023-10-16',
});

Deno.serve(async (req) => {
  const { packageName, price, customerEmail, customerName, orderData } = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Package ${packageName}`,
              description: 'Création de site web',
            },
            unit_amount: price * 100, // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/`,
      customer_email: customerEmail,
      metadata: {
        customerName,
        packageName,
        projectName: orderData.projectName,
        // Ajoutez toutes les infos nécessaires
      },
    });

    return new Response(JSON.stringify({ id: session.id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
```

4. **Gérez la page de succès**

Créez `/src/app/pages/SuccessPage.tsx` :

```typescript
export function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Paiement réussi ! 🎉
        </h1>
        <p className="text-slate-600 mb-6">
          Votre commande a été confirmée. Vous allez recevoir un email de confirmation.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-semibold inline-block"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
```

---

### Option 2 : Stripe Elements (personnalisé)

Si vous voulez un formulaire de paiement intégré dans votre site (plus complexe).

**📚 Documentation complète :** [https://stripe.com/docs/payments/accept-a-payment](https://stripe.com/docs/payments/accept-a-payment)

---

## 🔔 WEBHOOKS : RECEVOIR LES NOTIFICATIONS DE PAIEMENT

Les webhooks permettent à Stripe de vous notifier quand un paiement est validé.

### 1. Créez un endpoint webhook

```typescript
// supabase/functions/stripe-webhook/index.ts
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_VOTRE_CLE_SECRETE_TEST', {
  apiVersion: '2023-10-16',
});

const endpointSecret = 'whsec_VOTRE_SECRET_WEBHOOK';

Deno.serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Gérer les événements
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // ✅ Paiement réussi !
      console.log('Commande payée:', session.metadata);
      
      // Ici vous pouvez :
      // - Sauvegarder la commande dans votre base de données
      // - Envoyer un email de confirmation au client
      // - Envoyer une notification à vous-même
      
      break;
      
    case 'payment_intent.payment_failed':
      // ❌ Paiement échoué
      console.log('Paiement échoué');
      break;
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
```

### 2. Configurez le webhook dans Stripe

1. Dashboard Stripe → **Développeurs** → **Webhooks**
2. Cliquez sur **"Ajouter un endpoint"**
3. URL : `https://votre-site.com/api/stripe-webhook`
4. Événements : Sélectionnez `checkout.session.completed`

---

## 🧪 TESTER AVEC DES CARTES DE TEST

En mode TEST, utilisez ces numéros de carte :

| Carte | Numéro | Résultat |
|-------|--------|----------|
| ✅ **Succès** | `4242 4242 4242 4242` | Paiement réussi |
| ❌ **Refusée** | `4000 0000 0000 0002` | Carte refusée |
| 🔐 **3D Secure** | `4000 0027 6000 3184` | Authentification 3DS |

- **Date d'expiration** : N'importe quelle date future (ex: 12/25)
- **CVV** : N'importe quel 3 chiffres (ex: 123)

---

## 🌍 PASSER EN MODE PRODUCTION

Une fois que tout fonctionne en TEST :

1. **Activez votre compte Stripe**
   - Fournissez vos documents (SIRET, RIB, ID)
   - Attendez la validation (généralement 24-48h)

2. **Remplacez les clés TEST par les clés LIVE**
   - Frontend : `pk_live_xxxxx`
   - Backend : `sk_live_xxxxx`

3. **Testez avec une vraie carte** (vous serez débité, mais vous pouvez vous rembourser depuis le dashboard)

4. **Activez les webhooks en production**

---

## 💰 FRAIS STRIPE EN FRANCE

### Tarification standard :
- **1,4% + 0,25€** par transaction réussie (cartes européennes)
- **2,9% + 0,25€** pour cartes internationales
- **Pas d'abonnement mensuel**
- **Pas de frais cachés**

### Exemple :
- Commande de 1200€ TTC
- Frais Stripe : (1200 × 1,4%) + 0,25€ = **17,05€**
- Vous recevez : **1182,95€**

**💡 Les virements sur votre compte bancaire sont automatiques tous les 7 jours.**

---

## 📧 ENVOYER DES EMAILS DE CONFIRMATION

### Option 1 : Stripe Email (inclus)

Stripe envoie automatiquement des emails de reçu au client.

### Option 2 : Email personnalisé (via votre backend)

Utilisez un service comme **SendGrid**, **Mailgun** ou **Resend**.

Exemple avec Resend :

```typescript
import { Resend } from 'resend';

const resend = new Resend('VOTRE_CLE_API_RESEND');

// Dans votre webhook après paiement réussi
await resend.emails.send({
  from: 'contact@votresite.com',
  to: session.customer_email,
  subject: 'Confirmation de votre commande',
  html: `
    <h1>Merci pour votre commande !</h1>
    <p>Votre paiement de ${session.amount_total / 100}€ a été confirmé.</p>
    <p>Je vous contacterai sous 24h pour démarrer votre projet.</p>
  `,
});
```

---

## ✅ CHECKLIST AVANT DE LANCER

### Mode TEST
- [ ] Compte Stripe créé
- [ ] Clés API TEST récupérées
- [ ] Stripe installé (`@stripe/stripe-js`)
- [ ] Endpoint backend créé
- [ ] Paiement test réussi avec `4242 4242 4242 4242`
- [ ] Page de succès fonctionnelle
- [ ] Webhook configuré et testé

### Mode PRODUCTION
- [ ] Compte Stripe activé (documents validés)
- [ ] Clés API LIVE en place
- [ ] Tests avec vraie carte bancaire
- [ ] Webhooks production configurés
- [ ] Emails de confirmation activés
- [ ] Mentions légales + CGV à jour
- [ ] RGPD conforme (politique de confidentialité)

---

## 🆘 DÉPANNAGE

### Problème : "La clé API n'est pas valide"
- ✅ Vérifiez que vous utilisez la bonne clé (TEST ou LIVE)
- ✅ Vérifiez qu'il n'y a pas d'espace avant/après la clé

### Problème : "Webhook signature invalid"
- ✅ Vérifiez le secret webhook (`whsec_xxxxx`)
- ✅ Vérifiez que vous envoyez le body brut (pas du JSON parsé)

### Problème : "Session not found"
- ✅ Vérifiez que le backend crée bien la session
- ✅ Regardez les logs dans le dashboard Stripe

---

## 📚 RESSOURCES UTILES

- 📖 **Documentation officielle** : [https://stripe.com/docs](https://stripe.com/docs)
- 💬 **Support Stripe** : support@stripe.com
- 🎥 **Tutoriels vidéo** : [YouTube - Stripe Developers](https://www.youtube.com/@StripeDevelopers)
- 🧪 **Tester les webhooks** : [https://stripe.com/docs/webhooks/test](https://stripe.com/docs/webhooks/test)

---

## 🎯 CONCLUSION

Avec Stripe, vous avez :
- ✅ Paiements sécurisés en quelques lignes de code
- ✅ Interface professionnelle (Stripe Checkout)
- ✅ Support client 24/7 de Stripe
- ✅ Dashboard complet pour suivre vos ventes

**🚀 Vous êtes prêt à accepter vos premiers paiements !**

---

**⚠️ RAPPEL IMPORTANT :**

**Commencez toujours en mode TEST** avant de passer en production. Faites plusieurs tests pour vous assurer que tout fonctionne parfaitement.

**Bonne chance ! 💪**
