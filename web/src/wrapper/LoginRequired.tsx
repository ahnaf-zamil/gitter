import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/users";
import { userContext } from "../lib/context";

interface Props {
  page: ReactNode;
}

export const LoginRequired: React.FC<Props> = ({ page }) => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (user === null) {
        navigate("/login");
      } else {
        setUser(user);
        setShow(true);
      }
    })();
  }, []);

  return <main>{show && page}</main>;
};
