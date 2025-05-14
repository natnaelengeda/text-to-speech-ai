import AppAsset from '@/core/AppAsset'
import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <header
      className='fixed w-full h-20 bg-white border-b border-gray-200 shadow flex items-center justify-between px-5'>
      <div className='flex items-center space-x-1'>
        <Image
          className='w-16 h-16 object-contain'
          src={AppAsset.logo}
          alt='Logo' />
        <h1 className='text-lg'>Speech to Text AI</h1>
      </div>

    </header>
  )
}
