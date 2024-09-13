import { useSelector } from 'react-redux';

function Username() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="hidden text-sm font-semibold md:block">
      {!username ? '' : username}
    </div>
  );
}

export default Username;
