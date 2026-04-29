import { lazy } from "react";

const TempMFE = lazy(() => import("temp/Temp"));

function App() {
  return (
    <>
      <div className="bg-red-500 h-32 text-lg w-full">This is shell</div>
      <TempMFE />
    </>
  );
}

export default App;
