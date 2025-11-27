import styled from "styled-components";
import { Navigate } from "react-router";

import Spinner from "./Spinner";

import { useUser } from "../features/authentication/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // 1. Load the authenticated user
  const { isPending, user, isAuthenticated, fetchStatus } = useUser();

  // 2. If there is NO authenticated user, redirect to the '/login'
  if (!isAuthenticated && !isPending && fetchStatus !== "fetching") {
    return <Navigate to='/login' />;
  }

  // 3.While loading, show spinner
  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. If there is a user , render the app
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
