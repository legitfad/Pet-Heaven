import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";
import PetGrid from "../components/PetGrid.jsx";
import PetAvatar from "../components/PetAvatar.jsx";
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
    text: "Every pet is health-checked, vaccinated and desexed by our vet partners before going to a new home.",
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
  { n: 2, title: "Become a member", text: "Register a free membership so we can follow up with you." },
  { n: 3, title: "Send a request", text: "Fill in the short adoption form for the pet you love." },
  { n: 4, title: "Meet & welcome home", text: "We arrange a meet-up, then help you welcome your new friend." },
];

export default function Home() {
  const featured = getFeaturedPets(3);
  const heroPets = [PETS[0], PETS[4], PETS[2]];

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
          </div>

          <div className="hero-art">
            {heroPets.map((pet, i) => (
              <div key={pet.id} className={"hero-blob blob-" + i}>
                <PetAvatar
                  species={pet.species}
                  bg={pet.bg}
                  name={pet.name}
                />
              </div>
            ))}
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
              Join our community of supporters. Membership is free and lets you
              request adoptions and stay in touch with our work.
            </p>
          </div>
          <Button to="/register">Join us today</Button>
        </div>
      </section>
    </>
  );
}
