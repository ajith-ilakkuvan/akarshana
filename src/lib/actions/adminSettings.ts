"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/adminAuth";
import { setSiteContent, type HeroContent, type AboutContent } from "@/lib/settings";
import { saveUploadedImage } from "@/lib/imageStorage";

export interface ContentFormState {
  error?: string;
  success?: boolean;
}

export async function updateHeroContent(_prevState: ContentFormState, formData: FormData): Promise<ContentFormState> {
  const session = await getAdminSession();
  if (!session) return { error: "Not authorized." };

  let image = String(formData.get("existingImage") ?? "");
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      image = (await saveUploadedImage(file)).url;
    } catch (error) {
      return { error: error instanceof Error ? error.message : "Image upload failed." };
    }
  }

  const content: HeroContent = {
    eyebrow: String(formData.get("eyebrow") ?? ""),
    headline: String(formData.get("headline") ?? ""),
    subheading: String(formData.get("subheading") ?? ""),
    image,
  };

  await setSiteContent("hero", content);
  revalidatePath("/");
  revalidatePath("/admin/content");
  return { success: true };
}

export async function updateAboutContent(_prevState: ContentFormState, formData: FormData): Promise<ContentFormState> {
  const session = await getAdminSession();
  if (!session) return { error: "Not authorized." };

  const content: AboutContent = {
    story: String(formData.get("story") ?? ""),
    legacyNote: String(formData.get("legacyNote") ?? ""),
  };

  await setSiteContent("about", content);
  revalidatePath("/about");
  revalidatePath("/admin/content");
  return { success: true };
}
