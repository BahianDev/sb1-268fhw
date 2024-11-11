import TreePlanting from '@/components/TreePlanting';
import Features from '@/components/Features';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-black">
      <Hero />
      <Features />
      <TreePlanting />
    </main>
  );
}