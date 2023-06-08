import { ReactNode } from "react";

type ModalProps = {
  element: any;
  show: boolean;
  children: ReactNode;
  width: "large" | "medium" | "small";
};

export default function Modal({ children, width, show, element }: ModalProps) {
  const modalWidth = {
    large: "w-5/12",
    medium: "w-4/12",
    small: "w-3/12",
  }

  return (
    <>
      {show && (
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-neutral-700/50">
          <div className={`${modalWidth[width]} animate-open-modal rounded-lg bg-neutral-800`} ref={element}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
