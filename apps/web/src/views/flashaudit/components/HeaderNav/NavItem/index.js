import Image from "next/image";

import View from "@/assets/icons/view.svg";
import Active_View from "@/assets/icons/active-view.svg";
import ExportedImage from "next-image-export-optimizer";

const HeaderNavItem = ({
  icon = View,
  active_icon = Active_View,
  text = "Quick View",
  active = false,
  onClick = "",
  index = 1,
}) => {
  return (
    <div className="relative cursor-pointer" onClick={() => onClick(index)}>
      <div className="flex gap-3 items-center justify-center px-2">
        <ExportedImage src={active ? active_icon : icon} alt="Image" />
        <p
        >
          {text}
        </p>
      </div>
      {active && (
        <div className="absolute -bottom-5 h-[4px] w-[100%] bg-[#C03F4A] rounded-t-2xl"></div>
      )}
    </div>
  );
};

export default HeaderNavItem;
