import { React } from '../utils/singletonDependencies';
import { Container, ConnectedContainer, CheckmarkContainer } from './styled';

const { PrimaryButton, Checkmark } = window.require('humm-ui-elements');

export default function SettingsUI({
  websiteGeneratorAPI,
  currentHive,
  isConnected,
  isConnecting,
  connect,
}) {
  if (isConnected)
    return (
      <ConnectedContainer>
        <CheckmarkContainer>
          <Checkmark size={30} color="#a77fde" />
        </CheckmarkContainer>
        <p>Successfully Connected</p>
      </ConnectedContainer>
    );

  return (
    <Container>
      <PrimaryButton loading={isConnecting} onClick={connect}>
        Connect
      </PrimaryButton>
    </Container>
  );
};