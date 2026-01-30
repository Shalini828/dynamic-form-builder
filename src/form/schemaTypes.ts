export type Condition = {
  fieldId: string;
  equals: unknown;
};

export type ValidationRules = {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  min?: number;
  max?: number;
  custom?: (value: unknown, values: Record<string, unknown>) => string | null;
};

export type Option = {
  label: string;
  value: string;
};

export type BaseField = {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
  placeholder?: string;
  visibleIf?: Condition;
  validation?: ValidationRules;
  section?: string;
  validate?: (value: unknown, values: Record<string, unknown>) => string | null;
  asyncValidate?: (
    value: unknown,
    values: Record<string, unknown>,
  ) => Promise<string | null>;
};

export type TextField = BaseField & {
  type: "text";
};

export type NumberField = BaseField & {
  type: "number";
};

export type CheckboxField = BaseField & {
  type: "checkbox";
};

export type SelectField = BaseField & {
  type: "select";
  options?: Option[];
  loadOptions?: () => Promise<Option[]>;
};

export type RadioField = BaseField & {
  type: "radio";
  options: Option[];
};

export type RepeaterField = BaseField & {
  type: "repeater";
  fields: Field[];
};

export type Field =
  | TextField
  | NumberField
  | CheckboxField
  | SelectField
  | RadioField
  | RepeaterField;
