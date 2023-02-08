import { useState } from "react";

interface Props {
  children: string;
  onClick?: (() => void) | (() => Promise<void>);
  async?: boolean;
  className?: string;
}

export default function Button({ children, onClick, className, async }: Props) {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = async () => {
    if (!onClick) return;
    if (!async) {
      onClick();
    } else {
      setIsSpinning(true);
      await onClick();
      setIsSpinning(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${className} border border-black p-2 my-2
      hover:bg-[rgba(0,0,0,0.2)] hover:cursor-pointer 
      transition-all bg-slate-400/50`}
    >
      {isSpinning ? (
        <p>spin</p>
      ) : (
        <p className="m-auto text-center">{children}</p>
      )}
    </div>
  );
}
