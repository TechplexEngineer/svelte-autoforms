# Examples

This directory contains example implementations of svelte-autoforms.

## Basic Example with Drizzle ORM

```typescript
// schema.ts - Define your Drizzle schema
import { pgTable, serial, varchar, integer, boolean, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  age: integer('age'),
  bio: text('bio'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow()
});
```

```svelte
<!-- +page.svelte - Use AutoForm with your schema -->
<script lang="ts">
  import { AutoForm, parseSchema, bootstrapTheme } from 'svelte-autoforms';
  import { users } from './schema';
  
  const schema = parseSchema(users);
  
  async function handleSubmit(data) {
    console.log('Form submitted:', data);
    // Send data to your API
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      alert('User created successfully!');
    }
  }
</script>

<AutoForm
  {schema}
  theme={bootstrapTheme}
  onSubmit={handleSubmit}
  submitLabel="Create User"
/>
```

## Custom Schema Example

```svelte
<script lang="ts">
  import { AutoForm, createSchema, bootstrapTheme } from 'svelte-autoforms';
  
  const schema = createSchema([
    {
      name: 'productName',
      label: 'Product Name',
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { label: 'Electronics', value: 'electronics' },
        { label: 'Clothing', value: 'clothing' },
        { label: 'Books', value: 'books' }
      ]
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      min: 0,
      placeholder: '0.00'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      maxLength: 500
    },
    {
      name: 'inStock',
      label: 'In Stock',
      type: 'checkbox',
      defaultValue: true
    }
  ]);
  
  function handleSubmit(data) {
    console.log('Product:', data);
  }
</script>

<AutoForm
  {schema}
  theme={bootstrapTheme}
  onSubmit={handleSubmit}
  submitLabel="Add Product"
  showReset={true}
/>
```

## Custom Theme Example

```svelte
<script lang="ts">
  import { AutoForm, createSchema } from 'svelte-autoforms';
  import type { Theme } from 'svelte-autoforms';
  
  // Create a custom theme using Tailwind CSS classes
  const tailwindTheme: Theme = {
    formClass: 'space-y-4',
    fieldWrapperClass: 'flex flex-col',
    labelClass: 'text-sm font-medium text-gray-700 mb-1',
    inputClass: 'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
    selectClass: 'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
    textareaClass: 'px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
    checkboxClass: 'h-4 w-4 text-blue-600 border-gray-300 rounded',
    checkboxWrapperClass: 'flex items-center space-x-2',
    errorClass: 'text-red-600 text-sm mt-1',
    buttonClass: 'px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50',
    buttonPrimaryClass: 'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
  };
  
  const schema = createSchema([
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true }
  ]);
</script>

<AutoForm
  {schema}
  theme={tailwindTheme}
  onSubmit={(data) => console.log(data)}
/>
```

## Using Individual Field Components

```svelte
<script lang="ts">
  import { InputField, SelectField, bootstrapTheme } from 'svelte-autoforms';
  
  let username = '';
  let role = '';
  
  function handleSubmit() {
    console.log({ username, role });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <InputField
    field={{
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      minLength: 3
    }}
    bind:value={username}
    theme={bootstrapTheme}
  />
  
  <SelectField
    field={{
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' }
      ]
    }}
    bind:value={role}
    theme={bootstrapTheme}
  />
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

## Advanced: Form with API Integration

```svelte
<script lang="ts">
  import { AutoForm, parseSchema, bootstrapTheme } from 'svelte-autoforms';
  import { users } from './schema';
  
  const schema = parseSchema(users);
  let isLoading = false;
  let error = '';
  let success = false;
  
  async function handleSubmit(data) {
    isLoading = true;
    error = '';
    success = false;
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }
      
      success = true;
      setTimeout(() => success = false, 3000);
    } catch (e) {
      error = e.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="container">
  {#if success}
    <div class="alert alert-success">User created successfully!</div>
  {/if}
  
  {#if error}
    <div class="alert alert-danger">{error}</div>
  {/if}
  
  <AutoForm
    {schema}
    theme={bootstrapTheme}
    onSubmit={handleSubmit}
    submitLabel={isLoading ? 'Creating...' : 'Create User'}
  />
</div>
```
