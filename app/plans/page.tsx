"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Search } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import SearchBar from "@/components/Search"
import { loadStripe } from '@stripe/stripe-js'
import { useState } from "react"
import { useAuth } from "../AuthContext"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
export default function PricingPlans() {
  const {user} = useAuth()
  const [isProcessingPlan, setIsProcessingPlan] = useState("")

  const plans = [
    {
      name: "Premium",
      price: 19,
      priceId: "price_1Q3ZqdSEy77A1WNHVDzwdLZd",
      mode: "subscription",
      recurringInterval: "month",
      interval: "Monthly",
      features: [
        "Premium Support",
        "Access 100+ Summaries",
        "Higher Quality Audio",
        "License For Commercial Use",
        "2 Supported Devices",
      ],
    },
    {
      name: "VIP+",
      price: 190,
      priceId : "price_1Q3ZrSSEy77A1WNHYBwbUM3f",
      mode: "subscription",
      recurringInterval: "year",
      interval: "Yearly",
      features: [
        "2 Months Free",
        "Access 100+ Summaries",
        "Highest Quality Audio",
        "License For Commercial Use",
        "3 Supported Devices",
      ],
    },
  ]

  const handlePurchase = async ({priceId, planName, recurringInterval} : {priceId: string, planName: string, recurringInterval: string}) => {
    if (!priceId || !planName || !recurringInterval) return

    setIsProcessingPlan(planName)

    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to initialize')
      if (!user?.uid) throw new Error('User ID is not available')
        console.log('user.uid', user.uid)

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          mode: "subscription",
          planName: `${planName}`,
          recurringInterval,
        }),
      })

      const { sessionId } = await response.json()
      if (!user?.uid) throw new Error('User ID is not available')
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })


    } catch (err) {
      console.log(err)
    } finally {
      setIsProcessingPlan("")
    }
  }

  return (
   <main className="flex gap-7 overflow-hidden">
    <Sidebar/>
     <div className="container mx-auto px-4 py-8 h-[100vh] overflow-y-auto overflow-x-hidden">
        <SearchBar/>
      <h1 className="text-4xl font-bold mb-2">Plans</h1>
      <p className="text-xl text-gray-500 mb-8">
        Get unlimited access to our extensive library of movie summaries.
      </p>

      <h2 className="text-2xl font-semibold mb-6">Subscription Plans:</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12 ">
        {plans.map((plan, index) => (
          <Card key={index} className="w-full">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">
                <span className="text-2xl align-top">$</span>
                {plan.price}
                <span className="text-xl font-normal text-gray-500 ml-2">
                  {plan.interval}
                </span>
              </CardTitle>
              <p className="text-xl text-gray-500">{plan.name}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => handlePurchase({priceId: plan.priceId, planName: plan.name, recurringInterval: plan.recurringInterval})}>
               {isProcessingPlan === plan.name ? "Processing..." : "Choose plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Hollywood AI?</AccordionTrigger>
          <AccordionContent>
            Hollywood AI is an advanced movie summary service that uses artificial intelligence to provide high-quality summaries of movies.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How much does Hollywood AI cost?</AccordionTrigger>
          <AccordionContent>
            Hollywood AI offers two subscription plans: a monthly plan at $19 and a yearly plan at $190. The yearly plan offers additional benefits and savings.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="p">
          <AccordionTrigger>What can I watch on Hollywood AI</AccordionTrigger>
          <AccordionContent>
            Hollywood AI provides summaries for a wide range of movies, from classic films to the latest releases. Our library includes over 100 summaries, with new content added regularly.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
   </main>
  )
}