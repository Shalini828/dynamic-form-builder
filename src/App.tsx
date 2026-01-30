import { FormBuilder } from "./form/FormBuilder";
import type { Field } from "./form/schemaTypes";

const schema: Field[] = [
  {
    id: "name",
    type: "text",
    label: "Full Name",
    required: true,
    section: "Personal Information",
  },
  {
    id: "age",
    type: "number",
    label: "Age",
    required: true,
    section: "Personal Information",
  },
  {
    id: "gender",
    type: "radio",
    label: "Gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    section: "Personal Information",
  },
  {
    id: "subscribe",
    type: "checkbox",
    label: "Subscribe to newsletter",
    section: "Preferences",
  },
  {
    id: "country",
    type: "select",
    label: "Country",
    options: [
      { label: "India", value: "india" },
      { label: "USA", value: "usa" },
    ],
    section: "Preferences",
  },
  {
    id: "skills",
    type: "repeater",
    label: "Skills",
    section: "Professional Details",
    fields: [
      { id: "skillName", type: "text", label: "Skill Name" },
      { id: "experience", type: "number", label: "Years of Experience" },
    ],
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-10 tracking-tight">
        Dynamic Form Builder
      </h1>

      <FormBuilder schema={schema} />
    </div>
  );
}
