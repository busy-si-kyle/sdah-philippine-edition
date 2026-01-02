"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export function ClientBackButton() {
  const router = useRouter();
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="gap-1"
      onClick={() => router.push('/')}
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  );
}
