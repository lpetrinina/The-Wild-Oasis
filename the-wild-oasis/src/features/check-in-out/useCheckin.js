import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBooking } from "../../services/apiBookings";

export function useChecking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkIn, isPending: isChekingIn } = useMutation({

        mutationFn: (bookingId) => updateBooking(bookingId, {
            status: 'checked-in',
            isPaid: true,
        }),

        onSuccess: (data, bookingId) => {
            toast.success(`Booking #${data.id} successfully checked in!`);
            queryClient.invalidateQueries({ queryKey: ['booking', bookingId] });

            navigate('/');
        },

        onError: () => toast.error('There was an error while checking in ')
    });


    return { checkIn, isChekingIn };
}