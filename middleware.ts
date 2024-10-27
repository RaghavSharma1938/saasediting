import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define your custom public routes
const publicRoutes = ['/sign-in(.*)', '/sign-up(.*)', '/', '/api/webhooks/clerk', '/api/webhooks/stripe'];
const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, request) => {
  // Protects routes unless they match the publicRoutes list
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};