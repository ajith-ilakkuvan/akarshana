"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createAdminSession, destroyAdminSession, verifyAdminCredentials } from "@/lib/adminAuth";
import { checkRateLimit } from "@/lib/rateLimit";

export interface LoginState {
  error?: string;
}

export async function loginAdmin(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for") ?? "unknown";
  const rateLimit = checkRateLimit(`admin-login:${ip}`);
  if (!rateLimit.allowed) {
    return { error: "Too many login attempts. Please wait a minute and try again." };
  }

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  if (!verifyAdminCredentials(email, password)) {
    return { error: "Incorrect email or password." };
  }

  await createAdminSession(email);
  redirect("/admin/");
}

export async function logoutAdmin(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login/");
}
