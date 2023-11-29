import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const handleSelect = (option) => {
    // setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className=" bg-[rgba(144,122,34,255)] text-[rgba(215,213,211,255)]  font-black font-lg border border-[rgba(215,213,211,255)] rounded-md py-1 px-3  focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white text-black border border-gray-300 rounded-md py-1 w-[90px]">
          {options.map((option) => (
            <button
              key={option.value}
              className="text-sm py-1 px-3 hover:bg-gray-100 w-full text-left"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
