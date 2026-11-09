# ShopHub — React E-Commerce Application

A modern e-commerce web application built with React, featuring product browsing, dynamic product pages, user authentication, shopping cart management, and a streamlined checkout experience.

ShopHub focuses on reusable component architecture, predictable state management, and a clean user experience, applying modern React development practices to build a complete client-side shopping application.

##  Features

- **Product Catalog** — Browse products through a dynamically rendered product listing.
- **Product Details** — Dedicated product pages powered by dynamic routing.
- **User Authentication** — Sign-up and login functionality with persistent client-side authentication state.
- **Shopping Cart** — Add, remove, and update product quantities.
- **Global State Management** — Shared authentication and cart state using React Context.
- **Checkout** — Review cart items, manage quantities, and calculate order totals.
- **Order Simulation** — Complete a mock checkout flow.
- **Persistent Sessions** — Maintain authentication state across page refreshes.
- **Responsive Interface** — Designed to provide a consistent experience across different screen sizes.

##  Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based UI development |
| JavaScript (ES6+) | Application logic and interactivity |
| React Router DOM | Client-side routing and dynamic routes |
| Context API | Global state management |
| React Hooks | State, side effects, and reusable logic |
| HTML5 | Semantic application structure |
| CSS3 | Styling and responsive layouts |
| Vite | Development environment and build tooling |
| Local Storage | Client-side data persistence |
| Vercel | Application deployment |

##  Architecture & Engineering

ShopHub is structured around reusable components and clearly separated application responsibilities.

Key implementation decisions include:

- **Component Composition:** Building reusable UI components with well-defined responsibilities.
- **State Management:** Using `useState` for local state and Context API for application-wide state.
- **Custom Hooks:** Encapsulating reusable logic to improve code organization and maintainability.
- **Routing Architecture:** Organizing application navigation with React Router, including dynamic product routes and programmatic navigation.
- **Immutable State Updates:** Managing cart operations using JavaScript array methods such as `map()` and `filter()`.
- **Derived State:** Calculating values such as cart totals from existing application data rather than maintaining unnecessary duplicated state.
- **Side Effect Management:** Using `useEffect` to synchronize component behavior with changing dependencies.
- **UI State Handling:** Accounting for loading states, missing data, validation errors, and conditional rendering.

##  Authentication

The application implements a client-side authentication flow with:

- User registration and login.
- Credential validation.
- Authentication state shared through Context API.
- Session persistence using Local Storage.
- Navigation based on authentication state.

**Note:** Authentication is implemented on the frontend for demonstration purposes. It is not a replacement for server-side authentication, secure password storage, or production-grade authorization.

##  Shopping Cart & Checkout

The cart system supports:

- Adding products to the cart.
- Increasing and decreasing item quantities.
- Removing individual products.
- Maintaining cart state across application components.
- Automatically calculating subtotal and total values.
- Clearing the cart after a simulated order.

Cart updates follow immutable state management principles to maintain predictable UI behavior.


##  Code Quality

The project emphasizes maintainable React code and consistent development practices.

Code review and quality considerations include:

- Avoiding unnecessary state and side effects.
- Keeping components focused and reusable.
- Using stable keys when rendering lists.
- Handling edge cases and unavailable data.
- Avoiding unnecessary re-renders and premature optimization.
- Maintaining clear data flow between components.

##  Project Scope

ShopHub is a frontend-focused e-commerce application. Product data, authentication, and order processing are handled on the client side.

A production deployment would require additional backend services for secure authentication, database persistence, inventory management, payment processing, and order management.

##  Author

**Ayoub Rouatbi**

Computer Science Student | Frontend Developer | Aspiring AI Engineer

- GitHub: [@ayoubrouatbi11-collab](https://github.com/ayoubrouatbi11-collab)

---

*Built with React, focusing on clean architecture, reusable components, and practical application development.*
