import "./globals.css";
import AppToaster from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen">
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
