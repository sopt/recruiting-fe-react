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
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const scrollContainer = buttonRef.current.closest('.overflow-x-auto');
      const scrollLeft = scrollContainer?.scrollLeft || 0;

      setPosition({
        top: rect.bottom + 10,
        left: rect.left - scrollLeft,
      });
    }
    setIsOpen((prev) => !prev);
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
              top: position.top,
              left: position.left,
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
