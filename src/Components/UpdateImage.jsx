import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function UpdateImage() {

    const [image ,setImage]= useState('')

    const uploadImage =()=>{
        const data= new FormData()
        data.append("file", image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name", "dgl7lo1ny")
       fetch("https://api.cloudinary.com/v1_1/dgl7lo1ny/image/upload",{
         method:"post",
         body:data
       })
       .then(res=>res.json())
       .then(data=>{
          console.log(data.url)
            fetch('https://pixpulse-api.onrender.com/updateimage',{
                method:"put",
                headers:{
                    "Content-type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:data.url
                })
            })
            .then(res=>res.json())
            .then(result=>{
                 localStorage.setItem("user",JSON.stringify(result))
                 alert("Image Updated ")
            })
            .catch(err=>{
             console.log("Error",err)
            })

 
       })
       .catch(err=>{
         console.log("Error", err)
       })
    }
    


    const submitHandler= (e)=>{
          e.preventDefault()
          console.log("hie")
          if(!image)
          {
            alert("Please Select the Image")
            return
          }
          uploadImage()

    }

  return (
    <div>
    <div className="md:container md:mx-auto  px-5 lg:px-10 flex flex-col  items-center ">
      <p className="my-5 text-2xl text-pink-500">Update Your Profile Image</p>
      <form className="flex flex-col items-center w-full " onSubmit={(e)=>submitHandler(e)}>

        <label class="block">
          <input
            type="file"
            className="block w-full text-lg text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100
             "
             onChange={(e)=>setImage(e.target.files[0])}
          />
        </label>
        <br></br>
        <input type="submit" value="Update Image" className="h-15 p-2 text-lg md:text-xl bg-pink-500 text-white cursor-pointer rounded-lg w-40"/>
      </form>
    </div>
  </div>
  )
}

export default UpdateImage
