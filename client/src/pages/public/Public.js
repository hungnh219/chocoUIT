import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from 'components'
import Footer from 'components/footer/Footer'
import TopHeaders from 'components/headers/TopHeader'
const Public = () => {
    return (
        <div className='max-h-screen overflow-y-auto flex flex-col items-center'>
            <TopHeaders />
            <div className='w-full shadow-lg flex justify-center'><Header /></div>
            <div className='w-full flex items-center flex-col mt-[120px]'>
                <Outlet />
            </div>
            <Footer />
        </div>

    )
}

export default Public