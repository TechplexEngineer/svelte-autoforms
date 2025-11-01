<script lang="ts">
	import type { FieldDefinition, Theme } from '../types/index.js';
	
	interface Props {
		field: FieldDefinition;
		value?: boolean;
		error?: string;
		theme?: Theme;
		onchange?: (value: boolean) => void;
	}
	
	let { field, value = false, error, theme, onchange }: Props = $props();
	
	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (onchange) {
			onchange(target.checked);
		}
	}
</script>

<div class={theme?.checkboxWrapperClass || ''}>
	<input
		type="checkbox"
		id={field.name}
		name={field.name}
		bind:checked={value}
		class={theme?.checkboxClass || ''}
		required={field.required}
		onchange={handleChange}
	/>
	<label for={field.name} class={theme?.labelClass || ''}>
		{field.label}
		{#if field.required}
			<span class="text-danger">*</span>
		{/if}
	</label>
	{#if field.description}
		<small class="form-text text-muted d-block">{field.description}</small>
	{/if}
	{#if error}
		<div class={theme?.errorClass || ''}>{error}</div>
	{/if}
</div>
