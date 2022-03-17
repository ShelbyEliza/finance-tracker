export default function MonthDetails({ budget, closePanel }) {
  console.log(budget.month);

  return (
    <div>
      <h2>{budget.month}</h2>
      <button onClick={closePanel}>X</button>
    </div>
  );
}
