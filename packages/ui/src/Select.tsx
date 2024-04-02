import React from "react";
interface SelectProps {
  onSelect: any;
  options: [
    {
      name: string;
      redirectUrl: string;
    },
  ];
}
const Select = ({ onSelect, options }: SelectProps) => {
  return (
    <select
      className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 w-full focus:border-blue-500 block p-2.5"
      onChange={onSelect}
    >
      <option>--Select bank--</option>
      {options.map((data) => {
        return (
          <option
            key={data.name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {data.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
