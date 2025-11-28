import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {

    const navigate = useNavigate();

    const { isPending, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: (user) => {
            navigate('/dashboard', { replace: true });
        },

        onError: (err) => {
            toast.error('Provided email or password are incorrect!')
        }
    });

    return { isPending, login }
}