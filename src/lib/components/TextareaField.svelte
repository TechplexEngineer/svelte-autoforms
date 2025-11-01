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
		const target = event.target as HTMLTextAreaElement;
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
	<textarea
		id={field.name}
		name={field.name}
		bind:value={value}
		class={theme?.textareaClass || ''}
		placeholder={field.placeholder || ''}
		required={field.required}
		minlength={field.minLength}
		maxlength={field.maxLength}
		rows="4"
		oninput={handleInput}
	></textarea>
	{#if field.description}
		<small class="form-text text-muted">{field.description}</small>
	{/if}
	{#if error}
		<div class={theme?.errorClass || ''}>{error}</div>
	{/if}
</div>
