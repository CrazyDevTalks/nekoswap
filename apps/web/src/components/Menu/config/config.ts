import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
  DropdownMenuItems,
} from '@pancakeswap/uikit'
import { ContextApi } from '@pancakeswap/localization'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { getPerpetualUrl } from 'utils/getPerpetualUrl'
import { SUPPORT_ONLY_BSC, SUPPORT_FARMS } from 'config/constants/supportChains'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean; image?: string } & {
  items?: ConfigMenuDropDownItemsType[]
}

const addMenuItemSupported = (item, chainId) => {
  if (!chainId || !item.supportChainIds) {
    return item
  }
  if (item.supportChainIds?.includes(chainId)) {
    return item
  }
  return {
    ...item,
    disabled: true,
  }
}

const config: (
  t: ContextApi['t'],
  isDark: boolean,
  languageCode?: string,
  chainId?: number,
) => ConfigMenuItemsType[] = (t, isDark, languageCode, chainId) =>
  [
    {
      label: t('Trade'),
      icon: SwapIcon,
      fillIcon: SwapFillIcon,
      href: '/swap',
      showItemsOnMobile: false,
      items: [
        {
          label: t('Swap'),
          href: '/swap',
        },
        /*
        {
          label: t('Limit'),
          href: '/limit-orders',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/decorations/3d-coin.png',
        },
        */
        {
          label: t('Liquidity'),
          href: '/liquidity',
        },
        /*
        {
          label: t('Perpetual'),
          href: getPerpetualUrl({
            chainId,
            languageCode,
            isDark,
          }),
          confirmModalId: 'usCitizenConfirmModal',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        {
          label: t('Bridge'),
          href: 'https://bridge.pancakeswap.finance/',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        */
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Earn'),
      href: '/farms',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      items: [
        /*
        {
          label: t('Farms'),
          href: '/farms',
        },
        */
        {
          label: t('Liquidity'),
          href: '/liquidity',
        },
        {
          label: t('Pools'),
          href: '/pools',
          //supportChainIds: SUPPORT_ONLY_BSC,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Create'),
      href: '/launch/create-token',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      supportChainIds: SUPPORT_FARMS,
      items: [
        {
          label: t('Token'),
          href: '/launch/create-token',
        },
        {
          label: t('Airdrop'),
          href: '/launch/airdrop',
        },
        {
          label: t('Lock'),
          href: '/launch/create-lock',
        },
        {
          label: t('Staking'),
          href: '/launch/create-staking',
        },
        {
          label: t('Fair-Launch'),
          href: '/launch/fair-launch',
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  {
     label: t('Launchpad'),
     href: '/pumpfun',
     icon: EarnIcon,
     fillIcon: EarnFillIcon,
     image: '/images/decorations/pe2.png',
     supportChainIds: SUPPORT_FARMS,
     items: [
      {
        label: t('Presale'),
        href: '/launch/launchpad',
      },
       {
         label: t('PumpFun'),
         href: '/pumpfun',
       },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
    {
      label: t('Token Audit'),
      href: '/flashaudit',
      icon: EarnIcon,
      fillIcon: EarnFillIcon,
      image: '/images/decorations/pe2.png',
      supportChainIds: SUPPORT_FARMS,
      items: [
        {
        label: t('Token Audit'),
        href: '/flashaudit',
        },
       ].map((item) => addMenuItemSupported(item, chainId)),
     },
    {
      label: t('Games'),
      href: '/lottery',
      icon: TrophyIcon,
      fillIcon: TrophyFillIcon,
      supportChainIds: SUPPORT_FARMS,
      items: [
        /*
        {
          label: t('Trading Competition'),
          href: '/competition',
          image: '/images/decorations/tc.png',
          hideSubNav: true,
        },
        {
          label: t('Prediction (BETA)'),
          href: '/prediction',
          image: '/images/decorations/prediction.png',
        },
        */
        {
          label: t('Lottery'),
          href: '/lottery',
          image: '/images/decorations/lottery.png',
        },
        /*
        {
          label: t('Pottery (BETA)'),
          href: '/pottery',
          image: '/images/decorations/lottery.png',
        },
        */
      ],
    },
    {
      label: t('NFT'),
      href: `${nftsBaseUrl}`,
      icon: NftIcon,
      fillIcon: NftFillIcon,
      supportChainIds: SUPPORT_FARMS,
      image: '/images/decorations/nft.png',
      items: [
        /*
        {
          label: t('Overview'),
          href: `${nftsBaseUrl}`,
        },
        {
          label: t('Collections'),
          href: `${nftsBaseUrl}/collections`,
        },
        {
          label: t('Activity'),
          href: `${nftsBaseUrl}/activity`,
        },
        */
        {
          label: t('Collection'),
          href: "https://opensea.io",
          target: "_blank"
        },
      ],
    },
    {
      label: '',
      href: '/info',
      icon: MoreIcon,
      hideSubNav: true,
      items: [
        {
          label: t('Info'),
          href: '/info',
        },
        {
          label: t('IFO'),
          href: '/ifo',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/ifos/ifo-bunny.png',
        },
        /*
        {
          label: t('Affiliate Program'),
          href: '/affiliates-program',
        },
        {
          label: t('Voting'),
          href: '/voting',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/voting/voting-bunny.png',
        },
        */
        {
          type: DropdownMenuItemType.DIVIDER,
        },
        /*
        {
          label: t('Leaderboard'),
          href: '/teams',
          supportChainIds: SUPPORT_ONLY_BSC,
          image: '/images/decorations/leaderboard.png',
        },
        {
          type: DropdownMenuItemType.DIVIDER,
        },
        {
          label: t('Blog'),
          href: 'https://blog.pancakeswap.finance',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
        */
        {
          label: t('Docs'),
          href: 'https://docs.pancakeswap.finance',
          type: DropdownMenuItemType.EXTERNAL_LINK,
        },
      ].map((item) => addMenuItemSupported(item, chainId)),
    },
  ].map((item) => addMenuItemSupported(item, chainId))

export default config
