import { Button, Product } from "components"
import React from "react"
import { useSelector } from "react-redux"

const Wishlist = () => {
  const { current } = useSelector((s) => s.user)
  return (
    <div className="w-full relative px-4">
      <header className="text-3xl text-center text-main font-semibold py-4 border-b-2 border-main uppercase">
        Danh sách yêu thích
      </header>
      <div className="p-4 w-full grid grid-cols-2 xl:grid-cols-3  gap-4">
        {current?.wishlist?.map((el) => (
          <div
            className="bg-white rounded-md w-[300px] drop-shadow flex flex-col py-3 gap-3"
            key={el._id}
          >
            <Product pid={el._id} className="bg-white" productData={el} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
