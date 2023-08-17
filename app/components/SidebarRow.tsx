import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  title: string;
  onClick?: () => {};
};

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.()}
      className="max-w-fit rounded-full flex items-center space-x-2 px-4 py-3 hover:bg-gray-100 transition-all duration-200 group cursor-pointer"
    >
      <Icon className="h-6 w-6" />
      <p className="hidden md:inline-flex group-hover:text-twitter text-base font-light lg:text-xl">
        {title}
      </p>
    </div>
  );
}

export default SidebarRow;
