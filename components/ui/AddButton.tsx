import React from "react"

export default function AddButton({
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
        className="text-md bg-[#43BE83] px-5 py-2 rounded-[10px] text-white font-semibold flex place-items-end"
      >
        {children}
      </button>
    </>
  )
}
