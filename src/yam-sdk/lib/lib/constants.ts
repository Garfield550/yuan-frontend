import BigNumber from 'bignumber.js/bignumber';
export const SUBTRACT_GAS_LIMIT = 100000;
const ONE_MINUTE_IN_SECONDS = new BigNumber(60);
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60);
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24);
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365);
export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber('115792089237316195423570985008687907853269984665640564039457584007913129639935',), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
};

export type AddressMap = {
  [tokenName: string]: string
}

export const addressMap: AddressMap = {
  uniswapFactory: "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95",
  uniswapFactoryV2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  UNIRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",

  // (to be change)
  // 夏 商 周
  // USDx_USDC: "0xe762c27E924a200b72097009496EFDE313Bb033c",
  // USDx_YUAN: "0x8c6B9A2dF85C3B39dFBf52D0A98460E684CC3516",
  // ETH_YUAN: "0x55cF49a5e6880AD776b3F8FeeFEDC0f07705ad14",
  // // qin
  // USDC_ETH: "0x3651Efc3cEB539567dfBF7c593c183A66e2E7F2A",
  // DAI_ETH: "0x5DDa1DE1d7038b8514E62732B95dE7c24464C3dD",
  // USDT_ETH: "0x8BFa3C5212B93116B4f02D21b1DB702217366Efc",
  // USDx_ETH: "0xa4571726FC8720c08Aa0A36b91f9dC6E98B446f9",
  // // han
  // YAM_ETH: "0xc4f57E77ED78514c4711C34fe9ea71cf1423D511",
  // AMPL_ETH: "0xAbcdffd60d64cE8a0B630AFa382DA6009AbF3663",
  // // tang
  // UNI_ETH: "0xD8BD0F2652cBBa220830fdf839AF7a164Ed95cFE",
  // YFI_ETH: "0x67484432470E47A7315d5156309Df1397699b51a",
  // LINK_ETH: "0xcE9C7CaCF373CfeB56f90Cc560779d20B93088F8",
  // BAND_ETH: "0x08F6db4A13E265C8A26d00Dd182F337eFcFfC130",
  // DF_ETH: "0xa61aA70D400D09e9b4F541Fc019775669A905E02",
  // YFII_ETH: "0x1dE8848A1769486809E7851BD45e29b8D950DBa4",


  // main-net ***
  // 夏 商 周
  USDx_USDC: "0x90aD772895677D0884D90cB12CE99C7d9d98A229",
  USDx_YUAN: "0x55C53d2D4DecADF04B2ED6EC0bA46322A7D4D231",
  ETH_YUAN: "0x21De9D787C9c27cC276e92e8D75678B2651b67E2",
  // qin
  USDC_ETH: "0xa0DDb871DD40e8daf5Eaf56E19875B4a79538C79",
  DAI_ETH: "0x260E0617BE759140987518Ad3BBc2CE20030d4B6",
  USDT_ETH: "0x1d4a7b26412cEdDE53cC7D4a3D37546e09108b8D",
  USDx_ETH: "0x920Cf86777D9443D4A85Fb82c1022a7E55B93528",
  // han
  YAM_ETH: "0x62B4c82D91c61599895564efc4b0687c718713dc",
  AMPL_ETH: "0x8c9564B817989434355a9FDFF71a1d2035426599",
  // tang
  UNI_ETH: "0x2903877Ab5529182f0F6a4B6fb7d3C05aC82EEA8",
  YFI_ETH: "0x1f34258e744c4326d6CbB4071dB9314C9149A33B",
  LINK_ETH: "0x9a5A5B88680c6F6AB55B371A6178Fe5b58562fdF",
  BAND_ETH: "0x57d6b9D563cFAa45a6022067A3bc395BF96ffA2b",
  DF_ETH: "0x3859e539cc73c466254C7D476e4559f65aD25A54",
  YFII_ETH: "0x39d9f4CF9a1449E85Ce4085D3bd28d149A82f65e",
  // The Great Expectations
  YUAN_USDx: "0x7A11DC809Ec055AC4FdeF704a37Cd2Dc669B29AB",
  YUAN_ETH: "0xA270Df522F3353d11C21fC3C71596582d4178bFC",
}

export type AddressMapJson = {
  [poolName: string]: AddressMapJsonItem
}

export type AddressMapJsonItem = {
  networks: {
    [networkId: string]: {
      address: string
    }
  }
}

export const addressMapJSON: AddressMapJson = {
  // qin
  USDC_ETH: {
    networks: {
      '42': { "address": "0x3651Efc3cEB539567dfBF7c593c183A66e2E7F2A" },
      '1': { "address": "0xa0DDb871DD40e8daf5Eaf56E19875B4a79538C79" }
    }
  },
  DAI_ETH: {
    networks: {
      '42': { "address": "0x5DDa1DE1d7038b8514E62732B95dE7c24464C3dD" },
      '1': { "address": "0x260E0617BE759140987518Ad3BBc2CE20030d4B6" }
    }
  },
  USDT_ETH: {
    networks: {
      '42': { "address": "0x8BFa3C5212B93116B4f02D21b1DB702217366Efc" },
      '1': { "address": "0x1d4a7b26412cEdDE53cC7D4a3D37546e09108b8D" }
    }
  },
  USDx_ETH: {
    networks: {
      '42': { "address": "0xa4571726FC8720c08Aa0A36b91f9dC6E98B446f9" },
      '1': { "address": "0x920Cf86777D9443D4A85Fb82c1022a7E55B93528" }
    }
  },

  // han
  YAM_ETH: {
    networks: {
      '42': { "address": "0xc4f57E77ED78514c4711C34fe9ea71cf1423D511" },
      '1': { "address": "0x62B4c82D91c61599895564efc4b0687c718713dc" }
    }
  },
  AMPL_ETH: {
    networks: {
      '42': { "address": "0xAbcdffd60d64cE8a0B630AFa382DA6009AbF3663" },
      '1': { "address": "0x8c9564B817989434355a9FDFF71a1d2035426599" }
    }
  },

  // tang
  UNI_ETH: {
    networks: {
      '42': { "address": "0xD8BD0F2652cBBa220830fdf839AF7a164Ed95cFE" },
      '1': { "address": "0x2903877Ab5529182f0F6a4B6fb7d3C05aC82EEA8" }
    }
  },
  YFI_ETH: {
    networks: {
      '42': { "address": "0x67484432470E47A7315d5156309Df1397699b51a" },
      '1': { "address": "0x1f34258e744c4326d6CbB4071dB9314C9149A33B" }
    }
  },
  LINK_ETH: {
    networks: {
      '42': { "address": "0xcE9C7CaCF373CfeB56f90Cc560779d20B93088F8" },
      '1': { "address": "0x9a5A5B88680c6F6AB55B371A6178Fe5b58562fdF" }
    }
  },
  BAND_ETH: {
    networks: {
      '42': { "address": "0x08F6db4A13E265C8A26d00Dd182F337eFcFfC130" },
      '1': { "address": "0x57d6b9D563cFAa45a6022067A3bc395BF96ffA2b" }
    }
  },
  DF_ETH: {
    networks: {
      '42': { "address": "0xa61aA70D400D09e9b4F541Fc019775669A905E02" },
      '1': { "address": "0x3859e539cc73c466254C7D476e4559f65aD25A54" }
    }
  },
  YFII_ETH: {
    networks: {
      '42': { "address": "0x1dE8848A1769486809E7851BD45e29b8D950DBa4" },
      '1': { "address": "0x39d9f4CF9a1449E85Ce4085D3bd28d149A82f65e" }
    }
  },

  // The Great Expectations
  YUAN_USDx: {
    networks: {
      '42': { "address": "" },
      '1': { "address": "0x7A11DC809Ec055AC4FdeF704a37Cd2Dc669B29AB" }
    }
  },
  YUAN_ETH: {
    networks: {
      '42': { "address": "" },
      '1': { "address": "0xA270Df522F3353d11C21fC3C71596582d4178bFC" }
    }
  },
}