/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { DocumentProvider } from "./src/context/DocumentContext"

export const wrapRootElement = ({ element }) => (
  <DocumentProvider>{element}</DocumentProvider>
)
