import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

import "./OccasionDropDown.css";

const OccasionDropDown = ({ loginUser }) => {
  const loginUserID = loginUser?._id;
  const [postHistory, setPostHistory] = useState([]);

  const { data, error, isLoading, onSuccess } = useQuery(
    ["outfitQuery", loginUser],
    () => axios(`/v1/users/${loginUserID}`),
    {
      onSuccess: (data) => {
        setPostHistory(data?.data?.posts_history);
      },
    }
  );

  const occasion = uniq(
    postHistory
      ?.map((post) => post.occasion.toLowerCase())
      ?.sort((a, b) => a.localeCompare(b, { ignorePunctuation: true }))
  );

  // console.log("logindatafrom occasions", loginUser);

  // console.log("posthistoryfromoccasions", postHistory);

  // console.log("from occasions", occasion);

  // unique
  function uniq(post) {
    return post.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  }

  const [selectOccasion, setSelectOccasion] = useState();
  const handleChangeOccasion = (e) => {
    e.preventDefault();
    setSelectOccasion(e.target.value);
  };

  const photoArray = postHistory.filter(
    (item) => item.occasion === selectOccasion
  );

  return (
    <div>
      <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center pt-8">
        SOS Style, let's help.
      </h1>
      <p class="lg:text-2xl md:text1xl sm:text-xl text-base font-serif mb-14 text-center">
        hey {loginUser?.username}, and where are you going today? let's get you
        dressed up.
      </p>
      <div class="flex flex-col justify-center items-center">
        <svg
          class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fill-rule="nonzero"
          />
        </svg>
        <select
          class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none text-lg font-serif"
          onChange={handleChangeOccasion}
        >
          <option>hey halt, where we going?</option>

          {occasion?.map((item) => {
            return <option value={item}>{item}</option>;
          })}
        </select>
      </div>
      <div class="grid grid-cols-3 grid-flow-row gap-8">
        {photoArray?.map((photo) => (
          <div className="container">
            <Link to={`/wardrobe/${photo._id}`}>
              <img className="occasionimage" src={photo.image_url} />
            </Link>
          </div>
        ))}
      </div>
      )
    </div>
  );
};

export default OccasionDropDown;
