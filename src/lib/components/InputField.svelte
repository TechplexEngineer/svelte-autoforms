<script lang="ts">
	import type { FieldDefinition, Theme } from '../types/index.js';
	
	interface Props {
		field: FieldDefinition;
		value?: string;
		error?: string;
		theme?: Theme;
		onchange?: (value: string) => void;
	}
	
	let { field, value = '', error, theme, onchange }: Props = $props();
	
	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		if (onchange) {
			onchange(target.value);
		}
	}
</script>

<div class={theme?.fieldWrapperClass || ''}>
	<label for={field.name} class={theme?.labelClass || ''}>
		{field.label}
		{#if field.required}
			<span class="text-danger">*</span>
		{/if}
	</label>
	<input
		type={field.type}
		id={field.name}
		name={field.name}
		bind:value={value}
		class={theme?.inputClass || ''}
		placeholder={field.placeholder || ''}
		required={field.required}
		min={field.min}
		max={field.max}
		minlength={field.minLength}
		maxlength={field.maxLength}
		pattern={field.pattern}
		oninput={handleInput}
	/>
	{#if field.description}
		<small class="form-text text-muted">{field.description}</small>
	{/if}
	{#if error}
		<div class={theme?.errorClass || ''}>{error}</div>
	{/if}
</div>
