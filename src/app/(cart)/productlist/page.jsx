// "use client";

// import { useCart } from "@/context/CartContext";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function Page() {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { addToCart } = useCart();

//   useEffect(() => {
//     axios
//       .get("/api/productlist")
//       .then((res) => {
//         setProducts(res.data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("axios fetching error-->", err);
//       });
//   }, []);

//   const openModal = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedProduct(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className={`relative ${isModalOpen ? "overflow-hidden" : ""}`}>
//       {isLoading ? (
//         <>
//           <div className="w-full min-h-screen mx-auto bg-gray-900 text-white p-9 rounded-xl flex flex-col justify-center items-center gap-5">
//             <div className="flex w-96 flex-col gap-6">
//               <div className="skeleton h-40 w-full"></div>
//               <div className="skeleton h-5 w-36"></div>
//               <div className="skeleton h-5 w-full"></div>
//               <div className="skeleton h-5 w-full"></div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className="w-full min-h-screen bg-gray-900 text-white p-6">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-400">
//             Products ({products.length})
//           </h2>

//           <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
//             {products.map((product) => (
//               <li
//                 key={product._id}
//                 className="cursor-pointer group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-transform duration-300"
//               >
//                 <img
//                   onClick={() => openModal(product)}
//                   className="w-full h-48 object-cover group-hover:opacity-90 transition duration-300 hover:scale-[1.05] hover:duration-500"
//                   src={product.productimage}
//                   alt="Product"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-bold text-white mb-2">
//                     {product.productName}
//                   </h3>
//                   <p className="text-sm text-gray-400 mb-2">
//                     {product.productDiscription}
//                   </p>
//                   <p className="text-green-400 text-lg mb-2">
//                     ${product.productPrice}
//                   </p>
//                   <button
//                     onClick={() => addToCart(product)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Modal */}
//       {isModalOpen && selectedProduct && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
//             onClick={closeModal}
//           />
//           <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-xl shadow-xl w-11/12 max-w-md p-6">
//             <h2 className="text-xl font-bold mb-2">
//               {selectedProduct.productName}
//             </h2>
//             <img
//               src={selectedProduct.productimage}
//               alt={selectedProduct.productName}
//               className="w-full h-48 object-cover rounded-md mb-4"
//             />
//             <p className="text-gray-700 mb-2">
//               {selectedProduct.productDiscription}
//             </p>
//             <p className="text-green-600 font-semibold text-lg mb-4">
//               ${selectedProduct.productPrice}
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Page;








//animation
"use client";

import { useCart } from "@/context/CartContext";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Page() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("/api/productlist")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("axios fetching error-->", err);
      });
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className={`relative ${isModalOpen ? "overflow-hidden" : ""}`}>
      {isLoading ? (
        <div className="w-full min-h-screen mx-auto bg-gray-900 text-white p-9 rounded-xl flex flex-col justify-center items-center gap-5">
          <div className="flex w-96 flex-col gap-6">
            <div className="skeleton h-40 w-full"></div>
            <div className="skeleton h-5 w-36"></div>
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-full"></div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen bg-gray-900 text-white p-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-400">
            Products ({products.length})
          </h2>

          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {products.map((product) => (
              <motion.li
                key={product._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100 },
                  },
                }}
                className="cursor-pointer group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-transform duration-300"
              >
                <img
                  onClick={() => openModal(product)}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition duration-300 hover:scale-[1.05] hover:duration-500"
                  src={product.productimage}
                  alt="Product"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {product.productDiscription}
                  </p>
                  <p className="text-green-400 text-lg mb-2">
                    ${product.productPrice}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      )}

      {/* Modal with Framer Motion */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-xl shadow-xl w-11/12 max-w-md p-6 border border-gray-700"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h2 className="text-xl font-bold mb-2">
                {selectedProduct.productName}
              </h2>
              <img
                src={selectedProduct.productimage}
                alt={selectedProduct.productName}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-gray-300 mb-2">
                {selectedProduct.productDiscription}
              </p>
              <p className="text-green-400 font-semibold text-lg mb-4">
                ${selectedProduct.productPrice}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Page;
