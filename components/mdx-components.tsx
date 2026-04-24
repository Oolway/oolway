import React from "react"
import { siteConfig } from "@/config/site"

export const mdxComponents = {
  // Use prose for all standard HTML tags (p, h1, h2, ul, etc.)
  // Only define things prose DOESN'T know about:
  Callout: ({ children }: { children: React.ReactNode }) => (
    <div className="p-4 bg-primary/5 border-l-4 border-primary my-6 rounded-r-md italic">
      {children}
    </div>
  ),
  Signature: () => (
    <div className="mt-12 pt-8 border-t border-muted italic text-sm text-muted-foreground">
      Written by the {siteConfig.brand.name} Editorial Team.
    </div>
  ),
}
