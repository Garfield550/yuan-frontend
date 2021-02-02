import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import { useWallet } from 'use-wallet'

import Button from '../../../components/Button'
// import Card from '../../../components/Card'
// import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'

import useFarms from '../../../hooks/useFarms'

import { Farm } from '../../../contexts/Farms'

import { getPoolStartTime } from '../../../yamUtils'
import pool_bg from '../../../assets/img/stake/pool_bg.svg'
// import stake_btn from '../../../assets/img/stake/stake_btn.svg'
import { FormattedMessage } from 'react-intl'

import { getAPYContract } from '../../../utils/erc20js'
import { abi } from '../../../utils/apy.json'
import { networks } from '../../../utils/apy.json'
// import long_line from '../../../assets/img/Page/long-line.png'
import long_line_left from '../../../assets/img/Page/long-line-left.svg'
import { JSON_IMAGES } from '../../../assets'

interface FarmCardsProps {
  cur_language?: any,
  is_staking?: boolean
}
const FarmCards: React.FC<FarmCardsProps> = ({ cur_language, is_staking }) => {
  const [farms] = useFarms()
  const rowOneIconName = ['xia', 'shang', 'zhou'];

  const rows = farms.reduce<Farm[][]>((farmRows, farm) => {
    const newFarmRows = [...farmRows]
    // if (newFarmRows[newFarmRows.length - 1].length === 3) {
    //   newFarmRows.push([farm])
    // } else {
    //   newFarmRows[newFarmRows.length - 1].push(farm)
    // }

    newFarmRows[newFarmRows.length - 1].push(farm)
    // console.log(newFarmRows)
    return newFarmRows
  }, [[]])

  return (
    <StyledCards>
      <FarmHeader>
        <FarmHeaderH1>
          <FormattedMessage id={'select_a_pool'} />
        </FarmHeaderH1>
        <FarmHeaderP>
          <FormattedMessage id={'select_a_pool__sub'} />
        </FarmHeaderP>
      </FarmHeader>

      {
        !!rows[0].length ?
          rows.map((farmRow, i) => (
            <React.Fragment key={`root-${i}`}>
              {/* 夏 商 周 */}
              {
                is_staking &&
                <>
                  <StyledLongLine>
                    <StyledLongLineText>
                      <FormattedMessage id={'title_shiqian'} />
                    </StyledLongLineText>
                  </StyledLongLine>
                  <StyledRow key={`row-${i}`}>
                    {farmRow.map((farm, j) => rowOneIconName.includes(farm.icon) && (
                      <React.Fragment key={`shiqian-${j}`}>
                        <FarmCard farm={farm} cur_language={cur_language} is_staking={is_staking} />
                      </React.Fragment>
                    ))}
                  </StyledRow>

                  <StyledLongLine>
                    <StyledLongLineText>
                      <FormattedMessage id={'title_qin'} />
                    </StyledLongLineText>
                  </StyledLongLine>
                  <StyledRow key={`row-${i + 1}`}>
                    {farmRow.map((farm, j) => farm.icon === 'qin' && (
                      <React.Fragment key={`qin-${j}`}>
                        <FarmCard farm={farm} cur_language={cur_language} show_images={true} is_staking={is_staking} />
                      </React.Fragment>
                    ))}
                  </StyledRow>

                  <StyledLongLine>
                    <StyledLongLineText>
                      <FormattedMessage id={'title_han'} />
                    </StyledLongLineText>
                  </StyledLongLine>
                  <StyledRow key={`row-${i + 2}`}>
                    {farmRow.map((farm, j) => farm.icon === 'han' && (
                      <React.Fragment key={`han-${j}`}>
                        <FarmCard farm={farm} cur_language={cur_language} show_images={true} is_staking={is_staking} />
                      </React.Fragment>
                    ))}
                  </StyledRow>

                  <StyledLongLine>
                    <StyledLongLineText>
                      <FormattedMessage id={'title_tang'} />
                    </StyledLongLineText>
                  </StyledLongLine>
                  <StyledRow key={`row-${i + 3}`}>
                    {farmRow.map((farm, j) => farm.icon === 'tang' && (
                      <React.Fragment key={`tang-${j}`}>
                        <FarmCard farm={farm} cur_language={cur_language} show_images={true} is_staking={is_staking} />
                      </React.Fragment>
                    ))}
                  </StyledRow>
                </>
              }

              {
                !is_staking &&
                <>
                  <StyledLongLine>
                    <StyledLongLineText>
                      <FormattedMessage id={'zhengcheng'} />
                    </StyledLongLineText>
                  </StyledLongLine>
                  <StyledRow key={`row-${i + 4}`}>
                    {farmRow.map((farm, j) => farm.icon === 'zhengcheng' && (
                      <React.Fragment key={`zhengcheng-${j}`}>
                        <FarmCard farm={farm} cur_language={cur_language} show_images={true} is_staking={is_staking} />
                      </React.Fragment>
                    ))}
                  </StyledRow>
                </>
              }

            </React.Fragment>
          ))
          :
          <StyledLoadingWrapper>
            <Loader text="Loading" />
          </StyledLoadingWrapper>
      }
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: Farm,
  cur_language?: any,
  show_images?: boolean,
  is_staking?: boolean
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, cur_language, show_images, is_staking }) => {
  const [startTime, setStartTime] = useState(0)
  const [nowapy, setNow_apy] = useState('-')
  const { ethereum, chainId, account } = useWallet()
  const str_token = farm.depositToken.replace('-', '_')
  // console.log(farm)

  const get_now_apy = useCallback(async () => {

    if (farm.contract === null || !ethereum) {
      // console.log('farm.contract === null || !ethereum')
      return false;
    }
    const now_apy = await getAPYContract(ethereum, abi, networks, chainId, farm.contract);
    // console.log(ethereum, abi, networks, chainId, farm.contract)
    setNow_apy(now_apy)
  }, [chainId, ethereum, farm.contract])
  get_now_apy();

  const getStartTime = useCallback(async () => {
    const startTime = await getPoolStartTime(farm.contract)
    setStartTime(startTime)
  }, [farm, setStartTime])

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>{paddedHours}:{paddedMinutes}:{paddedSeconds}</span>
    )
  }

  useEffect(() => {
    if (farm && farm.id === 'ycrv_yam_uni_lp') {
      getStartTime()
    }
  }, [farm, getStartTime])

  const poolActive = startTime * 1000 - Date.now() <= 0

  return (
    <StyledCardWrapper>
      {farm.id === 'ycrv_yam_uni_lp' && (
        <StyledCardAccent />
      )}
      <StyledContent>
        {
          !show_images &&
          <CardIcon noBorder={false} cur_language={cur_language}>
            <FormattedMessage id={farm.icon} />
          </CardIcon>
        }
        {
          show_images &&
          <StyledTokens>
            <img src={JSON_IMAGES[str_token]} alt="" />
          </StyledTokens>
        }
        <StyledDetails>
          <StyledDetail>
            <FormattedMessage id={'Deposit'} />
            <StyledA href={farm.href_link} target='_blank'>{farm.depositToken}</StyledA>
          </StyledDetail>
          <StyledDetail><FormattedMessage id={'Earn'} />{farm.earnToken.toUpperCase()}</StyledDetail>
        </StyledDetails>
        <Button
          cur_language={cur_language}
          disabled={!poolActive || farm.contract === null}
          text={poolActive ? 'Select' : undefined}
          to={
            (!poolActive || farm.contract === null) ?
              // eslint-disable-next-line no-script-url
              "javascript:void(0);"
              :
              is_staking ? `/staking/${farm.id}` : `/distribution/${farm.id}`
          }
          widthProps={206}
          heightProps={52}
          imageBg={(!poolActive || farm.contract === null) ? 'Harvest_disabled' : 'Stake'}
        >
          {!poolActive && <Countdown date={new Date(startTime * 1000)} renderer={renderer} />}
        </Button>

        <StyledAPY>
          <FormattedMessage id={'APY'} />
          <span style={{ fontFamily: 'dinFont' }}>
            {
              nowapy && (farm.contract !== null) && account && ethereum ?
                nowapy === '-' ? '-' : (Number(nowapy) / (1e16)).toFixed(2) + '%'
                :
                '-'
            }
          </span>
        </StyledAPY>
      </StyledContent>
    </StyledCardWrapper>
  )
}


const StyledA = styled.a`
  color: #476065 !important;
`

const StyledTokens = styled.div`
  margin-top: 20px;
  margin-bottom: 14px;
`

const StyledLongLine = styled.div`
  margin-top: 50px;
  width: 100%;
  background: url(${long_line_left}) no-repeat 0 10px;
  position: relative;
`
const StyledLongLineText = styled.div`
  display: inline-block;
  margin-left: 40px;
  text-align: center;
  font-size: 30px;
  color: #476065;
  line-height: 33px;
`

const StyledAPY = styled.div`
  height: 22px;
  font-size: 20px;
  font-weight: normal;
  color: rgba(71, 96, 101, 0.8);
  line-height: 22px;
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media(max-width: 767px) {
    margin-top: 0px;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px; right: -2px; bottom: -2px; left: -2px;
  z-index: -1;
  @media(max-width: 767px) {
    top: -2px; right: 22px; bottom: -2px; left: 22px;
  }
`
const FarmHeader = styled.div`
  margin-top:49px;
  text-align:center;
  color:#476065
`
const FarmHeaderH1 = styled.h1`
  font-size:40px;
  line-height:44px;
  margin:0
`
const FarmHeaderP = styled.h1`
  font-size:16px;
  line-height:38px;
  margin:0 0 26px 0
`

const StyledCards = styled.div`
  width: 840px;
  @media(max-width: 767px) {
    width:100%;
    flex-direction: column;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 15px;
  margin-bottom: ${props => props.theme.spacing[4]}px;
  @media(max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((840px - 15px * 2) / 3);
  position: relative;
  @media(max-width: 767px) {
    width:auto;
    padding:0 24px;
  }
`

// const StyledTitle = styled.h4`
//   color: ${props => props.theme.color.grey[600]};
//   font-size: 24px;
//   font-weight: 700;
//   margin: ${props => props.theme.spacing[2]}px 0 0;
//   padding: 0;
// `

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width:270px;
  height:380px;
  padding:48px 32px 32px;
  box-sizing:border-box;
  background:url(${pool_bg});
  background-repeat: no-repeat;
  background-size:100% 104%;
`

const StyledDetails = styled.div`
  margin-bottom: 20px;
  margin-top: ${props => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: #476065;
  font-size:20px;
  line-height:22px;
  margin-bottom:8px;
  a:visited{
    color:#476065
  }
`
// const Styled__btn = styled.div`
//   background: url(${stake_btn});
//   width: 208px;
//   height:54px;
//   background-size: 100% 100%;
//   text-align: center;
//   line-height: 54px;
//   color: #fff;
//   font-size:18px;
//   cursor: pointer;
//   margin-bottom: 32px;
// `
export default FarmCards
