import type { FieldDefinition, FieldType, FormSchema } from '../types/index.js';

/**
 * Extract field type from Drizzle column definition
 */
function extractFieldType(column: any): FieldType {
	const columnType = column.columnType?.toLowerCase() || '';
	
	// Map Drizzle column types to form field types
	if (columnType.includes('varchar') || columnType.includes('text') || columnType.includes('char')) {
		return 'text';
	}
	if (columnType.includes('int') || columnType.includes('number') || columnType.includes('decimal') || columnType.includes('float')) {
		return 'number';
	}
	if (columnType.includes('boolean') || columnType.includes('bool')) {
		return 'checkbox';
	}
	if (columnType.includes('date') && columnType.includes('time')) {
		return 'datetime-local';
	}
	if (columnType.includes('date')) {
		return 'date';
	}
	if (columnType.includes('time')) {
		return 'time';
	}
	if (columnType.includes('enum')) {
		return 'select';
	}
	
	// Default to text
	return 'text';
}

/**
 * Parse a Drizzle table schema and extract field definitions
 */
export function parseSchema(tableSchema: any): FormSchema {
	const fields: FieldDefinition[] = [];
	
	// Check if it's a Drizzle table
	if (!tableSchema || typeof tableSchema !== 'object') {
		return { fields: [] };
	}
	
	// Access columns from Drizzle table
	const columns = tableSchema[Symbol.for('drizzle:Columns')] || tableSchema._?.columns || {};
	
	for (const [columnName, column] of Object.entries(columns)) {
		if (!column || typeof column !== 'object') continue;
		
		const col = column as any;
		const fieldType = extractFieldType(col);
		
		// Create field definition
		const field: FieldDefinition = {
			name: columnName,
			label: formatLabel(columnName),
			type: fieldType,
			required: col.notNull === true || col.hasDefault === false,
		};
		
		// Add constraints
		if (col.enumValues && Array.isArray(col.enumValues)) {
			field.options = col.enumValues.map((val: string) => ({
				label: formatLabel(val),
				value: val
			}));
		}
		
		// Add default value if exists
		if (col.default !== undefined) {
			field.defaultValue = col.default;
		}
		
		// Skip primary key fields (usually auto-generated)
		if (col.primary) {
			continue;
		}
		
		fields.push(field);
	}
	
	return { fields };
}

/**
 * Format a column name into a human-readable label
 */
function formatLabel(name: string): string {
	return name
		.replace(/([A-Z])/g, ' $1') // Add space before capitals
		.replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
		.replace(/\s+/g, ' ') // Normalize multiple spaces
		.trim()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

/**
 * Create a manual schema definition (for cases where you don't use Drizzle)
 */
export function createSchema(fields: FieldDefinition[]): FormSchema {
	return { fields };
}
