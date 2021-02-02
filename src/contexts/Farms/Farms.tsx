import React, { useCallback, useEffect, useState } from 'react'
// import { Contract } from 'web3-eth-contract'

import { yam as yamAddress } from '../../constants/tokenAddresses'
import useYam from '../../hooks/useYam'
import { Contract } from '../../yam-sdk/lib/lib/contracts'
import { getPoolContracts } from '../../yamUtils'

import Context from './context'
import { Farm } from './types'

type InfoForPool = {
  noWeb3: string
  name?: string
  icon: string
  href: string
  sort: number
  earnToken: string
}

const INFO_FOR_POOL: { [key: string]: InfoForPool } = {
  // 夏 商 周
  USDx_USDC_pool: {
    noWeb3: '',
    name: '',
    icon: 'xia',
    href: 'https://app.uniswap.org/#/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/0xeb269732ab75a6fd61ea60b06fe994cd32a83549',
    sort: 0,
    earnToken: 'eBTC - eETH',
  },
  USDx_YUAN_pool: {
    noWeb3: '',
    name: '',
    icon: 'shang',
    href: 'https://app.uniswap.org/#/add/0xeb269732ab75A6fD61Ea60b06fE994cD32a83549/0x4A3e164684812DfB684AC36457E7fA805087c68E',
    sort: 1,
    earnToken: 'YUAN',
  },
  ETH_YUAN_pool: {
    noWeb3: '',
    name: '',
    icon: 'zhou',
    href: 'https://app.uniswap.org/#/add/ETH/0x4A3e164684812DfB684AC36457E7fA805087c68E',
    sort: 2,
    earnToken: 'YUAN',
  },
  // Qin
  USDC_ETH_pool: {
    noWeb3: '',
    icon: 'qin',
    href: 'https://app.uniswap.org/#/add/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/ETH',
    sort: 3,
    earnToken: 'YUAN',
  },
  DAI_ETH_pool: {
    noWeb3: '',
    icon: 'qin',
    href: 'https://app.uniswap.org/#/add/0x6B175474E89094C44Da98b954EedeAC495271d0F/ETH',
    sort: 5,
    earnToken: 'YUAN',
  },
  USDT_ETH_pool: {
    noWeb3: '',
    icon: 'qin',
    href: 'https://app.uniswap.org/#/add/0xdAC17F958D2ee523a2206206994597C13D831ec7/ETH',
    sort: 4,
    earnToken: 'YUAN',
  },
  USDx_ETH_pool: {
    noWeb3: '',
    icon: 'qin',
    href: 'https://app.uniswap.org/#/add/0xeb269732ab75A6fD61Ea60b06fE994cD32a83549/ETH',
    sort: 6,
    earnToken: 'YUAN',
  },
  // Han
  YAM_ETH_pool: {
    noWeb3: '',
    icon: 'han',
    href: 'https://app.uniswap.org/#/add/0x0AaCfbeC6a24756c20D41914F2caba817C0d8521/ETH',
    sort: 7,
    earnToken: 'YUAN',
  },
  AMPL_ETH_pool: {
    noWeb3: '',
    icon: 'han',
    href: 'https://app.uniswap.org/#/add/0xD46bA6D942050d489DBd938a2C909A5d5039A161/ETH',
    sort: 8,
    earnToken: 'YUAN',
  },
  // Tang
  YFI_ETH_pool: {
    noWeb3: '',
    icon: 'tang',
    href: 'https://app.uniswap.org/#/add/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/ETH',
    sort: 10,
    earnToken: 'YUAN',
  },
  DF_ETH_pool: {
    noWeb3: '',
    icon: 'tang',
    href: 'https://app.uniswap.org/#/add/0x431ad2ff6a9C365805eBaD47Ee021148d6f7DBe0/ETH',
    sort: 11,
    earnToken: 'YUAN',
  },
  UNI_ETH_pool: {
    noWeb3: '',
    icon: 'tang',
    href: 'https://app.uniswap.org/#/add/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/ETH',
    sort: 9,
    earnToken: 'YUAN',
  },
  LINK_ETH_pool: {
    noWeb3: '',
    icon: 'tang',
    href: 'https://app.uniswap.org/#/add/0x514910771AF9Ca656af840dff83E8264EcF986CA/ETH',
    sort: 13,
    earnToken: 'YUAN',
  },
  BAND_ETH_pool: {
    noWeb3: '',
    icon: 'tang',
    href: 'https://app.uniswap.org/#/add/0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55/ETH',
    sort: 12,
    earnToken: 'YUAN',
  },
  YFII_ETH_pool: {
    noWeb3: '',
    icon: 'tang',
    href: 'https://app.uniswap.org/#/add/0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83/ETH',
    sort: 14,
    earnToken: 'YUAN',
  },
  // 远大征程
  YUAN_ETH_pool: {
    noWeb3: '',
    icon: 'zhengcheng',
    href: 'https://app.uniswap.org/#/add/ETH/0x4A3e164684812DfB684AC36457E7fA805087c68E',
    sort: 16,
    earnToken: 'YUAN',
  },
  YUAN_USDx_pool: {
    noWeb3: '',
    icon: 'zhengcheng',
    href: 'https://app.uniswap.org/#/add/0xeb269732ab75A6fD61Ea60b06fE994cD32a83549/0x4A3e164684812DfB684AC36457E7fA805087c68E',
    sort: 15,
    earnToken: 'YUAN',
  },
  EBTC_YUAN_pool: {
    noWeb3: '',
    icon: 'zhengcheng',
    href: '',
    sort: 17,
    earnToken: 'eBTC - YUAN',
  },
}

type FarmPools = {
  [key: string]: Contract | string
}

const Farms: React.FC = ({ children }) => {

  const [farms, setFarms] = useState<Farm[]>([])
  const yam = useYam()

  const fetchPools = useCallback(async (web3: any) => {
    const noWeb3Pools = Object.keys(INFO_FOR_POOL).reduce((acc: { [key: string]: string }, cur) => {
      const newAcc = {...acc};
      newAcc[cur] = INFO_FOR_POOL[cur].noWeb3;
      return newAcc;
    }, {});
    const pools: FarmPools = web3 ? await getPoolContracts(yam) : noWeb3Pools;
    // const pools: { [key: string]: Contract } = await getPoolContracts(yam)

    const farmsArr: Farm[] = []
    const poolKeys = Object.keys(pools)
    // console.log(poolKeys)
    // console.log(pools)

    for (let i = 0; i < poolKeys.length; i++) {
      const poolKey = poolKeys[i]
      const pool = pools[poolKey]
      let tokenKey = poolKey.replace('_pool', '')
      // const method = pool.methods[tokenKey]

      try {
        const tokenAddress = web3 && (typeof pool !== 'string') ? await pool.methods.uni_lp().call() : '';
        if (tokenKey.indexOf('_') !== -1) {
          tokenKey = tokenKey.replace('_', '-')
        }

        farmsArr.push({
          contract: pool as Contract,
          name: INFO_FOR_POOL[poolKey].name,
          depositToken: tokenKey,
          depositTokenAddress: tokenAddress,
          earnToken: INFO_FOR_POOL[poolKey].earnToken,
          earnTokenAddress: yamAddress,
          icon: INFO_FOR_POOL[poolKey].icon,
          href_link: INFO_FOR_POOL[poolKey].href,
          id: tokenKey,
          sort: INFO_FOR_POOL[poolKey].sort
        })
      } catch (e) {
        console.log(e)
      }
    }
    farmsArr.sort((a, b) => a.sort > b.sort ? 1 : -1)
    setFarms(farmsArr)
  }, [yam, setFarms])

  useEffect(() => {
    if (yam) {
      fetchPools(true)
    } else {
      fetchPools(false)
    }
  }, [yam, fetchPools])

  return (
    <Context.Provider value={{ farms }}>
      {children}
    </Context.Provider>
  )
}

export default Farms
