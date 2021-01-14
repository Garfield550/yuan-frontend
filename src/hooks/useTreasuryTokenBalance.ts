import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider as Provider } from 'web3-core'

import { bnToDec, getOraclePrice } from '../utils'
import { TOKEN_ADDRESS } from '../constants/tokenAddresses'

const useTokenBalance = (accountAddress?: string, tokenAddress?: string, decimals = 18) => {
  const [balance, setBalance] = useState<number>()
  const { ethereum, chainId } = useWallet<Provider>()

  const fetchBalance = useCallback(async () => {
    if (!accountAddress || !ethereum || !tokenAddress) {
      return
    }
    const isOracle = tokenAddress === TOKEN_ADDRESS.yuan[chainId].oracle
    const bal = await getOraclePrice(ethereum, tokenAddress, accountAddress, isOracle)
    setBalance(bnToDec(new BigNumber(bal), decimals))
  }, [accountAddress, chainId, decimals, ethereum, tokenAddress])

  useEffect(() => {
    fetchBalance()
  }, [accountAddress, decimals, ethereum, fetchBalance, tokenAddress])
  return balance
}

export default useTokenBalance