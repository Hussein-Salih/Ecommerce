import React from "react";
import { Link } from "react-router-dom";

export default function Category(props) {
  const { name, image, _id } = props.category;

  return (
    <>
      <div className=" bg-white cursor-pointer relative rounded-lg drop-shadow-lg hover:drop-shadow-2xl hover: transition-all border-gray-200">
        <div className="h-60 border-b-2 ">
          <img
            className="rounded-t-lg h-full w-full"
            src={image}
            alt="product image"
          />
        </div>

        <div className="px-3 py-4">
          <div>
            <h5 className="font-semibold text-gray-700 text-center text-2xl">
              {name}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}