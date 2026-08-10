interface ProfileFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  placeholder?: string;

  maxLength?: number;
  required?: boolean;
  pattern?: string;
  type?: string;
  className?: string;
  error?: string;
}

const ProfileField = ({
  label,
  value,
  isEditing,
  onChange,
  placeholder,
  maxLength,
  required,
  pattern,
  className,
  error,
  type = "text",
}: ProfileFieldProps) => {
  return (
    <div className="mb-3">
      {isEditing ? (
        <>
          <label className="form-label fw-bold">{label}</label>

          <input
            className={`form-control ${className ?? ""} ${
              error ? "is-invalid" : ""
            }`}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            pattern={pattern}
            onChange={(e) => onChange(e.target.value)}
          />

          {error && <div className="invalid-feedback">{error}</div>}
        </>
      ) : (
        <p className="mb-0">
          <strong>{label}:</strong>{" "}
          {value.trim() !== "" ? value : "Not provided"}
        </p>
      )}
    </div>
  );
};

export default ProfileField;
