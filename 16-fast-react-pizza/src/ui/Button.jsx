import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type }) {
  const base =
    'text-sm inline-block rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-3 py-1 md:py-2.5 md:px-5 text-xs',
    secondary:
      'text-sm inline-block rounded-full font-semibold border-stone-300 border uppercase tracking-wide text-stone-500 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-700 focus:bg-stone-300  focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-3 md:px-6 md:py-4',
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
export default Button;
