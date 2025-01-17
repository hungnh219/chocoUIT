import React from "react";
import {
  Sidebar,
  Banner,
  BestSeller,
  DealDaily,
  FeatureProducts,
  CustomSlider,
  About,
} from "../../components";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
import withBaseComponent from "hocs/withBaseComponent";
import { createSearchParams } from "react-router-dom";

const { IoIosArrowForward } = icons;
const Home = ({ navigate }) => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);
  const { isLoggedIn, current } = useSelector((state) => state.user);

  return (
    <div className="w-full ">
      <div className="w-main m-auto mt-6">
        {/* <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div> */}
        <div className="flex flex-col gap-5 w-full flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <About />
      </div>
      <div className="my-8 w-main m-auto">
        <FeatureProducts />
      </div>
      <div className="my-8 w-main m-auto">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          SẢN PHẨM MỚI
        </h3>
        <div className="mt-4 mx-[-10px]">
          <CustomSlider products={newProducts} />
        </div>
      </div>
      <div className="my-8 w-main m-auto">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          BỘ SƯU TẬP
        </h3>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {categories
            ?.filter((el) => el.brand.length > 0)
            ?.map((el) => (
              <div key={el._id} className="w-[48%]">
                <div className="border rounded shadow-lg flex p-4 gap-4 min-h-[190px]">
                  <img
                    src={el?.image}
                    alt=""
                    className="w-[144px] flex-1 h-[129px] object-cover rounded border"
                  />
                  <div className="flex-1 text-gray-700">
                    <h4 className="font-semibold uppercase">{el.title}</h4>
                    <ul className="text-sm">
                      {el?.brand?.map((item) => (
                        <span
                          key={item}
                          className="flex cursor-pointer hover:underline gap-1 items-center text-gray-500"
                          onClick={() =>
                            navigate({
                              pathname: `/${el.title.toLowerCase()}`,
                              search: createSearchParams({
                                brand: item,
                              }).toString(),
                            })
                          }
                        >
                          <IoIosArrowForward size={14} />
                          <li>{item}</li>
                        </span>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* <div className="my-8 w-main m-auto">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          BLOG POSTS
        </h3>
      </div> */}
    </div>
  );
};

export default withBaseComponent(Home);
