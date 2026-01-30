import type { NumberField as NumberFieldType } from "../schemaTypes";
import { Input } from "../../ui/Input";

interface Props {
  field: NumberFieldType;
  value: number | "";
  error?: string;
  isTouched?: boolean;
  setValue: (id: string, value: unknown) => void;
  markTouched: (id: string) => void;
}

export function NumberField({
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

      <Input
        id={field.id}
        type="number"
        value={value === "" ? "" : Number(value)}
        icon="🎂"
        aria-invalid={!!error}
        aria-describedby={`${field.id}-desc ${field.id}-error`}
        onChange={(e) =>
          setValue(
            field.id,
            e.target.value === "" ? "" : Number(e.target.value),
          )
        }
        onBlur={() => markTouched(field.id)}
      />

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
