import { useEffect, useState } from "react";

interface Props {
  onChange?: (str: string) => void;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
}

export default function Input({ onChange, className, type }: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value, onChange]);

  return (
    <input
      className="mb-8 border text-xl p-2 bg-white/75 border-slate-700"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  );
}
