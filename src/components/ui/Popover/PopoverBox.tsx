import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface PopoverBoxProps {
  ButtonComponent: JSX.Element;
  children: JSX.Element | JSX.Element[];
  role?: string;
}

function PopoverBox({
  ButtonComponent,
  children,
  role,
}: PopoverBoxProps): JSX.Element {
  return (
    <div role={role}>
      <Popover className="relative">
        {() => (
          <>
            <Popover.Button>{ButtonComponent}</Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                role={"popover-content"}
                className="z-10 absolute p-1 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {children}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

export default PopoverBox;
