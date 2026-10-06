import Dashboard from "@/components/home/Dashboard";

export const metadata = {
  title: "Nail Muse — What are we creating today?",
  description: "Your nail design dashboard: featured looks, quick actions, and trending designs.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Dashboard />
    </main>
  );
}
