import React, { useEffect, useState } from "react";
import Layout from "../../Layout/layout";
import AdminMenu from "../../Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  // States
  const [pid, setPid] = useState(""); // Actual MongoDB _id
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/view-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  // Get single product by slug
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      const p = data.product;
      setName(p.name);
      setDescription(p.description);
      setPrice(p.price);
      setQuantity(p.quantity);
      setCategory(p.category._id);
      setPid(p._id); // ✅ setting actual MongoDB ID
    } catch (error) {
      console.log(error);
      toast.error("Error loading product details");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);
   // =====================
  //  update product
 // =======================

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${pid}`,
        productData
      );

      if (data.success) {
        toast.success("Product updated successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error("Error updating product");
    }

    }
  };
   // =====================
  //  delete  product
 // ====================== 
  const handleDelete = async () => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this product?");
      if (!confirm) return;

      const { data } = await axios.delete(`/api/v1/product/delete-product/${pid}`);
      if (data.success) {
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message || "Product deletion failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Deleting Product");
    }
  };

  return (
    <Layout title="Update Product">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Update Product</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              {photo && (
                <div className="mb-3">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="">Select Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" onSubmit={handleUpdate}>
                  Update Product
                </button>

                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
