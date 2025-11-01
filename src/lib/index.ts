// Main component
export { default as AutoForm } from './components/AutoForm.svelte';

// Individual field components
export { default as InputField } from './components/InputField.svelte';
export { default as SelectField } from './components/SelectField.svelte';
export { default as TextareaField } from './components/TextareaField.svelte';
export { default as CheckboxField } from './components/CheckboxField.svelte';

// Utilities
export { parseSchema, createSchema } from './utils/schemaParser.js';

// Themes
export { bootstrapTheme, defaultTheme } from './themes/index.js';

// Types
export type {
	FieldType,
	FieldDefinition,
	FormSchema,
	Theme,
	AutoFormOptions
} from './types/index.js';

