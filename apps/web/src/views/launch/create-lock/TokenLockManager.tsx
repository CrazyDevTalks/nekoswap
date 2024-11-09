import React, { useState } from 'react';
import { Box, Button } from '@pancakeswap/uikit';
import styled from 'styled-components';
import CreateLocks from './CreateLocks';
import UnlockTokens from './UnlockTokens';



const ContentWrapper = styled(Box)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  position: relative;
`;

const ViewLockedTokensButton = styled(Button)`
  display: block;
  margin: 0 auto 24px;
`;

const TokenLockManager: React.FC = () => {
  const [view, setView] = useState<'lock' | 'unlock'>('lock');

  return (

      <ContentWrapper>
        {view === 'lock' && (
          <>
            <ViewLockedTokensButton onClick={() => setView('unlock')}>View Locked Tokens</ViewLockedTokensButton>
            <CreateLocks onBack={() => setView('lock')} />
          </>
        )}
        {view === 'unlock' && <UnlockTokens onBack={() => setView('lock')} />}
      </ContentWrapper>

  );
};

export default TokenLockManager;