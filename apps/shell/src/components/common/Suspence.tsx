import React, { Suspense } from "react";

const Loadable = <P extends {}>(Component: React.ComponentType<P>) =>
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

export default Loadable;
