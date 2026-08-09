// reusable notice component for displaying messages to users
export default function Notice({ type = "success", title, children, onClose }) {
  return (
    <div className={"notice notice-" + type} role="status">
      <div className="notice-body">
        {title && <strong className="notice-title">{title}</strong>}
        {children && <div className="notice-text">{children}</div>}
      </div>
      {onClose && (
        <button
          className="notice-close"
          onClick={onClose}
          aria-label="Dismiss message"
        >
          ×
        </button>
      )}
    </div>
  );
}
