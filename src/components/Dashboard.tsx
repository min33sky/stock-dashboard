import Card from './Card';

export default function Dashboard() {
  return (
    <div
      className="grid h-screen auto-rows-fr grid-cols-1 gap-6 font-quicksand
                    md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-5"
    >
      <div className="col-span-1 row-span-1 md:col-span-2 xl:col-span-3">
        <Card>Header</Card>
      </div>
      <div className="row-span-4 md:col-span-2">
        <Card>Chart</Card>
      </div>
      <div>
        <Card>Overview</Card>
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Card>Details</Card>
      </div>
    </div>
  );
}
