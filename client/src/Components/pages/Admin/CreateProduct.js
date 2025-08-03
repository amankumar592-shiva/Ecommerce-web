import React, { useEffect, useState } from 'react';
import AdminMenu from '../../Layout/AdminMenu';
import Layout from '../../Layout/layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from "antd";
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState('');
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");

 const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/view-category");
          // console.log("API response:", data.categories); 

      if (data?.success) {
        setCategories(data?.categories);
              // console.log("Fetched Categories:", data.viewCategory); 

      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

 

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.error) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error(`something went wrong`);
    }
  };

  return (
    <Layout title={'Dashboard - Create Product'}>
      <div className='container-fluid p-0  dashboard'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Create Product</h1>
            <div className='m-1 w-75'>
              <Select
                bordered={false}
                placeholder="Select a Category"
                size='large'
                showSearch
                className='form-select mb-3'
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className='mb-3'>
                <label className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type='file'
                    name='photo'
                    accept='image/*'
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {photo && (
                <div className='mb-3 text-center'>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt='product-photo'
                    height={"200px"}
                    className='img img-responsive'
                  />
                </div>
              )}

              <div className='mb-3'>
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  className='form-control'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='mb-3'>
                <textarea
                  value={description}
                  placeholder="Write a description"
                  className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className='mb-3'>
                <input
                  type='number'
                  value={price}
                  placeholder='Write a price'
                  className='form-control'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className='mb-3'>
                <input
                  type='number'
                  value={quantity}
                  placeholder='Write Quantity'
                  className='form-control'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className='mb-3'>
                <Select
                  bordered={false}
                  placeholder='Select Shipping'
                  size='large'
                  className='form-select mb-3'
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="0">NO</Option>
                  <Option value="1">YES</Option>
                </Select>
              </div>

              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
 

export default CreateProduct;
