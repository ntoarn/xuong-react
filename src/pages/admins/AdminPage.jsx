import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import instance from '../../apis/index';
import { ProductContext } from '../../contexts/ProductContext';

const AdminPage = () => {
  const { state, dispatch } = useContext(ProductContext)

  const handleDelProduct = (id) => {
    (async () => {
      if (window.confirm("Ban chac chan chua?")) {
        try {
          await instance.delete(`/products/${id}`);
          toast.success("Xóa thành công");
          dispatch({ type: "DELETE_PRODUCT", payload: id })
          
          // setProducts(products.filter((item) => item.id !== id));
        } catch (error) {
          console.log(error);
        }
      }

    })();
  };

  const onDel = (id) => {
    handleDelProduct(id);
  };

  return (
    <>
      <div className="container mt-5">
        <Link className="btn btn-primary mb-3" to="/admin/product-form">
          Add new product
        </Link>
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
            {state.products.map((item) => (
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
