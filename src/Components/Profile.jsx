import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Profile() {
   
  const [data, setData]= useState([])


  useEffect(()=>{
  
    fetch('https://pixpulse-api.onrender.com/myposts',{
       headers :{
        "Authorization" :"Bearer "+ localStorage.getItem("jwt"),
        "Content-Type" :"application/json"
       }
    })
    .then(res=>res.json())
     .then(result => {
           setData(result.myposts)
          
     })
      .catch(err=>{
        console.log("Error", err)
      })

  },[])




  return (
    <div className='md:container md:mx-auto  px-5 lg:px-10 flex flex-col  items-center '>
        <div className='flex flex-row m-2 mr-2 mt-3'>
          <div>
              <img className='rounded-full h-24 md:h-48  w-24 md:w-48 border border-gray-600 p-1 ' src={JSON.parse(localStorage.getItem("user")).image} />
            

          </div>
          <div className='flex flex-col m-5 mt-5  justify-center'>
            <p className=' text-lg md:text-2xl lg:text-3xl  md:pb-2  md:pl-2'>{JSON.parse(localStorage.getItem("user")).name}</p>
             <div className='flex flex-row '>
              <p className='text-md md:text-xl m-1 md:m-2'>{data.length} Posts</p>
              <p className='text-md md:text-xl m-1 md:m-2'>{JSON.parse(localStorage.getItem("user")).followers.length} Followers</p>
              <p className='text-md md:text-xl m-1 md:m-2'>{JSON.parse(localStorage.getItem("user")).following.length} Followings</p>
             </div>
             <Link to="/pixpulse/updateimage" className='h-10  w-32 bg-pink-500 text-white rounded-xl p-2 m-4'>Update Image</Link>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4 mt-5 border-t border-gray-600 py-5'>

         {
          data.map((item, idx)=>(
                <img className='h-48 ' src={item.photo} />
          ))
         }


        </div>
   
    </div>
  )
}

export default Profile
