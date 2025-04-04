import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const customerNumber = localStorage.getItem("customerNumber");
  if (!customerNumber) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
