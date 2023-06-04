import { Row, Col } from "react-bootstrap";
import { SpinLoader, Message, Product } from "../components";
import { useGetProductsQuery } from "../slices/productsApiSlice";
const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <SpinLoader/>
      ) : error ? (
        <div>
          <Message variant="danger">
          {error?.data?.message}||{error.error}
          </Message>
        </div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products &&
              products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </>
  );
};
export default HomeScreen;
