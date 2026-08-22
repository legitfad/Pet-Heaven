import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPet } from "../data/pets.js";
import { useMember } from "../context/MemberContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import Notice from "../components/Notice.jsx";
import { required, isEmail, isPhone } from "../utils/validators.js";
import { addRequest } from "../utils/requestStore.js";
import { sendEmployeeNotification } from "../utils/emailNotification.js";

export default function AdoptRequest() {
  const { id } = useParams();
  const pet = getPet(id);
  const { currentMember } = useMember();

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
  const [emailMessage, setEmailMessage] = useState("");

  if (!pet) {
    return (
      <div className="container section narrow">
        <h1>Pet not found</h1>
        <p>Sorry, we could not find that pet.</p>
        <Button to="/adopt">Back to all pets</Button>
      </div>
    );
  }

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
          with you. Please log in or register - it only takes a minute.
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

  function validate() {
    const e = {};

    if (required(values.name)) e.name = required(values.name);
    if (required(values.email)) e.email = required(values.email);
    else if (isEmail(values.email)) e.email = isEmail(values.email);
    if (required(values.phone)) e.phone = required(values.phone);
    else if (isPhone(values.phone)) e.phone = isPhone(values.phone);
    if (required(values.address)) e.address = required(values.address);
    if (required(values.housing)) e.housing = required(values.housing);
    if (required(values.hasPets)) e.hasPets = required(values.hasPets);
    if (required(values.reason)) e.reason = required(values.reason);

    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const foundErrors = validate();
    const agreeMsg = agree
      ? ""
      : "Please confirm you understand the adoption process.";
    setErrors(foundErrors);
    setAgreeError(agreeMsg);

    if (Object.keys(foundErrors).length > 0) {
      return;
    }
    if (agreeMsg) return;

    const request = {
      type: "Adoption",
      petName: pet.name,
      petType: pet.species,
      applicantName: values.name,
      email: values.email,
      phone: values.phone,
      notes: values.reason,
    };

    addRequest(request);

    const emailResult = await sendEmployeeNotification(request);
    setEmailMessage(emailResult.message);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="container section narrow">
        <Notice type="success" title="Your adoption request has been submitted">
          Your request was saved for the employee team to review.
          {" "}
          {emailMessage || "Employees can see the request after logging in."}
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
              I understand Pet Heaven staff will review my request and arrange an interview before any adoption.
            </span>
          </label>
          {agreeError && <p className="field-error">{agreeError}</p>}
        </div>

        <Button type="submit">Submit adoption request</Button>
      </form>
    </div>
  );
}
