"use client"
import Image from "next/image";
import { FaPlay, FaPen, FaCircle, FaBars, FaMobileAlt, FaShieldAlt, FaHandsHelping , FaInstagram, FaTwitter, FaFacebook, FaTiktok } from 'react-icons/fa';
import "./home.css";
import { useAuth } from './AuthContext';

export default function Home() {
  const { user, setIsAuthModalOpen } = useAuth();

  return (
    <>
      {/* Navigation Bar */}
      <nav>
        <a href="#">
          <Image src="/images/logo-dark.png" alt="Logo" className="nav__logo" width={139} height={39} />
        </a>
        <div className="nav__links">
          <a href="#" className="nav__link">About</a>
          <a href="#" className="nav__link">Features</a>
          <a href="#" className="nav__link">How it works</a>
          <a href="#" className="nav__link">Privacy policy</a>
        </div>
        <button className="nav__button" onClick={() => {
            setIsAuthModalOpen(true);
        }}>Sign In</button>
      </nav>

      {/* Hero */}
      <header>
        <div className="row header__row">
          <div className="header__widget">
            <span className="header__widget__title">Meet HollywoodAI</span>
            <span className="header__widget__emoji"> ⏺ </span>
            <span className="header__widget__description">Unleash the Power of AI</span>
          </div>
          <h1 className="header__title">
            <span>Ultimate AI</span>
            <br />
            <span className="inline-flex gap-2">Summariser
            <Image src="/images/bolt.svg" alt="Bolt Icon" className="header__title__icon" width={47} height={62} /></span>
          </h1>
          <p className="header__paragraph">
            All-in-one platform to watch your favourite movies in minutes using AI.
          </p>
          <a className="header__button">
            <div className="header__button__iconWrapper">
              <FaPlay className="header__button__icon" />
            </div>
            <span className="header__button__text">See how it works &nbsp;</span>
          </a>
        </div>
        <svg className="header__svg" width="1440" height="105" viewBox="0 0 1440 105" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0C240 68.7147 480 103.072 720 103.072C960 103.072 1200 68.7147 1440 0V104.113H0V0Z"></path>
        </svg>
      </header>

      {/* Features */}
      <section id="features">
        <div className="container">
          <div className="row features__row">
            <h1 className="features__title">The future of AI.</h1>
            <div className="features__para">
              HollywoodAI is designed to help you enjoy high-quality summaries instantly, without breaking a sweat.
            </div>
            <div className="features__list">
              {[
                {
                  icon: <FaPen />,
                  title: "AI Generated Summaries",
                  description: "Save time with summaries of the world's best movies."
                },
                {
                  icon: <FaCircle />,
                  title: "Read or Listen",
                  description: "Switch between reading and listening modes seamlessly."
                },
                {
                  icon: <FaBars />,
                  title: "Find Your Next Flick",
                  description: "Explore our movie lists and personalized recommendations."
                },
                {
                  icon: <FaMobileAlt />,
                  title: "Multi Platform Access",
                  description: "Enjoy your favourite movies on any device."
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Payment Gateways",
                  description: "We securely process all card payments."
                },
                {
                  icon: <FaHandsHelping />,
                  title: "Eco-Friendly Option",
                  description: "HollywoodAI donates 10% of profits to charities."
                }
              ].map((feature, index) => (
                <div className="feature" key={index}>
                  <div className="feature__iconWrapper">
                    {feature.icon}
                  </div>
                  <div className="feature__text">
                    <h4 className="feature__text__title">{feature.title}</h4>
                    <p className="feature__text__para">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section id="summary">
        <div className="container">
          <div className="row summary__row">
            <div className="summary__text">
              <div className="summary__widget">
                <span className="summary__widget__title">The future of entertainment</span>
                <span className="summary__widget__emoji"> ⏺ </span>
                <span className="summary__widget__description">AI</span>
              </div>
              <h2 className="summary__title">Say goodbye to 2 hour movies.</h2>
              <p className="summary__para">
                HollywoodAI is designed to help you get high-quality summaries of your favourite movies instantly, without breaking a sweat. With our intuitive interface and powerful features, you can easily digest any movie in just minutes instead of hours.
              </p>
            </div>
            <figure className="summary__figure">
              <Image src="/images/summary.png" alt="Summary" className="summary__figure__img" width={500} height={300} />
              <span className="summary__figure__caption1">Search. Summarise. Repeat.</span>
              <span className="summary__figure__caption2">Powered by AI</span>
            </figure>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps">
        <div className="container">
          <div className="row steps__row">
            <h2 className="steps__title">So, how does it work?</h2>
            <div className="steps__list">
              {[
                "Browse through our wide selection of the world's most popular movies",
                "Simply select a movie you'd like to have summarised and let our AI algorithms do the rest.",
                "Take a couple of minutes to read and listen to the summary. And you’re done!"
              ].map((step, index) => (
                <div className="step" key={index}>
                  <div className="step__number">
                    <span>{index + 1}</span>
                  </div>
                  <div className="step__para">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <div className="container">
          <div className="row testimonials__row">
            <div className="testimonials__widget">
              <span className="testimonials__widget__title">Testimonials</span>
              <span className="testimonials__widget__emoji">⏺</span>
              <span className="testimonials__widget__description">TrustPilot</span>
            </div>
            <h2 className="testimonials__title">What our members say.</h2>
            <div className="testimonials__list">
              {[
                {
                  img: "/images/testimonial-1.png",
                  name: "Olivia Chapman",
                  occupation: "Student",
                  para: "Hollywood AI made big promises and delivered on them! Absolutely cannot live without this tool!"
                },
                {
                  img: "/images/testimonial-2.png",
                  name: "Eric Fisherman",
                  occupation: "Professor",
                  para: "Definitely worth the purchase if you are a busy person who stills want to keep up with the latest movies"
                },
                {
                  img: "/images/testimonial-3.png",
                  name: "Anisong Silkum",
                  occupation: "Student",
                  para: "The summaries provide a really great overview of the movies. It's also very easy to use. 5/5!"
                }
              ].map((testimonial, index) => (
                <div className="testimonial" key={index}>
                  <Image src={testimonial.img} alt={testimonial.name} className="testimonial__img" width={100} height={100} />
                  <span className="testimonial__name">{testimonial.name}</span>
                  <span className="testimonial__occupation">{testimonial.occupation}</span>
                  <p className="testimonial__para">{testimonial.para}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <section id="cta">
          <svg className="cta__svg" preserveAspectRatio="none" width="1440" height="86" viewBox="0 0 1440 86" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 85.662C240 29.1253 480 0.857 720 0.857C960 0.857 1200 29.1253 1440 85.662V0H0V85.662Z"></path>
          </svg>
          <div className="container">
            <div className="row cta__row">
              <p className="cta__widget">
                <span className="cta__widget__logo">HollywoodAI</span>
                Endless benefits, one subscription.
              </p>
              <h2 className="cta__title">Start your free trial.</h2>
              <p className="cta__para">
                Enjoy your favourite movies in minutes by letting AI do the work for you.
              </p>
              <button className="cta__button">
                <span className="cta__button__text">Join HollywoodAI</span>
                <Image src="/images/bolt.svg" alt="Bolt Icon" className="cta__button__icon" width={30} height={30} />
              </button>
            </div>
          </div>
        </section>
        <section id="links">
          <div className="links__container">
            <Image src="/images/logo-light.png" alt="Logo" className="links__logo" width={100} height={50} />
            <div className="links__list">
              {[
                { platform: "Instagram", icon: <FaInstagram /> },
                { platform: "Twitter", icon: <FaTwitter /> },
                { platform: "Facebook", icon: <FaFacebook /> },
                { platform: "Tiktok", icon: <FaTiktok /> }
              ].map((link, index) => (
                <a className="links__link" href="#" key={index}>
                  {link.icon}
                  <span className="links__link__text">{link.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section id="copyright">
          <div className="copyright__container">
            <form action="" className="copyright__form">
              <input type="text" className="copyright__form__input" placeholder="Enter your email" />
              <button type="button" className="copyright__form__button">Subscribe</button>
            </form>
            <span className="copyright__text">2024 Copyright © Hollywood AI</span>
          </div>
        </section>
      </footer>
    </>
  );
}