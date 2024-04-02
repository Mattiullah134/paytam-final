import { Card } from "@repo/ui/card";

interface PropsType {
  time: Date | string;
  amount: number;
  status: string;
  provider: string;
}
interface Props {
  transacions: PropsType[];
}
const OnRampTransaction = async ({ transacions }: Props) => {
  return (
    <Card title="Recent Transactions">
      {transacions.length > 0 ? (
        transacions?.map((data, i) => {
          return (
            <div key={i} className="flex justify-between items-center">
              <div>
                <p className="font-medium">Received Pkr</p>
                <p className="font-normal">{data.time.toString()}</p>
              </div>
              <div>
                <p className="font-normal">+ Rs {data.amount / 100}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
};

export default OnRampTransaction;
