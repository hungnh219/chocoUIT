import { apiAddVarriant } from "apis";
import Button from "components/buttons/Button";
import Loading from "components/common/Loading";
import InputForm from "components/inputs/InputForm";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { getBase64 } from "ultils/helpers";

const CustomizeVarriants = ({
  customizeVarriant,
  setCustomizeVarriant,
  render,
}) => {
  const [preview, setPreview] = useState({
    thumb: "",
    images: "",
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  useEffect(() => {
    reset({
      title: customizeVarriant?.title,
      color: customizeVarriant?.color,
      price: customizeVarriant?.price,
    });
  }, [customizeVarriant]);
  const handleAddVarriant = async (data) => {
    if (data.color === customizeVarriant.color)
      Swal.fire("Oops!", "Color not changed", "info");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVarriant(formData, customizeVarriant._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.mes);
        reset();
        setPreview({ thumb: "", images: [] });
      } else toast.error(response.mes);
    }
  };
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File not supported!");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);
  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);
  return (
    <div className="w-full relative">
      <div className="flex justify-center items-center py-4 border-b-2 mx-4 border-main bg-gray-100">
        <h1 className="text-3xl text-main font-semibold uppercase">
          Tùy chỉnh biến thể của sản phẩm
        </h1>
      </div>
      <span
        className="absolute top-5 right-4 text-white bg-main px-3 py-1 rounded hover:bg-yellow-400 hover:-translate-y-1 hover:scale-105 cursor-pointer"
        onClick={() => setCustomizeVarriant(null)}
      >
        Back
      </span>
      <form
        onSubmit={handleSubmit(handleAddVarriant)}
        className="p-4 w-full flex flex-col gap-4"
      >
        <div className="flex gap-4 items-center w-full">
          <InputForm
            label="Tên sản phẩm"
            register={register}
            errors={errors}
            id="title"
            fullWidth
            style="flex-auto"
            validate={{
              required: "Need fill this field",
            }}
            placeholder="Title of varriant"
          />
        </div>
        <div className="flex gap-4 items-center w-full">
          <InputForm
            label="Giá biến thể"
            register={register}
            errors={errors}
            id="price"
            validate={{
              required: "Need fill this field",
            }}
            fullWidth
            placeholder="Price of new varriant"
            type="number"
            style="flex-auto"
          />
          <InputForm
            label="Màu sắc của biến thể"
            register={register}
            errors={errors}
            id="color"
            validate={{
              required: "Need fill this field",
            }}
            fullWidth
            placeholder="Color of new varriant"
            style="flex-auto"
          />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <label className="font-semibold" htmlFor="thumb">
            Tải ảnh đại diện
          </label>
          <input
            type="file"
            id="thumb"
            {...register("thumb", { required: "Need fill" })}
          />
          {errors["thumb"] && (
            <small className="text-xs text-red-500">
              {errors["thumb"]?.message}
            </small>
          )}
        </div>
        {preview.thumb && (
          <div className="my-4">
            <img
              src={preview.thumb}
              alt="thumbnail"
              className="w-[200px] object-contain"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 mt-8">
          <label className="font-semibold" htmlFor="products">
            Tải lên danh sách ảnh của sản phẩm
          </label>
          <input
            type="file"
            id="products"
            multiple
            {...register("images", { required: "Need fill" })}
          />
          {errors["images"] && (
            <small className="text-xs text-red-500">
              {errors["images"]?.message}
            </small>
          )}
        </div>
        {preview.images.length > 0 && (
          <div className="my-4 flex w-full gap-3 flex-wrap">
            {preview.images?.map((el, idx) => (
              <div key={idx} className="w-fit relative">
                <img
                  src={el}
                  alt="product"
                  className="w-[200px] object-contain"
                />
              </div>
            ))}
          </div>
        )}
        <div className="my-6">
          <Button type="submit">Add varriant</Button>
        </div>
      </form>
    </div>
  );
};

export default memo(CustomizeVarriants);
