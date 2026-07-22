interface ProfileFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ProfileField = ({
  label,
  value,
  isEditing,
  onChange,
  placeholder,
}: ProfileFieldProps) => {
  return (
    <div className="mb-3">
      {isEditing ? (
        <>
          <label className="form-label fw-bold">{label}</label>

          <input
            className="form-control"
            value={value}
            placeholder={placeholder}
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
