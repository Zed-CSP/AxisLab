# AxisLab Project TODO List

## TypeScript Enhancements

- [ ] Enable stricter TypeScript configurations in `tsconfig.json`
  - [ ] Add `"strict": true` to enforce more rigorous type checking
  - [ ] Enable `"noImplicitAny": true` to prevent implicit any types
  - [ ] Add `"exactOptionalPropertyTypes": true` for better optional property handling
- [ ] Create comprehensive type definitions for MuJoCo WebAssembly API
- [ ] Add proper return types to all functions, especially in helper files like `urdfViewerHelpers.ts`
- [ ] Replace any remaining `any` types with specific interfaces

## Code Organization

- [ ] Implement a more consistent component folder structure
  - [ ] Group related components into feature folders (e.g., `/src/features/urdf-viewer/`)
  - [ ] Separate presentational and container components
  - [ ] Create dedicated folders for shared UI components
- [ ] Standardize file naming conventions across the project
  - [ ] Use consistent casing (kebab-case for files, PascalCase for components)
  - [ ] Add type indicators for specialized files (e.g., `.context.tsx`, `.hook.ts`)

## State Management

- [ ] Consider using a more structured state management approach
  - [ ] Implement the reducer pattern for complex state logic in contexts
  - [ ] Split large contexts like `RobotContext` into smaller, focused contexts
  - [ ] Add memoization for derived state to prevent unnecessary re-renders
- [ ] Implement React.memo for pure components to prevent unnecessary re-renders
- [ ] Use useCallback and useMemo more consistently for functions and computed values
- [ ] Optimize context providers to minimize re-renders of child components

## Error Handling

- [ ] Implement a global error boundary to catch and handle unexpected errors
- [ ] Add proper error states and recovery mechanisms in all async operations
- [ ] Create user-friendly error messages and recovery options
- [ ] Implement consistent loading state management across the application
- [ ] Add skeleton loaders for better user experience during data fetching
- [ ] Handle edge cases like network failures gracefully

## Code Duplication and Reusability

- [ ] Extract common functionality into reusable custom hooks
  - [ ] Create a `useModelLoader` hook to handle both URDF and MJCF loading logic
  - [ ] Implement a `useViewerControls` hook for shared camera/control functionality
  - [ ] Develop a `useFileUpload` hook for drag-and-drop functionality
- [ ] Move helper functions from components to dedicated utility files
- [ ] Create a comprehensive set of utility functions for common operations
- [ ] Implement proper JSDoc documentation for all utility functions

## Testing

- [ ] Implement Jest and React Testing Library for component testing
- [ ] Add unit tests for critical utility functions and hooks
- [ ] Create integration tests for key user flows
- [ ] Aim for at least 70% test coverage of core functionality
- [ ] Implement snapshot tests for UI components
- [ ] Add visual regression tests for 3D viewers

## Code Style and Documentation

- [ ] Implement ESLint and Prettier configurations with stricter rules
- [ ] Add pre-commit hooks to enforce code style
- [ ] Create a style guide for the project
- [ ] Add comprehensive JSDoc comments to all functions and components
- [ ] Create a developer documentation site using tools like Storybook
- [ ] Document complex algorithms and workflows with diagrams

## Performance Optimization

- [ ] Implement code splitting for large dependencies (especially Three.js)
- [ ] Use dynamic imports for non-critical components
- [ ] Analyze and optimize bundle size with tools like `webpack-bundle-analyzer`
- [ ] Optimize Three.js rendering with techniques like object pooling
- [ ] Implement level-of-detail (LOD) for complex models
- [ ] Add frame rate monitoring and automatic quality adjustments

## Security

- [ ] Add validation for all user inputs, especially file uploads
- [ ] Implement proper sanitization for any user-provided content
- [ ] Add CORS and CSP headers for enhanced security

## Accessibility

- [ ] Add proper ARIA attributes to all interactive elements
- [ ] Ensure keyboard navigation works throughout the application
- [ ] Implement focus management for modal dialogs and overlays

## Specific Component Improvements

### UrdfViewer Component
- [ ] Refactor the large useEffect blocks into smaller, focused effects
- [ ] Extract the custom element registration logic into a separate hook
- [ ] Implement proper cleanup for Three.js resources

### MjcfViewer Component
- [ ] Improve the iframe communication with a more structured API
- [ ] Add retry mechanisms for iframe loading failures
- [ ] Extract theme handling into a dedicated hook

### RobotContext
- [ ] Implement a reducer pattern for more predictable state updates
- [ ] Add persistence for user preferences (selected robots, view settings)
- [ ] Create a more robust initialization process with fallbacks
