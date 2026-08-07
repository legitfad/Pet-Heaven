import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import Notice from "../components/Notice.jsx";
import { required, isEmail, isPhone } from "../utils/validators.js";
import { sendMailto, ADMIN_EMAIL } from "../utils/mailto.js";

// ---------------------------------------------------------------------------
// Release — the online form for a pet owner who can no longer keep their pet
// and wants Pet Heaven to help rehome it. Open to everyone (no login needed).
// On a valid submit the details are mailed to the administrator.
//
// It uses the SAME building blocks as the adoption form (FormField, validators,
// mailto) — a good example of reusing components across different forms.
// ---------------------------------------------------------------------------
export default function Release() {
  const [values, setValues] = useState({
    ownerName: "",
    email: "",
    phone: "",
    petType: "",
    petName: "",
    petAge: "",
    reason: "",
    health: "",
  });
  const [errors, setErrors] = useState({});
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const e = {};
    e.ownerName = required(values.ownerName);
    e.email = required(values.email) || isEmail(values.email);
    e.phone = required(values.phone) || isPhone(values.phone);
    e.petType = required(values.petType);
    e.petName = required(values.petName);
    e.reason = required(values.reason);
    Object.keys(e).forEach((k) => !e[k] && delete e[k]);
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const foundErrors = validate();
    const agreeMsg = agree
      ? ""
      : "Please confirm you are the pet's owner and the details are accurate.";
    setErrors(foundErrors);
    setAgreeError(agreeMsg);

    if (Object.keys(foundErrors).length > 0) {
      const first = Object.keys(foundErrors)[0];
      const el = document.getElementById("field-" + first);
      if (el) el.focus();
      return;
    }
    if (agreeMsg) return;

    sendMailto("Pet release request", {
      "Owner name": values.ownerName,
      Email: values.email,
      Phone: values.phone,
      "Pet type": values.petType,
      "Pet name": values.petName,
      "Pet age": values.petAge || "Not given",
      "Reason for release": values.reason,
      "Health & temperament": values.health || "Not given",
    });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="container section narrow">
        <Notice type="success" title="Thank you — your request is ready to send">
          Your email app should have opened with the details pre-filled; just
          press <strong>Send</strong>. If it did not open, email us at{" "}
          <a href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a>. Our team will
          contact you to talk about the next steps for your pet.
        </Notice>
        <div className="btn-row">
          <Button to="/">Back to home</Button>
          <Button to="/about" variant="ghost">
            Learn about our process
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section narrow">
      <SectionHeading
        as="h1"
        eyebrow="Release a pet"
        title="Rehome a pet you can no longer keep"
        subtitle="We understand this is a hard decision. Fill in the form below and our staff will follow up to find a safe, loving home for your pet."
      />

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Your full name"
          name="ownerName"
          value={values.ownerName}
          onChange={handleChange}
          error={errors.ownerName}
          required
          autoComplete="name"
        />
        <div className="form-row">
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
          <FormField
            label="Phone number"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            autoComplete="tel"
          />
        </div>
        <div className="form-row">
          <FormField
            label="Type of pet"
            name="petType"
            type="select"
            value={values.petType}
            onChange={handleChange}
            error={errors.petType}
            required
            options={["Cat", "Dog", "Other"]}
          />
          <FormField
            label="Pet's name"
            name="petName"
            value={values.petName}
            onChange={handleChange}
            error={errors.petName}
            required
          />
        </div>
        <FormField
          label="Pet's age (approximate)"
          name="petAge"
          value={values.petAge}
          onChange={handleChange}
          placeholder="e.g. 2 years"
        />
        <FormField
          label="Why do you need to rehome your pet?"
          name="reason"
          type="textarea"
          value={values.reason}
          onChange={handleChange}
          error={errors.reason}
          required
          placeholder="A short explanation helps us understand your situation."
        />
        <FormField
          label="Pet's health & temperament"
          name="health"
          type="textarea"
          value={values.health}
          onChange={handleChange}
          placeholder="Is your pet vaccinated / desexed? Is it good with children or other animals?"
        />

        <div className="form-field checkbox-field">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              I confirm I am the pet's owner and the information above is accurate.
            </span>
          </label>
          {agreeError && <p className="field-error">{agreeError}</p>}
        </div>

        <Button type="submit">Submit release request</Button>
      </form>
    </div>
  );
}
