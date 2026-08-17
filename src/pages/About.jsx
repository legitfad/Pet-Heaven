import SectionHeading from "../components/SectionHeading.jsx";
import Button from "../components/Button.jsx";

const VALUES = [
  {
    icon: "🐾",
    title: "Compassion first",
    text: "Every animal is treated with kindness, patience and respect while in our care.",
  },
  {
    icon: "🔎",
    title: "The right match",
    text: "We take time to match each pet with a family that truly suits them.",
  },
  {
    icon: "🌱",
    title: "A lasting home",
    text: "We support adopters afterwards so the match lasts a lifetime, not just a day.",
  },
];

export default function About() {
  return (
    <>
      <section className="section">
        <div className="container narrow">
          <SectionHeading
            as="h1"
            eyebrow="About us"
            title="Our story & purpose"
          />
          <p className="prose">
            Pet Heaven is a charity society that cares for the welfare of
            abandoned cats and dogs — pets whose original owners can no longer
            keep them. Every year, many animals are left without a home through
            no fault of their own. Our purpose is simple: to give each of them a
            safe place to stay, the care they need, and a second chance at a
            loving family.
          </p>
          <p className="prose">
            Founded by a small group of animal lovers, Pet Heaven today runs on
            the dedication of its staff and volunteers. When a pet comes into our
            care, our team looks after it, arranges veterinary checks, and works
            patiently to understand its personality — so we can find the home
            where it will thrive.
          </p>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <SectionHeading
            center
            eyebrow="Our facilities"
            title="What we provide"
          />
          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Shelter &amp; daily care</h3>
              <p>
                Clean, comfortable spaces with food, bedding and enrichment, so
                every pet feels safe while it waits for a home.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🩺</div>
              <h3>Veterinary care</h3>
              <p>
                Health checks, vaccinations and desexing through our partner
                vets, so pets leave us happy and healthy.
              </p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Rehoming service</h3>
              <p>
                A careful adoption process — including interviews — that puts the
                wellbeing of the pet and the family first.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading center eyebrow="What we stand for" title="Our values" />
          <div className="feature-grid three">
            {VALUES.map((v) => (
              <article className="feature-card" key={v.title}>
                <div className="feature-icon">
                  {v.icon}
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container narrow">
          <SectionHeading eyebrow="Visit us" title="Where to find us" />
          <div className="info-grid">
            <div>
              <h4>Address</h4>
              <p>
                12 Sunshine Avenue
                <br />
                Singapore 123456
              </p>
            </div>
            <div>
              <h4>Opening hours</h4>
              <p>
                Every day
                <br />
                10:00am – 6:00pm
              </p>
            </div>
            <div>
              <h4>Get in touch</h4>
              <p>
                admin@petheaven.org.sg
                <br />
                +65 6123 4567
              </p>
            </div>
          </div>
          <div className="btn-row">
            <Button to="/adopt">See pets for adoption</Button>
            <Button to="/register" variant="secondary">
              Become a member
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
