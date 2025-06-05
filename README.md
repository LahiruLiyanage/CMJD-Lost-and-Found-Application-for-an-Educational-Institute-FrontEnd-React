# 🔍 Lost and Found Application

A comprehensive web application for managing lost and found items in educational institutions, built with React, TypeScript, and modern web technologies.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Lost and Found Application is designed to help educational institutions manage lost and found items efficiently. It provides a user-friendly interface for students, staff, and administrators to report, search, and manage lost items with role-based access control.

### Key Objectives
- Streamline the lost and found process
- Provide secure, role-based access
- Enable efficient item tracking and management
- Offer responsive design for all devices

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Student, Staff)
- Secure login/logout functionality
- Password validation and security

### 📱 User Management
- User registration with role assignment
- Profile management
- Department-based organization

### 🎒 Item Management
- **Report Lost Items**: Users can report items they've lost
- **Report Found Items**: Users can report items they've found
- **Search & Filter**: Advanced search functionality
- **Item Categories**: Organized categorization system
- **Status Tracking**: Track item status (Lost, Found, Claimed, Returned)

### 👥 Role-Based Features

#### 🎓 Student Role
- Report lost/found items
- View own submissions
- Search available items
- Update profile information

#### 👨‍💼 Staff Role
- All student permissions
- Manage items within their department
- View department statistics
- Assist with item verification

#### 🛡️ Admin Role
- Full system access
- User management
- System-wide item management
- Analytics and reporting
- System configuration

### 🎨 User Interface
- Responsive design for mobile and desktop
- Modern, intuitive interface
- Dark/light mode support
- Accessibility features

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling framework
- **React Hook Form** - Form management
- **Yup** - Schema validation
- **Axios** - HTTP client
- **Lucide React** - Icon library

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **IntelliJ IDEA Ultimate** - IDE optimization
- **Git** - Version control

### Backend Integration
- **JWT** - Authentication tokens
- **RESTful API** - Backend communication
- **Local Storage** - Client-side data persistence

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **Git** for version control
- **IntelliJ IDEA Ultimate** (recommended)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/lost-found-app.git
cd lost-found-app
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=Lost and Found
VITE_JWT_SECRET=your-jwt-secret-key
```

### 4. Initialize Tailwind CSS
```bash
npx tailwindcss init -p
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 📖 Usage

### Getting Started

1. **Access the Application**
    - Navigate to `http://localhost:3000`
    - You'll see the home page with login options

2. **Sign In**
    - Use the demo credentials provided on the login page
    - Or create a new account via the sign-up page

3. **Dashboard**
    - After login, you'll be redirected to your dashboard
    - View recent activities and quick actions

### Demo Credentials

For testing purposes, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@university.edu | admin123 |
| Student | student@university.edu | student123 |
| Staff | staff@university.edu | staff123 |

### Common Tasks

#### Reporting a Lost Item
1. Navigate to "Report Lost Item"
2. Fill in item details (name, description, location, etc.)
3. Upload photos if available
4. Submit the report

#### Searching for Items
1. Use the search bar on the items page
2. Apply filters (category, date, location)
3. Browse results and contact item holders

#### Managing Items (Admin/Staff)
1. Access the admin panel
2. View all items in the system
3. Update item statuses
4. Manage user accounts

## 📁 Project Structure

```
lost-found-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   └── AuthForm.tsx
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── items/
│   │   │   ├── ItemsList.tsx
│   │   │   ├── ItemCard.tsx
│   │   │   ├── ItemForm.tsx
│   │   │   └── ItemDetails.tsx
│   │   └── layout/
│   │       └── Layout.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   └── useLocalStorage.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── itemService.ts
│   ├── types/
│   │   ├── auth.ts
│   │   ├── item.ts
│   │   └── api.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   └── helpers.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Profile.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🔌 API Documentation

### Authentication Endpoints
```
POST /api/auth/signin    - User login
POST /api/auth/signup    - User registration
POST /api/auth/logout    - User logout
GET  /api/auth/profile   - Get user profile
PUT  /api/auth/profile   - Update user profile
```

### Item Management Endpoints
```
GET    /api/items        - Get all items (with pagination)
POST   /api/items        - Create new item
GET    /api/items/:id    - Get item by ID
PUT    /api/items/:id    - Update item
DELETE /api/items/:id    - Delete item
GET    /api/items/search - Search items
```

### User Management Endpoints (Admin only)
```
GET    /api/users        - Get all users
GET    /api/users/:id    - Get user by ID
PUT    /api/users/:id    - Update user
DELETE /api/users/:id    - Delete user
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Login Process**
    - User submits credentials
    - Server validates and returns JWT token
    - Token stored in localStorage
    - Token included in subsequent API requests

2. **Protected Routes**
    - Routes wrapped with `ProtectedRoute` component
    - Automatically redirects unauthenticated users
    - Role-based access control implemented

3. **Token Management**
    - Automatic token refresh (if supported by backend)
    - Secure token storage practices
    - Logout clears all stored tokens

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Code Style

This project follows:
- **ESLint** configuration for code quality
- **Prettier** for consistent formatting
- **TypeScript** strict mode enabled
- **Conventional Commits** for commit messages

### IDE Configuration

Optimized for **IntelliJ IDEA Ultimate**:
- TypeScript Language Service enabled
- Auto-formatting on save
- ESLint integration
- Path mapping configured

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests if applicable**
5. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/modifications
- `chore:` Maintenance tasks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CMJD Institute** - For the project requirements and guidance
- **React Team** - For the amazing React library
- **Tailwind CSS** - For the utility-first CSS framework
- **TypeScript Team** - For type safety and developer experience

## 📧 Contact

For any questions or feedback, feel free to reach out:

- Mobile: [+94719607296](tel:+94719607296)
- Email: [lhlahiru95@gmail.com](mailto:lhlahiru95@gmail.com)
- LinkedIn: [LahiruLiyanage](https://www.linkedin.com/in/liyanage-lahiru/)
- GitHub: [@LahiruLiyanage](https://github.com/LahiruLiyanage)
- WebSite: [lahiruliyanage.com](www.lahiruliyanage.com)

---

**Built with ❤️ for CMJD Batch 108/109**

*Assignment 2: Front-end Development with React*