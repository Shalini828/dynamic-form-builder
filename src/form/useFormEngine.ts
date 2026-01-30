import { useEffect, useState } from "react"
import type { Field, BaseField } from "./schemaTypes"

const STORAGE_KEY = "dynamic-form-draft"

export function useFormEngine(schema: Field[]) {
  const [values, setValues] = useState<Record<string, unknown>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  /* ------------------ Load Draft ------------------ */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setValues(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
  }, [values])

  /* ------------------ State Helpers ------------------ */
  function setValue(id: string, value: unknown) {
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  function markTouched(id: string) {
    setTouched((prev) => ({ ...prev, [id]: true }))
  }

  /* ------------------ Visibility ------------------ */
  function isFieldVisible(field: Field, currentValues: Record<string, unknown>) {
    if (!field.visibleIf) return true
    return currentValues[field.visibleIf.fieldId] === field.visibleIf.equals
  }

  /* ------------------ Validation Helpers ------------------ */
  function isEmpty(value: unknown) {
    return value === undefined || value === null || value === ""
  }

  function hasValidation(
    field: Field
  ): field is Field & { validation: NonNullable<BaseField["validation"]> } {
    return !!field.validation
  }

  /* ------------------ Sync Validation ------------------ */
  function validateField(
    field: Field,
    value: unknown,
    allValues: Record<string, unknown>
  ): string | null {
    if (field.required && isEmpty(value)) return "This field is required"

    if (hasValidation(field)) {
      const rules = field.validation

      if (typeof value === "string") {
        if (rules.minLength && value.length < rules.minLength)
          return `Minimum length is ${rules.minLength}`
        if (rules.maxLength && value.length > rules.maxLength)
          return `Maximum length is ${rules.maxLength}`
        if (rules.pattern && !rules.pattern.test(value))
          return "Invalid format"
      }

      if (typeof value === "number") {
        if (rules.min !== undefined && value < rules.min)
          return `Minimum value is ${rules.min}`
        if (rules.max !== undefined && value > rules.max)
          return `Maximum value is ${rules.max}`
      }

      if (rules.custom) {
        const customError = rules.custom(value, allValues)
        if (customError) return customError
      }
    }

    // 🔥 Field-level custom sync validation
    if (field.validate) {
      const error = field.validate(value, allValues)
      if (error) return error
    }

    return null
  }

  /* ------------------ Async Validation ------------------ */
  async function validateFieldAsync(
    field: Field,
    value: unknown,
    allValues: Record<string, unknown>
  ): Promise<string | null> {
    if (field.asyncValidate) {
      return await field.asyncValidate(value, allValues)
    }
    return null
  }

  /* ------------------ Validate All ------------------ */
  async function validateAll() {
    const newErrors: Record<string, string> = {}

    for (const field of schema) {
      if (!isFieldVisible(field, values)) continue
      if (field.type === "repeater") continue

      const syncError = validateField(field, values[field.id], values)
      if (syncError) {
        newErrors[field.id] = syncError
        continue
      }

      const asyncError = await validateFieldAsync(field, values[field.id], values)
      if (asyncError) {
        newErrors[field.id] = asyncError
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* ------------------ Repeater ------------------ */
  function addRepeaterItem(fieldId: string, fields: Field[]) {
    setValues((prev) => ({
      ...prev,
      [fieldId]: [...((prev[fieldId] as any[]) || []), {}],
    }))
  }

  function removeRepeaterItem(fieldId: string, index: number) {
    setValues((prev) => ({
      ...prev,
      [fieldId]: (prev[fieldId] as any[]).filter((_, i) => i !== index),
    }))
  }

  return {
    values,
    errors,
    touched,
    setValue,
    markTouched,
    validateAll, // ⚠️ now async
    isFieldVisible,
    addRepeaterItem,
    removeRepeaterItem,
  }
}
