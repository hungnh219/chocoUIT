import React, { memo } from 'react'

const Button = ({ children, handleOnClick, style, fw, type = 'button' }) => {
    return (
        <button
            type={type}
            className={style ? style : `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 hover:bg-[#f3c63f] hover:-translate-y-1 hover:scale-103 duration-300 ${fw ? 'w-full' : 'w-fit'}`}
            onClick={() => { handleOnClick && handleOnClick() }}
        >
            {children}
        </button>
    )
}

export default memo(Button)