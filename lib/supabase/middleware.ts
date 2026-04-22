import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_STUDY_ROUTES = [
  "/study/login",
  "/study/signup",
  "/study/auth/callback",
  "/study/literature",
  "/study/literature-omx",
  "/study/earth-science",
  "/study/earth-science-omx",
  "/study/algebra",
  "/study/chemistry",
  "/study/midterm"
];
const UNAUTH_ONLY_STUDY_ROUTES = ["/study/login", "/study/signup"];
const NO_AUTH_NEEDED_STUDY_ROUTES = [
  "/study/literature",
  "/study/literature-omx",
  "/study/earth-science",
  "/study/earth-science-omx",
  "/study/algebra",
  "/study/chemistry",
  "/study/midterm"
];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const { pathname: earlyPath } = request.nextUrl;
  const isNoAuthRoute = NO_AUTH_NEEDED_STUDY_ROUTES.some(
    (p) => earlyPath === p || earlyPath.startsWith(`${p}/`)
  );
  if (isNoAuthRoute) {
    return response;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const home = request.nextUrl.clone();
    home.pathname = "/";
    home.search = "";
    return NextResponse.redirect(home);
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isStudyPath = pathname.startsWith("/study");
  const isPublicStudy = PUBLIC_STUDY_ROUTES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isStudyPath && !user && !isPublicStudy) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/study/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isUnauthOnly = UNAUTH_ONLY_STUDY_ROUTES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (isUnauthOnly && user) {
    const dash = request.nextUrl.clone();
    dash.pathname = "/study";
    dash.search = "";
    return NextResponse.redirect(dash);
  }

  return response;
}
