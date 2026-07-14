```markdown
# omahamasons Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill introduces the core development patterns and conventions used in the `omahamasons` JavaScript codebase. It covers file naming, import/export styles, commit message habits, and testing patterns. While no specific frameworks or automated workflows are detected, this guide will help you contribute code that matches the project's established style.

## Coding Conventions

### File Naming
- **Style:** camelCase  
  Example:  
  ```
  userProfile.js
  eventManager.js
  ```

### Imports
- **Style:** Relative imports  
  Example:  
  ```js
  import { getUser } from './userProfile';
  import { calculateTotal } from '../utils/mathHelpers';
  ```

### Exports
- **Style:** Named exports  
  Example:  
  ```js
  // In userProfile.js
  export function getUser(id) { ... }
  export function setUser(data) { ... }
  ```

### Commit Messages
- **Type:** Freeform (no enforced prefixes)
- **Average Length:** ~51 characters
- **Example:**  
  ```
  Add RSVP functionality to event page
  Fix bug in user authentication flow
  ```

## Workflows

### Adding a New Feature
**Trigger:** When you need to introduce new functionality  
**Command:** `/add-feature`

1. Create a new JavaScript file using camelCase naming.
2. Implement the feature using relative imports for dependencies.
3. Export your functions or constants using named exports.
4. Write a corresponding test file named `featureName.test.js`.
5. Commit your changes with a clear, concise message.

### Fixing a Bug
**Trigger:** When resolving a defect or issue  
**Command:** `/fix-bug`

1. Locate the relevant file(s) and make necessary corrections.
2. Update or add tests in `*.test.js` files to cover the fix.
3. Commit with a descriptive message about the bug fix.

### Writing Tests
**Trigger:** When adding or updating functionality  
**Command:** `/write-test`

1. Create or update a test file matching `*.test.js`.
2. Write tests for each exported function or feature.
3. Run your tests using the project's test runner (framework unknown; check project docs or package.json).

## Testing Patterns

- **File Pattern:** Test files are named with the pattern `*.test.js`.
- **Framework:** Not explicitly detected—refer to project documentation or dependencies.
- **Example Test File:**  
  ```js
  // userProfile.test.js
  import { getUser } from './userProfile';

  test('getUser returns correct user', () => {
    const user = getUser(1);
    expect(user.id).toBe(1);
  });
  ```

## Commands
| Command      | Purpose                                 |
|--------------|-----------------------------------------|
| /add-feature | Scaffold and implement a new feature    |
| /fix-bug     | Guide for fixing bugs and writing tests |
| /write-test  | Steps to add or update test files       |
```
