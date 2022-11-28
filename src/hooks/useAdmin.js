// Purpose :
// Check isAdmin
// check isAdminLoading

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductProvider";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState();
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (email) {
      const isAdminUrl = import.meta.env.VITE_API + "/users/role/" + email;
      // Check if role is admin
      axios
        .get(isAdminUrl, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("gpuhunt_token")}`,
          },
        })
        .then((response) => {
          if (response.data === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
          setIsAdminLoading(false);
        });
    }
  }, [email]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
