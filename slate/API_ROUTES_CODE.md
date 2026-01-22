# 📦 FICHIERS API À CRÉER - COPIER-COLLER

Ce fichier contient le code exact à copier-coller pour créer vos API routes Stripe.

---

## 📁 STRUCTURE DES DOSSIERS

Créez cette structure à la racine de votre projet :

```
/
├── api/
│   ├── create-checkout-session.ts
│   └── webhooks.ts
├── src/
└── package.json
```

---

## 📄 FICHIER 1 : `/api/create-checkout-session.ts`

**Créez ce fichier et copiez-collez ce code :**

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
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      packageName, 
      price, 
      customerEmail, 
      customerName,
      formData 
    } = req.body;

    // Validation
    if (!packageName || !price || !customerEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields: packageName, price, customerEmail' 
      });
    }

    // Calcul du prix avec TVA 21% (Belgique)
    const priceHTVA = price;
    const priceTVAC = Math.round(priceHTVA * 1.21);
    const priceInCents = priceTVAC * 100;

    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Package ${packageName}`,
              description: `Création de site web professionnel - ${packageName}`,
              metadata: {
                package: packageName,
                priceHTVA: priceHTVA.toString(),
                tva: '21%',
              },
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      customer_email: customerEmail,
      metadata: {
        packageName,
        customerName: customerName || '',
        priceHTVA: priceHTVA.toString(),
        priceTVAC: priceTVAC.toString(),
        // Informations client
        firstName: formData?.firstName || '',
        lastName: formData?.lastName || '',
        phone: formData?.phone || '',
        company: formData?.company || '',
        // Informations projet
        projectName: formData?.projectName || '',
        projectDescription: formData?.projectDescription || '',
        deadline: formData?.deadline || '',
      },
      success_url: `${req.headers.origin || 'https://votre-site.vercel.app'}?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${req.headers.origin || 'https://votre-site.vercel.app'}?canceled=true`,
      billing_address_collection: 'required',
    });

    console.log('✅ Stripe session created:', session.id);

    return res.status(200).json({ 
      url: session.url,
      sessionId: session.id 
    });

  } catch (error: any) {
    console.error('❌ Stripe error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}
```

---

## 📄 FICHIER 2 : `/api/webhooks.ts`

**Créez ce fichier et copiez-collez ce code :**

```typescript
import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Désactiver le body parser de Vercel pour recevoir le raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper pour lire le body comme buffer
async function buffer(req: VercelRequest): Promise<Buffer> {
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    // Vérifier la signature du webhook
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Traiter les événements Stripe
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      
      console.log('✅ Paiement réussi !');
      console.log('Session ID:', session.id);
      console.log('Customer email:', session.customer_email);
      console.log('Amount:', session.amount_total ? session.amount_total / 100 : 0, 'EUR');
      console.log('Metadata:', session.metadata);

      // 🔔 ICI : Envoyez un email de confirmation au client
      // Exemple avec Resend :
      // await resend.emails.send({
      //   from: 'noreply@votre-site.com',
      //   to: session.customer_email,
      //   subject: 'Confirmation de commande',
      //   html: '<p>Merci pour votre commande!</p>'
      // });

      // 🔔 ICI : Envoyez-vous une notification
      // await resend.emails.send({
      //   from: 'notifications@votre-site.com',
      //   to: 'slate.dev@gmail.com',
      //   subject: 'Nouvelle commande reçue !',
      //   html: `<p>Package: ${session.metadata?.packageName}</p>`
      // });

      // 💾 ICI : Sauvegardez la commande dans une base de données
      // await db.orders.create({ ... });

      break;

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('💰 Payment Intent succeeded:', paymentIntent.id);
      break;

    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('❌ Payment Intent failed:', failedPaymentIntent.id);
      
      // 🔔 ICI : Notifiez-vous des paiements échoués
      
      break;

    default:
      console.log(`ℹ️  Unhandled event type: ${event.type}`);
  }

  // Retourner 200 pour confirmer la réception
  return res.status(200).json({ received: true });
}
```

---

## 🔧 CONFIGURATION SUPPLÉMENTAIRE

### Installer les types TypeScript (optionnel mais recommandé)

Si vous avez des erreurs TypeScript, installez :

```bash
npm install --save-dev @vercel/node @types/node
```

---

## ⚙️ VARIABLES D'ENVIRONNEMENT

Dans Vercel, ajoutez ces 3 variables :

```env
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_SECRETE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_VOTRE_CLE_PUBLIQUE
STRIPE_WEBHOOK_SECRET=whsec_VOTRE_SECRET_WEBHOOK
```

**Comment obtenir `STRIPE_WEBHOOK_SECRET` :**
1. Dashboard Stripe → Développeurs → Webhooks
2. Cliquez "Ajouter un endpoint"
3. URL : `https://votre-site.vercel.app/api/webhooks`
4. Événements à écouter :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copiez le "Signing secret" (commence par `whsec_...`)

---

## 🧪 TESTER LOCALEMENT (OPTIONNEL)

Pour tester en local avec Stripe CLI :

```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# Se connecter
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks

# Déclencher un événement test
stripe trigger checkout.session.completed
```

---

## ✅ VÉRIFIER QUE ÇA FONCTIONNE

### Test complet :

1. Déployez votre site sur Vercel
2. Vérifiez que les variables d'environnement sont configurées
3. Allez sur `https://votre-site.vercel.app`
4. Cliquez sur "Commander" → Remplissez le formulaire
5. Utilisez la carte : `4242 4242 4242 4242`
6. Le paiement devrait réussir et vous devriez être redirigé
7. Vérifiez dans Dashboard Stripe → Paiements → Vous devriez voir la transaction

---

## 🚨 DÉPANNAGE

### Erreur : "Stripe is not defined"
→ Vérifiez que le package `stripe` est installé : `npm install stripe`

### Erreur : "Invalid API key"
→ Vérifiez que `STRIPE_SECRET_KEY` est bien définie dans Vercel

### Erreur : "Webhook signature verification failed"
→ Vérifiez que `STRIPE_WEBHOOK_SECRET` est correct

### La page de paiement ne s'ouvre pas
→ Regardez les logs Vercel pour voir l'erreur exacte

---

## 📚 RESSOURCES

- [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
- [Vercel Functions Docs](https://vercel.com/docs/functions)
- [Stripe Testing Cards](https://stripe.com/docs/testing#cards)

---

**🎉 C'est terminé ! Vos API routes Stripe sont prêtes.**

Déployez sur Vercel et testez immédiatement !
