import TotalEmission from './totalEmission';

export default function HomePage() {
  return (
    <div className="text-gray900 flex flex-col">
      <h1 className="text-2xl font-bold">홈</h1>
      <TotalEmission year={2026} />
    </div>
  );
}
