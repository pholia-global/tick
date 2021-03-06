import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface MenuBoxProps {
  buttonComponent: JSX.Element;
  role?: string;
  MenuItems: JSX.Element[];
}

const MenuBox = ({
  buttonComponent,
  MenuItems,
  ...props
}: MenuBoxProps): JSX.Element => {
  return (
    <div className="text-right" {...props}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex items-center justify-center w-full focus:outline-none">
            {buttonComponent}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-10 absolute p-1 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {MenuItems.map((menuItem, index) => (
              <Menu.Item key={`${menuItem.key}-${index}`}>
                {() => menuItem}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MenuBox;
