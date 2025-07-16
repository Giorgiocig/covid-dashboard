export const SkeletonLoader = ({ height = "h-64" }: { height?: string }) => (
  <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm">
    <div className="animate-pulse space-y-4">
      <div className="bg-muted/60 rounded-lg h-6 w-3/4 mx-auto"></div>
      <div className="bg-muted/80 rounded-lg h-8 w-1/2 mx-auto"></div>
      <div className={`bg-muted/40 rounded-lg ${height} w-full`}></div>
    </div>
  </div>
);
