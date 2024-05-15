import React from 'react'

export default function MediumButton({children}:{children:React.ReactNode}) {
  return (
    <>
        <button className="text-sm bg-[#F57906] px-7 py-2 rounded-[7px] text-white font-semibold">{children}</button>
    </>
  )
}
