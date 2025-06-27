import Chip from '@/components/Chip';
import { CHIP_STATUS } from '@/pages/Application/constants';
import { useEffect, useRef, useState } from 'react';

interface ChipDropDownProps {
  status: string;
  onStatusChange: (newStatus: string) => void;
}

const ChipDropDown = ({ status, onStatusChange }: ChipDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="focus:outline-none"
        type="button"
      >
        <Chip
          className={`${CHIP_STATUS[status as keyof typeof CHIP_STATUS]} cursor-pointer`}
        >
          {status}
        </Chip>
      </button>

      <div
        className={`absolute left-0 mt-[0.5rem] bg-gray800 w-[9.6rem] gap-[0.6rem] rounded-[1.3rem] shadow-lg z-50 transition-all duration-200 ease-out ${
          isOpen
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform -translate-y-2 pointer-events-none'
        }`}
      >
        {Object.keys(CHIP_STATUS).map((option) => (
          <button
            key={option}
            onClick={() => handleStatusChange(option)}
            className="w-full p-2 transition-colors rounded-[1.3rem] duration-200 text-left cursor-pointer hover:bg-gray700"
            type="button"
          >
            <Chip
              className={`${CHIP_STATUS[option as keyof typeof CHIP_STATUS]} w-fit`}
            >
              {option}
            </Chip>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChipDropDown;
