import React, { useState } from 'react'
import styled from 'styled-components'

import Footer from '../Footer'
import TopBar from '../TopBar'
import AccountButton from '../TopBar/components/AccountButton'
import img__sun from '../../assets/img/Page/left-bg.svg'
import img__ship from '../../assets/img/Page/left-bottom-bg.svg'
import img__logo from '../../assets/img/Page/logo-bg.svg'
// import img__bg from '../../assets/img/Page/bg-repeat.svg'
// import LOGO from '../../assets/img/Page/LOGO.png'
import m_LOGO from '../../assets/img/Page/m-logo1.svg'
import m_LOGO2 from '../../assets/img/Page/m_logo2.svg'
import m_close from '../../assets/img/Page/m_close.svg'
import m_sidebar from '../../assets/img/Page/m_sidebar.svg'
// import { IntlProvider, FormattedMessage } from 'react-intl'

interface PageProps {
  setLanguage?: any
  cur_language?: any
}

const Page: React.FC<PageProps> = ({ children, setLanguage, cur_language }) => {
  const [show, setShow] = useState(false)
  // useEffect(() => {
  //   if(show !== undefined){
  //     setShow(show)
  //   }
  // }, [show,setShow])
  return (
    <PageWrap>
      <StyledPage>
        <StyledImg1 src={img__sun} />
        <StyledImg2 src={img__ship} />
        <StyledImg3 src={img__logo} />

        <BodyWrap>
          <MTopBar style={{ backgroundColor: !show ? '' : '#476065' }}>
            <MTopLeft src={show ? m_LOGO : m_LOGO2} alt="logo"></MTopLeft>
            {/* <M_text>Staking</M_text> */}
            <AccountButton cur_language={cur_language} showStatus={show} />
            <MTopRight src={!show ? m_sidebar : m_close} onClick={() => setShow(!show)}></MTopRight>
          </MTopBar>
          <BodyLeft style={{ display: show ? 'none' : 'block' }}>
            <StyledMain>
              {children}
            </StyledMain>
            <Footer cur_language={cur_language} />
          </BodyLeft>
          {/* <div onClick={() => { setLanguage('English') }}>
          <FormattedMessage id={'goldx_detail'} />
        </div> */}
          <TopBar setLanguage={setLanguage} cur_language={cur_language} showStatus={show} setShow={setShow} />

        </BodyWrap>
      </StyledPage>
    </PageWrap>
  )
}
const MTopBar = styled.div`
display:none;
@media(max-width: 767px) {
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding:0 14px 0 16px;
  padding-top: 30px;
  padding-bottom: 30px;
}
`
const MTopLeft = styled.img`
width:60px;
height:20px
`
// const M_text = styled.p`
// font-size:16px;
// font-weight:bold;
// line-height:19px;
// color:#476065;
// margin:0 15px 0 auto
// `
const MTopRight = styled.img`
width:26px;
height:26px
`
const StyledImg3 = styled.img`
position: absolute;
bottom: 212px;
right:286px;
width: 268px;
height: 263px;
@media(max-width: 767px) {
  display:none
}
`
const StyledImg2 = styled.img`
position: absolute;
bottom: 83px;
left:122px;
width: 59px;
height: 28px;
@media(max-width: 767px) {
  display:none
}
`
const StyledImg1 = styled.img`
position: absolute;
left: 10px;
top:10px;
width: 330px;
height: 289px;
@media(max-width: 767px) {
  display:none
}
`

const PageWrap = styled.div`
width:100%;
position: relative;
min-height: 100vh;
overflow-x:hidden
`

const BodyWrap = styled.div`
width:1080px;
margin: 0 auto;
display: flex;
min-height: 100vh;
@media(max-width: 767px) {
  width:100%;
  flex-direction: column;
}
`
const BodyLeft = styled.div`
flex:1;
margin-right:30px;
position: relative;
@media(max-width: 767px) {
  margin-right:0
}
`
interface StyledPageProps {
  govOverflow?: boolean
}

const StyledPage = styled.div<StyledPageProps>`
width: 1920px;
height: 100%;
position: absolute;
left: 50%;
transform: translateX(-50%);
@media(max-width: 767px) {
  width:100%
}
`

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${props => props.theme.topBarSize * 2}px);
`

export default Page