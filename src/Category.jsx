import React from 'react';

export default function Category({ finalCategory, setCatname }) {
  let cat = finalCategory.map((v, i) => {
    return (
      <li
        onClick={() => setCatname(v.slug || v.name)} // Use slug or name to filter products
        key={i}
        className='bg-[#ccc] p-[7px] cursor-pointer text-[20px] font-serif font-[500] mb-2 shadow-lg rounded-lg overflow-hidden bg-white transition-transform transform hover:scale-105'
      >
        {v.name || v.slug} {/* Render 'name' or 'slug' */}
      </li>
    );
  });

  return (
    <div >
      <h3 className='text-[25px] font-[500] p-[10px]'>Product Category</h3>
      <ul>{cat}</ul>
    </div>
  );
}
