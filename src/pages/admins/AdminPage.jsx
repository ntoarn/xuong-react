import React, { useEffect, useState } from 'react';
import instance from '../../apis/index';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await instance.get("/products");
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
  }, []);

  const handleDelProduct = (id) => {
    (async () => {
      try {
        const confirmValue = confirm("Bạn chắc chưa?");
        if (confirmValue) {
          await instance.delete(`/products/${id}`);
          toast.success("Xóa thành công");
          setProducts(products.filter((item) => item.id !== id));
          setFilteredProducts(filteredProducts.filter((item) => item.id !== id));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  };


  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) => {
        const matchesName = product.title.toLowerCase().includes(search.toLowerCase());
        return matchesName ;
      });
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [search, products]);
  
  const onDel = (id) => {
    handleDelProduct(id);
  };

  return (
    <>
      <div className="container mt-5">
        <Link className="btn btn-primary mb-3" to="/admin/product-form">
          Add new product
        </Link>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(t) => setSearch(t.target.value)}
            className="form-control mb-2"
          />
        </div>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img src={item.thumbnail} alt={item.title} width={50} />
                </td>
                <td>{item.title}</td>
                <td>{item.price}$</td>
                <td>{item.description}</td>
                <td>
                  <Link to={`/admin/product-form/edit/${item.id}`} className="btn btn-primary btn-sm mr-2">
                    Edit
                  </Link>
                  <button onClick={() => onDel(item.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </>
  );
};

export default AdminPage;
