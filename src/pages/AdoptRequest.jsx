import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPet } from "../data/pets.js";
import { useMember } from "../context/MemberContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import Notice from "../components/Notice.jsx";
import { required, isEmail, isPhone } from "../utils/validators.js";
import { sendMailto, ADMIN_EMAIL } from "../utils/mailto.js";

// ---------------------------------------------------------------------------
// AdoptRequest — the online form for a member to adopt a SPECIFIC pet.
//
// Two "gates" protect this page:
//   1. If the pet id in the URL is unknown, we show a not-found message.
//   2. If nobody is logged in, we ask the visitor to register or log in first
//      (the brief says adoption is for members).
//
// On a valid submit we build a mailto: link so the request is "mailed to the
// administrator", then show a success message.
// ---------------------------------------------------------------------------
export default function AdoptRequest() {
  const { id } = useParams();
  const pet = getPet(id);
  const { currentMember } = useMember();

  // Pre-fill the name/email from the logged-in member (fixed with || "" so the
  // fields are always controlled, even before the member check below).
  const [values, setValues] = useState({
    name: currentMember ? currentMember.name : "",
    email: currentMember ? currentMember.email : "",
    phone: "",
    address: "",
    housing: "",
    hasPets: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // --- Gate 1: unknown pet ---
  if (!pet) {
    return (
      <div className="container section narrow">
        <h1>Pet not found</h1>
        <p>Sorry, we could not find that pet.</p>
        <Button to="/adopt">Back to all pets</Button>
      </div>
    );
  }

  // --- Gate 2: must be signed in ---
  if (!currentMember) {
    return (
      <div className="container section narrow">
        <SectionHeading
          as="h1"
          eyebrow="Members only"
          title={`Sign in to adopt ${pet.name}`}
        />
        <Notice type="info" title="A free membership is required">
          Adoption requests are for Pet Heaven members, so our team can follow up
          with you. Please log in or register — it only takes a minute — then come
          back to this pet.
        </Notice>
        <div className="btn-row">
          <Button to="/login">Log in</Button>
          <Button to="/register" variant="secondary">
            Register
          </Button>
          <Button to={`/adopt/${pet.id}`} variant="ghost">
            Back to {pet.name}
          </Button>
        </div>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  // Build an object of { fieldName: errorMessage } for any invalid fields.
  function validate() {
    const e = {};
    e.name = required(values.name);
    e.email = required(values.email) || isEmail(values.email);
    e.phone = required(values.phone) || isPhone(values.phone);
    e.address = required(values.address);
    e.housing = required(values.housing);
    e.hasPets = required(values.hasPets);
    e.reason = required(values.reason);
    // Drop the keys that came back empty (empty = valid).
    Object.keys(e).forEach((k) => !e[k] && delete e[k]);
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const foundErrors = validate();
    const agreeMsg = agree
      ? ""
      : "Please confirm you understand the adoption process.";
    setErrors(foundErrors);
    setAgreeError(agreeMsg);

    // If anything is invalid, focus the first bad field and stop.
    if (Object.keys(foundErrors).length > 0) {
      const first = Object.keys(foundErrors)[0];
      const el = document.getElementById("field-" + first);
      if (el) el.focus();
      return;
    }
    if (agreeMsg) return;

    // All good — mail the request to the administrator.
    sendMailto(`Adoption request for ${pet.name}`, {
      Pet: `${pet.name} (${pet.breed}, ${pet.age})`,
      "Applicant name": values.name,
      Email: values.email,
      Phone: values.phone,
      Address: values.address,
      "Home type": values.housing,
      "Other pets at home": values.hasPets,
      "Why they want to adopt": values.reason,
      "Member account": currentMember.email,
    });
    setSubmitted(true);
  }

  // --- Success screen ---
  if (submitted) {
    return (
      <div className="container section narrow">
        <Notice type="success" title="Your adoption request is ready to send!">
          Your email app should have opened with the request pre-filled — just
          press <strong>Send</strong> to deliver it to our team. If it did not
          open, please email us at <a href={`mailto:${ADMIN_EMAIL}`}>{ADMIN_EMAIL}</a>.
          We will review your request and contact you to arrange a meet-up.
        </Notice>
        <div className="btn-row">
          <Button to="/adopt">Browse more pets</Button>
          <Button to="/" variant="ghost">
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  // --- The form ---
  return (
    <div className="container section narrow">
      <p className="breadcrumb">
        <Link to={`/adopt/${pet.id}`}>← Back to {pet.name}</Link>
      </p>
      <SectionHeading
        as="h1"
        eyebrow="Adoption request"
        title={`Request to adopt ${pet.name}`}
        subtitle="Tell us a little about yourself and your home. Our staff will review your request and arrange an interview."
      />

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Your full name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
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
        <FormField
          label="Home address"
          name="address"
          value={values.address}
          onChange={handleChange}
          error={errors.address}
          required
        />
        <div className="form-row">
          <FormField
            label="Type of home"
            name="housing"
            type="select"
            value={values.housing}
            onChange={handleChange}
            error={errors.housing}
            required
            options={[
              "HDB flat",
              "Condominium",
              "Landed property",
              "Rented home",
              "Other",
            ]}
          />
          <FormField
            label="Other pets at home?"
            name="hasPets"
            type="select"
            value={values.hasPets}
            onChange={handleChange}
            error={errors.hasPets}
            required
            options={[
              "No other pets",
              "Yes — cat(s)",
              "Yes — dog(s)",
              "Yes — other pets",
            ]}
          />
        </div>
        <FormField
          label={`Why would you like to adopt ${pet.name}?`}
          name="reason"
          type="textarea"
          value={values.reason}
          onChange={handleChange}
          error={errors.reason}
          required
          placeholder="Tell us about your household, your experience with pets, and why this pet is right for you."
        />

        <div className="form-field checkbox-field">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              I understand Pet Heaven staff will review my request and arrange an
              interview before any adoption.
            </span>
          </label>
          {agreeError && <p className="field-error">{agreeError}</p>}
        </div>

        <Button type="submit">Submit adoption request</Button>
      </form>
    </div>
  );
}
