import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
    const queryClient = useQueryClient();
    // const navigate = useNavigate();

    const { mutate: checkOut, isPending: isCheckingOut } = useMutation({

        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: 'checked-out',
        }),

        onSuccess: (data, bookingId) => {
            toast.success(`Booking #${data.id} successfully checked out!`);
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            queryClient.invalidateQueries({ queryKey: ['today-activity'] });

            // navigate('/');
        },

        onError: () => toast.error('There was an error while checking out ')
    });


    return { checkOut, isCheckingOut };
}