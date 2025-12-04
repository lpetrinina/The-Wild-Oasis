import styled from "styled-components";

import { useRecentBookings } from "./useResentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPendingBookings, bookings } = useRecentBookings();
  const { isPendingStays, stays, confirmed } = useRecentStays();

  if (isPendingBookings || isPendingStays) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activities</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
