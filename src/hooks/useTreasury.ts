// import { useMemo } from 'react'

import { TOKEN_ADDRESS } from '../constants/tokenAddresses'

// import usePrices from 'hooks/usePrices'
import useTokenBalance from '../hooks/useTreasuryTokenBalance'
import { useWallet } from 'use-wallet'

// const treasuryAddress = '0x97990b693835da58a281636296d2bf02787dea17'

const useTreasury = () => {
  // const { yamTwap } = usePrices()
  const { chainId } = useWallet()
  const treasuryAddress = TOKEN_ADDRESS.yuan[chainId].treasury;
  const usdxAddress = TOKEN_ADDRESS.yuan[chainId].usdx;
  const yuanAddress = TOKEN_ADDRESS.yuan[chainId].yam;
  const oracleAddress = TOKEN_ADDRESS.yuan[chainId].oracle;
  const usdxBalance = useTokenBalance(treasuryAddress, usdxAddress)
  const yuanBalance = useTokenBalance(treasuryAddress, yuanAddress)
  const oraclePrice = useTokenBalance(usdxAddress, oracleAddress)
  console.log('usdxBalance:', usdxBalance, 'yuanBalance:', yuanBalance, 'oraclePrice:', oraclePrice)
  // const totalYUsdValue = useMemo(() => {
  //   const yamYUsdValue = yamTwap && yamBalance ? yamTwap * yamBalance : 0
  //   return yUsdBalance ? yUsdBalance + yamYUsdValue : yamYUsdValue
  // }, [
  //   yamBalance,
  //   yamTwap,
  //   yUsdBalance,
  // ])

  return {
    // totalYUsdValue,
    usdxBalance,
    yuanBalance,
    oraclePrice,
  }
}

export const useTreasuryEETH = () => {
  // const { yamTwap } = usePrices()
  const { chainId } = useWallet()
  const treasuryAddress = TOKEN_ADDRESS.eETH[chainId].treasury;
  const usdxAddress = TOKEN_ADDRESS.eETH[chainId].usdx; // YUAN
  const yuanAddress = TOKEN_ADDRESS.eETH[chainId].yam; // eETH
  // const oracleAddress = TOKEN_ADDRESS.eETH[chainId].oracle;
  const usdxBalance = useTokenBalance(treasuryAddress, usdxAddress)
  const yuanBalance = useTokenBalance(treasuryAddress, yuanAddress)
  // const oraclePrice = useTokenBalance(usdxAddress, oracleAddress)
  const oraclePrice = 0
  console.log('treasuryAddress:', treasuryAddress, 'usdxBalance:', usdxBalance, 'yuanBalance:', yuanBalance, 'oraclePrice:', oraclePrice);

  return {
    usdxBalance,
    yuanBalance,
    oraclePrice,
  }
}

export default useTreasury
