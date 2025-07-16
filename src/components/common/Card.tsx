import { Loader } from "lucide-react";

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
    <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-card/80">
      <p className="text-lg font-medium text-muted-foreground text-center mb-3">
        {text}
      </p>

      <div className="flex items-center justify-center min-h-[2.5rem]">
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : (
          <p className="text-3xl lg:text-4xl font-bold text-foreground text-center">
            {typeof data === "number" ? data.toLocaleString() : data}
          </p>
        )}
      </div>
    </div>
  );
}
