

declare module "@/lib/utils" {
  export function cn(...inputs: any[]): string;
}

declare module "@/hooks/use-mobile" {
  export function useIsMobile(): boolean;
}

// Wildcard declarations for component folders
declare module "@/components/*" {
  const value: any;
  export default value;
}

declare module "@/components/ui/*" {
  const value: any;
  export default value;
}

declare module "@/*" {
  const value: any;
  export default value;
}
