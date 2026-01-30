import type { RadioField as RadioFieldType } from "../schemaTypes";

interface Props {
  field: RadioFieldType;
  value: string;
  error?: string;
  isTouched?: boolean;
  setValue: (id: string, value: unknown) => void;
  markTouched: (id: string) => void;
}

export default function RadioField({
  field,
  value,
  error,
  isTouched,
  setValue,
  markTouched,
}: Props) {
  const showError = isTouched && !!error;

  return (
    <div className="space-y-2">
      <span
        id={`${field.id}-label`}
        className="block text-sm font-semibold text-gray-700 mb-1"
      >
        {field.label}
      </span>

      {field.description && (
        <p id={`${field.id}-desc`} className="text-sm text-gray-500">
          {field.description}
        </p>
      )}

      <div
        role="radiogroup"
        aria-labelledby={`${field.id}-label`}
        aria-invalid={showError}
        aria-describedby={[
          field.description ? `${field.id}-desc` : "",
          showError ? `${field.id}-error` : "",
        ]
          .filter(Boolean)
          .join(" ")}
        className={`space-y-1 p-2 rounded-md ${
          showError ? "ring-2 ring-red-500" : ""
        }`}
      >
        {field.options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={field.id}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => setValue(field.id, opt.value)}
              onBlur={() => markTouched(field.id)}
            />
            <span className="text-sm text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>

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
