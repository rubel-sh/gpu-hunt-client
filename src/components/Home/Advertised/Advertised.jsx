import React, { useState } from "react";
import underLine from "../../../assets/images/others/under_line.png";
import "react-photo-view/dist/react-photo-view.css";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";
import Loading from "../../Shared/Loading/Loading";
import BooknowConfirmModal from "../../Shared/BooknowConfirmModal/BooknowConfirmModal";
import axios from "axios";

const Advertised = () => {
  // State
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState({});

  // Load data for products [Allow only advertised products]
  const { data: productDetails, isLoading } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const url = import.meta.env.VITE_API + "/products/advertised";
      const res = await axios.get(url);
      const data = res.data;
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // Handle Modal
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <section className="mb-32 max-w-6xl mx-auto px-2 lg:px-0">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold mb-12">
          <span className="relative z-10">
            <img src={underLine} alt="" className="absolute -bottom-3  -z-10" />
            Advertised
          </span>{" "}
          Products
        </h2>
        <div>
          <PrimaryButton>Show All</PrimaryButton>
        </div>
      </div>

      {/* Categories  */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
        {productDetails &&
          productDetails.map((eachProduct) => (
            <ProductCard
              key={eachProduct._id}
              setShowModal={() => setShowModal(!showModal)}
              productInfo={eachProduct}
              setModalProduct={(modalProduct) => setModalProduct(modalProduct)}
            />
          ))}
      </div>
      {/* Show Modal */}
      <BooknowConfirmModal
        modalProduct={modalProduct}
        showModal={showModal}
        onClose={onClose}
      />
    </section>
  );
};

export default Advertised;
