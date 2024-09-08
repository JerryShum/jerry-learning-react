import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();
  const classname = 'text-sm text-blue-500 hover:text-blue-600 hover:underline';

  if (to === '-1') {
    return (
      <button onClick={() => navigate(-1)} className={classname}>
        {children}
      </button>
    );
  }
  return (
    <Link to={to} className={classname}>
      {children}
    </Link>
  );
}

export default LinkButton;
