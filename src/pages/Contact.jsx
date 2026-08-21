import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import Notice from "../components/Notice.jsx";
import { required, isEmail, minLength } from "../utils/validators.js";
import { addRequest } from "../utils/requestStore.js";
import { sendEmployeeNotification } from "../utils/emailNotification.js";

const FAQ = [
  {
    q: "How much does it cost to adopt?",
    a: "We ask for a small adoption fee that helps cover vaccination and desexing. The exact amount is confirmed during your interview.",
  },
  {
    q: "Do I have to be a member to adopt?",
    a: "Yes! An account is free and lets our team follow up with you. You can register in about a minute from the Join us page.",
  },
  {
    q: "I found a stray animal. Can you help?",
    a: "Please use the Release a Pet form or call us. We will do our best to help, subject to space in our shelter.",
  }
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
  const [emailMessage, setEmailMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const e = {};

    if (required(values.name)) e.name = required(values.name);
    if (required(values.email)) e.email = required(values.email);
    else if (isEmail(values.email)) e.email = isEmail(values.email);
    if (required(values.subject)) e.subject = required(values.subject);
    if (required(values.message)) e.message = required(values.message);
    else if (minLength(values.message, 10)) e.message = minLength(values.message, 10);

    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      return;
    }

    const request = {
      type: "Contact",
      petName: values.subject,
      petType: "General enquiry",
      applicantName: values.name,
      email: values.email,
      phone: "Not given",
      notes: values.message,
    };

    addRequest(request);

    const emailResult = await sendEmployeeNotification(request);
    setEmailMessage(emailResult.message);
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
        <div>
          {submitted ? (
            <Notice type="success" title="Thanks for reaching out!">
              Your message was saved for the employee team to review.{" "}
              {emailMessage || "Employees can see it after logging in."}
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

        <aside className="contact-aside">
          <div className="info-card">
            <h3>Visit or call</h3>
            <p>
              12 Sunshine Avenue, Singapore 123456
              <br />
              Open daily · 10am – 6pm
            </p>
            <p>
              disposablefad@gmail.com
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
