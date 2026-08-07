import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import Notice from "../components/Notice.jsx";
import { required, isEmail, minLength } from "../utils/validators.js";
import { sendMailto, ADMIN_EMAIL } from "../utils/mailto.js";

// ---------------------------------------------------------------------------
// Contact — a general enquiry form plus a short FAQ. The FAQ uses the browser's
// native <details>/<summary> elements, which give an accessible expand/collapse
// accordion with no extra JavaScript.
// ---------------------------------------------------------------------------

const FAQ = [
  {
    q: "How much does it cost to adopt?",
    a: "We ask for a small adoption fee that helps cover vaccination and desexing. The exact amount is confirmed during your interview.",
  },
  {
    q: "Do I have to be a member to adopt?",
    a: "Yes — membership is free and lets our team follow up with you. You can register in about a minute from the Join us page.",
  },
  {
    q: "I found a stray animal. Can you help?",
    a: "Please use the Release a Pet form or call us. We will do our best to help, subject to space in our shelter.",
  },
  {
    q: "Can I volunteer or donate?",
    a: "Absolutely! Choose 'Volunteering' or 'Donating' when you register, and our team will be in touch with ways to help.",
  },
];

export default function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const e = {};
    e.name = required(values.name);
    e.email = required(values.email) || isEmail(values.email);
    e.subject = required(values.subject);
    e.message = required(values.message) || minLength(values.message, 10);
    Object.keys(e).forEach((k) => !e[k] && delete e[k]);
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      const first = Object.keys(foundErrors)[0];
      const el = document.getElementById("field-" + first);
      if (el) el.focus();
      return;
    }
    sendMailto("Website enquiry: " + values.subject, {
      Name: values.name,
      Email: values.email,
      Subject: values.subject,
      Message: values.message,
    });
    setSubmitted(true);
  }

  return (
    <div className="container section">
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Have a question about adopting, rehoming or supporting Pet Heaven? Send us a message."
      />

      <div className="contact-layout">
        {/* Contact form */}
        <div>
          {submitted ? (
            <Notice type="success" title="Thanks for reaching out!">
              Your email app should have opened with your message ready to send.
              If it did not, email us directly at{" "}
              <a href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a>.
            </Notice>
          ) : (
            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <FormField
                  label="Your name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                  required
                  autoComplete="name"
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  autoComplete="email"
                />
              </div>
              <FormField
                label="Subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                error={errors.subject}
                required
              />
              <FormField
                label="Message"
                name="message"
                type="textarea"
                value={values.message}
                onChange={handleChange}
                error={errors.message}
                required
                rows={5}
              />
              <Button type="submit">Send message</Button>
            </form>
          )}
        </div>

        {/* FAQ + contact details */}
        <aside className="contact-aside">
          <div className="info-card">
            <h3>Visit or call</h3>
            <p>
              12 Sunshine Avenue, Singapore 123456
              <br />
              Open daily · 10am – 6pm
            </p>
            <p>
              {ADMIN_EMAIL}
              <br />
              +65 6123 4567
            </p>
          </div>

          <h3 className="faq-title">Frequently asked questions</h3>
          <div className="faq">
            {FAQ.map((item) => (
              <details className="faq-item" key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
