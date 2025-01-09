# Modern E-commerce Platform

A fully-featured e-commerce platform built with React, TypeScript, and modern web technologies.

## Features

- 🛍️ **Product Management**
  - Product listing with filters and search
  - Detailed product views
  - Category management
  - Stock tracking

- 🛒 **Shopping Cart**
  - Real-time cart updates
  - Persistent cart state
  - Quantity management
  - Price calculations

- 👤 **User Authentication**
  - User registration and login
  - Profile management
  - Role-based access control

- 📦 **Order Management**
  - Order creation and tracking
  - Order history
  - Shipping address management
  - Order status updates

- 🎨 **Modern UI/UX**
  - Responsive design
  - Animated transitions
  - Loading states
  - Toast notifications

- 📊 **Admin Dashboard**
  - Sales analytics
  - Order management
  - Product management
  - User management

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod
- **Routing**: React Router
- **Icons**: Lucide React

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
│   └── ui/        # Reusable UI components
├── store/         # Zustand store configurations
├── types/         # TypeScript type definitions
├── lib/           # Utility functions
└── data/          # Mock data and constants
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.