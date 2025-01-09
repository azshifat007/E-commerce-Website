# Modern E-commerce Platform

A fully-featured e-commerce platform built with React, TypeScript, and modern web technologies.

## Features

- 🛍️ **Product Management**
  - Product listing with filters and search
  - Detailed product views
  - Category management
  - Stock tracking
  - Product ratings and reviews

- 🛒 **Shopping Cart**
  - Real-time cart updates
  - Persistent cart state
  - Quantity management
  - Price calculations
  - Dark mode support

- 👤 **User Authentication**
  - User registration and login
  - Profile management
  - Role-based access control
  - Secure authentication flow

- 📦 **Order Management**
  - Order creation and tracking
  - Order history
  - Shipping address management
  - Order status updates
  - Real-time notifications

- 🏪 **Vendor Features**
  - Vendor registration and verification
  - Business profile management
  - Product catalog management
  - Order fulfillment
  - Sales analytics dashboard
  - Inventory tracking
  - Performance metrics
  - Revenue analytics

- 🎨 **Modern UI/UX**
  - Responsive design
  - Dark/Light mode
  - Animated transitions
  - Loading states
  - Toast notifications
  - Mobile-first approach

- 📊 **Admin Dashboard**
  - Sales analytics
  - Order management
  - Product management
  - User management
  - Vendor approval system

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **State Management**: Zustand with persistence
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Type Safety**: TypeScript
- **Data Persistence**: Local Storage

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/modern-ecommerce.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/     # React components
│   ├── admin/     # Admin dashboard components
│   ├── auth/      # Authentication components
│   ├── cart/      # Shopping cart components
│   ├── checkout/  # Checkout components
│   ├── orders/    # Order management components
│   ├── vendor/    # Vendor management components
│   └── ui/        # Reusable UI components
├── store/         # Zustand store configurations
│   ├── auth.ts    # Authentication store
│   ├── cart.ts    # Shopping cart store
│   ├── theme.ts   # Theme preferences store
│   └── vendor.ts  # Vendor management store
├── types/         # TypeScript type definitions
├── lib/           # Utility functions
└── data/         # Mock data and constants
```

## Key Features

### Dark Mode
- System-wide dark mode support
- Persistent theme preference
- Automatic system theme detection
- Smooth theme transitions

### Vendor Management
- Comprehensive vendor registration
- Business verification process
- Product catalog management
- Order fulfillment system
- Sales analytics and reporting
- Revenue tracking
- Inventory management
- Customer insights

### Security
- Role-based access control
- Protected routes
- Secure authentication
- Data persistence
- Form validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
