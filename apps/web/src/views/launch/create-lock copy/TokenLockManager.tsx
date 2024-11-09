// TokenLockManager.tsx
import React, { useState } from 'react';
import { Box, Flex, Heading, Button } from '@pancakeswap/uikit';
import styled from 'styled-components';
import CreateLocks from './CreateLocks';
import UnlockTokens from './UnlockTokens';

const CenteredBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TokenLockManager: React.FC = () => {
  const [view, setView] = useState<'home' | 'lock' | 'unlock'>('home');

  const renderHome = () => (
    <CenteredBox>
      <Heading scale="xl" mb="24px">Token Lock Manager</Heading>
      <Button onClick={() => setView('lock')} mb="16px">Lock Tokens</Button>
      <Button onClick={() => setView('unlock')}>View Locked Tokens</Button>
    </CenteredBox>
  );

  return (
    <Box maxWidth="1200px" margin="0 auto" padding="24px">
      {view === 'home' && renderHome()}
      {view === 'lock' && <CreateLocks onBack={() => setView('home')} />}
      {view === 'unlock' && <UnlockTokens onBack={() => setView('home')} />}
    </Box>
  );
};

export default TokenLockManager;