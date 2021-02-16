import React from "react"
import PropTypes from "prop-types"
import {
  Container,
  ConnectedContainer,
  CheckmarkContainer,
  Row,
  Label,
  Text,
  Spacer,
} from "./styled"
import { PrimaryButton, TextInput, Checkmark } from "@hummhive/ui-elements"

export default function ConfigUI({
  isConnected,
  isConnecting,
  connect,
  existingDomain,
}) {
  const [domainInput, setDomainInput] = React.useState("")

  if (isConnected)
    return (
      <ConnectedContainer>
        <Row>
          <CheckmarkContainer>
            <Checkmark size={30} color="#a77fde" />
          </CheckmarkContainer>
          <p>Successfully Connected</p>
        </Row>
        <Spacer height="8" />
        <Text>
          Current domain: <strong>{existingDomain}</strong>
        </Text>
      </ConnectedContainer>
    )

  return (
    <Container>
      <Label>Humm Publisher Subdomain</Label>
      <Text>
        Choose a sub-domain to use for your publication. You must have access to
        edit the DNS records of this sub-domain.
      </Text>
      <TextInput
        value={domainInput}
        onChange={e => setDomainInput(e.target.value)}
        placeholder="blog.mydomain.com"
      />
      <Spacer height="16" />
      <PrimaryButton
        loading={isConnecting}
        onClick={() => connect(domainInput)}
      >
        Connect
      </PrimaryButton>
    </Container>
  )
}

ConfigUI.propTypes = {
  isConnected: PropTypes.bool,
  isConnecting: PropTypes.bool,
  connect: PropTypes.func,
  existingDomain: PropTypes.string,
}
