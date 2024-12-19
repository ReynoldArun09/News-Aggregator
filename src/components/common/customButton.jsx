/* eslint-disable react/prop-types */
import { cn } from "../../utils";

export default function CustomButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none hover:shadow-lg focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
