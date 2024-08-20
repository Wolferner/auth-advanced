# Auth Advanced

This project demonstrates an advanced authentication setup using Next.js and NextAuth.js, along with a range of modern web development tools and libraries. The project features authentication flows, session management, and more, all integrated with Tailwind CSS for styling.

## Features

- **Advanced Authentication**: Implemented using NextAuth.js with support for OAuth providers.
- **Prisma Integration**: Database management using Prisma ORM.
- **Responsive UI Components**: Built with Radix UI and styled using Tailwind CSS.
- **Dark Mode Support**: Implemented using `next-themes`.
- **Form Handling**: Managed with React Hook Form and Zod for schema validation.

## Technologies Used

- **Next.js**: The React framework used for building the application.
- **NextAuth.js**: For handling authentication.
- **Prisma**: Database ORM for managing data models.
- **React Hook Form**: Simplifies form handling and validation.
- **Radix UI**: Accessible, unstyled UI components for building a consistent UI.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **TypeScript**: For static type checking and better developer experience.

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/auth-advanced.git
cd auth-advanced
npm install
```

### Environment Variables

You need to create a `.env.local` file in the root of the project with the following variables:

```plaintext
DATABASE_URL
DATABASE_URL_UNPOOLED
GITHUB_ID
GITHUB_SECRET
GOOGLE_ID
GOOGLE_SECRET
RESEND_API_KEY
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
NEXTAUTH_SECRET
AUTH_SECRET
```

### Running the Project

To run the project locally:

```bash
npm run dev
```

### Building for Production

To build the project for production:

```bash
npm run build
npm start
```

### Project Structure

- **prisma**: Folder with migrations and DB models
- **actions**: Server actions with business logic
- **app**: Next routing with api
- **components**: UI components
- **data**: Reusable server functions for work with DB
- **hooks**: Custom hooks
- **lib**: Utility helpers
- **schemas**: Zod validation schemas
- **public**: Folder for all svg images and other public content

## Dependencies

The project relies on the following key dependencies:

### Core Dependencies

- `next`: ^14.1.0
- `react`: ^18
- `react-dom`: ^18
- `next-auth`: ^5.0.0-beta.13
- `@prisma/client`: ^5.9.1
- `prisma`: ^5.9.1
- `typescript`: ^5

### UI and Styling

- `tailwindcss`: ^3.3.0
- `@radix-ui/react-avatar`: ^1.0.4
- `@radix-ui/react-dialog`: ^1.0.5
- `@radix-ui/react-dropdown-menu`: ^2.0.6
- `@radix-ui/react-icons`: ^1.3.0
- `@radix-ui/react-label`: ^2.0.2
- `@radix-ui/react-select`: ^2.0.0
- `@radix-ui/react-slot`: ^1.0.2
- `@radix-ui/react-switch`: ^1.0.3
- `next-themes`: ^0.2.1
- `clsx`: ^2.1.0
- `tailwind-merge`: ^2.2.1
- `tailwindcss-animate`: ^1.0.7

### Authentication and Security

- `bcrypt`: ^5.1.1
- `bcryptjs`: ^2.4.3
- `@auth/prisma-adapter`: ^1.3.3
- `uuid`: ^9.0.1

### Form Management and Validation

- `react-hook-form`: ^7.50.1
- `@hookform/resolvers`: ^3.3.4
- `zod`: ^3.22.4

### Miscellaneous

- `react-icons`: ^5.0.1
- `react-spinners`: ^0.13.8
- `sonner`: ^1.4.0
- `resend`: ^3.2.0

### Development Dependencies

- `@types/bcrypt`: ^5.0.2
- `@types/bcryptjs`: ^2.4.6
- `@types/node`: ^20
- `@types/react`: ^18
- `@types/react-dom`: ^18
- `@types/uuid`: ^9.0.8
- `autoprefixer`: ^10.0.1
- `cross-env`: ^7.0.3
- `postcss`: ^8

```

```
