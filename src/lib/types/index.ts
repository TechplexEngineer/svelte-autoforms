/**
 * Field types supported by the autoform
 */
export type FieldType = 
	| 'text'
	| 'email'
	| 'password'
	| 'number'
	| 'date'
	| 'datetime-local'
	| 'time'
	| 'checkbox'
	| 'select'
	| 'textarea'
	| 'radio';

/**
 * Field definition extracted from Drizzle schema
 */
export interface FieldDefinition {
	name: string;
	label: string;
	type: FieldType;
	required?: boolean;
	placeholder?: string;
	defaultValue?: any;
	min?: number;
	max?: number;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	options?: Array<{ label: string; value: any }>;
	description?: string;
}

/**
 * Schema definition for the form
 */
export interface FormSchema {
	fields: FieldDefinition[];
}

/**
 * Theme configuration
 */
export interface Theme {
	formClass?: string;
	fieldWrapperClass?: string;
	labelClass?: string;
	inputClass?: string;
	selectClass?: string;
	textareaClass?: string;
	checkboxClass?: string;
	checkboxWrapperClass?: string;
	errorClass?: string;
	buttonClass?: string;
	buttonPrimaryClass?: string;
}

/**
 * Form configuration options
 */
export interface AutoFormOptions {
	schema: FormSchema;
	theme?: Theme;
	onSubmit?: (data: Record<string, any>) => void | Promise<void>;
	submitLabel?: string;
	resetLabel?: string;
	showReset?: boolean;
}
