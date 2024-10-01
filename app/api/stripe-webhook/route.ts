import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export async function POST(req: Request) {
  const buf = await buffer(req);
  const sig = req.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await fulfillOrder(session);
  }

  return NextResponse.json({ received: true });
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id;
  const planName = session.metadata?.planName;

  if (!userId || !planName) {
    console.error('Missing userId or planName in session');
    return;
  }

  try {
    await db.collection('users').doc(userId).update({
      plan: planName,
      stripeCustomerId: session.customer as string,
    });
    console.log(`Updated user ${userId} to plan ${planName}`);
  } catch (error) {
    console.error('Error updating user in Firestore:', error);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};