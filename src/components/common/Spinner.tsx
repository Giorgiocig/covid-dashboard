export default function Spinner() {
  return (
    <div className="w-[500px] h-[500px] flex items-center justify-center  rounded">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary" />
    </div>
  );
}
