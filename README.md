# svelte-autoforms

A SvelteKit library for automatically generating forms from Drizzle ORM database schemas, inspired by [meteor-autoform](https://github.com/Meteor-Community-Packages/meteor-autoform).

## Features

- 🚀 **Auto-generate forms** from Drizzle ORM schemas
- 📝 **Manual schema definition** support for flexibility
- ✅ **Built-in validation** (required fields, min/max values, length constraints, patterns)
- 🎨 **Themeable** with Bootstrap 5 theme included
- 📘 **TypeScript** first-class support
- 🔧 **Multiple field types**: text, email, password, number, date, datetime, time, select, textarea, checkbox, radio
- 🔄 **Form reset** functionality
- ⚙️ **Default values** support
- 💬 **Field descriptions** and placeholders

## Installation

```bash
npm install svelte-autoforms
```

> **Note:** This library requires Svelte 5+ and SvelteKit

## Quick Start

### With Drizzle ORM Schema

```typescript
import { pgTable, serial, varchar, integer, boolean } from 'drizzle-orm/pg-core';
import { AutoForm, parseSchema, bootstrapTheme } from 'svelte-autoforms';

// Define your Drizzle schema
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  age: integer('age'),
  isActive: boolean('is_active').default(true)
});

// Parse the schema
const schema = parseSchema(users);

// Use in your Svelte component
<AutoForm
  schema={schema}
  theme={bootstrapTheme}
  onSubmit={(data) => console.log('Form submitted:', data)}
  submitLabel="Create User"
  showReset={true}
/>
```

### With Manual Schema Definition

```svelte
<script lang="ts">
  import { AutoForm, createSchema, bootstrapTheme } from 'svelte-autoforms';
  
  const contactSchema = createSchema([
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'John Doe'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'john@example.com'
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      minLength: 10
    }
  ]);
  
  function handleSubmit(data) {
    console.log('Form data:', data);
    // Handle form submission
  }
</script>

<AutoForm
  schema={contactSchema}
  theme={bootstrapTheme}
  onSubmit={handleSubmit}
/>
```

## API Reference

### AutoForm Component

Main component for rendering auto-generated forms.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `schema` | `FormSchema` | Yes | - | Form schema definition |
| `theme` | `Theme` | No | `bootstrapTheme` | Theme configuration |
| `onSubmit` | `(data: Record<string, any>) => void \| Promise<void>` | No | - | Submit handler |
| `submitLabel` | `string` | No | `'Submit'` | Submit button label |
| `resetLabel` | `string` | No | `'Reset'` | Reset button label |
| `showReset` | `boolean` | No | `false` | Show reset button |
| `values` | `Record<string, any>` | No | `{}` | Initial form values |

**Example:**

```svelte
<AutoForm
  schema={mySchema}
  theme={bootstrapTheme}
  onSubmit={handleSubmit}
  submitLabel="Save"
  showReset={true}
  values={{ username: 'johndoe' }}
/>
```

### Functions

#### `parseSchema(tableSchema: any): FormSchema`

Parses a Drizzle ORM table schema and extracts field definitions.

```typescript
import { parseSchema } from 'svelte-autoforms';
import { users } from './schema';

const schema = parseSchema(users);
```

#### `createSchema(fields: FieldDefinition[]): FormSchema`

Creates a form schema from a manual field definition array.

```typescript
import { createSchema } from 'svelte-autoforms';

const schema = createSchema([
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true
  }
]);
```

### Themes

#### Bootstrap Theme

Pre-configured theme using Bootstrap 5 classes.

```typescript
import { bootstrapTheme } from 'svelte-autoforms';
```

To use Bootstrap theme, include Bootstrap CSS in your app:

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
```

#### Default Theme

Minimal theme with basic styling.

```typescript
import { defaultTheme } from 'svelte-autoforms';
```

#### Custom Theme

Create your own theme:

```typescript
import type { Theme } from 'svelte-autoforms';

const myTheme: Theme = {
  formClass: 'my-form',
  fieldWrapperClass: 'my-field',
  labelClass: 'my-label',
  inputClass: 'my-input',
  selectClass: 'my-select',
  textareaClass: 'my-textarea',
  checkboxClass: 'my-checkbox',
  checkboxWrapperClass: 'my-checkbox-wrapper',
  errorClass: 'my-error',
  buttonClass: 'my-button',
  buttonPrimaryClass: 'my-button-primary'
};
```

### Field Types

Supported field types:

- `text` - Text input
- `email` - Email input with validation
- `password` - Password input
- `number` - Numeric input with min/max
- `date` - Date picker
- `datetime-local` - Date and time picker
- `time` - Time picker
- `select` - Dropdown select
- `textarea` - Multi-line text area
- `checkbox` - Checkbox input
- `radio` - Radio button (coming soon)

### Field Definition

```typescript
interface FieldDefinition {
  name: string;                 // Field name (required)
  label: string;                // Display label (required)
  type: FieldType;              // Field type (required)
  required?: boolean;           // Is field required?
  placeholder?: string;         // Placeholder text
  defaultValue?: any;           // Default value
  min?: number;                 // Minimum value (for number/date)
  max?: number;                 // Maximum value (for number/date)
  minLength?: number;           // Minimum length (for text)
  maxLength?: number;           // Maximum length (for text)
  pattern?: string;             // Regex pattern for validation
  options?: Array<{             // Options for select fields
    label: string;
    value: any;
  }>;
  description?: string;         // Help text
}
```

## Individual Components

You can also use individual field components:

```svelte
<script>
  import { InputField, SelectField, TextareaField, CheckboxField } from 'svelte-autoforms';
</script>

<InputField
  field={{
    name: 'username',
    label: 'Username',
    type: 'text',
    required: true
  }}
  value={username}
  theme={bootstrapTheme}
  onchange={(val) => username = val}
/>
```

## Validation

The library includes built-in validation:

- **Required fields**: Validates that required fields are not empty
- **Min/Max**: For number inputs
- **Length**: Min and max length for text inputs
- **Pattern**: Regex pattern matching
- **Type-specific**: Email format validation, etc.

Validation runs on form submission. Errors are displayed below each field.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build the library
npm run build

# Run type checking
npm run check
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Inspiration

This library is inspired by [meteor-autoform](https://github.com/Meteor-Community-Packages/meteor-autoform), bringing similar auto-form generation capabilities to the SvelteKit ecosystem with Drizzle ORM support.
