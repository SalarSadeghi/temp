import ServiceBox from "@components/common/ServiceBox";
import {
  AccountBalanceWalletOutlined,
  ForumOutlined,
  ReceiptOutlined,
} from "@superapp/icons";

const FooterItems = [
  { title: "کیف پول", icon: <AccountBalanceWalletOutlined /> },
  { title: "فیش حقوقی", icon: <ReceiptOutlined /> },
  { title: "درس آموخته", icon: <ForumOutlined /> },
];

const Footer = () => {
  return (
    <div className="h-full w-full flex justify-between">
      {FooterItems?.map((item) => (
        <ServiceBox
          outerBoxClassName="border-0 p-0 bg-none"
          innerBoxClassName="rounded-full"
          title={item.title}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Footer;
