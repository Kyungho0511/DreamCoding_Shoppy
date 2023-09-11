import styles from "./NewProduct.module.css";
import { useState } from "react";
import Button from "../components/ui/Button";
import { uploadImage } from "../api/uploader";
import { addNewProduct } from "../api/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();

  const queryClient = useQueryClient();
  const addProduct = useMutation(
    ({ product, url }) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file) //
      .then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("Successfully added an item");
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };

  return (
    <section className={styles.container}>
      <h2>List a New Item</h2>
      {success && <p className={styles.status}>✔️ {success}</p>}
      {file && (
        <img
          className={styles.image}
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          name="file"
          required={true}
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="product title"
          required={true}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="price"
          required={true}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="category"
          required={true}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="description"
          required={true}
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="options (separate with commas)"
          required={true}
          onChange={handleChange}
        />
        <Button
          text={isUploading ? "Uploading..." : "List Product"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
