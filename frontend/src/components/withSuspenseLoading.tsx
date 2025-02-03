import { ComponentType, FC, Suspense } from "react";
import PageLoading from "./PageLoading";

function withSuspenseLoading<P extends object>(
  Component: ComponentType<P>
): FC<P> {
  return (props: P) => (
    <Suspense fallback={<PageLoading />}>
      <Component {...props} />
    </Suspense>
  );
}

export default withSuspenseLoading;
