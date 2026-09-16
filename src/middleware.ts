import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // Domain-based routing: bniforte.ro → /forte internally, URL stays clean
  const host = request.headers.get("host") ?? "";
  const forteDomain = process.env.FORTE_DOMAIN;
  if (forteDomain) {
    const cleanHost = host.replace(/:\d+$/, "");
    if (cleanHost === forteDomain || cleanHost === `www.${forteDomain}`) {
      const pathname = request.nextUrl.pathname;
      if (pathname === "/forte" || pathname === "/forte/") {
        // Redirect /forte → / so bniforte.ro/forte becomes bniforte.ro/
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
      if (pathname === "/" || pathname === "") {
        // Rewrite / → /forte internally (URL stays as bniforte.ro/)
        const url = request.nextUrl.clone();
        url.pathname = "/forte";
        return NextResponse.rewrite(url);
      }
    }
  }

  // Skip auth check for login page and public API
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/admin/login";

  if (!isAdminRoute || isLoginPage) {
    return supabaseResponse;
  }

  // Check Supabase session for admin routes
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)"],
};
