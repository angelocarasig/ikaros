import Navbar from "@/components/shared/navbar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: {children: React.ReactNode}) {
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