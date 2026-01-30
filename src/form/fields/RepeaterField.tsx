import type { RepeaterField as RepeaterFieldType, Field } from "../schemaTypes";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";

interface Props {
  field: RepeaterFieldType;
  items: Record<string, unknown>[];
  addItem: () => void;
  removeItem: (index: number) => void;
  setValue: (id: string, value: unknown) => void;
}

export default function RepeaterField({
  field,
  items,
  addItem,
  removeItem,
  setValue,
}: Props) {
  function updateItem(index: number, subFieldId: string, value: unknown) {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [subFieldId]: value,
    };
    setValue(field.id, updated);
  }

  return (
    <fieldset className="space-y-6 border border-slate-200 p-6 rounded-2xl bg-slate-50/70 backdrop-blur-sm">
      <legend className="text-sm font-semibold text-gray-700 px-1">
        {field.label}
      </legend>

      {field.description && (
        <p className="text-sm text-gray-500 -mt-2">{field.description}</p>
      )}

      {items.map((item, index) => (
        <div
          key={index}
          className="relative border border-slate-200 p-5 rounded-xl bg-white shadow-md space-y-4 transition hover:shadow-lg"
        >
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
            aria-label={`Remove ${field.label} ${index + 1}`}
          >
            Remove
          </button>

          {field.fields.map((subField: Field) => {
            const value = item[subField.id];

            return (
              <div key={subField.id} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {subField.label}
                </label>

                <Input
                  type={subField.type === "number" ? "number" : "text"}
                  value={value as string | number | undefined}
                  onChange={(e) =>
                    updateItem(
                      index,
                      subField.id,
                      subField.type === "number"
                        ? e.target.value === ""
                          ? ""
                          : Number(e.target.value)
                        : e.target.value,
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      ))}

      <Button
        type="button"
        onClick={addItem}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
      >
        + Add {field.label}
      </Button>
    </fieldset>
  );
}
