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
	
	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
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
	<select
		id={field.name}
		name={field.name}
		bind:value={value}
		class={theme?.selectClass || ''}
		required={field.required}
		onchange={handleChange}
	>
		<option value="">Select {field.label}</option>
		{#if field.options}
			{#each field.options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		{/if}
	</select>
	{#if field.description}
		<small class="form-text text-muted">{field.description}</small>
	{/if}
	{#if error}
		<div class={theme?.errorClass || ''}>{error}</div>
	{/if}
</div>
