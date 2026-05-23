import Header from "./header/Header";

interface Props {
  children?: React.ReactNode;
}

const Layout = (props: Props) => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
