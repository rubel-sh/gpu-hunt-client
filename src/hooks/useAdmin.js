// Purpose :
// Check isAdmin
// check isAdminLoading

import axios from "axios";
import { useEffect, useState } from "react";

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
          if (response.data.role === "admin") {
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
