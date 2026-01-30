import { useEffect, useState } from "react";
import type {
  Field,
  SelectField as SelectFieldSchema,
  RepeaterField as RepeaterFieldSchema,
  RadioField as RadioFieldSchema,
} from "./schemaTypes";
import { useFormEngine } from "./useFormEngine";

import { TextField } from "./fields/TextField";
import { NumberField } from "./fields/NumberField";
import { SelectField as SelectFieldComponent } from "./fields/SelectField";
import { CheckboxField } from "./fields/CheckboxField";
import RadioField from "./fields/RadioField";
import RepeaterFieldComponent from "./fields/RepeaterField";
import { Button } from "../ui/Button";

interface Props {
  schema: Field[];
}

export function FormBuilder({ schema }: Props) {
  const {
    values,
    errors,
    touched,
    setValue,
    markTouched,
    validateAll,
    isFieldVisible,
    addRepeaterItem,
    removeRepeaterItem,
  } = useFormEngine(schema);

  const [asyncOptions, setAsyncOptions] = useState<
    Record<string, { label: string; value: string }[]>
  >({});
  const [loadingOptions, setLoadingOptions] = useState<Record<string, boolean>>(
    {},
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ------------------ Load Async Select Options ------------------ */
  useEffect(() => {
    schema.forEach((field) => {
      if (field.type === "select" && field.loadOptions) {
        setLoadingOptions((prev) => ({ ...prev, [field.id]: true }));

        field
          .loadOptions()
          .then((opts) => {
            setAsyncOptions((prev) => ({ ...prev, [field.id]: opts }));
          })
          .catch(() => {
            setAsyncOptions((prev) => ({ ...prev, [field.id]: [] }));
          })
          .finally(() => {
            setLoadingOptions((prev) => ({ ...prev, [field.id]: false }));
          });
      }
    });
  }, [schema]);

  /* ------------------ Render Fields ------------------ */
  function renderField(field: Field) {
    if (!isFieldVisible(field, values)) return null;

    const error = errors[field.id];
    const isTouched = touched[field.id];

    switch (field.type) {
      case "text":
        return (
          <TextField
            key={field.id}
            field={field}
            value={(values[field.id] as string) ?? ""}
            error={error}
            isTouched={isTouched}
            setValue={setValue}
            markTouched={markTouched}
          />
        );

      case "number":
        return (
          <NumberField
            key={field.id}
            field={field}
            value={values[field.id] as number | ""}
            error={error}
            isTouched={isTouched}
            setValue={setValue}
            markTouched={markTouched}
          />
        );

      case "select": {
        const selectField = field as SelectFieldSchema;
        return (
          <SelectFieldComponent
            key={field.id}
            field={selectField}
            value={(values[field.id] as string) ?? ""}
            error={error}
            isTouched={isTouched}
            options={selectField.options ?? asyncOptions[field.id] ?? []}
            loading={loadingOptions[field.id] ?? false}
            setValue={setValue}
            markTouched={markTouched}
          />
        );
      }

      case "checkbox":
        return (
          <CheckboxField
            key={field.id}
            field={field}
            value={Boolean(values[field.id])}
            error={error}
            isTouched={isTouched}
            setValue={setValue}
            markTouched={markTouched}
          />
        );

      case "radio": {
        const radioField = field as RadioFieldSchema;
        return (
          <RadioField
            key={field.id}
            field={radioField}
            value={(values[field.id] as string) ?? ""}
            error={error}
            isTouched={isTouched}
            setValue={setValue}
            markTouched={markTouched}
          />
        );
      }

      case "repeater": {
        const repField = field as RepeaterFieldSchema;
        return (
          <RepeaterFieldComponent
            key={field.id}
            field={repField}
            items={(values[field.id] as Record<string, unknown>[]) ?? []}
            addItem={() => addRepeaterItem(field.id, repField.fields)}
            removeItem={(index: number) => removeRepeaterItem(field.id, index)}
            setValue={setValue}
          />
        );
      }

      default:
        return null;
    }
  }

  /* ------------------ Group Fields by Section ------------------ */
  const groupedFields = schema.reduce<Record<string, Field[]>>((acc, field) => {
    const section = field.section || "General";
    if (!acc[section]) acc[section] = [];
    acc[section].push(field);
    return acc;
  }, {});

  /* ------------------ Success Screen ------------------ */
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center space-y-4 border border-slate-100">
          <h2 className="text-2xl font-bold text-green-600">
            🎉 Form Submitted Successfully!
          </h2>
          <p className="text-slate-600">Your responses have been recorded.</p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-3 text-lg font-semibold rounded-xl 
            bg-gradient-to-r from-blue-600 to-indigo-600 
            hover:from-blue-700 hover:to-indigo-700 
            transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Fill Again
          </Button>
        </div>
      </div>
    );
  }

  /* ------------------ Main Form UI ------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      {/* Page Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Dynamic Form Builder
        </h1>
        <p className="text-slate-500">Fill the form below</p>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const isValid = await validateAll();
          if (isValid) {
            console.log("Submitted values:", values);
            setIsSubmitted(true);
          }
        }}
        className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md 
        border border-slate-200 rounded-3xl shadow-xl 
        p-10 space-y-10 transition-all duration-300
        animate-[fadeIn_.4s_ease-out]"
      >
        {Object.entries(groupedFields).map(([section, fields]) => (
          <div
            key={section}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6 transition hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-slate-800 border-b pb-3">
              {section}
            </h2>

            <div className="space-y-5">{fields.map(renderField)}</div>
          </div>
        ))}

        <Button
          type="submit"
          className="w-full py-3 text-lg font-semibold rounded-xl 
  bg-gradient-to-r from-blue-600 to-indigo-600 
  hover:from-blue-700 hover:to-indigo-700 
  transition-all duration-300 shadow-md hover:shadow-xl 
  active:scale-[0.98]"
        >
          🚀 Submit Form
        </Button>
      </form>
    </div>
  );
}
