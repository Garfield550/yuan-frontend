import YUANJson from '../yam-sdk/lib/clean_build/contracts/YUANDelegator.json';
import PriceOracleJson from '../yam-sdk/lib/clean_build/contracts/PriceOracle.json';
import YUANTreasuryJson from '../yam-sdk/lib/clean_build/contracts/YUANReservesV2.json';
import eETHJson from '../yam-sdk/lib/clean_build/contracts/eETHDelegator.json';
import eETHTreasuryJson from '../yam-sdk/lib/clean_build/contracts/eETHReserves.json';
import eBTCJson from '../yam-sdk/lib/clean_build/contracts/eBTCDelegator.json';
import eBTCTreasuryJson from '../yam-sdk/lib/clean_build/contracts/eBTCReserves.json';

// (to be change)
// YUAN kovan
export const yam = '0x08c89ADe94f830BA094529B782576e8525FB93d6'
export const usdx_adress = '0xFe1F0C31F4f477569622E284baBa0a6F030c6ea6'
export const oracle_address = '0x9E52c4CE059d0082D16E7DfFF48832DAe2734953'
export const Treasury = '0x956663fC10C8f754d5D2F68575e12b630C27e0BF'

// main net
// export const yam = '0x4A3e164684812DfB684AC36457E7fA805087c68E'
// export const usdx_adress = '0xeb269732ab75a6fd61ea60b06fe994cd32a83549'
// export const oracle_address = '0x8ABb6cc2810c22Df468E5fC491AB693F0901c927'
// export const Treasury = '0xB37C599fbDD3f1C30fcAe51194ec802E52f70f61'

// bsc testnet
// export const yam = '0xCcdCc446e52160E4Ae78b4cc940E407FEdB230c7' // YUANDelegate
// export const Treasury = '0xCbc0e2ECc82e0Ef2c966D14B0635A874B488933b' // YUANReserves
// export const oracle_address = '0x4c649927a3F5EBA50917bD09D3B1d9A6AFeF3805'

export type TokenInfo = {
    yam: string
    usdx: string
    oracle: string
    treasury: string
}
export type TokenAddressItem = {
    [networkId: string]: TokenInfo
}
export type TokenAddress = {
    yuan: TokenAddressItem
    eETH: TokenAddressItem
    eBTC: TokenAddressItem
}
export const TOKEN_ADDRESS: TokenAddress = {
    yuan: {
        1: {
            yam: YUANJson.networks[1].address,
            usdx: '0xeb269732ab75a6fd61ea60b06fe994cd32a83549',
            oracle: PriceOracleJson.networks[1].address,
            treasury: YUANTreasuryJson.networks[1].address
        },
        42: {
            // yam: '0x08c89ADe94f830BA094529B782576e8525FB93d6',
            yam: YUANJson.networks[42].address,
            usdx: '0xFe1F0C31F4f477569622E284baBa0a6F030c6ea6',
            // oracle: '0x9E52c4CE059d0082D16E7DfFF48832DAe2734953',
            oracle: PriceOracleJson.networks[42].address,
            treasury: YUANTreasuryJson.networks[42].address
        }
    },
    eETH: {
        42: {
            yam: eETHJson.networks[42].address,
            usdx: YUANJson.networks[42].address, // YUAN(eETH/YUAN)
            oracle: '',
            treasury: eETHTreasuryJson.networks[42].address
        }
    },
    eBTC: {
        42: {
            yam: eBTCJson.networks[42].address,
            usdx: YUANJson.networks[42].address, // YUAN(eBTC/YUAN)
            oracle: '',
            treasury: eBTCTreasuryJson.networks[42].address
        }
    }
}
