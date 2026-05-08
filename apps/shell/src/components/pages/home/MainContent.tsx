import ServiceBox from "@components/common/ServiceBox";
import {
  DirectionsBusOutlined,
  LightbulbOutlined,
  LocalFireDepartmentOutlined,
} from "@superapp/icons";
import { Link } from "react-router-dom";

const MainContentItems = [
  {
    title: "کارت سبز",
    icon: <LocalFireDepartmentOutlined />,
    href: "temp",
  },

  {
    title: "ترابری",
    icon: <DirectionsBusOutlined />,
    href: "temp",
  },
  {
    title: "ثبت پیشنهاد",
    icon: <LightbulbOutlined />,
    href: "temp",
  },
  {
    title: "کارت سبز",
    icon: <LocalFireDepartmentOutlined />,
    href: "temp",
  },

  {
    title: "ترابری",
    icon: <DirectionsBusOutlined />,
    href: "temp",
  },
  {
    title: "ثبت پیشنهاد",
    icon: <LightbulbOutlined />,
    href: "temp",
  },
  {
    title: "کارت سبز",
    icon: <LocalFireDepartmentOutlined />,
    href: "temp",
  },

  {
    title: "ترابری",
    icon: <DirectionsBusOutlined />,
    href: "temp",
  },
  {
    title: "ثبت پیشنهاد",
    icon: <LightbulbOutlined />,
    href: "temp",
  },
  {
    title: "کارت سبز",
    icon: <LocalFireDepartmentOutlined />,
    href: "temp",
  },

  {
    title: "ترابری",
    icon: <DirectionsBusOutlined />,
    href: "temp",
  },
  {
    title: "ثبت پیشنهاد",
    icon: <LightbulbOutlined />,
    href: "temp",
  },
];

const MainContent = () => {
  return (
    <div className="w-full flex flex-wrap">
      {MainContentItems?.map((item) => (
        <div className="w-1/4 flex justify-center items-center">
          <Link to={item.href}>
            <ServiceBox title={item.title} icon={item.icon} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
