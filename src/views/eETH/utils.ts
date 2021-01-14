// import { Yam } from '../../yam'
import { Yam } from '../../yam-sdk/lib'
import {
  getCurrentPriceEETH as gCP,
  getTargetPriceEETH as gTP,
  getCirculatingSupplyEETH as gCS,
  getNextRebaseTimestampEETH as gNRT,
  getTotalSupplyEETH as gTS,
  getScalingFactorEETH as gSF
} from '../../yamUtils'

const getCurrentPrice = async (yam: Yam): Promise<number> => {
  // FORBROCK: get current YAM price
  return (await gCP(yam)).toNumber()
}

const getTargetPrice = async (yam: Yam): Promise<string> => {
  // FORBROCK: get target YAM price
  return await gTP(yam)
}

const getCirculatingSupply = async (yam: Yam): Promise<string> => {
  // FORBROCK: get circulating supply
  return gCS(yam)
}

const getScalingFactor = async (yam: Yam): Promise<string> => {
  // FORBROCK: get circulating supply
  return gSF(yam)
}

const getNextRebaseTimestamp = async (yam: Yam): Promise<number> => {
  // FORBROCK: get next rebase timestamp
  // const nextRebase = await gNRT(yam) as number
  const nextRebase = (await gNRT(yam))[0]
  // const rebasable = (await gNRT(yam))[1]
  return nextRebase * 1000
}

const getNextRebaseTimestamp1 = async (yam: Yam): Promise<boolean> => {
  // FORBROCK: get next rebase timestamp
  // const nextRebase = await gNRT(yam) as number
  const rebasable = (await gNRT(yam))[1]
  return rebasable
}

const getTotalSupply = async (yam: Yam): Promise<string> => {
  // FORBROCK: get total supply
  return gTS(yam)
}

export const getStats = async (yam: Yam) => {
  const curPrice = await getCurrentPrice(yam)
  const circSupply = await getCirculatingSupply(yam)
  const nextRebase = await getNextRebaseTimestamp(yam)
  const nextRebable = await getNextRebaseTimestamp1(yam)
  const targetPrice = await getTargetPrice(yam)
  const totalSupply = await getTotalSupply(yam)
  const scalingFactor =await getScalingFactor(yam)
  console.log('curPrice:', curPrice, 'circSupply:', circSupply, 'nextRebase:', nextRebase, 'nextRebable:', nextRebable, 'targetPrice:', targetPrice, 'totalSupply:', totalSupply, 'scalingFactor:', scalingFactor)
  return {
    circSupply,
    curPrice,
    nextRebase,
    nextRebable,
    targetPrice,
    totalSupply,
    scalingFactor
  }
}
