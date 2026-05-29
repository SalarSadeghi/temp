import ServiceBox from "@components/common/ServiceBox";
import {
  DirectionsBusOutlined,
  LightbulbOutlined,
  LocalFireDepartmentOutlined,
} from "@superapp/icons";
import { Link } from "react-router-dom";
import { Button } from "@superapp/ui/components";

const MainContentItems = [
  {
    title: "کارت سبز",
    icon: <LocalFireDepartmentOutlined />,
    href: "soe/greencard/register",
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
      <div className="flex gap-4">
        <Button variant="contained" color="primary">
          ثبت پیشنهاد
        </Button>
        <Button variant="contained" color="secondary">
          ثبت پیشنهاد
        </Button>
        <Button variant="contained" color="success">
          ثبت پیشنهاد
        </Button>
        <Button className="" variant="contained" color="error">
          ثبت پیشنهاد
        </Button>

        <Button variant="contained" color="info">
          ثبت پیشنهاد
        </Button>
        <Button variant="contained" color="warning">
          ثبت پیشنهاد
        </Button>
      </div>
    </div>
  );
};

export default MainContent;
