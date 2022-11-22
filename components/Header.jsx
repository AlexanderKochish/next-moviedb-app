import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import userIcon from '../public/user-icon.png'
import { FaSignInAlt,FaBurn } from 'react-icons/fa'
import { MdLogout,MdAppRegistration,MdMovie,MdFavoriteBorder } from 'react-icons/md'
import { ImHome } from 'react-icons/im'
import { RiSlideshow3Fill } from 'react-icons/ri'

const Header = () => {
    const {currentUser} = useContext(AuthContext)
    const[isScroll,setIsScroll] = useState(false)
    useEffect(()=>{
        const handleScroll = () => window.scrollY > 0 ? setIsScroll(true) : setIsScroll(false)

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll',handleScroll)
        }
    },[])

  return (
    <header className={isScroll? 'bg-black':'bg-none'}>
        <div className='flex space-x-4 items-center'>
            <h1 className='text-2xl text-shadow-lg md:text-3xl'>Movie Next</h1>
            <ul className='hidden space-x-10 lg:flex items-center'>
                <li><ImHome className='w-6 h-6'/></li>
                <li><MdMovie className='w-6 h-6'/></li>
                <li><RiSlideshow3Fill className='w-6 h-6'/></li>
                <li><FaBurn className='w-6 h-6'/></li>
                <li><MdFavoriteBorder className='w-6 h-6'/></li>
            </ul>
        </div>
        <div className='flex items-center space-x-3'>      
           {currentUser != null?
           <div className='flex justify-between space-x-4'>
                <Image src={currentUser.photoURL || userIcon} decoding='async' className='object-cover w-10 h-10 rounded-[50%]' width={40} height={40}  alt="avatar" />
                <button onClick={()=>signOut(auth)} className='py-1 px-2 lg:py-2  lg:px-3 inline-flex items-center rounded-xl bg-gray-500'><MdLogout className='mr-2'/>Logout</button>
            </div>
           :<>
                <Link href={'/sign_in'}><button className='py-1 px-2 lg:py-2 lg:px-3 inline-flex items-center rounded-xl bg-rose-700'><FaSignInAlt className='mr-2'/>Sign In</button></Link>
                <Link href={'/sign_up'}><button className='py-1 px-2 lg:py-2 lg:px-3 inline-flex items-center rounded-xl bg-gray-500'><MdAppRegistration className='mr-2'/>Sign Up</button></Link> 
            </>
            } 
        </div>  
    </header>
  )
}

export default Header