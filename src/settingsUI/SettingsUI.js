import React from "react"
import PropTypes from "prop-types"
import { Container, ConnectedContainer, CheckmarkContainer } from "./styled"
import { PrimaryButton, Checkmark } from "@hummhive/ui-elements"

export default function SettingsUI({ isConnected, isConnecting, connect }) {
  if (isConnected)
    return (
      <ConnectedContainer>
        <CheckmarkContainer>
          <Checkmark size={30} color="#a77fde" />
        </CheckmarkContainer>
        <p>Successfully Connected</p>
      </ConnectedContainer>
    )

  return (
    <Container>
      <PrimaryButton loading={isConnecting} onClick={connect}>
        Connect
      </PrimaryButton>
    </Container>
  )
}

SettingsUI.propTypes = {
  isConnected: PropTypes.bool,
  isConnecting: PropTypes.bool,
  connect: PropTypes.func,
}
