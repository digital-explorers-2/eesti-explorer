import React from "react"

export default function DeleteButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <>
      <button
        onClick={onClick}
        className="text-sm bg-[#C94747] px-5 py-1 rounded-[10px] text-white font-semibold "
      >
        {children}
      </button>
    </>
  )
}
