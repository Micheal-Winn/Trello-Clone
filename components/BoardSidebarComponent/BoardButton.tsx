"use client"
import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const BoardButton:React.FC<BoardButtonProps> = ({
    setOpenSetting,setReachedSetting,btnText
}) => {
    const router = useRouter()
  return (
    <Button
            onClick={() => {
              setOpenSetting(false);
              setReachedSetting(false);
              router.push("/boards");
            }}
            variant={"ghost"}
            className={`flex items-center justify-start gap-7 text-base  w-[95%] text-black bg-transparent px-2 hover:bg-blue-600 hover:text-white py-2 rounded-sm cursor-pointer`}
          >
            <span>
              <svg
                className="w-5 h-5"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <p className="font-rubik text-left">{btnText}</p>
          </Button>
  )
}

export default BoardButton;
interface BoardButtonProps{
  setOpenSetting:(bol:boolean)=>void
  setReachedSetting:(bol:boolean)=>void
  btnText:string
}