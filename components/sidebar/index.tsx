import Card from "../card";
import Image from "next/image";
import SidebarLink from "../sidebarlink";
import logo from "@/assets/images/logo.svg";

export interface LinkProp {
  label: string;
  icon: string;
  link: string;
}

const links: LinkProp[] = [
  { label: "Home", icon: "Grid", link: "/home" },
  {
    label: "Calendar",
    icon: "Calendar",
    link: "/calendar",
  },
  { label: "Profile", icon: "User", link: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      <div className="w-full flex justify-center items-center">
        <Image src={logo} alt="Able logo" priority className="w-32" />
      </div>
      {links.map((link) => (
        <SidebarLink key="label" link={link} />
      ))}
    </Card>
  );
};

export default Sidebar;
