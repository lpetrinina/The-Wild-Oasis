import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {

    const queryClient = useQueryClient();
    const { mutate: editCabin, isPending: isEditing } = useMutation({
        mutationFn: ({ newCabiData, id }) => createEditCabin(newCabiData, id),

        onSuccess: () => {
            toast.success("The cabin  is successfully edited!");

            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });

        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { editCabin, isEditing }
}