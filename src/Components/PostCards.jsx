import React, { useEffect, useState } from 'react'
import { ChatBubbleOvalLeftIcon, HandThumbDownIcon, HandThumbUpIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'
import { Link, useAsyncError } from 'react-router-dom'

function PostCards({item ,data, setData}) {
  
          const user_id=  JSON.parse(localStorage.getItem("user"))._id
          

       const [likes, setLikes]= useState(0)
       const [post, setPost]= useState(item)
       const [comment ,setComment]= useState('')
       

       const likePost =(id)=>{
           fetch('https://pixpulse-api.onrender.com/like', {
              method:"put",
              headers:{
                "Authorization" :"Bearer "+ localStorage.getItem("jwt"),
                "Content-Type" :"application/json"
              },
              body:JSON.stringify({
                postId:id
              })
           }).then(res=>res.json())
           .then(result=>{
               setPost(result)
           })
           .catch(err=>{
               console.log("Error", err)
           })
       }


       const unLikePost =(id)=>{
        fetch('https://pixpulse-api.onrender.com/unlike', {
           method:"put",
           headers:{
             "Authorization" :"Bearer "+ localStorage.getItem("jwt"),
             "Content-Type" :"application/json"
           },
           body:JSON.stringify({
             postId:id
           })
        }).then(res=>res.json())
        .then(result=>{
            setPost(result)
        })
        .catch(err=>{
          console.log("Error",err)
        })
    }


    const doComment =(e)=>{
      e.preventDefault()
      console.log('hi')
      fetch('https://pixpulse-api.onrender.com/comment',{
        method:"put",
        headers:{
          "Authorization" :"Bearer "+ localStorage.getItem("jwt"),
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
            text:comment,
            postId:item._id,
            postedBy:JSON.parse(localStorage.getItem("user"))
        })
      }).then(res =>res.json())
        .then(result => {
          setPost(result)
          setComment('')
        })
        .catch(err=>{
           console.log("Error", err)
        })
    }


    const deletePost =()=>{
      console.log("hi")
        fetch(`https://pixpulse-api.onrender.com/deletepost/${item._id}`,{
          method:"delete",
          headers:{
            "Authorization": "Bearer "+localStorage.getItem("jwt")
          }
        })
        .then(res=>res.json())
        .then(result =>{
          console.log(result)
          const newPosts= data.filter((item)=>{
             return  item._id !== result._id
          })
          setData(newPosts)
        })
        .catch(err=>{
          console.log("Error", err)
        })
    }

    useEffect(()=>{
              
      setLikes(post.likes.length)
    },[post])


  return (
    <div className=' h-full   border-2 p-3 pb-5 my-5'>
      <div className='flex flex-row justify-between'>
      <Link to={ item.postedBy._id != user_id ?'/pixpulse/userprofile/'+item.postedBy._id:'/pixpulse/profile'} className='my-2  text-2xl'>{item.postedBy.name}</Link>
    { item.postedBy._id == user_id  ?   <TrashIcon  className='h-10 w-10 pl-2 cursor-pointer' onClick={()=>deletePost()}/>  : ''}
  
      </div>

    <div >
      <img width={600} src={post.photo} />
    </div>
    <div className='my-1 flex flex-row'>
    <HeartIcon  className='text-red-500 h-10 w-10 cursor-pointer'/>
    { !post.likes.includes(user_id)?  <HandThumbUpIcon className='h-10 w-10 pl-2 cursor-pointer' onClick={()=>likePost(item._id)}/> :    <HandThumbDownIcon className='h-10 w-10 pl-2 cursor-pointer' onClick={()=>unLikePost(item._id)} />}
   

    </div>

     <p className='mt-1  text-xl'>{likes} likes</p>
    <p className='mt-1  text-xl'>{item.title}</p>
    <p className='mt-1  text-lg'>{item.body}</p>
    {
      post.comments.map((comment,idx)=>(
        
        <p key={idx}><span className='text-md font-bold'>{  comment.postedBy.name}</span><span className='text-md ml-2'>{comment.text}</span></p>
      ))
    }
    <form className='my-1' onSubmit={(e)=>doComment(e)}>
      <input type="text" className='w-4/6 h-10 bg-transparent border-b-2  p-2 outline-none ' placeholder="Add your Comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
      <input type="submit" className='ml-2 bg-pink-500 h-10 p-2 text-white rounded-lg cursor-pointer' value="Comment" />
    </form>
  </div>
  )
}

export default PostCards
