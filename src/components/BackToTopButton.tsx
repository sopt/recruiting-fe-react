import { IconArrowUp } from "@sopt-makers/icons";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const ShowButtonClick = () => {
      if (window.scrollY > 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", ShowButtonClick);
    return () => {
      window.removeEventListener("scroll", ShowButtonClick);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={MoveToTop}
      className={`${
        showButton ? "visible" : "hidden"
      } fixed bottom-[4rem] right-[4rem] p-[1rem] bg-gray700 rounded-[100px] border-[1px] border-gray600 cursor-pointer`}
    >
      <IconArrowUp style={{ width: "2.4rem" }} />
    </button>
  );
};

export default BackToTopButton;
