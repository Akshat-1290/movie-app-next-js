# HollywoodAI

HollywoodAI is an advanced movie summary service that uses artificial intelligence to provide high-quality summaries of movies. This Next.js application offers users the ability to browse, search, and access AI-generated summaries of popular movies.

## Features

- User authentication (sign up, login, guest login)
- Browse and search movie summaries
- AI-generated movie summaries with audio playback
- Favorite movies functionality
- Subscription plans (Premium and VIP+)
- Responsive design for various screen sizes

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Firebase (Authentication and Firestore)
- Stripe (Payment processing)
- Tailwind CSS
- Radix UI components
- Lucide React icons

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Firebase account
- Stripe account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/hollywood-ai.git
   cd hollywood-ai
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Contains the main application pages and components
- `components/`: Reusable React components
- `lib/`: Utility functions and helpers
- `public/`: Static assets (images, fonts, etc.)

## Key Components

- `AuthContext.tsx`: Manages user authentication state
- `AuthModal.tsx`: Handles user authentication UI
- `Sidebar.tsx`: Navigation sidebar component
- `MovieItem.tsx`: Displays individual movie details
- `AudioPlayer.tsx`: Custom audio player for movie summaries

## API Routes

- `/api/stripe-webhook`: Handles Stripe webhook events for subscription management

## Deployment

This project is set up for easy deployment on Vercel. Connect your GitHub repository to Vercel and it will automatically deploy your main branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.