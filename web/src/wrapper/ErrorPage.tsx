import React from "react";
import { NotFoundPage } from "../pages/err/NotFound";

interface Props {
  status: number;
}

export const ErrorPage: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 404:
      return <NotFoundPage status={status} />;
    default:
      return <h1>Unknown error</h1>;
  }
};
