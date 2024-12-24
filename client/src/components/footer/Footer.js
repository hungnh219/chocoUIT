import React, { memo } from "react";
import icons from "ultils/icons";
import logoFooter from "assets/chocouit-removed-background.png";
import { Link } from "react-router-dom";
import { navigation } from "ultils/contants";
import path from "ultils/path";

const {
  MdEmail,
  MdLocationOn,
  RiPhoneFill,
  FaFacebookSquare,
  FaInstagram,
  TbBrandShopee,
  SiGrab,
} = icons;
const Footer = () => {
  return (
    <div className="w-full ">
      {/* <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-xl font-medium">ĐĂNG KÍ BẢN TIN</span>
            <small className="text-sm">
              Nhanh tay đăng kí để nhận bản tin hàng tuần!
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-4 pr-0 rounded-l-full w-full outline-none text-gray-100 placeholder:text-base placeholder:text-gray-500 placeholder:italic placeholder:opacity-50"
              type="text"
              placeholder="Điền email đăng kí (bắt buộc)"
            />
            <div className="h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div> */}
      <div className="h-[407px] w-full bg-main flex items-center justify-center text-white text-[13px]">
        <div className="w-full flex justify-around items-start">
          <div className="relative flex flex-col gap-2 mt-[-18px]">
            <img src={logoFooter} alt="logo-footer" className="w-52" />
              {/* <p className="absolute top-[42px] right-[-98px] font-bold tracking-[1px]">Tiệm bánh uy tín đến từ UIT</p> */}
            <div className="px-3  text-base flex flex-col gap-y-3 mt-2">
              {/* <h4 className="text-sm font-semibold">Thời gian hoạt động</h4>
              <p>Thứ 2 - Thứ 7</p>
              <p>7:30SA - 11:30CH</p> */}
            </div>
          </div>
          <div className="">
            <h3 className="mb-[20px] text-2xl font-bold">HỖ TRỢ</h3>
            <div className="flex flex-col gap-y-3  text-base mt-2">
              <Link to={`${path.INTRODUCE}`}>Giới thiệu</Link>
              {/* <Link>Chính sách đổi trả</Link> */}
              <Link>Điều khoản dịch vụ</Link>
              <Link to={`${path.CONTACT}`}>Liên hệ</Link>
            </div>
          </div>
          <div className="">
            <div className="flex gap-x-4 items-start mb-6">
              <FaFacebookSquare size={24} className="rounded border-2" />
              <FaInstagram
                size={24}
                className="bg-white text-main rounded"
              />
              <TbBrandShopee
                size={24}
                className="bg-white text-main rounded"
              />
              <SiGrab size={24} className="bg-white text-main rounded" />
            </div>
            <div className="flex flex-col gap-y-2 text-base mt-2">
              <div className="flex items-center gap-x-2">
                <MdLocationOn size={24} />
                <span>
                  QL1A/1B 20, Khu Phố 6, Thủ Đức, Thành phố Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <RiPhoneFill size={24} />
                <span>0706770436</span>
              </div>
              <div className="flex items-center gap-x-2">
                <MdEmail size={24} />
                <span>chocouit@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
