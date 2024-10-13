import React, { useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useAppSelector } from "../../hooks";
import { selectLoading } from "../../redux/selectors";

const Loader: React.FC = () => {
  const isLoader = useAppSelector(selectLoading);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isLoader && ref.current) {
      ref.current.showModal();
      document.body.style.overflow = "hidden";
    } else if (ref.current) {
      ref.current.close();
      document.body.style.overflow = "auto";
    }
  });
  return (
    <dialog ref={ref}>
      <div className="border-0">
        <ThreeDots
          visible={true}
          height="150"
          width="150"
          color="lightblue"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass="loaderWrapper"
        />
      </div>
    </dialog>
  );
};

export default Loader;
