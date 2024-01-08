import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram-clone");
    data.append("cloud_name", "dgl7lo1ny");
    fetch("https://api.cloudinary.com/v1_1/dgl7lo1ny/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (url) {
      fetch("https://pixpulse-api.onrender.com/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) alert(data.error);
          else {
            setTitle("");
            setBody("");
            setImage("");
            alert(data.message);

            navigate("/pixpulse/home");
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  }, [url]);

  const submitHandler = (e) => {
    e.preventDefault();
    postDetails();
  };

  return (
    <div>
      <div className="md:container md:mx-auto  px-5 lg:px-10 flex flex-col  items-center ">
        <p className="my-5 text-2xl text-pink-500">Create Your Post</p>
        <form
          className="flex flex-col items-center w-full "
          onSubmit={(e) => submitHandler(e)}
        >
          <input
            type="text"
            className="h-15 w-full p-2 text-md border-b-2 outline-none my-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br></br>
          <input
            type="text"
            className="h-15 w-full p-2 text-md border-b-2 outline-none my-2"
            placeholder="Discription"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <br></br>
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
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <br></br>
          <input
            type="submit"
            value="Create Post"
            className="h-15 p-2 text-xl bg-pink-500 text-white cursor-pointer rounded-lg w-40"
          />
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
