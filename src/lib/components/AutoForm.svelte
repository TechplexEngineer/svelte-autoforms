<script lang="ts">
	import type { FormSchema, Theme } from '../types/index.js';
	import InputField from './InputField.svelte';
	import SelectField from './SelectField.svelte';
	import TextareaField from './TextareaField.svelte';
	import CheckboxField from './CheckboxField.svelte';
	import { bootstrapTheme } from '../themes/index.js';
	
	interface Props {
		schema: FormSchema;
		theme?: Theme;
		onSubmit?: (data: Record<string, any>) => void | Promise<void>;
		submitLabel?: string;
		resetLabel?: string;
		showReset?: boolean;
		values?: Record<string, any>;
	}
	
	let {
		schema,
		theme = bootstrapTheme,
		onSubmit,
		submitLabel = 'Submit',
		resetLabel = 'Reset',
		showReset = false,
		values = {}
	}: Props = $props();
	
	let formData = $state<Record<string, any>>({ ...values });
	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);
	
	// Initialize form data with default values
	$effect(() => {
		for (const field of schema.fields) {
			if (formData[field.name] === undefined && field.defaultValue !== undefined) {
				formData[field.name] = field.defaultValue;
			}
		}
	});
	
	function handleFieldChange(fieldName: string, value: any) {
		formData[fieldName] = value;
		// Clear error when field is modified
		if (errors[fieldName]) {
			errors[fieldName] = '';
		}
	}
	
	function validateForm(): boolean {
		let isValid = true;
		const newErrors: Record<string, string> = {};
		
		for (const field of schema.fields) {
			const value = formData[field.name];
			
			// Required field validation
			if (field.required && (value === undefined || value === '' || value === null)) {
				newErrors[field.name] = `${field.label} is required`;
				isValid = false;
			}
			
			// Number range validation
			if (field.type === 'number' && value !== undefined && value !== '') {
				const numValue = Number(value);
				if (field.min !== undefined && numValue < field.min) {
					newErrors[field.name] = `${field.label} must be at least ${field.min}`;
					isValid = false;
				}
				if (field.max !== undefined && numValue > field.max) {
					newErrors[field.name] = `${field.label} must be at most ${field.max}`;
					isValid = false;
				}
			}
			
			// String length validation
			if (typeof value === 'string') {
				if (field.minLength !== undefined && value.length < field.minLength) {
					newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
					isValid = false;
				}
				if (field.maxLength !== undefined && value.length > field.maxLength) {
					newErrors[field.name] = `${field.label} must be at most ${field.maxLength} characters`;
					isValid = false;
				}
			}
			
			// Pattern validation
			if (field.pattern && typeof value === 'string' && value !== '') {
				const regex = new RegExp(field.pattern);
				if (!regex.test(value)) {
					newErrors[field.name] = `${field.label} format is invalid`;
					isValid = false;
				}
			}
		}
		
		errors = newErrors;
		return isValid;
	}
	
	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (!validateForm()) {
			return;
		}
		
		if (onSubmit) {
			isSubmitting = true;
			try {
				await onSubmit(formData);
			} catch (error) {
				console.error('Form submission error:', error);
			} finally {
				isSubmitting = false;
			}
		}
	}
	
	function handleReset() {
		formData = {};
		errors = {};
		
		// Reset to default values
		for (const field of schema.fields) {
			if (field.defaultValue !== undefined) {
				formData[field.name] = field.defaultValue;
			}
		}
	}
	
	function getFieldComponent(fieldType: string) {
		switch (fieldType) {
			case 'select':
				return SelectField;
			case 'textarea':
				return TextareaField;
			case 'checkbox':
				return CheckboxField;
			default:
				return InputField;
		}
	}
</script>

<form class={theme?.formClass || ''} onsubmit={handleSubmit}>
	{#each schema.fields as field}
		{#if field.type === 'checkbox'}
			<CheckboxField
				{field}
				value={formData[field.name]}
				error={errors[field.name]}
				{theme}
				onchange={(value) => handleFieldChange(field.name, value)}
			/>
		{:else if field.type === 'select'}
			<SelectField
				{field}
				value={formData[field.name]}
				error={errors[field.name]}
				{theme}
				onchange={(value) => handleFieldChange(field.name, value)}
			/>
		{:else if field.type === 'textarea'}
			<TextareaField
				{field}
				value={formData[field.name]}
				error={errors[field.name]}
				{theme}
				onchange={(value) => handleFieldChange(field.name, value)}
			/>
		{:else}
			<InputField
				{field}
				value={formData[field.name]}
				error={errors[field.name]}
				{theme}
				onchange={(value) => handleFieldChange(field.name, value)}
			/>
		{/if}
	{/each}
	
	<div class="d-flex gap-2">
		<button
			type="submit"
			class={theme?.buttonPrimaryClass || ''}
			disabled={isSubmitting}
		>
			{isSubmitting ? 'Submitting...' : submitLabel}
		</button>
		
		{#if showReset}
			<button
				type="button"
				class={theme?.buttonClass || ''}
				onclick={handleReset}
				disabled={isSubmitting}
			>
				{resetLabel}
			</button>
		{/if}
	</div>
</form>
