import Chip from '@/components/Chip';
import { CHIP_STATUS } from '@/pages/Application/constants';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ChipDropDownProps {
  status: string;
  onStatusChange: (newStatus: string) => void;
}

const ChipDropDown = ({ status, onStatusChange }: ChipDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsOpen(false);

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedInside =
        buttonRef.current?.contains(target) ||
        dropdownRef.current?.contains(target);

      if (!clickedInside) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', closeDropdown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', closeDropdown);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
        className="focus:outline-none"
        type="button"
      >
        <Chip
          className={`${CHIP_STATUS[status as keyof typeof CHIP_STATUS]} cursor-pointer`}
        >
          {status}
        </Chip>
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed bg-gray800 w-[9.6rem] rounded-[1.3rem] shadow-lg z-[9999]"
            style={{
              top: buttonRef.current?.getBoundingClientRect().bottom! + 10,
              left: buttonRef.current?.getBoundingClientRect().left!,
            }}
          >
            {Object.keys(CHIP_STATUS).map((option) => (
              <button
                key={option}
                className="w-full p-2 transition-colors rounded-[1.3rem] duration-200 text-left cursor-pointer hover:bg-gray700"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(option);
                }}
              >
                <Chip
                  className={`${CHIP_STATUS[option as keyof typeof CHIP_STATUS]} w-fit`}
                >
                  {option}
                </Chip>
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
};

export default ChipDropDown;
