export default function Card({
  text,
  data,
  isLoading,
}: {
  text: string;
  data: number | string;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col">
      <p className="text-2xl pb-2 text-center">{text}</p>
      <p className="text-3xl text-center font-bold">
        {isLoading ? "Loading data" : data}
      </p>
    </div>
  );
}
