// Declarations for a couple of small modules so CI/build is stable.
declare module "@/lib/utils" {
  export function cn(...inputs: any[]): string;
}

declare module "@/hooks/use-mobile" {
  export function useIsMobile(): boolean;
}

// Keep declarations minimal — let component modules resolve from source files.
