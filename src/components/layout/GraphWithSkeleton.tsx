import { SkeletonLoader } from "../common/SkeletonLoader";

export default function GraphWithSkeleton({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return <>{isLoading ? <SkeletonLoader /> : children}</>;
}
