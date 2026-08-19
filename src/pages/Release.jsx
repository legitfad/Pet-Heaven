import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import Notice from "../components/Notice.jsx";
import { required, isEmail, isPhone } from "../utils/validators.js";
import { addRequest } from "../utils/requestStore.js";
import { sendEmployeeNotification } from "../utils/emailNotification.js";

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
  const [emailMessage, setEmailMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const e = {};

    if (required(values.ownerName)) e.ownerName = required(values.ownerName);
    if (required(values.email)) e.email = required(values.email);
    else if (isEmail(values.email)) e.email = isEmail(values.email);
    if (required(values.phone)) e.phone = required(values.phone);
    else if (isPhone(values.phone)) e.phone = isPhone(values.phone);
    if (required(values.petType)) e.petType = required(values.petType);
    if (required(values.petName)) e.petName = required(values.petName);
    if (required(values.reason)) e.reason = required(values.reason);

    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const foundErrors = validate();
    const agreeMsg = agree
      ? ""
      : "Please confirm you are the pet's owner and the details are accurate.";
    setErrors(foundErrors);
    setAgreeError(agreeMsg);

    if (Object.keys(foundErrors).length > 0) {
      return;
    }
    if (agreeMsg) return;

    const request = {
      type: "Release",
      petName: values.petName,
      petType: values.petType,
      applicantName: values.ownerName,
      email: values.email,
      phone: values.phone,
      notes:
        "Reason: " + values.reason + "\n" +
        "Pet age: " + (values.petAge || "Not given") + "\n" +
        "Health and temperament: " + (values.health || "Not given"),
    };

    addRequest(request);

    const emailResult = await sendEmployeeNotification(request);
    setEmailMessage(emailResult.message);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="container section narrow">
        <Notice type="success" title="Thank you — your release request has been submitted">
          Your request was saved for the employee team to review.{" "}
          {emailMessage || "Employees can see the request after logging in."}
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
          placeholder="Is your pet vaccinated / spayed? Is it good with children or other animals?"
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
