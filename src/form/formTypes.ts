export type FieldType =
  | "text"
  | "number"
  | "checkbox"
  | "select"
  | "repeater";

export interface Condition {
  fieldId: string;
  equals: unknown;
}

export interface BaseField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  visibleIf?: Condition;
}

export interface TextField extends BaseField {
  type: "text";
  placeholder?: string;
}

export interface NumberField extends BaseField {
  type: "number";
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectField extends BaseField {
  type: "select";
  options?: SelectOption[];
  asyncOptions?: boolean;
}

export interface RepeaterField extends BaseField {
  type: "repeater";
  fields: Field[];
}

export type Field =
  | TextField
  | NumberField
  | CheckboxField
  | SelectField
  | RepeaterField;
