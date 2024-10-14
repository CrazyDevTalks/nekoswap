import { ethers } from 'ethers';
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { useRouter } from 'next/router';
import standardTokenAbi from "../../../abis/standardTokenAbi";
import LiquidityGeneratorTokenFactoryAbi from "../../../abis/LiquidityGeneratorTokenFactoryAbi";
import BabyTokenFactoryAbi from "../../../abis/BabyTokenFactoryAbi";
import BuybackBabyTokenFactoryAbi from "../../../abis/BuybackBabyTokenFactoryAbi";
import PresaleAbi from "../../../abis/PresaleAbi";
import FairlaunchAbi from "../../../abis/FairlaunchAbi";

const useContractWriteHook = (
  address: string,
  currentToken: string,
  messageApi: any
) => {
  const router = useRouter();

  const abi =
    currentToken === "1"
      ? standardTokenAbi
      : currentToken === "2"
      ? LiquidityGeneratorTokenFactoryAbi
      : currentToken === "3"
      ? BabyTokenFactoryAbi
      : currentToken === "4"
      ? BuybackBabyTokenFactoryAbi
      : currentToken === "presale"
      ? PresaleAbi
      : FairlaunchAbi;

  // useContractWrite hook
  const { data, writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared', // Specify mode
    address: address as `0x${string}`,
    abi,
    functionName: 'create',
    args: [], // Add arguments here if any
    overrides: {
      value: ethers.utils.parseEther("0.01"), // THIS IS THE FEE TO CREATE TOKEN
    },
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleWrite = async (args: any[], formData: any = {}) => {
    const key = "updatable";
    messageApi.open({
      key,
      type: "loading",
      content: "Processing transaction...",
    });

    try {
      if (!writeAsync) {
        throw new Error("Write function is not available");
      }

      await writeAsync({ recklesslySetUnpreparedArgs: args }); // Update this to use recklesslySetUnpreparedArgs

      if (isSuccess) {
        const formDataWithHash = { ...formData, hash: data?.hash };

        if (currentToken === "presale" || currentToken === "fairlaunch") {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/launchpad/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formDataWithHash),
          });
          router.push("/launch/launchpad");
        } else if (["1", "2", "3", "4"].includes(currentToken)) {
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/token/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formDataWithHash),
          });
          router.push("/launch/create-token");
        }

        messageApi.open({
          key,
          type: "success",
          content: "Token Created Successfully",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      let errorMessage = "Transaction failed. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      messageApi.open({
        key,
        type: "error",
        content: errorMessage,
      });
    }
  };

  return { handleWrite, isLoading, isSuccess };
};

export default useContractWriteHook;