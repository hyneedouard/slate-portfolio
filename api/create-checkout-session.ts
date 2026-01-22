import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { packageName, price, customerEmail, customerName, formData } = req.body;

    if (!packageName || !price || !customerEmail) {
      return res.status(400).json({ error: 'Données manquantes' });
    }

    const priceTVAC = Math.round(price * 1.21 * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Package ${packageName}`,
            description: 'Création de site web professionnel',
          },
          unit_amount: priceTVAC,
        },
        quantity: 1,
      }],
      customer_email: customerEmail,
      metadata: {
        packageName,
        customerName: customerName || '',
        ...formData,
      },
      success_url: `${req.headers.origin}?success=true`,
      cancel_url: `${req.headers.origin}?canceled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Erreur Stripe:', error);
    return res.status(500).json({ error: error.message });
  }
}
