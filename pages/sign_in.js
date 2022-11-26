import Image from "next/image"
import Link from "next/link"
import SignInBgImage from '../public/bg-signIn.png'
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router'

const signIn = () => {
  const router = useRouter()

    const handleSubmit = async(e)=>{
      e.preventDefault()
      const email = e.target[0].value
      const password = e.target[1].value
      const res = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      router.push('/')
      console.log(res,user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    }
    
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-white">
        <div className="relative top-0 left-0 w-full h-full z-10 flex justify-center items-center">
          <Image src={SignInBgImage} fill className="object-cover" alt="poster-signin"/>
          <form onSubmit={handleSubmit} className="flex flex-col absolute z-20 justify-between bg-black opacity-90 p-4 rounded-xl w-80 min-h-[320px]">
            <label className="inline-block text-2xl my-1">Sign In</label>
            <input type='email' placeholder="Your Email" className="rounded-lg my-1 py-3 px-2 outline-none text-slate-900 bg-white"/>
            <input type='password' placeholder='Your Password' className="rounded-lg my-1 py-3 px-2 outline-none text-slate-900 bg-white"/>
            <div className="my-1">
              <button className="py-2 px-4 rounded-xl bg-rose-700">Sign In</button>
            </div>
            <p>If you are not registered<span className='text-red-700 ml-4  hover:border-b border-red-700'><Link href={'/sign_up'}>Sing Up!</Link></span></p>
          </form> 
        </div>
      </div>
    )

}


export default signIn