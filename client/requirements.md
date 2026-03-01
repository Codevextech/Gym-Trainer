## Packages
framer-motion | Page transitions and scroll-triggered animations
recharts | Dashboard analytics charts and data visualization
date-fns | Human-readable date formatting

## Notes
Tailwind Config - CSS variables map directly to Tailwind's color utility system.
API routes send 401 on unauthenticated /api/me which the frontend catches to redirect or show auth states.
Role-based access requires checking user.role === 'admin' for Admin dashboard.
