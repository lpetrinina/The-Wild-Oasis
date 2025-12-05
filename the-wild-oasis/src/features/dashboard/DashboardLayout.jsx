import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

import { useRecentBookings } from "./useResentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPendingBookings, bookings, numDays } = useRecentBookings();
  const { isPendingStays, stays, confirmed } = useRecentStays();
  const { isPendingCabins, cabins } = useCabins();

  if (isPendingBookings || isPendingStays || isPendingCabins) {
    return <Spinner />;
  }

  console.log(stays);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmed}
        numDays={numDays}
        cabinCount={cabins?.length}
      />

      <div>Today's activities</div>

      <DurationChart confirmedStays={confirmed} />

      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
