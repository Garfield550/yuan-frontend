import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { bnToDec, getOraclePrice } from '../utils'

const useTokenBalance = (accountAddress?: string, tokenAddress?: string, decimals = 18) => {

  const [balance, setBalance] = useState<number>()
  const { ethereum }: { ethereum: provider } = useWallet()

  const fetchBalance = useCallback(async () => {
    if (!accountAddress || !ethereum || !tokenAddress) {
      return
    }
    const bal = await getOraclePrice(ethereum, tokenAddress, accountAddress)
    setBalance(bnToDec(new BigNumber(bal), decimals))
  }, [
    accountAddress,
    decimals,
    ethereum,
    tokenAddress,
  ])

  useEffect(() => {
    fetchBalance()
  }, [accountAddress, decimals, ethereum, fetchBalance, tokenAddress])
  return balance
}

export default useTokenBalance