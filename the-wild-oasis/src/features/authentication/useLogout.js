import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isPending, mutate: logout } = useMutation({
        mutationFn: () => logoutApi(),

        onSuccess: () => {
            queryClient.removeQueries(); // remore all accumulated  queries
            navigate('/login', { replace: true })
        },
        onError: (err) => {
            toast.error(err)
        }

    })

    return { isPending, logout }
}