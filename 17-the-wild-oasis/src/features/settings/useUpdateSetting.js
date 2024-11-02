import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export function useUpdateSetting() {
   const queryClient = useQueryClient();

   const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
      mutationFn: updateSettingAPI,
      onSuccess: () => {
         toast.success("Setting has been successfully updated.");
         queryClient.invalidateQueries({
            queryKey: "settings",
         });
      },
      onError: (error) => toast.error(error.message),
   });

   return { isUpdating, updateSetting };
}
