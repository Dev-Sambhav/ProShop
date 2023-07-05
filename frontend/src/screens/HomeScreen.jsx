import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { SpinLoader, Message, Product } from "../components";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useEffect } from "react";
import {Paginate} from "../components"
const HomeScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      {isLoading ? (
        <SpinLoader />
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
            {data.products &&
              data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate pages={data.pages} page={data.currPage}/>
        </>
      )}
    </>
  );
};
export default HomeScreen;
