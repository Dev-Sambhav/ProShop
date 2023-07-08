import { Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { SpinLoader, Message, Product } from "../components";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useEffect } from "react";
import { Paginate } from "../components";
import { ProductCarousel } from "../components";
import { Meta } from "../components";
const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-3">
          Go Back
        </Link>
      )}
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
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products &&
              data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.currPage}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};
export default HomeScreen;
