import type { Theme } from '../types/index.js';

/**
 * Bootstrap 5 theme for autoform
 */
export const bootstrapTheme: Theme = {
	formClass: '',
	fieldWrapperClass: 'mb-3',
	labelClass: 'form-label',
	inputClass: 'form-control',
	selectClass: 'form-select',
	textareaClass: 'form-control',
	checkboxClass: 'form-check-input',
	checkboxWrapperClass: 'form-check',
	errorClass: 'invalid-feedback d-block',
	buttonClass: 'btn',
	buttonPrimaryClass: 'btn btn-primary',
};

/**
 * Default theme (minimal styling)
 */
export const defaultTheme: Theme = {
	formClass: 'autoform',
	fieldWrapperClass: 'autoform-field',
	labelClass: 'autoform-label',
	inputClass: 'autoform-input',
	selectClass: 'autoform-select',
	textareaClass: 'autoform-textarea',
	checkboxClass: 'autoform-checkbox',
	checkboxWrapperClass: 'autoform-checkbox-wrapper',
	errorClass: 'autoform-error',
	buttonClass: 'autoform-button',
	buttonPrimaryClass: 'autoform-button-primary',
};
