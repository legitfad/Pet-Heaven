export default function Notice({ type = "success", title, children, onClose }) {
  return (
    <div className={"notice notice-" + type}>
      <div className="notice-body">
        {title && <strong className="notice-title">{title}</strong>}
        {children && <div className="notice-text">{children}</div>}
      </div>
      {onClose && (
        <button className="notice-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
}
