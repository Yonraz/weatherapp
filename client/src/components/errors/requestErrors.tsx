import { RequestError } from "../../types/requestTypes";

interface RequestErrorsProps {
  errors: RequestError[] | null;
}
const RequestErrors: React.FC<RequestErrorsProps> = ({ errors }) => {
  return (
    errors &&
    errors.map((err, i) => (
      <li key={i} className="error">
        {err.message}
      </li>
    ))
  );
};

export default RequestErrors
