import { useTranslation } from '@pancakeswap/localization'
import { Box, ChevronRightIcon, Flex, Text, useMatchBreakpoints, useModal } from '@pancakeswap/uikit'
import USCitizenConfirmModal from 'components/Modal/USCitizenConfirmModal'
import { ASSET_CDN } from 'config/constants/endpoints'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useTheme from 'hooks/useTheme'
import { IdType, useUserNotUsCitizenAcknowledgement } from 'hooks/useUserIsUsCitizenAcknowledgement'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import styled from 'styled-components'
import { getPerpetualUrl } from 'utils/getPerpetualUrl'
import GradientLogo from '../GradientLogoSvg'

export const CardWrapper = styled.div`
  border-radius: 24px;
  background: ${({ theme }) => (theme.isDark ? theme.colors.gradientBubblegum : theme.colors.backgroundAlt)};
  width: 100%;
  box-sizing: border-box;
  padding: 24px 16px;
  min-height: 300px;
  margin-top: 32px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    width: 1152px;
  }
`

export const ImageBox = styled.div`
  position: relative;
  transition: filter 0.25s linear;
  .default {
    display: none;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    .default {
      display: block;
      position: relative;
      z-index: 1;
    }
    .hover {
      transition: opacity 0.25s ease-in-out;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 2;
    }
  }
`

export const ItemWrapper = styled(Flex)<{ $flexBasis: number }>`
  align-items: left;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
  cursor: pointer;
  .cta > * {
    transition: color 0.25s ease-in-out;
    path {
      transition: fill 0.25s ease-in-out;
    }
  }
  padding: 4px;
  &:hover {
    .cta > * {
      color: ${({ theme }) => theme.colors.primary};
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
  flex-basis: calc(50% - 24px);

  &.type-a {
    height: auto;
    min-height: 180px;
    padding: 16px;
    &.adjust-height {
      margin-top: 0px;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      flex-basis: calc(33.3% - 48px);
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      &.higher {
        min-height: 200px;
      }
    }
    ${({ theme }) => theme.mediaQueries.xxl} {
      flex-basis: ${({ $flexBasis }) => $flexBasis}%;
    }
  }
  &.type-b {
    height: auto;
    min-height: 180px;
    ${({ theme }) => theme.mediaQueries.lg} {
      flex-basis: ${({ $flexBasis }) => $flexBasis}%;
    }
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 12px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    flex-wrap: nowrap;
  }
`

export const FeatureBoxesWrapper = styled(Flex)`
  flex-wrap: wrap;
  gap: 16px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    flex-wrap: nowrap;
  }
`

export const Title = styled.div`
  font-size: 32px;
  margin-bottom: 24px;
  font-weight: 600;
  line-height: 110%;
  padding-left: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`

const useTradeBlockData = () => {
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const { isDark } = useTheme()
  const { chainId } = useActiveChainId()
  const { push } = useRouter()
  const perpetualUrl = useMemo(() => getPerpetualUrl({ chainId, languageCode: code, isDark }), [chainId, code, isDark])
  const [onUSCitizenModalPresent] = useModal(
    <USCitizenConfirmModal id={IdType.PERPETUALS} />,
    true,
    false,
    'usCitizenConfirmModal',
  )
  const [userNotUsCitizenAcknowledgement] = useUserNotUsCitizenAcknowledgement(IdType.PERPETUALS)

  return useMemo(() => {
    return [
      {
        title: t('Swap'),
        description: t('Exchange tokens swiftly with our feline-fast swaps'),
        ctaTitle: t('Trade Now'),
        path: '/swap',
      },
      {
        title: t('Liquidity'),
        description: t('Provide liquidity, catch the flow of trading fees'),
        ctaTitle: t('Add Now'),
        path: '/liquidity/positions',
      },
      {
        title: t('Simple Staking'),
        description: t('Purr-fect rewards with easy, single-sided staking'),
        ctaTitle: t('Coming Soon'),
        path: '/simple-staking',
      }, 
     {
        title: t('Bridge'),
        description: t('Leap across chains with our agile asset bridge'),
        ctaTitle: t('Coming Soon'),
        path: 'https://bridge.pancakeswap.finance/',
      },
      {
        title: t('Token Audit'),
        description: t('Sniff out safe tokens, avoid crypto catnip scams'),
        ctaTitle: t('Coming Soon'),
        path: '/token-audit',
      },
    ]
  }, [t, push, perpetualUrl, onUSCitizenModalPresent, userNotUsCitizenAcknowledgement])
}

const useEarnBlockData = () => {
  const { t } = useTranslation()
  return useMemo(() => {
    return [
      {
        title: t('Token'),
        description: t('Craft your purrfect token in a whisker\'s time'),
        ctaTitle: t('Coming Soon'),
        path: '/create/token',
      },
      {
        title: t('Presale'),
        description: t('Pounce on success with a tailor-made presale'),
        ctaTitle: t('Coming Soon'),
        path: '/create/presale',
      },
      {
        title: t('Fair Launch'),
        description: t('Give everyone a fair scratch at your token launch'),
        ctaTitle: t('Coming Soon'),
        path: '/create/fair-launch',
      },
      {
        title: t('Airdrop'),
        description: t('Shower your community with tokens like catnip'),
        ctaTitle: t('Coming Soon'),
        path: '/create/airdrop',
      },
      {
        title: t('Lock'),
        description: t('Secure tokens tighter than a cat guarding its toy'),
        ctaTitle: t('Coming Soon'),
        path: '/create/lock',
      },
    ]
  }, [t])
}

const useNftGameBlockData = () => {
  const { t } = useTranslation()
  return useMemo(() => {
    return [
      {
        title: t('Mining Game'),
        description: t('Stake Neko NFTs and paw-sibly earn daily token rewards'),
        ctaTitle: t('Coming Soon'),
        path: '',
      },
      {
        title: t('Lottery'),
        description: t('Weekly chance to win a-meow-zing token prizes'),
        ctaTitle: t('Coming Soon'),
        path: '/lottery',
      },
      {
        title: t('NFT Collection'),
        description: t('Collect purr-fect Neko NFTs for exclusive benefits'),
        ctaTitle: t('Coming Soon'),
        path: '/nfts',
        className: 'adjust-height',
      },
    ]
  }, [t])
}

const FeatureBox: React.FC<{
  title: string
  description: string
  image?: StaticImageData | string
  defaultImage?: StaticImageData | string
  width: number
  ctaTitle: string
  className?: string
  path?: string
  onClick?: () => void
}> = ({ title, description, ctaTitle, width, className, path, onClick }) => {
  const { theme } = useTheme()
  const { push } = useRouter()
  return (
    <ItemWrapper
      className={className}
      $flexBasis={width}
      onClick={onClick ? () => onClick() : () => path && push(path)}
    >
      <Box>
        <Text fontSize="18px" mb="4px" lineHeight="110%" fontWeight={600} color={theme.colors.text}>
          {title}
        </Text>
        <Text fontSize="14px" lineHeight="120%" color={theme.colors.text} mb="8px">
          {description}
        </Text>
      </Box>
      <Flex className="cta" alignItems="center">
        <Text fontSize="14px" fontWeight={600} color={theme.colors.textSubtle} mr="4px">
          {ctaTitle}
        </Text>
        <ChevronRightIcon color={theme.colors.textSubtle} width="16px" height="16px" />
      </Flex>
    </ItemWrapper>
  )
}

const EcoSystemSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const tradeBlockData = useTradeBlockData()
  const earnBlockData = useEarnBlockData()
  const nftGameBlockData = useNftGameBlockData()
  const { isMobile, isMd } = useMatchBreakpoints()

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column" pt={isMobile ? '24px' : '60px'}>
      <GradientLogo height={100} width={100} mb="10px" /> 
      <Text textAlign="center" p="0px 20px">
        <Text
          fontSize={['32px', null, null, '40px']}
          lineHeight="110%"
          display="inline-block"
          bold
          color={theme.colors.text}
        >
          {t('Discover the')}
        </Text>
        <Text
          fontSize={['32px', null, null, '40px']}
          ml="8px"
          display="inline-block"
          bold
          lineHeight="110%"
          color={theme.colors.secondary}
        >
          {t('Ecosystem')}
        </Text>
      </Text>
      <CardWrapper>
        <Flex
          style={{ gap: 32 }}
          flexDirection={isMobile || isMd ? 'column' : 'row'}
          alignItems={isMobile || isMd ? undefined : 'center'}
        >
          <Image
            style={{ marginLeft: isMobile ? -32 : -110 }}
            src="/images/home/cats/cat-bitcoin-v3.png"
            alt="cat-bitcoin"
            width={300}
            height={340}
            unoptimized
          />
          <Flex flexDirection="column">
            <Title>{t('Trade & Earn')}</Title>
            <FeatureBoxesWrapper>
              {tradeBlockData.map((item) => (
                <FeatureBox
                  key={`${item.title}Block`}
                  className="type-a"
                  title={item.title}
                  description={item.description}
                  width={100 / tradeBlockData.length}
                  ctaTitle={item.ctaTitle}
                  path={item.path}
                  onClick={item.onClick}
                />
              ))}
            </FeatureBoxesWrapper>
          </Flex>
        </Flex>
      </CardWrapper>
      <CardWrapper>
        <Flex
          style={{ gap: 32 }}
          flexDirection={isMobile || isMd ? 'column' : 'row-reverse'}
          alignItems={isMobile || isMd ? undefined : 'center'}
        >
          <Image
            style={{ marginRight: isMobile || isMd ? 'auto' : -72, marginLeft: isMobile || isMd ? 0 : 'auto' }}
            src="/images/home/cats/cat-rocket.png"
            alt="cat-rocket"
            width={296}
            height={340}
            unoptimized
          />
          <Flex flexDirection="column">
            <Title>{t('Create & Launch')}</Title>
            <FeatureBoxesWrapper>
              {earnBlockData.map((item) => (
                <FeatureBox
                  className={`type-a${item?.className ? ` ${item?.className}` : ''}`}
                  key={`${item.title}Block`}
                  title={item.title}
                  description={item.description}
                  width={100 / tradeBlockData.length}
                  ctaTitle={item.ctaTitle}
                  path={item.path}
                />
              ))}
            </FeatureBoxesWrapper>
          </Flex>
        </Flex>
      </CardWrapper>
      <CardWrapper>
        <Flex
          style={{ gap: 32 }}
          flexDirection={isMobile || isMd ? 'column' : 'row'}
          alignItems={isMobile || isMd ? undefined : 'center'}
        >
          <Image
            style={{ marginLeft: isMobile ? -32 : -72 }}
            src="/images/home/cats/cat-game-v2.png"
            alt="cat-game"
            width={344}
            height={360}
            unoptimized
          />
          <Flex flexDirection="column">
            <Title>{t('Game & NFT')}</Title>
            <FeatureBoxesWrapper>
              {nftGameBlockData.map((item) => (
                <FeatureBox
                  className={`type-a higher${item?.className ? ` ${item?.className}` : ''}`}
                  key={`${item.title}Block`}
                  title={item.title}
                  description={item.description}
                  width={100 / tradeBlockData.length}
                  ctaTitle={item.ctaTitle}
                  path={item.path}
                />
              ))}
            </FeatureBoxesWrapper>
          </Flex>
        </Flex>
      </CardWrapper>
    </Flex>
  )
}

export default EcoSystemSection