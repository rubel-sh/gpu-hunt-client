import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "flowbite-react";
import React, { useContext } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import PrimaryButton from "../../Shared/PrimaryButton/PrimaryButton";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const {
    data: buyerOrders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["buyerOrders"],
    queryFn: async () => {
      const url = import.meta.env.VITE_API + "/orders/" + user?.email;
      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("gpuhunt_token")}`,
        },
      });

      return response.data;
    },
  });

  const handlePay = (productId) => {
    // Pay Here with card then initiate below patch request

    const payUrl = import.meta.env.VITE_API + "/orders/" + productId;
    axios.patch(payUrl).then((response) => {
      if (response.data.modifiedCount) {
        refetch();
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-2 md:p-5">
      <h2 className="text-xl  mb-10 pl-2 border-l-4 border-primary ">
        Order Lists
      </h2>
      {/* Table */}
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>
            <span className="sr-only">Index</span>
          </Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell>Item</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>PAY</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {buyerOrders.map((order, index) => {
            return (
              <Table.Row
                key={order._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{++index}</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <PhotoProvider>
                    <PhotoView src={order.productImage}>
                      {/* Product Image */}
                      <img
                        className="w-11 h-11 object-cover  rounded-md "
                        src={order.productImage}
                        alt=""
                      />
                    </PhotoView>
                  </PhotoProvider>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-md font-medium">
                    {order.productName}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="">
                    ${" "}
                    <span className="text-lg font-medium">
                      {order.productPrice}
                    </span>{" "}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  {order.paid ? (
                    <PrimaryButton disabled className="bg-gray-400">
                      Paid
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      onClick={() => handlePay(order.productId)}
                      className="bg-blue-400 active:bg-blue-500 ring-blue-400"
                    >
                      Pay
                    </PrimaryButton>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      {/* Table ends */}
    </div>
  );
};

export default MyOrders;
