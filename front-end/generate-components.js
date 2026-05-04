#!/usr/bin/env node

/**
 * Script to generate remaining React components
 * Run: node generate-components.js
 */

const fs = require('fs');
const path = require('path');

// Component templates
const templates = {
  Input: `import { cn } from '../../utils/cn';

export default function Input({ label, error, className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}`,

  Select: `import { cn } from '../../utils/cn';

export default function Select({ label, error, options = [], className, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          error ? 'border-red-500' : 'border-gray-300',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}`,

  Badge: `import { cn } from '../../utils/cn';

const variantStyles = {
  new: 'bg-green-100 text-green-800',
  sale: 'bg-red-100 text-red-800',
  'best-seller': 'bg-yellow-100 text-yellow-800',
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  shipping: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export default function Badge({ variant = 'new', children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}`,

  EmptyState: `export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {icon && <div className="text-gray-400 mb-4">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}`,

  LoadingSkeleton: `export default function LoadingSkeleton({ className }) {
  return (
    <div className={\`animate-pulse bg-gray-200 rounded \${className}\`} />
  );
}`,
};

// Create components
Object.entries(templates).forEach(([name, content]) => {
  const filePath = path.join(__dirname, 'src', 'components', 'common', \`\${name}.jsx\`);
  fs.writeFileSync(filePath, content);
  console.log(\`✓ Created \${name}.jsx\`);
});

console.log('\\n✅ All components generated successfully!');
