import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";


export function useDeleteCabin() {

    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: (id) => deleteCabinApi(id),

        // if mutation is succesful we'll invalidate query with key 'cabins' which gonna refetch the query and update UI
        onSuccess: () => {
            toast.success("Cabin is successfuly deleted!");

            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteCabin }
}