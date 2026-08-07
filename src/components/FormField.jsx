// ---------------------------------------------------------------------------
// FormField — the most reused component in the app.
//
// ONE component draws a labelled form control plus its inline error message,
// and it can be an <input>, a <select>, or a <textarea> depending on `type`.
// Every form (Register, Login, Release, Adopt request, Contact) is built from
// these, so all fields look and behave the same.
//
// It is a "controlled" field: the parent form holds the value in state and
// passes `value` + `onChange` in, and passes an `error` message when the field
// fails validation.
//
// Props:
//   label, name        the visible label and the field's name
//   type               "text" | "email" | "tel" | "password" | "select" | "textarea"
//   value, onChange    controlled value + change handler (from the parent)
//   error              validation message to show (or "" for none)
//   required           shows a red * and sets the required attribute
//   options            array of strings, only for type="select"
//   placeholder, rows, autoComplete   passed to the control where relevant
// ---------------------------------------------------------------------------
export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error = "",
  required = false,
  options = [],
  placeholder = "",
  rows = 4,
  autoComplete,
}) {
  const id = "field-" + name;
  const errorId = id + "-error";

  // Props shared by every kind of control.
  const shared = {
    id,
    name,
    value,
    onChange,
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: "control" + (error ? " control-error" : ""),
  };

  let control;
  if (type === "select") {
    control = (
      <select {...shared} required={required}>
        <option value="">Please choose…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    );
  } else if (type === "textarea") {
    control = (
      <textarea {...shared} rows={rows} placeholder={placeholder} required={required} />
    );
  } else {
    control = (
      <input
        {...shared}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && (
          <span className="req" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {control}
      {error && (
        <p className="field-error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}
