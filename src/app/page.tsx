import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-zinc-50 dark:bg-zinc-950">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8">
        <div className="text-center space-y-4 mt-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-zinc-900 dark:text-zinc-50">
            SDA Hymnal
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Philippine Edition
          </p>
        </div>

        <div className="w-full flex gap-2">
          <Input 
            type="search" 
            placeholder="Search hymns by title, number, or lyrics..." 
            className="w-full h-12 text-lg"
          />
          <Button size="lg" className="h-12 px-6">
            Search
          </Button>
        </div>
      </main>
    </div>
  );
}