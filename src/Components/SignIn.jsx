import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
const navigate= useNavigate()

    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')

    const submitHandler = (e)=>{
          e.preventDefault()

          fetch('https://pixpulse-api.onrender.com/signin',{
            method:"post",
            headers:{
               "Content-type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
          })
            .then(res=>res.json())
            .then(data=>{
                  
                    if(data.error)

                      alert(data.error)

                   else{
                      localStorage.setItem("jwt", data.token)
                      localStorage.setItem("user", JSON.stringify(data.user))
                      setEmail('')
                      setPassword('')
                      navigate('/pixpulse/home')
                   }
            })
            .catch(err=>{
               console.log("Error" , err)
            })
    }

  return (
    <div className='flex  justify-center items-center h-screen w-screen '>
    <div className='grid grid-cols-1 md:grid-cols-2 mx-5  w-full md:4/6 lg:w-3/6 border rounded-xl shadow-xl '>
        <div >
           <img className='h-full' src="https://imgs.search.brave.com/9gOYIcFn0bI1bAkpGdDa77vQeVUA4P6HDVkOIgxtTqc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzQ2NDYy/MzIvc2NyZWVuc2hv/dHMvMTU5NDYyMDYv/bWVkaWEvZTNjYTJj/NWExY2YxYmI1NjZk/MjVhZWU3NmY2NTli/ZGYucG5nP3Jlc2l6/ZT00MDB4MzAwJnZl/cnRpY2FsPWNlbnRl/cg" />
        </div>
        <div className='flex flex-col items-center pb-5'>
           <p className='font-serif text-2xl mt-5 mb-3 text-pink-500'>PixPulse</p>
           <p className='text-xl'>SignIn Here</p>
           <form className='mt-5 mb-3 ' onSubmit={(e)=>submitHandler(e)}>
              <input type="text" className='w-full border h-10 p-2 my-2 rounded-md outline-none' placeholder='Enter your email-id' value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <br></br>
              <input type="Password" className='w-full border h-10 p-2 my-2 rounded-md outline-none' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <br></br>
              <input type="submit" className='w-full h-10 p-2 my-2 bg-pink-500 rounded-lg text-white cursor-pointer'  value="SignIn"/>
           </form>
           <p className='text-md mt-5 mb-5'>Don't Have Account? <Link className="cursor-pointer text-blue-600" to="/signup">SignUp Here</Link></p>
        </div>
    </div>
    </div>
  )
}

export default SignIn
