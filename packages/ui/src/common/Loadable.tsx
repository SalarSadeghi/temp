import React, { Suspense } from "react";

export const Loadable = <P extends {}>(Component: React.ComponentType<P>) =>
  function (props: P) {
    return (
      <Suspense
        fallback={
          <div className="flex justify-center items-center">
            لطفا منتظر بمانید...
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
