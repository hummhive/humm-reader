/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { StoryProvider } from "./src/context/StoryContext"
import { HiveProvider } from "./src/context/HiveContext"
import { GroupsProvider } from "./src/context/GroupsContext"
import { StoryIndexProvider } from "./src/context/StoryIndexContext"
import "@fontsource/nunito" // Defaults to weight 400.
import "@fontsource/nunito/900.css" // Weight 500.

export const wrapRootElement = ({ element }) => (
  <HiveProvider>
    <GroupsProvider>
      <StoryIndexProvider>
        <StoryProvider>{element}</StoryProvider>
      </StoryIndexProvider>
    </GroupsProvider>
  </HiveProvider>
)
