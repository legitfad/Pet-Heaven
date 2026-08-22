import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import PetGrid from "../components/PetGrid.jsx";
import PetImage from "../components/PetImage.jsx";
import { getFeaturedPets, PETS } from "../data/pets.js";

const FACILITIES = [
  {
    icon: "🏠",
    title: "Safe shelter",
    text: "A clean, caring shelter where abandoned cats and dogs are fed, comforted and kept safe while they wait.",
  },
  {
    icon: "🩺",
    title: "Health & vaccination",
    text: "Every pet is health-checked, vaccinated and spayed by our vet partners before going to a new home.",
  },
  {
    icon: "🤝",
    title: "Careful rehoming",
    text: "Our staff interview each adopter and match pets to families to make sure every placement lasts.",
  },
  {
    icon: "❤️",
    title: "Ongoing support",
    text: "New families get advice and support from our team, so both pet and owner settle in happily.",
  },
];

const STEPS = [
  { n: 1, title: "Browse the pets", text: "Look through the cats and dogs currently in our care." },
  { n: 2, title: "Become a member", text: "Register a free account so we can follow up with you." },
  { n: 3, title: "Send a request", text: "Fill in the short adoption form for the pet you love." },
  { n: 4, title: "Meet & welcome home", text: "We arrange a meet-up, then help you welcome your new friend." },
];

const HERO_STORY = [
  {
    label: "Rescue",
    title: "A pet arrives safely",
    text: "Owners can ask for help before a pet is abandoned.",
  },
  {
    label: "Care",
    title: "Health and comfort first",
    text: "Staff record needs, vaccines, traits and temperament.",
  },
  {
    label: "Match",
    title: "The right family finds them",
    text: "Visitors browse, take the quiz and submit requests.",
  },
];

export default function Home() {
  const featured = getFeaturedPets(3);
  const [spotlightPet] = useState(() => {
    return PETS[Math.floor(Math.random() * PETS.length)];
  });

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="eyebrow">Every pet deserves a home</p>
            <h1>Give an abandoned pet a second chance at happiness</h1>
            <p className="lead">
              Pet Heaven cares for cats and dogs whose owners can no longer keep
              them, and helps them find loving new families. Adopt a friend,
              support our work, or rehome a pet. We are here to help.
            </p>
            <div className="hero-actions">
              <Button to="/adopt">Find a pet to adopt</Button>
              <Button to="/release" variant="secondary">
                Release a pet
              </Button>
            </div>
            <div className="hero-mini-stats" aria-label="Pet Heaven impact">
              <span>500+ pets rehomed</span>
              <span>200+ volunteers</span>
              <span>10 years of care</span>
            </div>
          </div>

          <div className="hero-showcase" aria-label="Pet Heaven rescue journey">
            <div className="hero-spotlight">
              <div className="hero-spotlight-photo">
                <PetImage pet={spotlightPet} />
              </div>
              <div className="hero-spotlight-copy">
                <span>Featured friend</span>
                <h2>{spotlightPet.name}</h2>
                <p>{spotlightPet.breed}</p>
              </div>
            </div>

            <div className="hero-journey">
              <div className="journey-header">
                <span>How Pet Heaven helps</span>
                <strong>{PETS.length} pets in care</strong>
              </div>

              {HERO_STORY.map((item, i) => (
                <div className="journey-step" key={item.label}>
                  <span className="journey-number">{i + 1}</span>
                  <div>
                    <p>{item.label}</p>
                    <h3>{item.title}</h3>
                    <span className="journey-description">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Who we are"
            title="Caring for pets, one home at a time"
            subtitle="Pet Heaven is a charity society run by staff and volunteers who love animals. Here is how we care for the pets in our community."
          />
          <div className="feature-grid">
            {FACILITIES.map((f) => (
              <article className="feature-card" key={f.title}>
                <div className="feature-icon">
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Meet our friends"
              title="Pets looking for a home"
            />
            <Button to="/adopt" variant="ghost">
              See all pets →
            </Button>
          </div>
          <PetGrid pets={featured} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Simple steps"
            title="How adoption works"
          />
          <ol className="steps">
            {STEPS.map((s) => (
              <li className="step" key={s.n}>
                <span className="step-num">
                  {s.n}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="stats-band">
        <div className="container stats-inner">
          <div className="stat">
            <span className="stat-num">500+</span>
            <span className="stat-label">Pets rehomed</span>
          </div>
          <div className="stat">
            <span className="stat-num">200+</span>
            <span className="stat-label">Active volunteers</span>
          </div>
          <div className="stat">
            <span className="stat-num">10</span>
            <span className="stat-label">Years of caring</span>
          </div>
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Non-profit</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-card">
          <div>
            <h2>Become a Pet Heaven member</h2>
            <p>
              Join our community of supporters. Account is free and lets you request adoptions and stay in touch with our work.
            </p>
          </div>
          <Button to="/register">Join us today</Button>
        </div>
      </section>
    </>
  );
}
