import Navbar from "@/components/shared/navbar"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library",
  description: "Online Epub Reader",
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  )
}