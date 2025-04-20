# Airbnb Clone - Microservices Project

A clone of the Airbnb platform built using a microservices architecture. This project serves as a learning ground to apply and solidify backend development concepts and system design principles.

The journey, challenges, and solutions encountered during the development of this project will be documented and shared.

## Project Goals

- Implement core Airbnb features using microservices.
- Apply best practices in backend development and system design.
- Utilize Docker for containerization and consistent environments.
- Enforce code quality using ESLint, Prettier, and Husky.
- Learn in public by sharing progress and challenges.

## Services

Currently planned/implemented services:

- **HotelServices:** Manages hotel listings, details, availability, etc. (Located in `/HotelServices`)
- _(More services to be added, e.g., User Service, Booking Service, Payment Service)_

## Tech Stack

- **Backend:** Node.js, Express.js (initially, may vary per service)
- **Database:** MySQL (managed via Docker)
- **Containerization:** Docker, Docker Compose
- **Code Quality:** ESLint, Prettier
- **Git Hooks:** Husky, lint-staged
- **Package Manager:** pnpm

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ayushrajput8021/Airbnb.git
   cd Airbnb
   ```

2. **Install root dependencies:**

   ```bash
   npm install
   ```

   _(Note: Each microservice might have its own dependencies. Navigate to the service directory and run `npm install` if needed.)_

3. **Start services (including database):**

   ```bash
   docker compose up -d
   ```

4. **(Optional) Run individual services locally (if applicable):**
   - Navigate to the service directory (e.g., `cd HotelServices`).
   - Run the start script (e.g., `npm start` or `npm run dev` - _Define these within each service's package.json_).

## Available Scripts (Root Level)

- `npm run lint`: Lint all JavaScript/TypeScript files in the project.
- `npm run format`: Format all supported files using Prettier.
- `npm test`: (Placeholder) Run tests.
- `npm run prepare`: Installs Husky hooks (runs automatically after `npm install`).

## Code Quality & Committing

This project uses ESLint and Prettier, managed by Husky and lint-staged.

- **Pre-commit Hook:** Before any commit, staged files are automatically linted and formatted. Ensure your changes adhere to the defined styles (`.eslintrc.js`, `.prettierrc.js`). Commits will fail if linting errors persist after auto-fixing.
- **Auto-Versioning:** The `package.json` version at the root level is automatically incremented (patch version) on every successful commit.

## Contributing

Contributions are welcome! Please ensure your code adheres to the linting and formatting standards enforced by the pre-commit hooks.

## License

ISC (See `package.json`)
