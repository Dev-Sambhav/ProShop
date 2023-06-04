import { Spinner, Button } from "react-bootstrap";

const Loader = () => {
  return (
    <Button variant="primary" className="mt-2" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  );
};
export default Loader;
