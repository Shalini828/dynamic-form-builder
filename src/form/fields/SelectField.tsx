import type { SelectField as SelectFieldType, Option } from "../schemaTypes";
import { Select } from "../../ui/Select";

interface Props {
  field: SelectFieldType;
  value: string;
  error?: string;
  isTouched?: boolean;
  options: Option[];
  loading?: boolean;
  setValue: (id: string, value: unknown) => void;
  markTouched: (id: string) => void;
}

export function SelectField({
  field,
  value,
  error,
  isTouched,
  options,
  loading,
  setValue,
  markTouched,
}: Props) {
  const showError = isTouched && !!error;

  return (
    <div className="space-y-2">
      <label
        htmlFor={field.id}
        className="block text-sm font-semibold text-gray-700 mb-1"
      >
        {field.label}
      </label>

      {field.description && (
        <p id={`${field.id}-desc`} className="text-sm text-gray-500">
          {field.description}
        </p>
      )}

      <Select
        id={field.id}
        value={value ?? ""}
        aria-invalid={showError}
        aria-describedby={[
          field.description ? `${field.id}-desc` : "",
          showError ? `${field.id}-error` : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onChange={(e) => setValue(field.id, e.target.value)}
        onBlur={() => markTouched(field.id)}
        disabled={loading}
        className={showError ? "border-red-500 focus:ring-red-500" : ""}
      >
        <option value="">
          {loading ? "Loading options..." : "Select an option"}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>

      {loading && (
        <p role="status" aria-live="polite" className="text-sm text-gray-500">
          Loading options…
        </p>
      )}

      {showError && (
        <p
          id={`${field.id}-error`}
          role="alert"
          className="text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
