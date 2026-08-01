import { useState } from "react";

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const PasswordInput = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>

      <div className="position-relative">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control pe-5"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />

        <button
          type="button"
          className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent me-2"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <i
            className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}
          />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
