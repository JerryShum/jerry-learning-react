function CartOverview() {
  return (
    <div className="bg-stone-800 uppercase text-stone-200">
      <p className="text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <a href="/cart">Open cart &rarr;</a>
    </div>
  );
}

export default CartOverview;
