import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

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
            <ul className='hidden space-x-4 lg:flex'>
                <li>Home</li>
                <li>Movies</li>
                <li>TV Shows</li>
                <li>New & Popular</li>
                <li>My List</li>
            </ul>
        </div>
        <div className='flex items-center space-x-3'>      
           {currentUser != null?
           <div className='flex justify-between space-x-4'>
                <Image src={currentUser.photoURL} decoding='async' loading='lazy' className='object-cover w-10 h-10 rounded-[50%]' width={40} height={40}  alt="avatar" />
                <button onClick={()=>signOut(auth)} className='py-1 px-2 lg:py-2 lg:px-4 rounded-xl bg-gray-500'>Logout</button>
            </div>
           :<>
                <Link href={'/sign_in'}><button className='py-1 px-2 lg:py-2 lg:px-4 rounded-xl bg-rose-700'>Sign In</button></Link>
                <Link href={'/sign_up'}><button className='py-1 px-2 lg:py-2 lg:px-4 rounded-xl bg-gray-500'>Sign Up</button></Link> 
            </>
            } 
        </div>  
    </header>
  )
}

export default Header