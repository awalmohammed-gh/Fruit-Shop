import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/FruitContextApi'
import { sellerLogin } from '../../api/api'
import toast from 'react-hot-toast'

const SellerLogin = () => {

    const {setIsSeller ,isSeller, navigate, isSellerData} = useAppContext()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")


    const onSubmitHandler = async (event) =>{
        try {
          event.preventDefault()
          const {data} = await sellerLogin({email, password});
          if(data.success){
            toast.success(data.message);
            setIsSeller(true)
            navigate("/seller");
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          console.error(error);

        }
    }



  return !isSeller && (
    <form className='min-h-screen flex items-center text-sm justify-center h-[100vh]' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-300'>
         <p className='text-2xl font-medium m-auto'>Seller<span className='text-primary'> Login</span></p>

         <div className='w-full'>
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' type='email' placeholder='Type here' required/>
         </div>
         <div className='w-full'>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' type='password' placeholder='Type here' required/>
         </div>
         <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer' type='submit'>Login</button>
      </div>


    </form>
  )
}

export default SellerLogin
