/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { DocumentProvider } from "./src/context/DocumentContext"
import { HiveProvider } from "./src/context/HiveContext"
import "@fontsource/nunito" // Defaults to weight 400.
import "@fontsource/nunito/900.css" // Weight 500.

export const wrapRootElement = ({ element }) => (
  <HiveProvider>
    <DocumentProvider>{element}</DocumentProvider>
  </HiveProvider>
)
