# 🚀 GUIDE D'INTÉGRATION STRIPE - Slate Portfolio

Ce guide vous explique **étape par étape** comment intégrer Stripe pour accepter de vrais paiements sur votre site Slate.

---

## 📋 TABLE DES MATIÈRES

1. [Prérequis](#prérequis)
2. [Configuration Stripe](#configuration-stripe)
3. [Variables d'environnement](#variables-denvironnement)
4. [Créer les API Routes Vercel](#créer-les-api-routes-vercel)
5. [Tester les paiements](#tester-les-paiements)
6. [Passer en production](#passer-en-production)

---

## 🎯 PRÉREQUIS

### Ce qu'il vous faut :

✅ **Compte Stripe activé** (mode TEST pour commencer)  
✅ **Site déployé sur Vercel** (ou autre plateforme)  
✅ **Packages npm installés** : `@stripe/stripe-js` et `stripe` (✅ **DÉJÀ FAIT**)

---

## 🔐 CONFIGURATION STRIPE

### Étape 1 : Récupérer vos clés API

1. Connectez-vous à votre tableau de bord Stripe : [dashboard.stripe.com](https://dashboard.stripe.com)
2. Allez dans **Développeurs** → **Clés API**
3. Vous verrez 2 clés en **mode TEST** :
   - 🔓 **Clé publique** (pk_test_...) → Utilisable côté client
   - 🔒 **Clé secrète** (sk_test_...) → À GARDER CONFIDENTIELLE (côté serveur uniquement)

**Important :** Ne partagez JAMAIS votre clé secrète publiquement !

---

## ⚙️ VARIABLES D'ENVIRONNEMENT

### Sur Vercel :

1. Allez dans votre projet Vercel
2. **Settings** → **Environment Variables**
3. Ajoutez ces 3 variables :

| Nom | Valeur | Où la trouver |
|-----|--------|---------------|
| `STRIPE_SECRET_KEY` | `sk_test_...` | Dashboard Stripe → Développeurs → Clés API |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Dashboard Stripe → Développeurs → Clés API |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | (Optionnel pour l'instant, voir section Webhooks) |

**Important :** Préfixez les clés publiques avec `NEXT_PUBLIC_` pour qu'elles soient accessibles côté client.

---

## 🛠️ CRÉER LES API ROUTES VERCEL

Vercel Functions permet de créer des endpoints API serverless facilement.

### Structure des fichiers à créer :

```
/
├── api/
│   ├── create-checkout-session.ts  ← API pour créer une session Stripe
│   └── webhooks.ts                  ← API pour recevoir les événements Stripe
└── src/
    └── app/
        └── components/
            └── OrderForm.tsx        ← Modifier pour appeler Stripe
```

---

### 📄 Fichier 1 : `/api/create-checkout-session.ts`

Créez ce fichier à la **racine du projet** :

```typescript
import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Autoriser seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packageName, price, customerEmail, customerName } = req.body;

    // Validation des données
    if (!packageName || !price || !customerEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Créer la session Checkout Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Package ${packageName}`,
              description: 'Création de site web professionnel',
            },
            unit_amount: Math.round(price * 100 * 1.21), // Prix en centimes avec TVA 21%
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      metadata: {
        packageName,
        customerName,
      },
      success_url: `${req.headers.origin}?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${req.headers.origin}?canceled=true`,
    });

    // Retourner l'URL de paiement
    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
}
```

---

### 📄 Fichier 2 : `/api/webhooks.ts` (Optionnel mais recommandé)

Ce fichier permet de recevoir les confirmations de paiement de Stripe :

```typescript
import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export const config = {
  api: {
    bodyParser: false, // Important pour Stripe webhooks
  },
};

async function buffer(req: VercelRequest) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Gérer les événements
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Paiement réussi:', session.id);
        
        // ICI : Envoyez un email de confirmation
        // ICI : Sauvegardez la commande dans une base de données
        // ICI : Notifiez l'équipe
        
        break;
      
      case 'payment_intent.payment_failed':
        console.log('❌ Paiement échoué');
        break;
      
      default:
        console.log(`Événement non géré : ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
}
```

---

## ✅ TESTER LES PAIEMENTS

### Mode TEST Stripe

Utilisez ces **cartes de test** fournies par Stripe :

| Carte | Numéro | Comportement |
|-------|--------|--------------|
| ✅ Succès | `4242 4242 4242 4242` | Paiement réussi |
| ❌ Échec | `4000 0000 0000 0002` | Paiement refusé |
| 🔐 3D Secure | `4000 0025 0000 3155` | Demande authentification |

**Autres infos :**
- **Date d'expiration** : N'importe quelle date future (ex: 12/25)
- **CVV** : N'importe quel code à 3 chiffres (ex: 123)
- **Code postal** : N'importe quel code

---

## 🚀 PASSER EN PRODUCTION

### Quand vous êtes prêt à accepter de vrais paiements :

1. **Activez votre compte Stripe** :
   - Dashboard Stripe → **Activer mon compte**
   - Fournissez : BCE, TVA, pièce d'identité, IBAN
   - Délai : 24-48h

2. **Récupérez vos clés LIVE** :
   - Dashboard Stripe → Développeurs → Clés API
   - Basculez sur **Mode Live** (toggle en haut)
   - Copiez les nouvelles clés (pk_live_... et sk_live_...)

3. **Mettez à jour vos variables d'environnement sur Vercel** :
   - `STRIPE_SECRET_KEY` → `sk_live_...`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → `pk_live_...`

4. **Configurez les webhooks** :
   - Dashboard Stripe → Développeurs → Webhooks
   - Ajouter un endpoint : `https://votre-site.vercel.app/api/webhooks`
   - Sélectionner événements : `checkout.session.completed`, `payment_intent.succeeded`
   - Copiez le secret webhook → Variable d'environnement `STRIPE_WEBHOOK_SECRET`

5. **Redéployez sur Vercel** :
   - Les nouvelles variables seront prises en compte

---

## 📧 NOTIFICATIONS PAR EMAIL

Après un paiement réussi, vous devez :
- ✅ Envoyer un email de confirmation au client
- ✅ Vous notifier d'une nouvelle commande

**Services recommandés :**
- **Resend** (gratuit jusqu'à 3000 emails/mois)
- **SendGrid** (gratuit jusqu'à 100 emails/jour)
- **Postmark** (100 emails/mois gratuits)

---

## 🔍 VÉRIFIER QUE TOUT FONCTIONNE

### Checklist finale :

- [ ] Clés Stripe configurées dans Vercel
- [ ] Fichier `/api/create-checkout-session.ts` créé
- [ ] Site redéployé sur Vercel
- [ ] Test de paiement avec carte `4242 4242 4242 4242`
- [ ] Paiement réussi et redirection vers page de succès
- [ ] Webhooks configurés (optionnel mais recommandé)

---

## 🆘 PROBLÈMES FRÉQUENTS

### "Unauthorized" ou "Invalid API key"
→ Vérifiez que `STRIPE_SECRET_KEY` est bien définie dans les variables d'environnement Vercel

### "CORS error"
→ Ajoutez les headers CORS dans votre API route

### Le webhook ne fonctionne pas
→ Vérifiez que l'URL du webhook est correcte et accessible publiquement

---

## 📚 RESSOURCES

- [Documentation Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Cartes de test Stripe](https://stripe.com/docs/testing)

---

**✨ Votre site est maintenant prêt à accepter des paiements !**

Pour toute question, consultez la documentation Stripe ou contactez leur support (excellent et réactif).
