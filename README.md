# 🚀 Dynamic Form Builder — Assignment Submission

This project is a **schema-driven dynamic form engine** built using **React + TypeScript** without any external form libraries.

It was developed as part of a frontend assignment to demonstrate:
- Component architecture
- Dynamic UI rendering
- Form state management
- Validation systems
- Accessibility
- Clean, scalable code structure

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
🚀 Dynamic Form Builder — Assignment Submission

This project is a schema-driven dynamic form engine built using React + TypeScript without any external form libraries.

It was developed as part of a frontend assignment to demonstrate:

Component architecture

Dynamic UI rendering

Form state management

Validation systems

Accessibility best practices

Clean, scalable code structure

✨ Features

🔧 Schema-Based Rendering
Forms are generated from a JSON schema instead of hardcoded JSX.

👁 Conditional Fields
Fields can appear/disappear based on other field values.

🔄 Repeater Fields
Dynamically add/remove groups of inputs (e.g., multiple skills).

🌐 Async Data Loading
Select fields support simulated API-driven options.

💾 Autosave + Resume Draft
Form state is automatically saved to localStorage and restored after refresh.

🎯 Custom Form Engine
Built without using external form libraries (Formik, React Hook Form, etc.).

♿ Accessible by Design
All inputs are properly labeled, keyboard navigable, and screen-reader friendly.

🧩 Section-Based Layout
Fields can be grouped into logical UI sections using schema configuration.

🎨 Modern UI
Styled using Tailwind CSS with responsive and accessible design.

🧠 Architecture Highlights
Concern	Approach
Rendering	Schema-driven component system
State Management	Custom React hook (useFormEngine)
Validation	Centralized validation pipeline
Persistence	localStorage autosave
Extensibility	New field types can be added easily
🛠 Tech Stack

React

TypeScript (Strict Mode)

Vite

Tailwind CSS

📄 Schema System

The entire form is powered by a TypeScript schema that defines:

Field types (text, number, checkbox, select, radio, repeater)

Validation rules

Conditional visibility

Section grouping

Async data sources

This allows forms to be rendered dynamically without modifying UI code.

Example Field Schema
{
  id: "email",
  label: "Email Address",
  type: "text",
  required: true,
  validation: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
}

🧠 Form Engine Responsibilities

The custom useFormEngine hook handles:

• Form state management
• Field-level and form-level validation
• Conditional field visibility
• Repeater field state
• Autosave to localStorage
• Draft restoration on reload

This keeps UI components simple and separates logic from presentation.

♿ Accessibility Considerations

This form engine follows accessibility best practices:

All inputs are associated with labels

Errors are announced with role="alert"

Keyboard navigation works across all controls

Required fields are programmatically indicated

ARIA attributes are used for descriptions and error messages

This ensures the form is usable for assistive technology users.

🧪 Testing Strategy

The form engine is designed to be testable:

Validation logic can be unit tested independently

Visibility rules can be tested by simulating form state

Repeater logic can be tested by asserting item addition/removal

Schema rendering can be snapshot tested

Future improvements include adding automated tests using React Testing Library.

📌 Future Improvements

Server-side draft persistence

Drag-and-drop form schema builder UI

More advanced conditional logic (AND/OR conditions)

Async validation (e.g., username availability)

Unit and integration test coverage

🏁 Conclusion

This project demonstrates how a scalable, extensible form system can be built using React and TypeScript without relying on external form libraries.

It focuses on clean architecture, separation of concerns, accessibility, and real-world usability features like autosave and dynamic rendering.

👩‍💻 Author

Shalini Kumari