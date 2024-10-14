import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
/*
const userNotUsCitizenAcknowledgementAtom = atomWithStorage<boolean>('pcs:NotUsCitizenAcknowledgement', false)

export function useUserNotUsCitizenAcknowledgement() {
  return useAtom(userNotUsCitizenAcknowledgementAtom)
}
*/
export enum IdType {
  IFO = 'ifo',
  PERPETUALS = 'perpetuals',
  AFFILIATE_PROGRAM = 'affiliate-program',
  OPTIONS = 'options',
}

const perpetuals = atomWithStorage('pcs:NotUsCitizenAcknowledgement-perpetuals', false)
const ifo = atomWithStorage<boolean>('pcs:NotUsCitizenAcknowledgement-ifo', false)
const affiliateProgram = atomWithStorage<boolean>('pcs:NotUsCitizenAcknowledgement-affiliate-program', false)
const options = atomWithStorage<boolean>('pcs:NotUsCitizenAcknowledgement-options', false)

export function useUserNotUsCitizenAcknowledgement(id: IdType) {
  const [ifoValue, setIfoValue] = useAtom(ifo)
  const [affiliateProgramValue, setAffiliateProgramValue] = useAtom(affiliateProgram)
  const [perpetualsValue, setPerpetualsValue] = useAtom(perpetuals)
  const [optionsValue, setOptionsValue] = useAtom(options)

  const getValue = () => {
    switch (id) {
      case IdType.IFO:
        return ifoValue
      case IdType.AFFILIATE_PROGRAM:
        return affiliateProgramValue
      case IdType.PERPETUALS:
        return perpetualsValue
      case IdType.OPTIONS:
        return optionsValue
      default:
        return perpetualsValue
    }
  }

  const setValue = (newValue: boolean) => {
    switch (id) {
      case IdType.IFO:
        setIfoValue(newValue)
        break
      case IdType.AFFILIATE_PROGRAM:
        setAffiliateProgramValue(newValue)
        break
      case IdType.PERPETUALS:
        setPerpetualsValue(newValue)
        break
      case IdType.OPTIONS:
        setOptionsValue(newValue)
        break
      default:
        setPerpetualsValue(newValue)
    }
  }

  return [getValue(), setValue] as const
}