import { ethers } from 'ethers';
import { TransactionReceipt } from 'web3-core';
import { Contract as Web3Contract } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
import { Yam } from '../yam-sdk/lib';
import { Contract } from '../yam-sdk/lib/lib/contracts';

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

export const getPoolStartTime = async (poolContract: Web3Contract) => {
  return await poolContract.methods.starttime().call()
}

export const stake = async (
  poolContract: Web3Contract,
  tokenDecimals: BigNumber,
  amount: number | string,
  account: string,
  onDismiss: Function,
  setShowPopup: Function,
  showPopup: boolean
) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .stake((new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimals))).toString())
      .send({ from: account })
      .on('transactionHash', (tx: TransactionReceipt) => {
        console.log('transactionHash: ', tx)
        onDismiss();
        setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'stake' })
        return tx.transactionHash
      })
      // tx 交易成功
      .on('receipt', function (receipt: TransactionReceipt) {
        console.log('receipt: ', receipt);
        setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'stake' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'stake' })
        }, 3000)
      })
      // error
      .on('error', function (error: Error) {
        console.log('error', error)
        let str_err = JSON.stringify(error);
        let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
        setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'stake' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'stake' })
        }, 3000)
      })
  } else {
    alert("pool not active");
  }
}

export const unstake = async (
  poolContract: Web3Contract,
  tokenDecimals: BigNumber,
  amount: number | string,
  account: string,
  onDismiss: Function,
  setShowPopup: Function,
  showPopup: boolean
) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .withdraw((new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimals))).toString())
      .send({ from: account })
      .on('transactionHash', (tx: TransactionReceipt) => {
        console.log(tx)
        onDismiss();
        setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'unstake' })
        return tx.transactionHash
      })
      // tx 交易成功
      .on('receipt', function (receipt: TransactionReceipt) {
        console.log(receipt);
        setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'unstake' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'unstake' })
        }, 3000)
      })
      // error
      .on('error', function (error: Error) {
        console.log('error', error)
        let str_err = JSON.stringify(error);
        let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
        setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'unstake' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'unstake' })
        }, 3000)
      })
  } else {
    alert("pool not active");
  }
}

export const harvest = async (poolContract: Web3Contract, account: string, setShowPopup: Function, showPopup: boolean) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .getReward()
      .send({ from: account })
      .on('transactionHash', (tx: TransactionReceipt) => {
        console.log(tx)
        setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'harvest' })
        return tx.transactionHash
      })
      // tx 交易成功
      .on('receipt', function (receipt: TransactionReceipt) {
        console.log(receipt);
        setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'harvest' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'harvest' })
        }, 3000)
      })
      // error
      .on('error', function (error: Error) {
        console.log('error', error)
        let str_err = JSON.stringify(error);
        let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
        setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'harvest' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'harvest' })
        }, 3000)
      })
  } else {
    alert("pool not active");
  }
}

export const redeem = async (poolContract: Web3Contract, account: string, setShowPopup: Function, showPopup: boolean) => {
  let now = new Date().getTime() / 1000;
  if (now >= 1597172400) {
    return poolContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx: TransactionReceipt) => {
        console.log(tx)
        setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'harvest__withdraw' })
        return tx.transactionHash
      })
      // tx 交易成功
      .on('receipt', function (receipt: TransactionReceipt) {
        console.log(receipt);
        setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'harvest__withdraw' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'harvest__withdraw' })
        }, 3000)
      })
      // error
      .on('error', function (error: Error) {
        let str_err = JSON.stringify(error);
        let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
        // console.log(str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3))

        setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'harvest__withdraw' })
        setTimeout(() => {
          setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'harvest__withdraw' })
        }, 3000)
      });
  } else {
    alert("pool not active");
  }
}

export const approve = async (tokenContract: Web3Contract, poolContract: Web3Contract, account: string, setShowPopup: Function, showPopup: boolean) => {
  return tokenContract.methods
    .approve(poolContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
    .on('transactionHash', (tx: TransactionReceipt) => {
      console.log(tx)
      setShowPopup({ show: true, status: 'pendding', hash: tx, text: 'approve' })
    })
    // tx 交易成功
    .on('receipt', function (receipt: TransactionReceipt) {
      console.log(receipt);
      setShowPopup({ show: true, status: 'success', hash: receipt.transactionHash, text: 'approve' })
      setTimeout(() => {
        setShowPopup({ show: false, status: 'success', hash: receipt.transactionHash, text: 'approve' })
      }, 3000)
    })
    // error
    .on('error', function (error: Error) {
      console.log('error', error)
      let str_err = JSON.stringify(error);
      let str_err__txHash = str_err.slice(str_err.indexOf('transactionHash') + 18, str_err.indexOf('transactionIndex') - 3);
      setShowPopup({ show: true, status: 'fail', hash: str_err__txHash, text: 'approve' })
      setTimeout(() => {
        setShowPopup({ show: false, status: 'fail', hash: str_err__txHash, text: 'approve' })
      }, 3000)
    });
}

type ContractObj = {
  [contractName: string]: Contract
}

export const getPoolContracts = async (yam: Yam) => {
  const pools = Object.keys(yam.contracts)
    .filter(c => c.indexOf('_pool') !== -1)
    .reduce((acc: ContractObj, cur) => {
      const newAcc = { ...acc }
      newAcc[cur] = yam.contracts[cur]
      return newAcc
    }, {})
  return pools
}

export const getEarned = async (yam: Yam, pool: Web3Contract, account: string) => {
  const scalingFactor = new BigNumber(await yam.contracts.yam.methods.yuansScalingFactor().call())
  const earnedCall = await pool.methods.earned(account).call();
  const earned = typeof earnedCall === 'string' ? new BigNumber(earnedCall) : new BigNumber(earnedCall[0])
  return earned.multipliedBy(scalingFactor.dividedBy(new BigNumber(10).pow(18)))
}

export const getStaked = async (yam: Yam, pool: Web3Contract, account: string) => {
  return yam.toBigN(await pool.methods.balanceOf(account).call())
}

export const getCurrentPrice = async (yam: Yam) => {
  // FORBROCK: get current YAM price
  return yam.toBigN(await yam.contracts.rebaser.methods.getCurrentExchangeRate().call())
}
export const getCurrentPriceEETH = async (yam: Yam) => {
  return yam.toBigN(await yam.contracts.eETHRebaser.methods.getCurrentTWAP().call())
  // return yam.toBigN(1)
}
export const getCurrentPriceEBTC = async (yam: Yam) => {
  return yam.toBigN(await yam.contracts.eBTCRebaser.methods.getCurrentTWAP().call()).multipliedBy(1e10);
}

export const getTargetPrice = async (yam: Yam) => {
  return yam.toBigN(1).toFixed(2);
}
export const getTargetPriceEETH = async (yam: Yam) => {
  return yam.toBigN(1).toFixed(2);
}
export const getTargetPriceEBTC = async (yam: Yam) => {
  return yam.toBigN(1).toFixed(2);
}

export const getScalingFactor = async (yam: Yam) => {
  const scalingFactor = new BigNumber(await yam.contracts.yam.methods.yuansScalingFactor().call())
  return scalingFactor.dividedBy(new BigNumber(10).pow(18)).toFixed(2)
}
export const getScalingFactorEETH = async (yam: Yam) => {
  const scalingFactor = new BigNumber(await yam.contracts.eETH.methods.yuansScalingFactor().call())
  return scalingFactor.dividedBy(new BigNumber(10).pow(18)).toFixed(2)
}
export const getScalingFactorEBTC = async (yam: Yam) => {
  const scalingFactor = new BigNumber(await yam.contracts.eBTC.methods.yuansScalingFactor().call())
  return scalingFactor.dividedBy(new BigNumber(10).pow(18)).toFixed(2)
}

export const getCirculatingSupply = async (yam: Yam) => {
  let now = await yam.web3.eth.getBlock('latest');
  let scalingFactor = yam.toBigN(await yam.contracts.yam.methods.yuansScalingFactor().call());
  let starttime = yam.toBigN(await yam.contracts.USDx_USDC_pool.methods.starttime().call()).toNumber();
  let timePassed = Number(now.timestamp) - starttime;
  if (timePassed < 0) {
    return '0';
  }
  let yamsDistributed = yam.toBigN(8 * timePassed * 250000 / 625000); //yams from first 8 pools
  // let starttimePool2 = yam.toBigN(await yam.contracts.USDx_USDC_pool.methods.starttime().call()).toNumber();
  timePassed = Number(now.timestamp) - starttime;
  let pool2Yams = yam.toBigN(timePassed * 1500000 / 625000); // yams from second pool. note: just accounts for first week
  let circulating = pool2Yams.plus(yamsDistributed).times(scalingFactor).div(10 ** 36).toFixed(2)
  return circulating
}
export const getCirculatingSupplyEETH = async (yam: Yam) => {
  // TODO: need change pool?
  let now = await yam.web3.eth.getBlock('latest');
  let scalingFactor = yam.toBigN(await yam.contracts.eETH.methods.yuansScalingFactor().call());
  let starttime = yam.toBigN(await yam.contracts.USDx_USDC_pool.methods.starttime().call()).toNumber();
  let timePassed = Number(now.timestamp) - starttime;
  if (timePassed < 0) {
    return '0';
  }
  let yamsDistributed = yam.toBigN(8 * timePassed * 250000 / 625000); //yams from first 8 pools
  // let starttimePool2 = yam.toBigN(await yam.contracts.USDx_USDC_pool.methods.starttime().call()).toNumber();
  timePassed = Number(now.timestamp) - starttime;
  let pool2Yams = yam.toBigN(timePassed * 1500000 / 625000); // yams from second pool. note: just accounts for first week
  let circulating = pool2Yams.plus(yamsDistributed).times(scalingFactor).div(10 ** 36).toFixed(2)
  return circulating
}
export const getCirculatingSupplyEBTC = async (yam: Yam) => {
  // TODO: need change pool?
  let now = await yam.web3.eth.getBlock('latest');
  let scalingFactor = yam.toBigN(await yam.contracts.eBTC.methods.yuansScalingFactor().call());
  let starttime = yam.toBigN(await yam.contracts.USDx_USDC_pool.methods.starttime().call()).toNumber();
  let timePassed = Number(now.timestamp) - starttime;
  if (timePassed < 0) {
    return '0';
  }
  let yamsDistributed = yam.toBigN(8 * timePassed * 250000 / 625000); //yams from first 8 pools
  // let starttimePool2 = yam.toBigN(await yam.contracts.USDx_USDC_pool.methods.starttime().call()).toNumber();
  timePassed = Number(now.timestamp) - starttime;
  let pool2Yams = yam.toBigN(timePassed * 1500000 / 625000); // yams from second pool. note: just accounts for first week
  let circulating = pool2Yams.plus(yamsDistributed).times(scalingFactor).div(10 ** 36).toFixed(2)
  return circulating
}

//配置 rebase 时间轴
export const interval = 1800
//配置 rebase 时间轴
const getNextRebaseTimestampBase = async (yam: Yam, rebaserContract: Contract): Promise<[number, boolean]> => {
  try {
    const blockTimestamp = Number(await yam.web3.eth.getBlock('latest').then(res => res.timestamp));
    const minRebaseTimeIntervalSec = Number(await rebaserContract.methods.minRebaseTimeIntervalSec().call());
    const rebaseWindowOffsetSec = Number(await rebaserContract.methods.rebaseWindowOffsetSec().call());
    const rebaseWindowLengthSec = Number(await rebaserContract.methods.rebaseWindowLengthSec().call());
    const isRebasingActive = await rebaserContract.methods.rebasingActive().call();
    console.log('minRebaseTimeIntervalSec:', minRebaseTimeIntervalSec, 'rebaseWindowOffsetSec:', rebaseWindowOffsetSec, 'rebaseWindowLengthSec:', rebaseWindowLengthSec);

    let secondsToRebase = 0;
    let rebasable = false;

    if (isRebasingActive) {
      if (blockTimestamp % minRebaseTimeIntervalSec > rebaseWindowOffsetSec) {
        secondsToRebase = (minRebaseTimeIntervalSec - (blockTimestamp % minRebaseTimeIntervalSec)) + rebaseWindowOffsetSec;
      } else {
        secondsToRebase = rebaseWindowOffsetSec - (blockTimestamp % minRebaseTimeIntervalSec);
      }

      const lastRebaseTimestampSec = Number(await rebaserContract.methods.lastRebaseTimestampSec().call());
      if (
        blockTimestamp % minRebaseTimeIntervalSec >= rebaseWindowOffsetSec &&
        blockTimestamp % minRebaseTimeIntervalSec < rebaseWindowOffsetSec + rebaseWindowLengthSec &&
        lastRebaseTimestampSec + minRebaseTimeIntervalSec < blockTimestamp
      ) {
        rebasable = true;
      }
    } else {
      const timeOfTWAPInit = yam.toBigN(await rebaserContract.methods.timeOfTWAPInit().call()).toNumber();

      if (timeOfTWAPInit > 0) {
        const rebaseDelay = yam.toBigN(await rebaserContract.methods.rebaseDelay().call()).toNumber();
        const endTime = timeOfTWAPInit + rebaseDelay;

        if (endTime % minRebaseTimeIntervalSec > rebaseWindowOffsetSec) {
          secondsToRebase = (minRebaseTimeIntervalSec - (endTime % minRebaseTimeIntervalSec)) + rebaseWindowOffsetSec;
        } else {
          secondsToRebase = rebaseWindowOffsetSec - (endTime % minRebaseTimeIntervalSec);
        }
        return [endTime + secondsToRebase, rebasable];
      } else {
        return [blockTimestamp + 13 * 60 * 60, rebasable];
      }
    }

    return [secondsToRebase, rebasable];
  } catch (error) {
    console.error('YamUtils::getNextRebaseTimestampBase:', error);
  }
}
export const getNextRebaseTimestamp = async (yam: Yam): Promise<[number, boolean]> =>  {
  const rebaserContract = yam.contracts.rebaser;
  return await getNextRebaseTimestampBase(yam, rebaserContract);
}
export const getNextRebaseTimestampEETH = async (yam: Yam): Promise<[number, boolean]> =>  {
  const rebaserContract = yam.contracts.eETHRebaser;
  return await getNextRebaseTimestampBase(yam, rebaserContract);
}
export const getNextRebaseTimestampEBTC = async (yam: Yam): Promise<[number, boolean]> =>  {
  const rebaserContract = yam.contracts.eBTCRebaser;
  return await getNextRebaseTimestampBase(yam, rebaserContract);
}

export const getTotalSupply = async (yam: Yam) => {
  return await yam.contracts.yam.methods.totalSupply().call();
}
export const getTotalSupplyEETH = async (yam: Yam) => {
  return await yam.contracts.eETH.methods.totalSupply().call();
}
export const getTotalSupplyEBTC = async (yam: Yam) => {
  return await yam.contracts.eBTC.methods.totalSupply().call();
}

export const getStats = async (yam: Yam) => {
  const curPrice = await getCurrentPrice(yam)
  const circSupply = await getCirculatingSupply(yam)
  const nextRebase = await getNextRebaseTimestamp(yam)
  const targetPrice = await getTargetPrice(yam)
  const totalSupply = await getTotalSupply(yam)
  const scalingFactor = await getScalingFactor(yam)
  return {
    circSupply,
    curPrice,
    nextRebase,
    targetPrice,
    totalSupply,
    scalingFactor
  }
}
