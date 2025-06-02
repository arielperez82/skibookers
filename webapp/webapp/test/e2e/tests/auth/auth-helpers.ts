import { type AuthResponse } from '@auth/entities/auth-response.entity';
import { SupabaseAuthService } from '@auth/adapters/supabase/supabase-auth-service';
import { Page } from '@playwright/test';

export const DEFAULT_TEST_PASSWORD = 'testPassword123';

interface PlaywrightCookie {
  name: string;
  value: string;
  url?: string;
  domain?: string;
  path?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export async function registerViaApi(page: Page, email: string, password: string = DEFAULT_TEST_PASSWORD): Promise<AuthResponse> {
    const authService = new SupabaseAuthService({ 
      getAll: async () => page.context().cookies()
    });

    return authService.signUp(email, password);
}


export async function loginViaApi(page: Page, email: string, password: string = DEFAULT_TEST_PASSWORD): Promise<AuthResponse> {
    const authService = new SupabaseAuthService({ 
      getAll: () => page.context().cookies(),
      setAll: async (cookies) => {
        const mappedCookies = cookies.map<PlaywrightCookie>(({ name, value, options: { domain = 'localhost', path = '/', sameSite = "Lax" } }) => ({
          name,
          value,
          domain,
          path,
          sameSite: sameSite === true ? 'Strict' : capitalize(String(sameSite)) as "Strict" | "Lax" | "None"
        }));

        await page.context().addCookies(mappedCookies);
      }
    });

    const { data, error } = await authService.signInWithPassword(email, password);
    return { data, error };
}

export function generateUniqueEmail() {
  return `testuser_${Date.now() + Math.floor(Math.random() * 10000) + 1}@example.com`;
}

export async function registerAndLoginViaApi(page: Page, email: string, password: string = DEFAULT_TEST_PASSWORD) {
  await registerViaApi(page, email, password);
  await loginViaApi(page, email, password);
}
 