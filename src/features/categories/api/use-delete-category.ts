import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categories)[":id"]["$delete"]
>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (): Promise<ResponseType> => {
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id },
      });

      return (await response.json()) as ResponseType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted");

      // TODO: Also invalidate summary and transactions
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });

  return mutation;
};
