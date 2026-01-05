import { Header } from "./header";

export function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
