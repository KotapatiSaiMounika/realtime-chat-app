import React from 'react'
import assets, { imagesDummyData } from '../assets/assets'

const RightSideBar = ({selectedUser}) => {
  if (!selectedUser) return null;
  return (
    <div className={`bg-[#8185B2]/10 w-full relative overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon } className=" w-20 aspect-[1/1] rounded-full" alt="" />
        <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
          <p className='w-2 h-2 rounded-full bg-green-500'></p>
          {selectedUser.fullName}</h1>
          <p className="px-10 mx-auto">{selectedUser.bio}</p>
      </div>

      <hr className="border-[#ffffff50] my-4"/>
      <div className="px-5 text-xs">
        <p>Media</p>
        <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">{imagesDummyData.map((url,index)=>{
          return(
          <div key={index} onClick={()=> window.open(url)} className="cursor-pointer rounded">
            <img src={url} alt="" className='h-full rounded-md' />
      </div>
          );  
    })}
      </div>
      </div>
    
    <button className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-violet-500 px-5 py-2 rounded-full text-sm font-medium hover:bg-violet-600 transition-colors">LogOut
    </button>

    </div>
  );
};

export default RightSideBar;
