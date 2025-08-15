# Atlas - Sports Event Platform

Atlas is a comprehensive sports event platform that connects players, coaches, venue hosters, and sports enthusiasts. Built with modern web technologies, it provides a seamless experience for discovering, organizing, and participating in sports activities.

## 🚀 Features

### Core Functionality

- **User Management**: Multiple user types (Players, Special Users, Venue Hosters, Admins)
- **Event Management**: Create, join, and manage sports events
- **Venue Discovery**: Find and book sports facilities
- **Social Feed**: Share experiences, photos, and videos
- **Location Services**: Find nearby events and venues
- **Payment Integration**: Secure payment processing for bookings

### User Types

- **Players**: Join events, manage profile, connect with others
- **Special Users**: Coaches, trainers, event organizers, scouts
- **Venue Hosters**: Manage venues, handle bookings, track revenue
- **Admins**: Full platform control and user management

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Modern component library
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
atlas-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── dashboard/       # User dashboard
│   │   ├── events/         # Events listing and management
│   │   ├── venues/         # Venues discovery
│   │   ├── feed/           # Social feed
│   │   ├── profile/        # User profiles
│   │   ├── login/          # Authentication
│   │   └── register/       # User registration
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Shadcn/UI components
│   │   ├── auth/          # Authentication components
│   │   ├── layout/        # Layout components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── events/        # Event-related components
│   │   ├── venues/        # Venue-related components
│   │   ├── profile/       # Profile components
│   │   └── feed/          # Feed components
│   ├── types/             # TypeScript type definitions
│   ├── constants/         # Application constants
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd atlas-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Current Status

### ✅ Completed (Stage 1)

- [x] Next.js 14 project setup
- [x] Tailwind CSS configuration
- [x] Shadcn/UI component library
- [x] TypeScript type definitions
- [x] Responsive layout components
- [x] Authentication forms (Login/Register)
- [x] User dashboard with role-based views
- [x] Events listing and filtering
- [x] Venues discovery
- [x] Social feed with posts and interactions
- [x] User profile management
- [x] Navigation and routing
- [x] Framer Motion animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
