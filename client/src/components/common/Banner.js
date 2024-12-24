import React, { memo } from "react";
import imgs from "assets/Banner";
import { useState, useEffect } from "react";
import "./banner.css";
import icons from "ultils/icons";

const { FaCircle } = icons;

const Banner = () => {
  const [index, setIndex] = useState(0);
  const imgLength = imgs.length;
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((index + 1) % imgLength);
    }, 3000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className="w-full h-[568px] relative overflow-hidden flex justify-center">
      {imgs.map((img, imgIndex) => {
        let position = "nextSlide";
        if (index === imgIndex) position = "activeSlide";
        return (
          <div>
            <img
              key={imgIndex}
              src={img}
              alt="Banner"
              className={`${position} absolute top-0 left-0 w-full object-cove shadow transition-all duration-300 ease-linear`}
            />
            <div className="absolute w-full bottom-6 right-0 flex justify-center gap-x-6">
              {imgs.map((img, imgIndex) => {
                return (
                  <div
                    onClick={() => {
                      setIndex(imgIndex);
                    }}
                    key={imgIndex}
                    className="rounded-full text-white opacity-70"
                  >
                    <FaCircle className={index === imgIndex && "text-main"} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Banner);
