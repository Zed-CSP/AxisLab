# Security Measures for AxisLab

## NPM Security Configuration

This project uses NPM with specific security configurations to prevent automatic updates and potential supply chain attacks:

### NPM Configuration (.npmrc)

- **save-exact=true**: Ensures dependencies are installed with exact versions rather than using semver ranges
- **package-lock=true**: Enforces the use of package-lock.json for deterministic builds
- **audit=false**: Disables automatic npm audit checks that could trigger unwanted network requests
- **fund=false**: Disables funding messages
- **legacy-peer-deps=true**: Prevents npm from auto-installing peer dependencies
- **update-notifier=false**: Disables automatic update checks
- **node-version-check=false**: Disables npm version check
- **no-audit=true**: Disables npm security warnings that could trigger network requests

### Dependency Management

- All dependencies are locked to specific versions (no ^ or ~ prefixes)
- Node.js version is specified in the package.json "engines" field
- Package manager version is specified in the "packageManager" field

## Recommended Security Practices

1. **Regular Manual Audits**: Instead of automatic updates, perform manual security audits of dependencies periodically
2. **Dependency Review**: Review new dependencies carefully before adding them to the project
3. **Minimal Dependencies**: Keep the dependency tree as small as possible
4. **CI Security Scanning**: Implement security scanning in CI pipelines using tools like Snyk or GitHub Security
5. **Input Validation**: Implement proper validation for all user inputs, especially file uploads

## Reporting Security Issues

If you discover a security vulnerability in this project, please report it by sending an email to [security@axisforge.com](mailto:security@axisforge.com).

Please do not disclose security vulnerabilities publicly until they have been addressed by the maintainers.

## Security Updates

Security updates will be applied manually after thorough testing to ensure they don't introduce new vulnerabilities or break existing functionality.
