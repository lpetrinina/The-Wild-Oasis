import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isPending, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.user); //update the existing query with the new data immediately, without wasting a network call for data we already have
            navigate('/dashboard', { replace: true });
        },

        onError: (err) => {
            toast.error('Provided email or password are incorrect!')
        }
    });

    return { isPending, login }
}