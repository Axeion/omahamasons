```markdown
# omahamasons Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill covers the core development patterns used in the `omahamasons` JavaScript repository. It documents the project's coding conventions, file organization, and testing approach, providing clear examples and step-by-step workflows. This guide is intended to help contributors quickly understand and follow the established practices in this codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `userProfile.js`, `eventHandler.js`

### Imports
- Use **relative import paths**.
  - Example:
    ```javascript
    import { fetchData } from './apiUtils';
    ```

### Exports
- Use **named exports**.
  - Example:
    ```javascript
    // In utils.js
    export function calculateSum(a, b) {
      return a + b;
    }

    // In another file
    import { calculateSum } from './utils';
    ```

### Commit Messages
- Commit messages are **freeform** and do not follow a strict prefix or type.
- Average commit message length: ~58 characters.
  - Example: `Fix bug in event handler when input is empty`

## Workflows

### Adding a New Module
**Trigger:** When you need to add new functionality or a feature.
**Command:** `/add-module`

1. Create a new JavaScript file using camelCase naming.
2. Implement your feature using named exports.
3. Import your module in other files using a relative path.
4. Write a corresponding test file (see Testing Patterns).
5. Commit your changes with a clear, descriptive message.

### Refactoring Code
**Trigger:** When improving code structure or readability.
**Command:** `/refactor`

1. Identify the code to refactor.
2. Rename files using camelCase if needed.
3. Update import paths to remain relative.
4. Ensure all exports remain named.
5. Run tests to verify no regressions.
6. Commit changes with a descriptive message.

### Running Tests
**Trigger:** Before pushing changes or after making significant edits.
**Command:** `/run-tests`

1. Locate test files matching the `*.test.*` pattern.
2. Use the project's test runner (framework unknown; check project docs or scripts).
3. Run all tests and review output.
4. Fix any failing tests before committing.

## Testing Patterns

- Test files follow the pattern: `*.test.*` (e.g., `userProfile.test.js`).
- The specific testing framework is **unknown**; check for documentation or scripts in the repository.
- Example test file structure:
  ```javascript
  // userProfile.test.js
  import { getUserProfile } from './userProfile';

  test('returns correct user profile', () => {
    const result = getUserProfile(1);
    expect(result.name).toBe('Alice');
  });
  ```

## Commands

| Command        | Purpose                                              |
|----------------|------------------------------------------------------|
| /add-module    | Add a new module or feature following conventions    |
| /refactor      | Refactor code while maintaining project standards    |
| /run-tests     | Run all tests to ensure code quality                 |
```
