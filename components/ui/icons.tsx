import {
    Loader2,
    Facebook,
    Instagram,
  } from "lucide-react"
  
  export const Icons = {
    spinner: Loader2,
    facebook: Facebook,
    instagram: Instagram,
  }
  
  export type Icon = keyof typeof Icons

  <Facebook />