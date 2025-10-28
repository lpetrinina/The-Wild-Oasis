import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";


export function useUpdateSetting() {

    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateSetting } = useMutation({
        mutationFn: (newSetting) => updateSettingApi(newSetting),

        onSuccess: () => {
            toast.success('Setting is successfully edited!');

            queryClient.invalidateQueries({
                queryKey: ['settings']
            });
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    return { isUpdating, updateSetting }

}