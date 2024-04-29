import Navbar from "@/components/shared/navbar"
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Library",
  description: "Online Epub Reader",
};

export default async function LibraryLayout({ children }: {children: React.ReactNode}) {
  const supabase = createClient();
  const { data: { session }} = await supabase.auth.getSession();
  
  if (session == null) {
    redirect('/login');
  }
  
  return (
    <section>
      <Navbar />
      {children}
    </section>
  )
}