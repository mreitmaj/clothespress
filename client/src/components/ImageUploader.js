import React from "react";
import "../App.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";

const ImageUploader = () => {
  const [previewSource, setPreviewSource] = useState("");

  // Converting image to string
  const handleFileInputChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  //USEFORM
  const { register, handleSubmit, setValue } = useForm();

  const uploadImage = async (newPost) => {
    try {
      await fetch("http://localhost:4000/v1/posts/upload", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        // setImage("");
        // setLoaded(!loaded);
        console.log("Post submitted", res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  // USE MUTATION
  const mutation = useMutation((newPost) => uploadImage(newPost));
  const { isLoading, isError, isSuccess } = mutation;

  const submitData = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return <Redirect to="/wardrobe" />;
  }

  if (isLoading) {
    return "Loading...Currently pressing your outfit!";
  }

  if (isError) {
    return "Uh oh, your outfit's too ugly.";
  }


  return (
    <div>
      <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center py-8">
        let's hang your outfit
      </h1>
      <div class="grid grid-flow-col grid-cols-2">
        <div>
          <form class="m-20" onSubmit={handleSubmit(submitData)}>
          <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif  pt-16">
            What brand is this from?
          </p>
            <input
            class="lg:text-xl md:text-xl sm:text-xl text-base font-serif"
              type="text"
              {...register("brand", { required: true })}
            />
            <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif  pt-16">
              And it's perfect for what occasion?
            </p>
            <input
            class="lg:text-xl md:text-xl sm:text-xl text-base font-serif"
              type="text"
              {...register("occasion", { required: true })}
            />
            <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif pt-16">
              How do you feel when you wear it - one word.
            </p>
            <input
            class="lg:text-xl md:text-xl sm:text-xl text-base font-serif"
              type="text"
              {...register("feelings", { required: true })}
            />
            <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif mb-4 pt-16">
              Take a snapshot
            </p>
            <input 
            class="lg:text-xl md:text-xl sm:text-xl text-base font-serif"
            type="file" onChange={handleFileInputChange} />
            <br />
            <br />
            <br />
            <button
            onClick={() => setValue("data", { previewSource })} 
            class="inline-flex items-center px-3 py-2 font-serif rounded px-4 py-2 leading-5 bg-black text-primary-100 text-white hover:text-white hover:bg-green-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>{" "}
              Upload outfit
            </button>
          </form>
        </div>
        <div>
          {previewSource && (
            <img src={previewSource} alt="chosen" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;