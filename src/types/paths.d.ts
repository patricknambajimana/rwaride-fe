// Declarations for a couple of small modules so CI/build is stable.
declare module "@/lib/utils" {
  export function cn(...inputs: any[]): string;
}

declare module "@/hooks/use-mobile" {
  export function useIsMobile(): boolean;
}

// Wildcard fallbacks for component imports when the path-alias isn't picked up
// by the environment (editor/CI). These are permissive and can be removed
// once the compiler resolves `@/*` paths directly.
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
