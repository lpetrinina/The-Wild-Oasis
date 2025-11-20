import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // * FILTER *
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: 'status', value: filterValue };

    // * SORT *
    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    // * PAGINATION *
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

    //  * QUERY *
    const {
        isPending,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page], //A unique key that helps ReactQuery know if it needs to fetch data (the key doesn't exist in cache) or not.
        queryFn: () => getBookings({ filter, sortBy, page })
    });


    // * PREFETCHING *
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount) {

        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
        })
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
        })
    }


    return { isPending, bookings, count };
}
