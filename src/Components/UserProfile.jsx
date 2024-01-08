import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UserProfile() {
   
  const [data, setData]= useState([])
  const [name,setName] = useState('')
  const [image, setImage]= useState('')
  const [followers, setFollowers]= useState([])
  const [followings,setFollowings]= useState([])
  const {userid} = useParams()
  const id= JSON.parse(localStorage.getItem("user"))._id

  


useEffect(()=>{
     fetch(`https://pixpulse-api.onrender.com/user/${userid}`,{
        method:"get",
        headers:{
            "Content-type": "application/json",
            "Authorization" :"Bearer "+localStorage.getItem("jwt")
        }
     })
     .then(res=>res.json())
     .then(result =>{
      
        setData(result.posts)
        setName(result.user.name)
        setImage(result.user.image)
        setFollowers(result.user.followers)
        setFollowings(result.user.following)
     })
     .catch(err=>{
        console.log("Error", err)
     })
},[])

const doFollow =()=>{
    fetch('https://pixpulse-api.onrender.com/follow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
         followId:userid
      })
    }).then(res=>res.json())
    .then(result=>{
       console.log(result)
       setFollowers(result.result1.followers)
       setFollowings(result.result1.following)
  
    })
    .catch(err=>{
      console.log("Error", err)
    })
}

const doUnfollow =()=>{
    fetch('https://pixpulse-api.onrender.com/unfollow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
         followId:userid
      })
    }).then(res=>res.json())
    .then(result=>{
       console.log(result)
       setFollowers(result.result1.followers)
       setFollowings(result.result1.following)
  
    })
    .catch(err=>{
      console.log("Error", err)
    })
}




  return (  
    <div className='md:container md:mx-auto  px-5 lg:px-10 flex flex-col  items-center'>
        <div className='flex flex-row m-2 mr-2 mt-3 '>
          <div>
              <img className='rounded-full h-24 md:h-48  w-24 md:w-48 border border-gray-600 p-1 ' src={image} />
          </div>
          <div className='flex flex-col m-5 mt-5  justify-center'>
            <p className=' text-lg md:text-2xl lg:text-3xl  md:pb-2  md:pl-2'>{name}</p>
             <div className='flex flex-row '>
              <p className='text-md md:text-xl m-1 md:m-2'>{data.length} Posts</p>
              <p className='text-md md:text-xl m-1 md:m-2'>{followers.length} Followers</p>
              <p className='text-md md:text-xl m-1 md:m-2'>{followings.length} Following</p>
              
             </div>
             {
              followers.includes(id) ?  <button className='h-10  w-24 md:w-32 bg-pink-500 text-white rounded-xl mt-4' onClick={doUnfollow} >Unfollow</button> : <button className='h-10 w-24 md:w-32 bg-pink-500 text-white rounded-xl mt-4' onClick={doFollow} >follow</button>
             }
            
           
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4 mt-5 border-t border-gray-600 py-5'>

         {
          data.map((item, idx)=>(
                <img className='h-48' src={item.photo} />
          ))
         }


        </div>
   
    </div>
  )
}

export default UserProfile
