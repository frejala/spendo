import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)[":id"]["$delete"]
>;

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (): Promise<ResponseType> => {
      const response = await client.api.transactions[":id"]["$delete"]({
        param: { id },
      });

      return (await response.json()) as ResponseType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transaction deleted");

      // TODO: Also invalidate summary
    },
    onError: () => {
      toast.error("Failed to delete transaction");
    },
  });

  return mutation;
};
