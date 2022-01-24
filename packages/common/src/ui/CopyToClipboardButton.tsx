import type { MouseEventHandler } from "react";
import { useCopyToClipboard } from "react-use";
import type { ButtonProps } from "./Button";

interface CopyToClipboardButton extends ButtonProps {
  toCopy: string;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButton> = ({
  children,
  toCopy,
  ...props
}) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  const onClick: MouseEventHandler<HTMLButtonElement> = () => {
    copyToClipboard(toCopy);
  };

  return (
    <button
      disabled={!!state.error || !!state.value}
      {...props}
      onClick={onClick}
    >
      {!!state.error
        ? "common.copy.failed"
        : state.value
        ? "common.copy.succeeded"
        : children || "common.copy.copy"}
    </button>
  );
};
