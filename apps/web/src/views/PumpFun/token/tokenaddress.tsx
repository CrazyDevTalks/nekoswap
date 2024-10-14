import { useRouter } from 'next/router';
import PumpFun from '../index';

const TokenDetailPage: React.FC = () => {
  const router = useRouter();
  const { tokenAddress } = router.query;

  return <PumpFun initialView="detail" initialTokenAddress={tokenAddress as string} />;
};

export default TokenDetailPage;