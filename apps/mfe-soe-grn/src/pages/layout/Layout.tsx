import Header from "./header/Header";

interface Props {
  children?: React.ReactNode;
}

const Layout = (props: Props) => {
  console.log("layout is called");
  
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Header />
      <div className="overflow-auto">{props.children}</div>
    </div>
  );
};

export default Layout;
