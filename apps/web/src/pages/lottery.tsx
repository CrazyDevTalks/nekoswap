import Lottery from '../views/Lottery'
import { SUPPORT_FARMS } from 'config/constants/supportChains'

const LotteryPage = () => <Lottery />

LotteryPage.chains = SUPPORT_FARMS
export default LotteryPage
