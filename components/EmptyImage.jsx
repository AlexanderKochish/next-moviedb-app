import Image from 'next/image'
import React from 'react'
import EmptyPhoto from '../public/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg'

const EmptyImage = () => {
  return (
    <>
      <Image 
        src={EmptyPhoto} 
        fill 
        alt="profile_path"
        className="object-cover"
      />
    </>
  )
}

export default EmptyImage