import Image from "next/image"
import Link from "next/link"
import SignInBgImage from '../public/bg-signIn.png'
import { auth,storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/router"; 
import { db } from "../firebase";
import { setDoc,doc } from "firebase/firestore";
import { FcAddImage } from 'react-icons/fc'


const signUp = () => {
  const[err,setErr] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const storageRef = ref(storage,file.name)
      const uploadTask = uploadBytesResumable(storageRef,file)
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });
          });
        });
        router.push('/')
        } catch (error) {
          setErr(true)
        } 
      }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-white">
      <div className="relative top-0 left-0 w-full h-full z-10 flex justify-center items-center">
        <Image src={SignInBgImage} fill className="object-cover" alt="poster-signup"/>
        <form onSubmit={handleSubmit} className="flex flex-col absolute z-20 justify-between bg-black/90 p-4 rounded-xl w-80 min-h-[400px]">
          <label className="inline-block text-2xl my-1">Sign Up</label>
          <input type='text' placeholder='Your Name' className="rounded-lg my-1 py-3 px-2 outline-none text-slate-900 bg-white"/>
          <input type='email' placeholder="Your Email" className=" rounded-lg my-1 py-3 px-2 outline-none text-slate-900 bg-white"/>
          <input type='password' placeholder='Your Password' className=" rounded-lg my-1 py-3 outline-none px-2 text-slate-900 bg-white"/>
          <input type='file' className="hidden" id="img_input"/>
          <label htmlFor="img_input" className="cursor-pointer inline-flex items-center space-x-3 self-start hover:animate-pulse">
            <FcAddImage className="w-10 h-10 "/> <span className="text-slate-400">Upload your image</span>
          </label>
          <div className="my-2">
            <button className="py-2 px-4 rounded-lg bg-rose-700">Sign In</button>
          </div>
          {err && <span>something wronge</span>}
          <p>If you are registered<span className='text-red-700 ml-4  hover:border-b border-red-700'><Link href={'/sign_in'}>Sing In!</Link></span></p>
        </form> 
      </div>
    </div>
  )
}

export default signUp