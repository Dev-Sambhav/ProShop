import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FormContainer, Loader } from "../components";
import { Button, Form, Row, Col } from "react-bootstrap";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // handle password toggle
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // sending and getting response from server
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <div className="d-flex justify-content-between align-items-center position-relative">
            <Form.Control
              type={toggle ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            {toggle ? (
              <GoEye
                className="position-absolute"
                style={{ right: "15" }}
                onClick={handleToggle}
              />
            ) : (
              <GoEyeClosed
                className="position-absolute"
                style={{ right: "15" }}
                onClick={handleToggle}
              />
            )}
          </div>
        </Form.Group>
        {isLoading ? (
          <Loader />
        ) : (
          <Button type="submit" variant="primary" className="mt-2">
            Sign In
          </Button>
        )}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginScreen;
