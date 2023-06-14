import { Button, Col, Row, Table } from "react-bootstrap";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Message, SpinLoader } from "../../components";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();

  // create a new product handler
  const handleCreateProduct = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  // delete product handler
  const handleDelete = (productId) => {
    console.log("delete", productId);
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={handleCreateProduct}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {createLoading && <SpinLoader />}
      {isLoading ? (
        <SpinLoader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <th>{product._id}</th>
                  <th>{product.name}</th>
                  <th>{product.price}</th>
                  <th>{product.category}</th>
                  <th>{product.brand}</th>
                  <th>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrash />
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
export default ProductListScreen;
