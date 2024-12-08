import * as React from "react";
import Collapse from "@mui/material/Collapse";
import { Rating } from "@mantine/core";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
export default function SimpleCollapse() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div
      className="w-[535px] h-[400px] flex flex-row mx-auto my-10"
      onMouseEnter={handleChange}
      onMouseLeave={handleChange}
    >
      <div>
        <div className="bg-[#6e2d96] w-[400px] h-[400px] rounded-[20px] relative">
          <DoDisturbIcon className="text-red-500" style={{ fontSize: 40 }} />
          <div className="flex flex-row justify-between mx-10 mt-12 text-[20px]">
            <div>February 2nd, 2026</div>
            <Rating defaultValue={4} />
          </div>
          <line className="flex w-[350px] h-[10px] mt-[30px] mx-auto bg-[#c7b133]" />
          <line className="absolute w-[10px] h-[190px] bg-[#c7b133] bottom-[0px] left-[75px]" />
          <line className="absolute w-[45px] h-[242px] bg-white bottom-[0px] right-[30px]" />
          <line className="absolute w-[10px] h-[190px] bg-[#c7b133] bottom-[0px] right-[75px] " />
          <line className="absolute w-[10px] h-[252px] bg-[#c7b133] bottom-[0px] left-[20px]" />
          <line className="absolute w-[45px] h-[242px] bg-white bottom-[0px] left-[30px]" />
          <line className="absolute w-[10px] h-[252px] bg-[#c7b133] bottom-[0px] right-[20px] " />
          <div className="flex w-[250px] h-[50px] mx-auto bg-white text-black text-center text-[27px] font-semibold items-center justify-center">
            Regular Activity
          </div>
          <line className="flex w-[250px] h-[10px] mx-auto bg-[#c7b133]" />
          <div className="flex w-[200px] h-[50px] mt-[10px] mx-auto bg-[#6e2d96] text-white text-center text-[20px] font-medium items-center justify-center">
            Regular Category
          </div>
          <button className="flex w-[118px] mt-[30px] h-[40px] mx-auto bg-[#cfaafe] rounded-[7px] text-black text-center text-[20px] font-medium items-center justify-center">
            View Map
          </button>
        </div>

        <Collapse orientation="vertical" in={checked} collapsedSize={0}>
          <div className="bg-[#9783ad] mx-auto w-[350px] h-[50px] rounded-b-[13px] flex itmes-center justify-center overflow-auto text-[30px]">
            EGP 1000
          </div>
        </Collapse>
      </div>
      <Collapse
        className="flex my-auto"
        orientation="horizontal"
        in={checked}
        collapsedSize={0}
      >
        <div className="bg-[#9783ad] w-[130px] h-[350px] rounded-r-[13px] gap-[15px] flex flex-col itmes-center justify-center overflow-auto">
          <div className="w-[100px] h-[24px] bg-[#ececec] rounded-[9px] mx-auto text-black text-center text-[16px] font-medium items-center justify-center">
            New Tag
          </div>
          <div className="w-[100px] h-[24px] bg-[#ececec] rounded-[9px] mx-auto text-black text-center text-[16px] font-medium items-center justify-center">
            New Tag
          </div>
          <div className="w-[100px] h-[24px] bg-[#ececec] rounded-[9px] mx-auto text-black text-center text-[16px] font-medium items-center justify-center">
            New Tag
          </div>
          <div className="w-[100px] h-[24px] bg-[#ececec] rounded-[9px] mx-auto text-black text-center text-[16px] font-medium items-center justify-center">
            New Tag
          </div>
          <div className="w-[100px] h-[24px] bg-[#ececec] rounded-[9px] mx-auto text-black text-center text-[16px] font-medium items-center justify-center">
            New Tag
          </div>
          <div className="w-[100px] h-[24px] bg-[#ececec] rounded-[9px] mx-auto text-black text-center text-[16px] font-medium items-center justify-center">
            New Tag
          </div>
          <div className="w-[100px] h-[24px] bg-[#ececec] rounded-[9px] mx-auto text-black text-center text-[16px] font-medium items-center justify-center">
            New Tag
          </div>
          <div className="w-[100px] h-[24px] bg-[#ececec] rounded-[9px] mx-auto text-black text-center text-[16px] font-medium items-center justify-center">
            New Tag
          </div>
          <div className="w-[100px] h-[24px] bg-[#ececec] rounded-[9px] mx-auto text-black text-center text-[16px] font-medium items-center justify-center">
            New Tag
          </div>
        </div>
      </Collapse>
    </div>
  );
}
