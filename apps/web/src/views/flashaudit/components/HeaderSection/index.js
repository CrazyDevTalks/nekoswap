import IconBtn from "../Button/IconBtn";

//! import icons
import Floki from "@/assets/icons/floki.svg";
import Hot from "@/assets/icons/hot.svg";
import Elfin from "@/assets/icons/elfin.svg";
import NRG from "@/assets/icons/nrg.svg";
import Bonex from "@/assets/icons/bonex.svg";
import Rdrs from "@/assets/icons/rdrs.svg";
import Bob from "@/assets/icons/bob.svg";
import Pappapepe from "@/assets/icons/pappapepe.svg";
import DexTools from "@/assets/icons/dextools.svg";

import Icon_1 from "@/assets/icons/1.svg";
import Icon_2 from "@/assets/icons/2.svg";
import Icon_3 from "@/assets/icons/3.svg";
import Icon_4 from "@/assets/icons/4.svg";
import Icon_5 from "@/assets/icons/5.svg";
import Icon_6 from "@/assets/icons/6.svg";
import Icon_7 from "@/assets/icons/7.svg";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import ExportedImage from "next-image-export-optimizer";

const HeaderSection = () => {
  return (
    <div className="gap-x-[22px] flex pb-8 max-lg:pt-7 max-sm:pl-0 pr-[16px] sm:pr-[0px]">
      <div
        className="flex flex-row gap-x-[22px] items-center"
        style={{ maxWidth: "100%" }}
      >
        {/* <div className="mr-8"> */}
        <IconBtn
          icon={Floki}
          // className="max-sm:hidden max-md:hidden"
          disable="false"
          text="FLOKI"
          BgClass="bg-[#C03F4A]"
          py="py-[12px]"
          TxSize="text-[16px]"
          TxClass="text-[#000]"
        />
        {/* <IconBtn
          icon={Floki}
          className="hidden max-lg:hidden max-xl:hidden max-2xl:hidden max-sm:block max-md:block"
          disable="false"
          text=""
          BgClass="bg-[#C03F4A]"
          px="px-[10px]"
          py="py-[5px]"
          TxSize="text-[16px]"
          TxClass="text-[#000]"
        /> */}
        {/* </div> */}
        <div className="w-[calc(100%-288px)] max-sm:w-[calc(100%-140px)] max-sm:w-[calc(100%-140px)] max-lg:w-[calc(100%-288px)] flex flex-row gap-x-[10px] px-3 py-2 rounded-full bg-[#1B1B1B]">
          <div className="flex flex-row justify-center items-center gap-3">
            <ExportedImage src={Hot} alt="hot" />
            <p className="text-[16px] text-[#fff] font-semibold hidden md:block lg:block">
              HOT
            </p>
          </div>
          <Marquee>
            <IconBtn
              // icon={Icon_1}
              // disable="false"
              // rightIcon={Elfin}
              text="ddddddd"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_2}
              // rightIcon={NRG}
              text="Wagmi"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_3}
              // rightIcon={Bonex}
              text="kkkkkkk"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_4}
              // rightIcon={Rdrs}
              text="TEST"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_5}
              // rightIcon={Bob}
              text="ERC-8811"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_6}
              // rightIcon={Bob}
              text="CAKKIND"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_7}
              // rightIcon={Pappapepe}
              text="UIDOS"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_1}
              // rightIcon={Elfin}
              text="TIKSOD"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_2}
              // rightIcon={NRG}
              text="CSD"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_3}
              // rightIcon={Bonex}
              text="COSMOS"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_4}
              // rightIcon={Rdrs}
              text="KAKA"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_5}
              // rightIcon={Bob}
              text="BISAU"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_6}
              // rightIcon={Bob}
              text="BOB"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            <IconBtn
              // icon={Icon_7}
              // rightIcon={Pappapepe}
              text="Wagmi-20"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            />
            {/* <IconBtn
              // icon={Icon_7}
              // rightIcon={Pappapepe}
              text="Wagmi-30"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            /> */}
            {/* <IconBtn
              // icon={Icon_7}
              // rightIcon={Pappapepe}
              text="Wagmi-40"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            /> */}
            {/* <IconBtn
              // icon={Icon_7}
              // rightIcon={Pappapepe}
              text="Wagmi-50"
              BgClass="bg-transparent"
              borderColor="border-transparent"
              py="py-[12px]"
              TxSize="text-[14px]"
            /> */}
          </Marquee>
        </div>
        {/* <IconBtn
          icon={DexTools}
          // className="max-sm:hidden max-md:hidden"
          disable="false"
          text="DEXTools"
          BgClass="bg-[#0A505F]"
          py="py-[12px]"
          TxSize="text-[14px]"
        /> */}
        {/* <IconBtn
          icon={DexTools}
          className="hidden max-sm:block max-md:block"
          text=""
          BgClass="bg-[#0A505F]"
          px="px-[10px]"
          py="py-[5px]"
          TxSize="text-[16px]"
          TxClass="text-[#000]"
        /> */}
      </div>
    </div>
  );
};

export default HeaderSection;
