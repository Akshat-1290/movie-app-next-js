import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { priceId, userId, mode, planName, recurringInterval } = await req.json();
    console.log('Received data:', { priceId, userId, mode, planName, recurringInterval });

    if (!priceId || !mode || !planName || !recurringInterval) {
      throw new Error('Missing required parameters');
    }

    console.log('Creating Stripe session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode,
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/plans`,
      client_reference_id: userId,
      metadata: {
        planName,
        recurringInterval,
      },
    });

    if (!session || !session.id) {
      throw new Error('Failed to create Stripe session');
    }

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Error in create-checkout-session:', err);
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}
