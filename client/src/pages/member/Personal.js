import { Button, InputForm } from 'components'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import avatar from 'assets/avatarDefault.png'
import { apiUpdateCurrent } from 'apis'
import { getCurrent } from 'store/user/asyncActions'
import { toast } from 'react-toastify'
import { getBase64 } from 'ultils/helpers'
import { useSearchParams } from 'react-router-dom'
import withBaseComponent from 'hocs/withBaseComponent'

const Personal = ({ navigate }) => {
    const { register, formState: { errors, isDirty }, handleSubmit, reset, watch } = useForm()
    const { current } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    useEffect(() => {
        reset({
            firstname: current?.firstname,
            lastname: current?.lastname,
            mobile: current?.mobile,
            email: current?.email,
            avatar: current?.avatar,
            address: current?.address,
        })
    }, [current])
    const handleUpdateInfor = async (data) => {
        const formData = new FormData()
        if (data.avatar.length > 0) formData.append('avatar', data.avatar[0])
        delete data.avatar
        for (let i of Object.entries(data)) formData.append(i[0], i[1])

        const response = await apiUpdateCurrent(formData)
        if (response.success) {
            dispatch(getCurrent())
            toast.success(response.mes)
            if (searchParams.get('redirect')) navigate(searchParams.get('redirect'))
        } else toast.error(response.mes)
    }
    return (
        <div className='w-full relative'>
            <header className='text-3xl font-semibold mx-3 py-3 text-main text-center border-main w-full border-b-2 uppercase'>
                Trang cá nhân
            </header>
            <form onSubmit={handleSubmit(handleUpdateInfor)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                <InputForm
                    label='Tên'
                    register={register}
                    errors={errors}
                    id='firstname'
                    validate={{
                        required: 'Need fill this field'
                    }}
                />
                <InputForm
                    label='Họ'
                    register={register}
                    errors={errors}
                    id='lastname'
                    validate={{
                        required: 'Need fill this field'
                    }}
                />
                <InputForm
                    label='Email'
                    register={register}
                    errors={errors}
                    id='email'
                    validate={{
                        required: 'Need fill this field',
                        pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Email invalid.' }
                    }}
                />
                <InputForm
                    label='Điện thoại'
                    register={register}
                    errors={errors}
                    id='mobile'
                    validate={{
                        required: 'Need fill this field',
                        pattern: {
                            value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
                            message: 'Phone invalid.'
                        }

                    }}
                />
                <InputForm
                    label='Địa chỉ'
                    register={register}
                    errors={errors}
                    id='address'
                    validate={{
                        required: 'Need fill this field',
                    }}
                />
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Trạng thái tài khoản:</span>
                    <span>{current?.isBlocked ? 'Blocked' : 'Actived'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Vai trò:</span>
                    <span>{+current?.role === 1945 ? 'Admin' : 'User'}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>Ngày hoạt động:</span>
                    <span>{moment(current?.createdAt).fromNow()}</span>
                </div>
                <div className='flex flex-col gap-2'>
                    <span className='font-medium'>Profile image:</span>
                    <label htmlFor="file">
                        <img src={current?.avatar || avatar} alt="avatar" className='w-20 h-20 ml-8 object-cover rounded-full' />
                    </label>
                    <input type="file" id="file" {...register('avatar')} hidden />
                </div>
                {isDirty && <div className='w-full flex justify-end'><Button type='submit'>Cập nhật thông tin</Button></div>}
            </form>
        </div>
    )
}

export default withBaseComponent(Personal)