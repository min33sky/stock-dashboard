import { mockCompanyDetails } from '../constants/mock';
import Card from './Card';
import Header from './Header';

export default function Dashboard() {
  return (
    <div
      className="grid-rows-8 md:grid-rows-7 grid h-screen auto-rows-fr grid-cols-1 gap-6 bg-neutral-100
                  p-10 font-quicksand md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-5"
    >
      <div className="col-span-1 row-span-1 flex items-center justify-start md:col-span-2 xl:col-span-3">
        <Header name={mockCompanyDetails.name} />
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
