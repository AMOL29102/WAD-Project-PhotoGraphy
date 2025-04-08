
import React, { useState, useEffect } from 'react';
import GallerySection from '../components/Gallery';


function Gallery() {
  const [gallery, setGallery] = useState([]);

  return (
    // <div className="container mx-auto px-4 py-20">
    //   <h1 className="text-3xl font-bold mb-8">Photo Gallery</h1>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //     {/* {gallery.map((item) => (
    //       <div key={item._id} className="relative group">
    //         <img
    //           src={item.mediaUrl}
    //           alt={`Gallery item ${item._id}`}
    //           className="w-full h-64 object-cover rounded-lg"
    //         />
    //         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
    //           <div className="text-white text-center">
    //             <p className="text-lg font-semibold">{item.event.name}</p>
    //             <p>{item.type}</p>
    //           </div>
    //         </div>
    //       </div>
    //     ))} */}
    //   </div>
    // </div>
        <GallerySection />
  );
}

export default Gallery;
