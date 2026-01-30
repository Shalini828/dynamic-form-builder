import type { CheckboxField as CheckboxFieldType } from "../schemaTypes";

interface Props {
  field: CheckboxFieldType;
  value: boolean;
  error?: string;
  isTouched?: boolean;
  setValue: (id: string, value: unknown) => void;
  markTouched: (id: string) => void;
}

export function CheckboxField({
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
      <div className="flex items-start gap-3">
        <input
          id={field.id}
          type="checkbox"
          checked={!!value}
          onChange={(e) => setValue(field.id, e.target.checked)}
          onBlur={() => markTouched(field.id)}
          aria-invalid={showError}
          aria-describedby={[
            field.description ? `${field.id}-desc` : "",
            showError ? `${field.id}-error` : "",
          ]
            .filter(Boolean)
            .join(" ")}
         className="mt-1 h-5 w-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
        />

        <div>
          <label
            htmlFor={field.id}
            className="block text-sm font-semibold text-gray-700 mb-1 cursor-pointer"
          >
            {field.label}
          </label>

          {field.description && (
            <p id={`${field.id}-desc`} className="text-sm text-gray-500">
              {field.description}
            </p>
          )}
        </div>
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
