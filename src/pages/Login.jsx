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
        <Notice type="info" title="You're all set!">
          {currentMember.role === "employee"
            ? "Manage pet requests here."
            : "You can browse pets and request an adoption."}
        </Notice>
        <div className="btn-row">
          {currentMember.role === "employee" ? (
            <Button to="/employee">Employee page</Button>
          ) : (
            <Button to="/adopt">Browse pets</Button>
          )}
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

    if (required(values.email)) e.email = required(values.email);
    else if (isEmail(values.email)) e.email = isEmail(values.email);
    if (required(values.password)) e.password = required(values.password);

    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const foundErrors = validate();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      return;
    }

    const result = login(values.email, values.password);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }

    if (result.member.role === "employee") {
      navigate("/employee");
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
          New here? <Link to="/register">Create a free account!</Link>.
        </p>
      </form>
    </div>
  );
}
