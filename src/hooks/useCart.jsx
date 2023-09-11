import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../context/AuthContext";
import { addOrUpdateToCart, getCart, removeFromCart } from "../api/firebase";

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["carts", uid || ""], () => getCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  const removeItem = useMutation(
    (productId) => {
      removeFromCart(uid, productId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", uid]);
      },
    }
  );

  return { cartQuery, addOrUpdateItem, removeItem };
}
