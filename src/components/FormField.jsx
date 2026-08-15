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
