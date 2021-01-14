import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider as Web3Provider } from 'web3-core'

import { TOKEN_ADDRESS } from '../../constants/tokenAddresses'
import { getBalance, getOraclePrice } from '../../utils'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [usdxBalance, setUsdxBalance] = useState<BigNumber>()
  const [yuanBalance, setYuanBalance] = useState<BigNumber>()
  const [oraclePrice, setoraclePrice] = useState<BigNumber>()

  const { account, ethereum, chainId } = useWallet<Web3Provider>()

  const fetchBalances = useCallback(async (userAddress: string, provider: Web3Provider) => {
    const treasuryAddress = TOKEN_ADDRESS.yuan[chainId].treasury;
    const usdxAddress = TOKEN_ADDRESS.yuan[chainId].usdx;
    const yuanAddress = TOKEN_ADDRESS.yuan[chainId].yam;
    const oracleAddress = TOKEN_ADDRESS.yuan[chainId].oracle;
    const balances = await Promise.all([
      await getBalance(provider, treasuryAddress, usdxAddress),
      await getBalance(provider, treasuryAddress, yuanAddress),
      await getOraclePrice(provider, oracleAddress, usdxAddress, true)
    ])
    setUsdxBalance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(18)))
    setYuanBalance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)))
    setoraclePrice(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)))
  }, [chainId])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
      let refreshInterval = setInterval(() => fetchBalances(account, ethereum), 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    account,
    ethereum,
    fetchBalances,
  ])

  return (
    <Context.Provider value={{
      usdxBalance,
      yuanBalance,
      oraclePrice,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider