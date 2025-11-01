<script lang="ts">
	import { AutoForm, createSchema, bootstrapTheme, defaultTheme } from '$lib';
	import type { FormSchema } from '$lib';
	
	// Example 1: Manual schema definition
	const userSchema: FormSchema = createSchema([
		{
			name: 'username',
			label: 'Username',
			type: 'text',
			required: true,
			minLength: 3,
			maxLength: 20,
			placeholder: 'Enter username',
			description: 'Choose a unique username'
		},
		{
			name: 'email',
			label: 'Email Address',
			type: 'email',
			required: true,
			placeholder: 'user@example.com'
		},
		{
			name: 'password',
			label: 'Password',
			type: 'password',
			required: true,
			minLength: 8,
			description: 'Must be at least 8 characters'
		},
		{
			name: 'age',
			label: 'Age',
			type: 'number',
			min: 18,
			max: 120,
			placeholder: '18'
		},
		{
			name: 'role',
			label: 'User Role',
			type: 'select',
			required: true,
			options: [
				{ label: 'Admin', value: 'admin' },
				{ label: 'User', value: 'user' },
				{ label: 'Guest', value: 'guest' }
			]
		},
		{
			name: 'bio',
			label: 'Biography',
			type: 'textarea',
			maxLength: 500,
			placeholder: 'Tell us about yourself...'
		},
		{
			name: 'newsletter',
			label: 'Subscribe to newsletter',
			type: 'checkbox',
			defaultValue: false
		}
	]);
	
	// Example 2: Contact form schema
	const contactSchema: FormSchema = createSchema([
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
			name: 'subject',
			label: 'Subject',
			type: 'select',
			required: true,
			options: [
				{ label: 'General Inquiry', value: 'general' },
				{ label: 'Technical Support', value: 'support' },
				{ label: 'Sales', value: 'sales' },
				{ label: 'Feedback', value: 'feedback' }
			]
		},
		{
			name: 'message',
			label: 'Message',
			type: 'textarea',
			required: true,
			minLength: 10,
			placeholder: 'Your message here...'
		}
	]);
	
	let submittedData = $state<any>(null);
	let selectedTheme = $state<'bootstrap' | 'default'>('bootstrap');
	
	function handleUserSubmit(data: Record<string, any>) {
		console.log('User form submitted:', data);
		submittedData = { form: 'User Registration', data };
		alert('User form submitted! Check console and submitted data section.');
	}
	
	function handleContactSubmit(data: Record<string, any>) {
		console.log('Contact form submitted:', data);
		submittedData = { form: 'Contact Form', data };
		alert('Contact form submitted! Check console and submitted data section.');
	}
	
	const currentTheme = $derived(selectedTheme === 'bootstrap' ? bootstrapTheme : defaultTheme);
</script>

<svelte:head>
	<title>Svelte AutoForms Demo</title>
	<link
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container my-5">
	<header class="mb-5">
		<h1 class="display-4">Svelte AutoForms</h1>
		<p class="lead">
			Automatically generate forms from Drizzle database schemas or manual schema definitions
		</p>
		<p class="text-muted">
			Inspired by <a href="https://github.com/Meteor-Community-Packages/meteor-autoform" target="_blank">meteor-autoform</a>
		</p>
	</header>
	
	<section class="mb-5">
		<div class="card">
			<div class="card-body">
				<h3 class="card-title">Theme Selector</h3>
				<div class="btn-group" role="group">
					<button
						type="button"
						class="btn btn-outline-primary {selectedTheme === 'bootstrap' ? 'active' : ''}"
						onclick={() => selectedTheme = 'bootstrap'}
					>
						Bootstrap Theme
					</button>
					<button
						type="button"
						class="btn btn-outline-primary {selectedTheme === 'default' ? 'active' : ''}"
						onclick={() => selectedTheme = 'default'}
					>
						Default Theme
					</button>
				</div>
			</div>
		</div>
	</section>
	
	<div class="row">
		<div class="col-md-6 mb-4">
			<section class="card h-100">
				<div class="card-body">
					<h2 class="card-title h4">User Registration Form</h2>
					<p class="card-text text-muted">
						Example with various field types including text, email, password, number, select, textarea, and checkbox
					</p>
					<hr />
					<AutoForm
						schema={userSchema}
						theme={currentTheme}
						onSubmit={handleUserSubmit}
						submitLabel="Register"
						showReset={true}
					/>
				</div>
			</section>
		</div>
		
		<div class="col-md-6 mb-4">
			<section class="card h-100">
				<div class="card-body">
					<h2 class="card-title h4">Contact Form</h2>
					<p class="card-text text-muted">
						Simpler contact form example
					</p>
					<hr />
					<AutoForm
						schema={contactSchema}
						theme={currentTheme}
						onSubmit={handleContactSubmit}
						submitLabel="Send Message"
					/>
				</div>
			</section>
		</div>
	</div>
	
	{#if submittedData}
		<section class="card mt-4">
			<div class="card-body">
				<h3 class="card-title">Submitted Data</h3>
				<p class="text-muted">Form: {submittedData.form}</p>
				<pre class="bg-light p-3 rounded"><code>{JSON.stringify(submittedData.data, null, 2)}</code></pre>
			</div>
		</section>
	{/if}
	
	<section class="mt-5">
		<div class="card">
			<div class="card-body">
				<h3 class="card-title">Features</h3>
				<ul class="list-unstyled">
					<li class="mb-2">✅ Generate forms from Drizzle ORM schemas</li>
					<li class="mb-2">✅ Manual schema definition support</li>
					<li class="mb-2">✅ Built-in validation (required, min/max, length, pattern)</li>
					<li class="mb-2">✅ Themeable with Bootstrap theme included</li>
					<li class="mb-2">✅ TypeScript support</li>
					<li class="mb-2">✅ Multiple field types (text, email, password, number, date, select, textarea, checkbox)</li>
					<li class="mb-2">✅ Form reset functionality</li>
					<li class="mb-2">✅ Default values</li>
					<li class="mb-2">✅ Field descriptions and placeholders</li>
				</ul>
			</div>
		</div>
	</section>
	
	<section class="mt-5">
		<div class="card">
			<div class="card-body">
				<h3 class="card-title">Usage with Drizzle ORM</h3>
				<pre class="bg-light p-3 rounded"><code>{`import { pgTable, serial, varchar, integer, boolean } from 'drizzle-orm/pg-core';
import { AutoForm, parseSchema, bootstrapTheme } from 'svelte-autoforms';

// Define your Drizzle schema
const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  age: integer('age'),
  isActive: boolean('is_active').default(true)
});

// Parse the schema and create a form
const schema = parseSchema(users);

// Use in your component
<AutoForm
  schema={schema}
  theme={bootstrapTheme}
  onSubmit={(data) => console.log(data)}
/>
`}</code></pre>
			</div>
		</div>
	</section>
</div>

<style>
	:global(.autoform) {
		max-width: 100%;
	}
	
	:global(.autoform-field) {
		margin-bottom: 1rem;
	}
	
	:global(.autoform-label) {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}
	
	:global(.autoform-input),
	:global(.autoform-select),
	:global(.autoform-textarea) {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}
	
	:global(.autoform-checkbox-wrapper) {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	:global(.autoform-error) {
		color: #dc3545;
		font-size: 0.875rem;
		margin-top: 0.25rem;
	}
	
	:global(.autoform-button) {
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		background: #f8f9fa;
		cursor: pointer;
	}
	
	:global(.autoform-button-primary) {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 4px;
		background: #0d6efd;
		color: white;
		cursor: pointer;
	}
	
	:global(.autoform-button-primary:hover),
	:global(.autoform-button:hover) {
		opacity: 0.9;
	}
</style>

