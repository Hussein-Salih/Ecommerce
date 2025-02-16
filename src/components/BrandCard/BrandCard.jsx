import React from "react";

export default function Category(props) {
  const { name, image, _id } = props.brand;

  return (
    <div className="bg-white dark:bg-gray-800 cursor-pointer relative rounded-lg drop-shadow-lg hover:drop-shadow-2xl transition-all border-gray-200 dark:border-gray-700">
      <div className="h-60 border-b-2 ">
        <img
          className="rounded-t-lg block h-full w-full"
          src={image}
          alt="product image"
        />
      </div>
  
      <div className="px-3 py-4">
        <div>
          <h5 className="font-semibold text-gray-700 dark:text-gray-100 text-center text-2xl">
            {name}
          </h5>
        </div>
      </div>
    </div>
  );
}