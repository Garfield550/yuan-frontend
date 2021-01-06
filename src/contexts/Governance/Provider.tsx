import React, { useCallback, useEffect, useState } from 'react'

// import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import useYam from '../../hooks/useYam'
import {
  getProposals,
  vote,
  didDelegate,
  getVotingPowers,
  getCurrentVotingPower,
  delegate
} from '../../yam-sdk/utils'

import Context from './Context'

import { Proposal, ProposalVotingPower } from "./types"

const Provider: React.FC = ({ children }) => {
  const { account } = useWallet()
  const yam = useYam()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [proposals, setProposals] = useState<Proposal[]>()
  const [votingPowers, setVotingPowers] = useState<ProposalVotingPower[]>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPower, setCurrentPower] = useState<number>()

  const fetchProposals = useCallback(async () => {
    if (!yam) return;
    let props: Proposal[] = await getProposals(yam);

    props = props.sort((a, b) => {
      if (a && b && a.end && b.end) {
        if (a.end === b.end) {
          return 0
        }
        if (a.end < b.end) {
          return 1
        } else {
          return -1
        }
      } else {
        return 0
      }
    });

    setProposals(props);
    let votingPowers: ProposalVotingPower[] = await getVotingPowers(yam, props, account);
    
    setVotingPowers(votingPowers);
  }, [account, yam])

  const fetchCurrentPower = useCallback(async () => {
    if (!yam) return;
    let votingPower: number = await getCurrentVotingPower(yam, account);
    setCurrentPower(votingPower);
  }, [account, yam])

  const handleVote = useCallback(async (proposal: number, side: boolean, onDismiss) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await vote(yam, proposal, side, account, onDismiss, () => {
      setConfirmTxModalIsOpen(false)
      setIsVoting(true)
    })
    fetchProposals()
    setIsVoting(false)
  }, [account, fetchProposals, yam])

  const [isRegistered, setIsRegistered] = useState<boolean>()
  const [isRegistering, setIsRegistering] = useState<boolean>()
  const fetchIsRegistered = useCallback(async () => {
    if (!account || !yam) return
    const registered = await didDelegate(yam, account)
    setIsRegistered(registered)
  }, [
    account,
    setIsRegistered,
    yam
  ])

  useEffect(() => {
    fetchIsRegistered()
  }, [
    account,
    fetchIsRegistered,
    yam
  ])



  const handleRegisterClick = useCallback(async () => {
    if (!account || !yam) return
    await delegate(yam, account, (txHash: string) => setIsRegistering(true))
    setIsRegistering(false)
  }, [
    account,
    setIsRegistering,
    yam
  ])

  useEffect(() => {
    if (yam) {
      fetchProposals()
      fetchCurrentPower()
    }
  }, [
    fetchProposals,
    fetchCurrentPower,
    yam,
  ])

  useEffect(() => {
    if (yam) {
      fetchProposals()
      let refreshInterval = setInterval(fetchProposals, 100000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    yam,
    fetchProposals,
  ])

  return (
    <Context.Provider value={{
      proposals,
      votingPowers,
      isRegistered,
      isRegistering,
      isVoting,
      onRegister: handleRegisterClick,
      onVote: handleVote,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
