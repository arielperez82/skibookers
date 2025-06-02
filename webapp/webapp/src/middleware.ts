import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@auth/adapters/middleware'
import { SupabaseServerAuthService } from '@auth/adapters/supabase/supabase-server-auth-service';

export async function middleware(request: NextRequest) {
  let authResponse = NextResponse.next({
    request,
  })
  
  const authService = new SupabaseServerAuthService({
    getAll() {
      return request.cookies.getAll()
    },
    setAll(cookiesToSet) {
      cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
      authResponse = NextResponse.next({
        request,
      })
      cookiesToSet.forEach(({ name, value, options }) =>
        authResponse.cookies.set(name, value, options)
      )
    },
  });

  return await updateSession(request, authResponse, authService);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - skibookers-logo.png (specific file)
     * - common static asset extensions (png, jpg, jpeg, svg, gif, webp, ico)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!public|_next/static|_next/image|static|favicon.ico|skibookers-logo.png).*)',
  ],
} 