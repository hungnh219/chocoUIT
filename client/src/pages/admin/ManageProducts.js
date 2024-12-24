import React, { useCallback, useEffect, useState } from "react"
import { CustomizeVarriants, InputForm, Pagination } from "components"
import { useForm } from "react-hook-form"
import { apiGetProducts, apiDeleteProduct } from "apis/product"
import moment from "moment"
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom"
import useDebounce from "hooks/useDebounce"
import UpdateProduct from "./UpdateProduct"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { BiEdit, BiCustomize } from "react-icons/bi"
import { RiDeleteBin6Line } from "react-icons/ri"

const ManageProducts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const {
    register,
    formState: { errors },
    watch,
  } = useForm()
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const [editProduct, setEditProduct] = useState(null)
  const [update, setUpdate] = useState(false)
  const [customizeVarriant, setCustomizeVarriant] = useState(null)

  const render = useCallback(() => {
    setUpdate(!update)
  })

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    })
    if (response.success) {
      setCounts(response.counts)
      setProducts(response.products)
    }
  }
  const queryDecounce = useDebounce(watch("q"), 800)
  useEffect(() => {
    if (queryDecounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDecounce }).toString(),
      })
    } else
      navigate({
        pathname: location.pathname,
      })
  }, [queryDecounce])

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    fetchProducts(searchParams)
  }, [params, update])

  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure remove this product",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteProduct(pid)
        if (response.success) toast.success(response.mes)
        else toast.error(response.mes)
        render()
      }
    })
  }

  return (
    <div className="w-[98%] mx-4">
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-gray-100 z-50">
          <UpdateProduct
            editProduct={editProduct}
            render={render}
            setEditProduct={setEditProduct}
          />
        </div>
      )}
      {customizeVarriant && (
        <div className="absolute inset-0 min-h-screen bg-gray-100 z-50">
          <CustomizeVarriants
            customizeVarriant={customizeVarriant}
            render={render}
            setCustomizeVarriant={setCustomizeVarriant}
          />
        </div>
      )}
      <div className="py-4 border-b-2 border-main w-full bg-gray-100">
        <h1 className="text-3xl text-center text-main font-semibold tracking-tight uppercase">Quản lí sản phẩm</h1>
      </div>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Nhập sản phẩm cần tìm..."
          />
        </form>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="border bg-main text-sm text-white border-gray-700">
            <th className="text-center p-2">#</th>
            <th className="text-center p-2">Ảnh</th>
            <th className="text-center p-2">Tên SP</th>
            {/* <th className="text-center p-2">Thương hiệu</th> */}
            <th className="text-center p-2">Loại SP</th>
            <th className="text-center p-2">Giá</th>
            <th className="text-center p-2">SL</th>
            <th className="text-center p-2">Đã bán</th>
            {/* <th className="text-center p-2">Màu sắc</th> */}
            {/* <th className="text-center p-2">Lượt đánh giá</th> */}
            {/* <th className="text-center p-2">Biến thể</th> */}
            <th className="text-center p-2">Ngày cập nhật</th>
            <th className="text-center p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, idx) => (
            <tr className="border border-gray-700 text-sm" key={el._id}>
              <td className="text-center py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  process.env.REACT_APP_LIMIT +
                  idx +
                  1}
              </td>
              <td className="text-center p-2 flex justify-center items-center">
                <img
                  src={el.thumb}
                  alt="thumb"
                  className="w-12 h-10 object-cover"
                />
              </td>
              <td className="text-center py-2">{el.title}</td>
              {/* <td className="text-center py-2">{el.brand}</td> */}
              <td className="text-center py-2">{el.category}</td>
              <td className="text-center py-2">{el.price}</td>
              <td className="text-center py-2">{el.quantity}</td>
              <td className="text-center py-2">{el.sold}</td>
              {/* <td className="text-center py-2">{el.color}</td> */}
              {/* <td className="text-center py-2">{el.totalRatings}</td>
              <td className="text-center py-2">{el?.varriants?.length || 0}</td> */}
              <td className="text-center py-2">
                {moment(el.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="text-center py-2">
                <span
                  onClick={() => setEditProduct(el)}
                  className="text-blue-500 hover:text-orange-500 inline-block hover:underline cursor-pointer px-1"
                >
                  <BiEdit size={20} />
                </span>
                <span
                  onClick={() => handleDeleteProduct(el._id)}
                  className="text-blue-500 hover:text-orange-500 inline-block hover:underline cursor-pointer px-1"
                >
                  <RiDeleteBin6Line size={20} />
                </span>
                <span
                  onClick={() => setCustomizeVarriant(el)}
                  className="text-blue-500 hover:text-orange-500 inline-block hover:underline cursor-pointer px-1"
                >
                  <BiCustomize size={20} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  )
}

export default ManageProducts
