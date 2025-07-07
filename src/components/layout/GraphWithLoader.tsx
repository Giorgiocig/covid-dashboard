import Spinner from "../common/Spinner";

export default function GraphWithLoader({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return <>{isLoading ? <Spinner /> : children}</>;
}
