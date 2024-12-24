import React, { useCallback, useState, useEffect } from 'react'
import { InputForm, Select, Button, MarkdownEditor, Loading } from 'components'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { validate, getBase64 } from 'ultils/helpers'
import { toast } from 'react-toastify'
import { apiCreateProduct } from 'apis'
import { showModal } from 'store/app/appSlice'


const CreateProducts = () => {
    const { categories } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()

    const [payload, setPayload] = useState({
        description: ''
    })
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [invalidFields, setInvalidFields] = useState([])
    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])
    const [hoverElm, setHoverElm] = useState(null)
    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: base64Thumb }))
    }
    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('File not supported!')
                return
            }
            const base64 = await getBase64(file)
            imagesPreview.push({ name: file.name, path: base64 })
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))

    }
    useEffect(() => {
        handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        handlePreviewImages(watch('images'))
    }, [watch('images')])

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            if (data.category) data.category = categories?.find(el => el._id === data.category)?.title
            const finalPayload = { ...data, ...payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
            if (finalPayload.images) {
                for (let image of finalPayload.images) formData.append('images', image)
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiCreateProduct(formData)
            console.log(formData)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (response.success) {
                toast.success(response.mes)
                reset()
                setPayload({
                    thumb: '',
                    image: []
                })
            } else toast.error(response.mes + "hehe")
        }
    }
    return (
        <div className='w-[98%] mx-2'>
            <h1 className='py-4 text-center text-main text-3xl font-semibold px-4 border-b-2 border-main uppercase'>
                <span>tạo sản phẩm</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <InputForm
                        label='Tên sản phẩm'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{
                            required: 'Need fill this field'
                        }}
                        fullWidth
                        placeholder='Nhập tên sản phẩm cần tạo'
                    />
                    <div className='w-full my-6 flex gap-4'>
                        <InputForm
                            label='Giá'
                            register={register}
                            errors={errors}
                            id='price'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style='flex-auto'
                            placeholder='Nhập giá sản phẩm cần tạo'
                            type='number'
                        />
                        <InputForm
                            label='Số lượng'
                            register={register}
                            errors={errors}
                            id='quantity'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style='flex-auto'
                            placeholder='Nhập số lượng của sản phẩm'
                            type='number'
                        />
                        <InputForm
                            label='Màu sắc'
                            register={register}
                            errors={errors}
                            id='color'
                            validate={{
                                required: 'Need fill this field'
                            }}
                            style='flex-auto'
                            placeholder='Nhập màu của sản phẩm'
                        />
                    </div>
                    <div className='w-full my-6 flex gap-4'>
                        <Select
                            label='Loại sản phẩm'
                            options={categories?.map(el => ({ code: el._id, value: el.title }))}
                            register={register}
                            id='category'
                            validate={{ required: 'Need fill this field' }}
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                        <Select
                            label='Thương hiệu (không bắt buộc)'
                            options={categories?.find(el => el._id === watch('category'))?.brand?.map(el => ({ code: el, value: el }))}
                            register={register}
                            id='brand'
                            style='flex-auto'
                            errors={errors}
                            fullWidth
                        />
                    </div>
                    <MarkdownEditor
                        name='description'
                        changeValue={changeValue}
                        label='Mô tả sản phẩm'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className='flex flex-col gap-2 mt-8'>
                        <label className='font-semibold' htmlFor="thumb">Tải ảnh đại diện</label>
                        <input
                            type="file"
                            id="thumb"
                            {...register('thumb', { required: 'Need fill' })}
                        />
                        {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                    </div>
                    {preview.thumb && <div className='my-4'>
                        <img src={preview.thumb} alt="thumbnail" className='w-[200px] object-contain' />
                    </div>}
                    <div className='flex flex-col gap-2 mt-8'>
                        <label className='font-semibold' htmlFor="products">Tải lên danh sách ảnh của sản phẩm</label>
                        <input
                            type="file"
                            id="products"
                            multiple
                            {...register('images', { required: 'Need fill' })}
                        />
                        {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images?.map((el, idx) => (
                            <div
                                key={idx}
                                className='w-fit relative'
                            >
                                <img src={el.path} alt="product" className='w-[200px] object-contain' />
                            </div>
                        ))}
                    </div>}
                    <div className='my-6 font-semibold'><Button type='submit'>Tạo mới</Button></div>
                </form>
            </div>
        </div>
    )
}

export default CreateProducts