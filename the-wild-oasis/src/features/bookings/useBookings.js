import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";

export function useBookings() {
    const [searchParams] = useSearchParams();

    // * Filter
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: 'status', value: filterValue };

    // ** Sort
    const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByRaw.split('-');
    const sortBy = { field, direction };

    // *** Pagination
    const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));


    const {
        isPending,
        data: { data: bookings, count } = {},
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page], //A unique key that helps ReactQuery know if it needs to fetch data (the key doesn't exist in cache) or not.
        queryFn: () => getBookings({ filter, sortBy, page })
    });


    return { isPending, bookings, count };
}
