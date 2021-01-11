import Web3 from 'web3';
import { provider as Provider } from 'web3-core';
import BigNumber from 'bignumber.js';
import {
  Contracts
} from './lib/contracts';
import {
  Account
} from './lib/accounts';
import {
  EVM
} from "./lib/evm";

// const oneEther = 1000000000000000000;

export class Yam {
  public web3: Web3;
  public testing: EVM;
  public snapshot: Promise<any>;
  public contracts: Contracts;
  public accounts: Account[];
  public markets: any[];
  public prices: any;
  public allocations: any;
  public rates: any;
  public aprs: any;
  public poolWeis: any;
  public platformInfo: any;
  public operation: any;

  constructor(
    provider: Provider,
    networkId: number,
    testing: EVM | boolean,
    options: any
  ) {
    var realProvider;

    if (typeof provider === 'string') {
      if (provider.includes("wss")) {
        realProvider = new Web3.providers.WebsocketProvider(
          provider,
          options.ethereumNodeTimeout || 10000,
        );
      } else {
        realProvider = new Web3.providers.HttpProvider(
          provider,
          options.ethereumNodeTimeout || 10000,
        );
      }
    } else {
      realProvider = provider;
    }

    this.web3 = new Web3(realProvider);

    if (testing) {
      this.testing = new EVM(realProvider);
      this.snapshot = this.testing.snapshot()
    }

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount;
    }
    this.contracts = new Contracts(realProvider, networkId, this.web3, options);
    this.accounts = [];
    this.markets = [];
    this.prices = {};
    this.allocations = {};
    this.rates = {};
    this.aprs = {};
    this.poolWeis = {};
    this.platformInfo = {};
  }

  async resetEVM() {
    this.testing.resetEVM(await this.snapshot);
  }

  addAccount(address: string) {
    this.accounts.push(new Account(this.contracts, address));
  }

  setProvider(
    provider: Provider,
    networkId: number
  ) {
    this.web3.setProvider(provider);
    this.contracts.setProvider(provider, networkId);
    this.operation.setNetworkId(networkId);
  }

  setDefaultAccount(
    account: string
  ) {
    this.web3.eth.defaultAccount = account;
    this.contracts.setDefaultAccount(account);
  }

  getDefaultAccount() {
    return this.web3.eth.defaultAccount;
  }

  loadAccount(account: any) {
    const newAccount = this.web3.eth.accounts.wallet.add(
      account.privateKey,
    );

    if (
      !newAccount ||
      (
        account.address &&
        account.address.toLowerCase() !== newAccount.address.toLowerCase()
      )
    ) {
      throw new Error(`Loaded account address mismatch.
        Expected ${account.address}, got ${newAccount ? newAccount.address : null}`);
    }
  }

  toBigN(a: number) {
    return new BigNumber(a);
  }
}
