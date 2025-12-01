import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {

    const { mutate: signup, isPending } = useMutation({
        mutationFn: (userData) => signupApi(userData),

        onSuccess: (user) => {
            console.log(user),
                toast.success('The account is successfully created! Please verify the new account from the user\'s email address')
        },
        onError: () => {
            toast.error('The account is not created!')
        }
    })

    return { isPending, signup }
}