import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  const navigate = useNavigate();

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

  const uploadFields = () => {
    fetch("https://pixpulse-api.onrender.com/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error);

        if (data.message) {
          setEmail("");
          setName("");
          setPassword("");
          setImage("");
          alert(data.message);
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (image) {
      postDetails();
    } else {
      uploadFields();
    }
  };

  return (
    <div className="flex  justify-center items-center h-screen w-screen ">
      <div className="grid grid-cols-1 md:grid-cols-2 mx-5  w-full md:w-5/6 lg:w-3/6 border rounded-xl shadow-xl">
        <div>
          <img
            className="h-full"
            src="https://imgs.search.brave.com/SfrkwSNA5nH8nAb9JilihmMItDzG4_BJLBF5Qgi49kA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9maXh0/aGVwaG90by5jb20v/aW1hZ2VzL2NvbnRl/bnQvaW50ZXJueHQt/cGhvdG9zLXBpY3R1/cmUucG5n"
          />
        </div>
        <div className="flex flex-col items-center p-4">
          <p className="font-serif text-2xl mt-5 mb-3 text-pink-500">
            PixPulse
          </p>
          <p className="text-xl">SignUp Here</p>
          <form className="mt-5 mb-3 " onSubmit={(e) => submitHandler(e)}>
            <input
              type="text"
              className="w-full border h-10 p-2 my-2 rounded-md outline-none"
              placeholder="Enter your Email-Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <input
              type="text"
              className="w-full border h-10 p-2 my-2 rounded-md outline-none"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            <input
              type="password"
              className="w-full border h-10 p-2 my-2 rounded-md outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <p className="p-2 my-2">Upload Your Image</p>
            <label className="block">
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
              className="w-full h-10 p-2 my-4 bg-pink-500 rounded-lg text-white cursor-pointer"
              value="SignUp"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
