import Image from "next/image"
import Link from "next/link"
import SignInBgImage from '../public/bg-signIn.png'

const signUp = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-white">
      <div className="relative top-0 left-0 w-full h-full z-10 flex justify-center items-center">
        <Image src={SignInBgImage} fill className="object-cover"/>
        <form className="flex flex-col absolute z-20 justify-between bg-black opacity-90 p-4 rounded-xl w-80 min-h-[400px]">
          <label className="inline-block text-2xl my-1">Sign Up</label>
          <input type='text' placeholder='Your Name' className=" rounded-xl my-1 py-4 px-2  border-gray-300 text-white bg-inherit"/>
          <input type='email' placeholder="Your Email" className=" rounded-xl my-1 py-4 px-2 border-gray-300 text-white bg-inherit"/>
          <input type='password' placeholder='Your Password' className=" rounded-xl my-1 py-4 px-2  border-gray-300 text-white bg-inherit"/>
          <input type='file' placeholder='Upload your image' accept='.png, .jpg, .jpeg'/>
          <div className="my-2">
            <button className="py-2 px-4 rounded-xl bg-rose-700">Sign In</button>
          </div>
          <p>If you are registered<span className='text-red-700 ml-4  hover:border-b border-red-700'><Link href={'/sign_in'}>Sing In!</Link></span></p>
        </form> 
      </div>
    </div>
  )
}

export default signUp