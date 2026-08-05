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
  type = "text",
}: ProfileFieldProps) => {
  return (
    <div className="mb-3">
      {isEditing ? (
        <>
          <label className="form-label fw-bold">{label}</label>

          <input
            className={`form-control ${className ?? ""}`}
            type={type}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            pattern={pattern}
            onChange={(e) => onChange(e.target.value)}
          />
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
