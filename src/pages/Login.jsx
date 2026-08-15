import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMember } from "../context/MemberContext.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import Notice from "../components/Notice.jsx";
import { required, isEmail } from "../utils/validators.js";

export default function Login() {
  const { login, currentMember, logout } = useMember();
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  if (currentMember) {
    return (
      <div className="container section narrow">
        <SectionHeading
          as="h1"
          eyebrow="Account"
          title={`You are signed in, ${currentMember.name.split(" ")[0]}`}
        />
        <Notice type="info" title="You're all set">
          You can browse pets and request an adoption. Want to switch accounts?
          Log out below.
        </Notice>
        <div className="btn-row">
          <Button to="/adopt">Browse pets</Button>
          <Button
            variant="secondary"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  }

  function validate() {
    const e = {};
    e.email = required(values.email) || isEmail(values.email);
    e.password = required(values.password);
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

    const result = login(values.email, values.password);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate("/");
  }

  return (
    <div className="container section narrow">
      <SectionHeading
        as="h1"
        eyebrow="Welcome back"
        title="Log in to your account"
        subtitle="Sign in to request an adoption and manage your membership."
      />

      <form className="form-card" onSubmit={handleSubmit} noValidate>
        {formError && (
          <Notice type="error" title="Could not sign in">
            {formError}
          </Notice>
        )}

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
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          required
          autoComplete="current-password"
        />

        <Button type="submit">Log in</Button>

        <p className="form-alt">
          New here? <Link to="/register">Create a free membership</Link>.
        </p>
      </form>
    </div>
  );
}
