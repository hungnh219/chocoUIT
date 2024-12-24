import withBaseComponent from "hocs/withBaseComponent"
import React, { memo } from "react"
import { renderStarFromNumber, formatMoney } from "ultils/helpers"
import path from "ultils/path"

const ProductCard = ({
  price,
  totalRatings,
  title,
  image,
  pid,
  navigate,
  category,
}) => {
  return (
    <div
      onClick={(e) => navigate(`/${category?.toLowerCase()}/${pid}/${title}`)}
      className="w-1/3 flex-auto cursor-pointer px-[10px] mb-[20px]"
    >
      <div className="flex w-full border rounded shadow">
        <img
          src={image}
          alt="products"
          className="w-[120px] h-[120px] object-cover p-4 rounded"
        />
        <div className="mt-[15px] items-start w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm font-semibold text-gray-600">
            {title?.toLowerCase()}
          </span>
          <span className="text-gray-600">{`${formatMoney(price)} VNĐ`}</span>
          <span className="flex h-4">
            {renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default withBaseComponent(memo(ProductCard))
