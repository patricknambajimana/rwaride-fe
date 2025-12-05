declare module "@/lib/utils" {
  export function cn(...inputs: any[]): string;
}

declare module "@/hooks/use-mobile" {
  export function useIsMobile(): boolean;
}


declare module "@/components/*" {
  export const [key]: any;
  export default any;
}

declare module "@/components/ui/*" {
  export const [key]: any;
  export default any;
}

declare module "@/*" {
  export const [key]: any;
  export default any;
}
