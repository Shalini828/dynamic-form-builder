import type { Meta, StoryObj } from "@storybook/react";
import { FormBuilder } from "./FormBuilder";
import type { Field } from "./schemaTypes";

const sampleSchema: Field[] = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    required: true,
    section: "Personal Info",
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    validation: { min: 1, max: 100 },
    section: "Personal Info",
  },
  {
    id: "gender",
    label: "Gender",
    type: "radio",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
    section: "Personal Info",
  },
  {
    id: "newsletter",
    label: "Subscribe to newsletter",
    type: "checkbox",
    section: "Preferences",
  },
  {
    id: "country",
    label: "Country",
    type: "select",
    options: [
      { label: "India", value: "india" },
      { label: "USA", value: "usa" },
      { label: "UK", value: "uk" },
    ],
    section: "Preferences",
  },
];

const meta: Meta<typeof FormBuilder> = {
  title: "Form Builder/Dynamic Form",
  component: FormBuilder,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof FormBuilder>;

export const DefaultForm: Story = {
  args: {
    schema: sampleSchema,
  },
};
