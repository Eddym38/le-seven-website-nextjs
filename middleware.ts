import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Middleware pour protéger les routes /admin
 *
 * Vérifie l'authentification pour toutes les routes /admin/*
 * Redirige vers /admin/login si non authentifié
 * Laisse passer /admin/login sans vérification
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Rafraîchir la session si elle existe
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si l'utilisateur n'est pas authentifié et tente d'accéder à /admin (sauf /admin/login)
  if (!user && !request.nextUrl.pathname.startsWith("/admin/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Si l'utilisateur est authentifié et tente d'accéder à /admin/login, rediriger vers /admin
  if (user && request.nextUrl.pathname === "/admin/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

// Configurer les routes à protéger
export const config = {
  matcher: ["/admin/:path*"],
};
