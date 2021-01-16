import BigNumber from 'bignumber.js/bignumber';
import Web3 from 'web3';
import { provider as Provider } from 'web3-core';
import { AbiItem } from 'web3-utils';
import { Contract as Web3Contract } from 'web3-eth-contract';
import * as Types from "./types.js";
import { SUBTRACT_GAS_LIMIT, addressMap, addressMapJSON, AddressMapJsonItem } from './constants';

import ERC20Json from '../clean_build/contracts/IERC20.json';
// import YAMJson from '../clean_build/contracts/YAMDelegator.json';
import YUANJson from '../clean_build/contracts/YUANDelegator.json';
// import YAMRebaserJson from '../clean_build/contracts/YAMRebaser.json';
import YUANRebaserJson from '../clean_build/contracts/YUANRebaser.json';
// import YAMReservesJson from '../clean_build/contracts/YAMReserves.json';
import YUANReservesJson from '../clean_build/contracts/YUANReservesV2.json';
// import YAMGovJson from '../clean_build/contracts/GovernorAlpha.json';
import YUANGovJson from '../clean_build/contracts/GovernorAlpha.json';
// import YAMGovJson_YIP003 from '../clean_build/contracts/GovernorAlpha_YIP003.json';
import YUANGovJson_YIP003 from '../clean_build/contracts/GovernorAlphaV2.json';
// import YAMTimelockJson from '../clean_build/contracts/Timelock.json';
import YUANTimelockJson from '../clean_build/contracts/Timelock.json';
import WETHJson from './weth.json';
import UNIFactJson from './unifact2.json';
import UNIPairJson from './uni2.json';
import UNIRouterJson from './uniR.json';
import LENDPoolJson from '../clean_build/contracts/YAMLENDPool.json';

// (to be change)
// import MKRPoolJson from '../clean_build/contracts/YAMMKRPool.json';
import USDxUSDCPoolJson from '../clean_build/contracts/YUANUSDxUSDCPool.json';
// import DFPoolJson from '../clean_build/contracts/YAMDFPool.json';
import USDxYUANPoolJson from '../clean_build/contracts/YUANUSDxYUANPool.json';
// import DUSDTPoolJson from '../clean_build/contracts/YAMdUSDTPool.json';
import ETHYUANPoolJson from '../clean_build/contracts/YUANETHYUANPool.json';
// Qin
import ETHUSDCPoolJson from '../clean_build/contracts/YUANETHUSDCPool.json';
import ETHDAIPoolJson from '../clean_build/contracts/YUANETHDAIPool.json';
import ETHUSDTPoolJson from '../clean_build/contracts/YUANETHUSDTPool.json';
import ETHUSDxPoolJson from '../clean_build/contracts/YUANETHUSDxPool.json';
// Han
import ETHYAMPoolJson from '../clean_build/contracts/YUANETHYAMPool.json';
import ETHAMPLPoolJson from '../clean_build/contracts/YUANETHAMPLPool.json';
// Tang
import ETHUNIPoolJson from '../clean_build/contracts/YUANETHUNIPool.json';
import ETHYFIPoolJson from '../clean_build/contracts/YUANETHYFIPool.json';
import ETHDFPoolJson from '../clean_build/contracts/YUANETHDFPool.json';
import ETHLINKPoolJson from '../clean_build/contracts/YUANETHLINKPool.json';
import ETHBANDPoolJson from '../clean_build/contracts/YUANETHBANDPool.json';
import ETHYFIIPoolJson from '../clean_build/contracts/YUANETHYFIIPool.json';
// 远大征程

//增加 governance vote start
import YAMv2Json from '../clean_build/contracts/YAMv2.json';
import YAMv2MigrationJson from '../clean_build/contracts/YAMv2Migration.json';
import MigratorJson from "../clean_build/contracts/Migrator.json"
import YAMv3Json from "../clean_build/contracts/YAMDelegatorV3.json"
//增加 governance vote end

// eETH
import eETHRebaserJson from '../clean_build/contracts/eETHRebaser.json';
import eETHJson from '../clean_build/contracts/eETHDelegator.json';

export type Contract = Web3Contract & {
  setProvider?: (provider: Provider) => void
}

export type AddressNames = {
  [address: string]: string
}

export type Pool = {
  tokenAddr: string
  poolAddr: string
}

export type ContractItem = {
  contract: Contract
  json: AddressMapJsonItem
}

export interface Contracts {
  [contractName: string]: any;
}
export class Contracts {
  public web3: Web3;
  public defaultConfirmations: any;
  public autoGasMultiplier: number;
  public confirmationType: number;
  public defaultGas: number;
  public defaultGasPrice: number;
  public uni_pair: Contract;
  public uni_router: Contract;
  public uni_fact: Contract;
  public yfi: Contract;
  public UNIAmpl: Contract;
  public ycrv: Contract;
  public yam: Contract;
  public USDx_USDC_pool: Contract;
  public USDx_YUAN_pool: Contract;
  public ETH_YUAN_pool: Contract;
  public USDC_ETH_pool: Contract;
  public DAI_ETH_pool: Contract;
  public USDT_ETH_pool: Contract;
  public USDx_ETH_pool: Contract;
  public YAM_ETH_pool: Contract;
  public AMPL_ETH_pool: Contract;
  public UNI_ETH_pool: Contract;
  public YFI_ETH_pool: Contract;
  public DF_ETH_pool: Contract;
  public LINK_ETH_pool: Contract;
  public BAND_ETH_pool: Contract;
  public YFII_ETH_pool: Contract;
  public YUAN_ETH_pool: Contract;
  public YUAN_USDx_pool: Contract;
  public comp: Contract;
  public link: Contract;
  public lend: Contract;
  public USDx_USDC: Contract;
  public yam_ycrv_uni_lp: Contract;
  public erc20: Contract;
  public pool: Contract;
  public USDx_YUAN: Contract;
  public ETH_YUAN: Contract;
  public rebaser: Contract;
  public reserves: Contract;
  public gov: Contract;
  public gov003: Contract;
  public timelock: Contract;
  public weth: Contract;
  public yamV2: Contract;
  public yamV2migration: Contract;
  public yamV3: Contract;
  public migrator: Contract;
  public pools: Pool[];
  public names: AddressNames;
  public blockGasLimit: number;
  public notifier: any;
  // eETH
  public eETH: Contract;
  public eETHRebaser: Contract;

  constructor(provider: Provider, networkId: number, web3: Web3, options: any) {
    this.web3 = web3;
    this.defaultConfirmations = options.defaultConfirmations;
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5;
    this.confirmationType = options.confirmationType || Types.ConfirmationType.Confirmed;
    this.defaultGas = options.defaultGas;
    this.defaultGasPrice = options.defaultGasPrice;

    this.uni_pair = new this.web3.eth.Contract(UNIPairJson as AbiItem[]);
    this.uni_router = new this.web3.eth.Contract(UNIRouterJson as AbiItem[]);
    this.uni_fact = new this.web3.eth.Contract(UNIFactJson as AbiItem[]);
    this.yfi = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    this.UNIAmpl = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    this.ycrv = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    this.yam = new this.web3.eth.Contract(YUANJson.abi as AbiItem[]);

    // 夏 商 周
    this.USDx_USDC_pool = new this.web3.eth.Contract(USDxUSDCPoolJson.abi as AbiItem[]);
    this.USDx_YUAN_pool = new this.web3.eth.Contract(USDxYUANPoolJson.abi as AbiItem[]);
    this.ETH_YUAN_pool = new this.web3.eth.Contract(ETHYUANPoolJson.abi as AbiItem[]);
    // qin
    this.USDC_ETH_pool = new this.web3.eth.Contract(ETHUSDCPoolJson.abi as AbiItem[]);
    this.DAI_ETH_pool = new this.web3.eth.Contract(ETHDAIPoolJson.abi as AbiItem[]);
    this.USDT_ETH_pool = new this.web3.eth.Contract(ETHUSDTPoolJson.abi as AbiItem[]);
    this.USDx_ETH_pool = new this.web3.eth.Contract(ETHUSDxPoolJson.abi as AbiItem[]);
    // han
    this.YAM_ETH_pool = new this.web3.eth.Contract(ETHYAMPoolJson.abi as AbiItem[]);
    this.AMPL_ETH_pool = new this.web3.eth.Contract(ETHAMPLPoolJson.abi as AbiItem[]);
    // tang
    this.UNI_ETH_pool = new this.web3.eth.Contract(ETHUNIPoolJson.abi as AbiItem[]);
    this.YFI_ETH_pool = new this.web3.eth.Contract(ETHYFIPoolJson.abi as AbiItem[]);
    this.DF_ETH_pool = new this.web3.eth.Contract(ETHDFPoolJson.abi as AbiItem[]);
    this.LINK_ETH_pool = new this.web3.eth.Contract(ETHLINKPoolJson.abi as AbiItem[]);
    this.BAND_ETH_pool = new this.web3.eth.Contract(ETHBANDPoolJson.abi as AbiItem[]);
    this.YFII_ETH_pool = new this.web3.eth.Contract(ETHYFIIPoolJson.abi as AbiItem[]);
    // 远大征程
    this.YUAN_ETH_pool = new this.web3.eth.Contract(ETHYUANPoolJson.abi as AbiItem[]);
    this.YUAN_USDx_pool = new this.web3.eth.Contract(USDxYUANPoolJson.abi as AbiItem[]);

    this.comp = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    this.link = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    this.lend = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    this.USDx_USDC = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    this.yam_ycrv_uni_lp = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    // this.yam_yycrv_uni_lp = new this.web3.eth.Contract(ERC20Json.abi);

    this.erc20 = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    this.pool = new this.web3.eth.Contract(LENDPoolJson.abi as AbiItem[]);

    this.USDx_YUAN = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);
    this.ETH_YUAN = new this.web3.eth.Contract(ERC20Json.abi as AbiItem[]);

    this.rebaser = new this.web3.eth.Contract(YUANRebaserJson.abi as AbiItem[]);
    this.reserves = new this.web3.eth.Contract(YUANReservesJson.abi as AbiItem[]);
    this.gov = new this.web3.eth.Contract(YUANGovJson.abi as AbiItem[]);
    this.gov003 = new this.web3.eth.Contract(YUANGovJson_YIP003.abi as AbiItem[]);
    this.timelock = new this.web3.eth.Contract(YUANTimelockJson.abi as AbiItem[]);
    this.weth = new this.web3.eth.Contract(WETHJson as AbiItem[]);

    //增加 gov vote start
    this.yamV2 = new this.web3.eth.Contract(YAMv2Json.abi as AbiItem[]);
    this.yamV2migration = new this.web3.eth.Contract(YAMv2MigrationJson.abi as AbiItem[]);

    this.yamV3 = new this.web3.eth.Contract(YAMv3Json.abi as AbiItem[]);
    this.migrator = new this.web3.eth.Contract(MigratorJson.abi as AbiItem[]);
    //增加 gov vote end

    // eETH
    this.eETH = new this.web3.eth.Contract(eETHJson.abi as AbiItem[]);
    this.eETHRebaser = new this.web3.eth.Contract(eETHRebaserJson.abi as AbiItem[]);

    this.setProvider(provider, networkId);
    this.setDefaultAccount(this.web3.eth.defaultAccount);
  }

  setProvider(
    provider: Provider,
    networkId: number
  ) {
    this.yam.setProvider(provider);
    this.rebaser.setProvider(provider);
    this.reserves.setProvider(provider);
    this.gov.setProvider(provider);
    this.gov003.setProvider(provider);
    this.timelock.setProvider(provider);

    const contracts: ContractItem[] = [
      { contract: this.yam, json: YUANJson },
      { contract: this.rebaser, json: YUANRebaserJson },
      { contract: this.reserves, json: YUANReservesJson },
      { contract: this.gov, json: YUANGovJson },
      { contract: this.gov003, json: YUANGovJson_YIP003 },
      { contract: this.timelock, json: YUANTimelockJson },
      // eETH
      { contract: this.eETH, json: eETHJson },
      { contract: this.eETHRebaser, json: eETHRebaserJson },
      // (to be change)
      // 夏 商 周
      { contract: this.USDx_USDC_pool, json: USDxUSDCPoolJson },
      { contract: this.USDx_YUAN_pool, json: USDxYUANPoolJson },
      { contract: this.ETH_YUAN_pool, json: ETHYUANPoolJson },
      // qin
      // { contract: this.USDC_ETH_pool, json: addressMapJSON.USDC_ETH },
      // { contract: this.DAI_ETH_pool, json: addressMapJSON.DAI_ETH },
      // { contract: this.USDT_ETH_pool, json: addressMapJSON.USDT_ETH },
      // { contract: this.USDx_ETH_pool, json: addressMapJSON.USDx_ETH },
      { contract: this.USDC_ETH_pool, json: ETHUSDCPoolJson },
      { contract: this.DAI_ETH_pool, json: ETHDAIPoolJson },
      { contract: this.USDT_ETH_pool, json: ETHUSDTPoolJson },
      { contract: this.USDx_ETH_pool, json: ETHUSDxPoolJson },
      // han
      // { contract: this.YAM_ETH_pool, json: addressMapJSON.YAM_ETH },
      // { contract: this.AMPL_ETH_pool, json: addressMapJSON.AMPL_ETH },
      { contract: this.YAM_ETH_pool, json: ETHYAMPoolJson },
      { contract: this.AMPL_ETH_pool, json: ETHAMPLPoolJson },
      // tang
      // { contract: this.YFI_ETH_pool, json: addressMapJSON.YFI_ETH },
      // { contract: this.DF_ETH_pool, json: addressMapJSON.DF_ETH },
      // { contract: this.UNI_ETH_pool, json: addressMapJSON.UNI_ETH },
      // { contract: this.LINK_ETH_pool, json: addressMapJSON.LINK_ETH },
      // { contract: this.BAND_ETH_pool, json: addressMapJSON.BAND_ETH },
      // { contract: this.YFII_ETH_pool, json: addressMapJSON.YFII_ETH },
      { contract: this.YFI_ETH_pool, json: ETHYFIPoolJson },
      { contract: this.DF_ETH_pool, json: ETHDFPoolJson },
      { contract: this.UNI_ETH_pool, json: ETHUNIPoolJson },
      { contract: this.LINK_ETH_pool, json: ETHLINKPoolJson },
      { contract: this.BAND_ETH_pool, json: ETHBANDPoolJson },
      { contract: this.YFII_ETH_pool, json: ETHYFIIPoolJson },
      // 远大征程
      { contract: this.YUAN_ETH_pool, json: addressMapJSON.YUAN_ETH },
      { contract: this.YUAN_USDx_pool, json: addressMapJSON.YUAN_USDx },
    ]

    contracts.forEach(contract => this.setContractProvider(contract.contract, contract.json, provider, networkId));

    this.uni_fact.options.address = addressMap["uniswapFactoryV2"];
    this.uni_router.options.address = addressMap["UNIRouter"];
    this.USDx_USDC.options.address = addressMap["USDx_USDC"];
    this.USDx_YUAN.options.address = addressMap["USDx_YUAN"];
    this.ETH_YUAN.options.address = addressMap["ETH_YUAN"];
    this.pools = [
      // (to be change)
      // 夏 商 周
      { "tokenAddr": this.USDx_USDC.options.address, "poolAddr": this.USDx_USDC_pool.options.address },
      { "tokenAddr": this.USDx_YUAN.options.address, "poolAddr": this.USDx_YUAN_pool.options.address },
      { "tokenAddr": this.ETH_YUAN.options.address, "poolAddr": this.ETH_YUAN_pool.options.address },
      // qin
      { "tokenAddr": this.USDC_ETH_pool.options.address, "poolAddr": this.USDC_ETH_pool.options.address },
      { "tokenAddr": this.DAI_ETH_pool.options.address, "poolAddr": this.DAI_ETH_pool.options.address },
      { "tokenAddr": this.USDT_ETH_pool.options.address, "poolAddr": this.USDT_ETH_pool.options.address },
      { "tokenAddr": this.USDx_ETH_pool.options.address, "poolAddr": this.USDx_ETH_pool.options.address },
      // han
      { "tokenAddr": this.YAM_ETH_pool.options.address, "poolAddr": this.YAM_ETH_pool.options.address },
      { "tokenAddr": this.AMPL_ETH_pool.options.address, "poolAddr": this.AMPL_ETH_pool.options.address },
      // tang
      { "tokenAddr": this.YFI_ETH_pool.options.address, "poolAddr": this.YFI_ETH_pool.options.address },
      { "tokenAddr": this.DF_ETH_pool.options.address, "poolAddr": this.DF_ETH_pool.options.address },
      { "tokenAddr": this.UNI_ETH_pool.options.address, "poolAddr": this.UNI_ETH_pool.options.address },
      { "tokenAddr": this.LINK_ETH_pool.options.address, "poolAddr": this.LINK_ETH_pool.options.address },
      { "tokenAddr": this.BAND_ETH_pool.options.address, "poolAddr": this.BAND_ETH_pool.options.address },
      { "tokenAddr": this.YFII_ETH_pool.options.address, "poolAddr": this.YFII_ETH_pool.options.address },
      // 远大征程
      { "tokenAddr": this.YUAN_ETH_pool.options.address, "poolAddr": this.YUAN_ETH_pool.options.address },
      { "tokenAddr": this.YUAN_USDx_pool.options.address, "poolAddr": this.YUAN_USDx_pool.options.address },
    ]

    this.names = {};
    this.names[this.yam.options.address] = "YAMv1";
    this.names[this.rebaser.options.address] = "Rebaser";
    this.names[this.reserves.options.address] = "Reserves";
    this.names[this.gov.options.address] = "Previous Governor";
    this.names[this.gov003.options.address] = "Previous Governor";
    this.names[this.timelock.options.address] = "Timelock Governance";
    this.names[this.migrator.options.address] = "Migrator";
  }

  setDefaultAccount(account: string) {
    this.yfi.options.from = account;
    this.ycrv.options.from = account;
    this.yam.options.from = account;
    this.weth.options.from = account;
  }

  async callContractFunction(method: any, options: any) {
    const { confirmations, confirmationType, autoGasMultiplier, ...txOptions } = options;

    if (!this.blockGasLimit) {
      await this.setGasLimit();
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice;
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate;
      if (this.defaultGas && confirmationType !== Types.ConfirmationType.Simulate) {
        txOptions.gas = this.defaultGas;
      } else {
        try {
          console.log("estimating gas");
          gasEstimate = await method.estimateGas(txOptions);
        } catch (error) {
          const data = method.encodeABI();
          const { from, value } = options;
          const to = method._parent._address;
          error.transactionData = { from, value, data, to };
          throw error;
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier;
        const totalGas = Math.floor(gasEstimate * multiplier);
        txOptions.gas = totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit;
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas;
        return { gasEstimate, g };
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0);
    } else {
      txOptions.value = '0';
    }

    const promi = method.send(txOptions);

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    };

    let hashOutcome = OUTCOMES.INITIAL;
    let confirmationOutcome = OUTCOMES.INITIAL;

    const t = confirmationType !== undefined ? confirmationType : this.confirmationType;

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`);
    }

    let hashPromise;
    let confirmationPromise;

    if (t === Types.ConfirmationType.Hash || t === Types.ConfirmationType.Both) {
      hashPromise = new Promise(
        (resolve, reject) => {
          promi.on('error', (error: Error) => {
            if (hashOutcome === OUTCOMES.INITIAL) {
              hashOutcome = OUTCOMES.REJECTED;
              reject(error);
              const anyPromi = promi;
              anyPromi.off();
            }
          });

          promi.on('transactionHash', (txHash: string) => {
            if (hashOutcome === OUTCOMES.INITIAL) {
              hashOutcome = OUTCOMES.RESOLVED;
              resolve(txHash);
              if (t !== Types.ConfirmationType.Both) {
                const anyPromi = promi;
                anyPromi.off();
              }
            }
          });
        },
      );
    }

    if (t === Types.ConfirmationType.Confirmed || t === Types.ConfirmationType.Both) {
      confirmationPromise = new Promise(
        (resolve, reject) => {
          promi.on('error', (error: Error) => {
            if (
              (t === Types.ConfirmationType.Confirmed || hashOutcome === OUTCOMES.RESOLVED)
              && confirmationOutcome === OUTCOMES.INITIAL
            ) {
              confirmationOutcome = OUTCOMES.REJECTED;
              reject(error);
              const anyPromi = promi;
              anyPromi.off();
            }
          });

          const desiredConf = confirmations || this.defaultConfirmations;
          if (desiredConf) {
            promi.on('confirmation', (confNumber: number, receipt: any) => {
              if (confNumber >= desiredConf) {
                if (confirmationOutcome === OUTCOMES.INITIAL) {
                  confirmationOutcome = OUTCOMES.RESOLVED;
                  resolve(receipt);
                  const anyPromi = promi;
                  anyPromi.off();
                }
              }
            });
          } else {
            promi.on('receipt', (receipt: any) => {
              confirmationOutcome = OUTCOMES.RESOLVED;
              resolve(receipt);
              const anyPromi = promi;
              anyPromi.off();
            });
          }
        },
      );
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise;
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return { transactionHash };
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise;
    }

    const transactionHash = await hashPromise;
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    };
  }

  async callConstantContractFunction(
    method: any,
    options: any
  ) {
    const m2 = method;
    const { blockNumber, ...txOptions } = options;
    return m2.call(txOptions, blockNumber);
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest');
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT;
  }

  setContractProvider(
    contract: Contract,
    contractJson: AddressMapJsonItem,
    provider: Provider,
    networkId: number,
  ) {
    contract.setProvider(provider);
    try {
      contract.options.address = contractJson.networks[networkId]
        && contractJson.networks[networkId].address;
    } catch (error) {
      // console.log(error)
    }
  }
}
