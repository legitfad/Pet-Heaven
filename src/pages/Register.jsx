import { useState } from "react";
import { Link } from "react-router-dom";
import { useMember } from "../context/MemberContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import Notice from "../components/Notice.jsx";
import {
  required,
  isEmail,
  minLength,
  mustMatch,
} from "../utils/validators.js";

export default function Register() {
  const { register } = useMember();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    password: "",
    confirm: "",
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
    e.name = required(values.name);
    e.email = required(values.email) || isEmail(values.email);
    e.interest = required(values.interest);
    e.password = required(values.password) || minLength(values.password, 6);
    e.confirm =
      required(values.confirm) ||
      mustMatch(values.confirm, values.password, "Passwords");
    Object.keys(e).forEach((k) => !e[k] && delete e[k]);
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const foundErrors = validate();
    const agreeMsg = agree
      ? ""
      : "Please agree to be contacted by Pet Heaven.";
    setErrors(foundErrors);
    setAgreeError(agreeMsg);

    if (Object.keys(foundErrors).length > 0) {
      const first = Object.keys(foundErrors)[0];
      const el = document.getElementById("field-" + first);
      if (el) el.focus();
      return;
    }
    if (agreeMsg) return;

    const result = register({
      name: values.name,
      email: values.email,
      phone: values.phone,
      interest: values.interest,
      password: values.password,
    });

    if (!result.ok) {
      setErrors({ email: result.error });
      const el = document.getElementById("field-email");
      if (el) el.focus();
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="container section narrow">
        <Notice type="success" title={`Welcome to Pet Heaven, ${values.name.split(" ")[0]}!`}>
          Your membership is active and you are now signed in. You can now request
          to adopt a pet, or explore the ones looking for a home.
        </Notice>
        <div className="btn-row">
          <Button to="/adopt">Browse pets</Button>
          <Button to="/" variant="ghost">
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section narrow">
      <SectionHeading
        as="h1"
        eyebrow="Join us"
        title="Become a member & supporter"
        subtitle="Membership is free. It lets you request adoptions and keeps you connected to our work."
      />

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Full name"
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
            label="Phone (optional)"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
        </div>
        <FormField
          label="I am mainly interested in…"
          name="interest"
          type="select"
          value={values.interest}
          onChange={handleChange}
          error={errors.interest}
          required
          options={[
            "Adopting a pet",
            "Volunteering",
            "Donating",
            "General supporter",
          ]}
        />
        <div className="form-row">
          <FormField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
            autoComplete="new-password"
          />
          <FormField
            label="Confirm password"
            name="confirm"
            type="password"
            value={values.confirm}
            onChange={handleChange}
            error={errors.confirm}
            required
            autoComplete="new-password"
          />
        </div>

        <div className="form-field checkbox-field">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              I agree that Pet Heaven may contact me about adoptions, events and
              volunteering.
            </span>
          </label>
          {agreeError && <p className="field-error">{agreeError}</p>}
        </div>

        <Button type="submit">Create my membership</Button>

        <p className="form-alt">
          Already a member? <Link to="/login">Log in here</Link>.
        </p>
      </form>
    </div>
  );
}
