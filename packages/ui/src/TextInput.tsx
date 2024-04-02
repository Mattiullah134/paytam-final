import React from "react";
interface InputProps {
  label: string;
  placeholder: string;
  onChange: any;
  value?: string;
}
const TextInput = ({ label, placeholder, onChange, value }: InputProps) => {
  return (
    <div className="w-full my-3">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-black"
      >
        {label}
      </label>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 w-full focus:border-blue-500 block p-2.5"
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
