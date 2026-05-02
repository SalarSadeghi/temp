import ServiceBox from "@components/common/ServiceBox";
import { LocalFireDepartment } from "@superapp/icons";

const MainContent = () => {
  return (
    <div className="w-full">
      <ServiceBox
        title={"کارت سبز"}
        icon={<LocalFireDepartment className="text-blue-600" />}
      />
    </div>
  );
};

export default MainContent;
