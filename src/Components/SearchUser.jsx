import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'





function SearchUser() {

  const navigate= useNavigate()

    const [email, setEmail]= useState('')
    


    const submitHandler= (e)=>{
        e.preventDefault()
   
        fetch(`https://pixpulse-api.onrender.com/searchuser/${email}`,{
           method:"get",
               headers:{
                   "Content-type": "application/json",
                   "Authorization" :"Bearer "+localStorage.getItem("jwt")
               }
        })
        .then(res=>res.json())
        .then(result=>{
           if(result.length == 0)
           {
            alert("No User Exist with this Email")
            setEmail('')
           }
           else{
            setEmail('')
            navigate('/pixpulse/userprofile/'+result[0]._id)
           }
        })
        .catch(err=>{
           console.log("Error", err)
        })
   }

  return (
    <div>
    <div className="md:container md:mx-auto  px-5 lg:px-10 flex flex-col  items-center ">
      <p className="my-5 text-2xl text-pink-500">Search Users</p>
      <form
        className="flex flex-col items-center w-full "
        onSubmit={(e) => submitHandler(e)}
      >
        <input
          type="email"
          className="h-15 w-full p-2 text-md border-b-2 outline-none my-2"
          placeholder="Enter the Email of User"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>

        <input
          type="submit"
          value="Search"
          className="h-15 p-2 text-xl bg-pink-500 text-white cursor-pointer rounded-lg w-40"
        />
      </form>
    </div>
  </div>
  )
}

export default SearchUser
