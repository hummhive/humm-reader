/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { DocumentProvider } from "./src/context/DocumentContext"
import { HiveProvider } from "./src/context/HiveContext"

export const wrapRootElement = ({ element }) => (
  <HiveProvider>
    <DocumentProvider>{element}</DocumentProvider>
  </HiveProvider>
)
