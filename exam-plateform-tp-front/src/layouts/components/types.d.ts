export interface NavHeader {
  heading?: string
}
 export interface NavItemLink {
  name: string
  icon: string
  to?: string
  target?:string
 }
export interface NavItemGroup {
  name: string
  icon: string
  to?: string
  children?: (NavItemLink | NavItemGroup)[]
 }
 
export declare type VerticalNavItems = ( NavItemGroup | NavHeader)

export declare type HorizontalNavItems =   NavItemGroup