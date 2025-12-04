import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentStays() {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
    const queryDate = subDays(new Date(), numDays).toISOString().replace('Z', '+02:00');

    const { isPending: isPendingStays, data: stays } = useQuery({
        queryKey: ['stays', `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryDate)
    });

    const confirmed = stays?.filter(stay => stay.status === 'checked-in' || stay.status === 'checked-out');

    return { isPendingStays, stays, confirmed }
}