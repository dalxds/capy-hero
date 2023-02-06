import { FallbackProps } from "react-error-boundary";
import { Frown } from "lucide-react";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="h-screen flex justify-center">
    <div className="h-full flex flex-col flex-wrap space-y-4 items-center justify-center text-center">
      <div id="Name" className="text-2xl text-sui font-bold">
        capy hero
      </div>
      <Frown />
      <div>oops! something went wrong</div>
      <div className="text-xs text-slate-500 max-w-[50%]">{error.message}</div>
    </div>
  </div>
);

export default ErrorFallback;
