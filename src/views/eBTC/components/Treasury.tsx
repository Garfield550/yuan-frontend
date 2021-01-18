import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import {
  Box,
  // Button,
  // Card,
  // CardActions,
  // CardContent,
  // CardTitle,
  // Spacer,
} from 'react-neu'

// import Box from '../../../components/Box'
import Button from '../../../components/Button'
import Card from '../../../components/Card3'
// import CardActions from '../../../components/CardActions'
import CardContent from '../../../components/CardContent3'
import CardTitle from '../../../components/CardTitle3'
import Spacer from '../../../components/Spacer'


// import FancyValue from '../../../components/FancyValue'
import Split from '../../../components/Split'

import { useTreasuryEBTC } from '../../../hooks/useTreasury'
// import { getDPIPrice } from 'yam-sdk/utils'
// import { useWallet } from 'use-wallet'

import Label from '../../../components/Label'
// import StatsBg from '../../../assets/img/Page/Stats.svg'
import StatsUsdx from '../../../assets/img/Page/StatsUsdx.svg'
import StatsYUAN from '../../../assets/img/Page/StatsYUAN.svg'
import StatsOracle from '../../../assets/img/Page/StatsOracle.svg'

interface TreasuryProps {
  cur_language?: any
}

const Treasury: React.FC<TreasuryProps> = ({cur_language}) => {
  // const { status } = useWallet();
  // const [dpiPrice, setDPIPrice] = useState<number>();
  const { usdxBalance, yuanBalance, oraclePrice } = useTreasuryEBTC()
  
  // const fetchOnce = useCallback(async () => {
  //   const dpiPrice = await getDPIPrice();
  //   setDPIPrice(dpiPrice);
  // }, [setDPIPrice]);

  // useEffect(() => {
  //   if (status === "connected") {
  //     fetchOnce();
  //   }
  // }, [status]);

  // const assetYUSD = totalYUsdValue * 1.15;
  // const assetDPI = (totalDPIValue ? totalDPIValue : 0) * (dpiPrice ? dpiPrice : 0);

  // const treasuryAssets = assetYUSD + assetDPI;
  // const treasuryValue =
  //   typeof totalYUsdValue !== "undefined" && totalYUsdValue !== 0
  //     ? "~$" + numeral(treasuryAssets).format("0.00a")
  //     : "--";

  const usdxValue = typeof usdxBalance !== 'undefined'
    ? numeral(usdxBalance).format('0,0.00')
    : '--'

  const yuanValue = typeof yuanBalance !== 'undefined'
    ? numeral(yuanBalance).format('0,0.00')
    : '--'
  
  const oracleValue = typeof oraclePrice !== 'undefined'
    ? numeral(oraclePrice).format('0,0.00')
    : '--'

  return (
    <Card>
      <CardTitle text="Treasury_Overview" cur_language={cur_language} />
      <Spacer size="sm" />
      <CardContent>
        <Split>
        <StyledStats>
          <StyledStat>
            <StatIcon src={StatsUsdx} />
            <StatInfo>
              <StyledValue>{yuanValue}</StyledValue>
              <Label cur_language={cur_language} text={'eBTC_In_Reserves'} size={16}/>
            </StatInfo>
          </StyledStat>

          <StyledSpacer />

          <StyledStat>
            <StatIcon src={StatsYUAN} />
            <StatInfo>
              <StyledValue>{usdxValue}</StyledValue>
              <Label cur_language={cur_language} text={'YUAN_In_Reserves'} size={16}/>
            </StatInfo>
          </StyledStat>

          <StyledSpacer />

          <StyledStat>
            <StatIcon src={StatsOracle} />
            <StatInfo>
              <StyledValue>
                {oracleValue}
              </StyledValue>
              <Label cur_language={cur_language} text={'eBTC_BTC'} size={16}/>
            </StatInfo>
          </StyledStat>
        </StyledStats>
          {/* <FancyValue
            icon="💸"
            label="USDx in reserves"
            value={usdxValue}
          />
          <FancyValue
            icon="🍠"
            label="YUAN in reserves"
            value={yuanValue}
          />
          <FancyValue
            icon="💰"
            label="Oracle Price"
            value={oracleValue}
          /> */}
        </Split>
        <Spacer size="sm"/>
      </CardContent>
      {/* <CardActions> */}
        <Box row justifyContent="center">
          <Button
            href="https://etherscan.io/address/0xB37C599fbDD3f1C30fcAe51194ec802E52f70f61"
            text="View_Etherscan"
            cur_language={cur_language}
            variant="secondary"
            widthProps={274}
            heightProps={52}
            imageBg={'Rebase'}
          />
          <Button
            href="https://app.uniswap.org/#/swap?inputCurrency=0xeb269732ab75a6fd61ea60b06fe994cd32a83549&outputCurrency=0x4a3e164684812dfb684ac36457e7fa805087c68e"
            text="Buy_Uniswap" 
            cur_language={cur_language}
            variant="secondary"
            widthProps={274}
            heightProps={52}
            imageBg={'Rebase'}
          />
        </Box>
      {/* </CardActions> */}
    </Card>
  )
}

const StyledStats = styled.div`
  /* width: 100%; */
  flex:1;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  margin-bottom:-10px;
  @media(max-width: 767px) {
    /* width:100%; */
    flex:1;
    flex-direction: column;
    box-sizing:border-box;
    margin-bottom:6px
  }
`

const StyledStat = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;  
  &:last-child{
    margin-bottom:0
  }
  @media(max-width: 767px) {
    padding:5px 10px;
    box-sizing:border-box;
    margin-bottom:0;
    line-height:20px
  }
`
const StatIcon = styled.img`
  width:44px;
  height:44px;
  margin-right:20px
`
const StatInfo = styled.div`
  display:flex;
  flex-direction: column; 
`

const StyledValue = styled.span`
  color: ${props => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  @media(max-width: 767px) {
    width:100%;
    font-size:14px
  }
  font-family: 'dinFont' !important;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  @media(max-width: 767px) {
    height:12px
  }
`

export default Treasury
