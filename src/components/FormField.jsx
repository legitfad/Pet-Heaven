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
  const className = "control" + (error ? " control-error" : "");

  let control;
  if (type === "select") {
    control = (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        required={required}
      >
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
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        rows={rows}
        placeholder={placeholder}
        required={required}
      />
    );
  } else {
    control = (
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    );
  }

  return (
    <div className="form-field">
      <label>
        {label}
        {required && <span className="req"> *</span>}
      </label>
      {control}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}
