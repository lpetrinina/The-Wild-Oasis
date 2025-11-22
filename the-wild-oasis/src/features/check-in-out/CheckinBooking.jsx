import styled from "styled-components";
import { useEffect, useState } from "react";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { isPending, booking } = useBooking();
  const { checkIn, isChekingIn } = useCheckin();
  const { isPending: isLoadingSettings, settings } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isPending || isLoadingSettings) {
    return <Spinner />;
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    isPaid,
    extrasPrice,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) {
      return;
    }

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row $type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* Add breakfast, if you haven't done it */}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id='add'
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      {/* Confinm booking and pay total price(if you haven't done)*/}
      <Box>
        <Checkbox
          id='confirm'
          checked={confirmPaid}
          disabled={confirmPaid === true || isChekingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {/* If an optional breakfast is not added */}
          {!addBreakfast && formatCurrency(totalPrice)}
          {/* If an  optional breakfast is added and the total price is not paid*/}
          {addBreakfast &&
            !isPaid &&
            `${formatCurrency(totalPrice)} (${formatCurrency(
              totalPrice
            )} + ${formatCurrency(extrasPrice)})`}
          {/* If an  optional breakfast is added and the total price is paid*/}
          {addBreakfast &&
            isPaid &&
            `${formatCurrency(optionalBreakfastPrice)} breakfast`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={confirmPaid === false || isChekingIn}
        >
          Check in booking #{bookingId}
        </Button>

        <Button $variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
