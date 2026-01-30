import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FormBuilder } from "../form/FormBuilder"

describe("FormBuilder", () => {
  it("renders a text field from schema", () => {
    const schema = [
      { id: "name", label: "Name", type: "text" }
    ] as any

    render(<FormBuilder schema={schema} />)

    expect(screen.getByLabelText("Name")).toBeInTheDocument()
  })
})
