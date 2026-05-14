```markdown
# omahamasons Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `omahamasons` TypeScript codebase. You'll learn how to name files, structure imports and exports, write and locate tests, and follow consistent commit practices. While no specific framework is detected, the repository follows clear conventions to ensure maintainability and clarity.

## Coding Conventions

### File Naming
- Use **camelCase** for all filenames.
  - Example: `userProfile.ts`, `orderManager.ts`

### Imports
- Use **relative import paths**.
  - Example:
    ```typescript
    import { getUser } from './userService';
    ```

### Exports
- Use **named exports** (not default).
  - Example:
    ```typescript
    // In userService.ts
    export function getUser(id: string) { ... }
    ```

### Commit Messages
- **Freeform** style, no strict prefixes.
- Average length: ~40 characters.
  - Example:  
    ```
    Add user authentication logic
    ```

## Workflows

### General Development
**Trigger:** When adding or updating code
**Command:** `/dev`

1. Create or update TypeScript files using camelCase naming.
2. Use relative imports for referencing other modules.
3. Export functions, classes, or constants using named exports.
4. Write a clear, concise commit message describing your change.

### Running Tests
**Trigger:** When verifying code correctness
**Command:** `/test`

1. Locate or create test files matching the `*.test.*` pattern (e.g., `userService.test.ts`).
2. Write tests for your modules (testing framework is unspecified; follow project precedent).
3. Run the test suite using the project's test runner (see project documentation or scripts).

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - Example: `userService.test.ts`
- The testing framework is not explicitly defined; check existing test files for structure and assertions.
- Place test files alongside the modules they test or in a dedicated `tests` directory, as per project structure.

## Commands
| Command   | Purpose                                      |
|-----------|----------------------------------------------|
| /dev      | Start general development workflow           |
| /test     | Run or write tests for the codebase          |
```
