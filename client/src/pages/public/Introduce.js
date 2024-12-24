import React from "react";
import { LichSuHinhThanh, ThanhVienSangLap } from "components";

const Introduce = () => {
  return (
    <div className="w-full">
      <div className="w-full mb-4">
        <img 
            // src="https://t4.ftcdn.net/jpg/02/27/88/83/240_F_227888305_Ji8fPeditvKC5VAcyYSGZ4SYxOIA2FJC.jpg"
            src="https://file.hstatic.net/200000947235/file/sp-750-250.jpg"
            alt="bg-introduce"
            className="w-full object-cover"
        />
      </div>
      <div className="w-full">
        <LichSuHinhThanh />
        {/* <ThanhVienSangLap /> */}
      </div>
    </div>
  );
};

export default Introduce;
