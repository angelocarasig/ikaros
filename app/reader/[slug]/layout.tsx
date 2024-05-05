import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Reader",
  description: "Reading a novel!",
};

export default async function ReaderLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session == null) {
    redirect('/login');
  }

  return (
    <>
      {children}
    </>
  )
}