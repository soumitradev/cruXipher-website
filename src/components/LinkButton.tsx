import { Link } from "react-router-dom";
import Twemoji from "./Twemoji";

type Props = {
  linkText: string;
  url: string;
  textColor?: string;
  twemoji?: string;
  textSize?: string;
  className?: string;
};

const LinkButton = ({
  linkText,
  url,
  textColor = "text-white",
  twemoji = undefined,
  textSize = "text-xl",
  className = "",
}: Props) => {
  return (
    <Link
      to={url}
      className={`${textColor} ${textSize} underline underline-offset-4 hover:bg-opacity-20 transition-all ease-in-out duration-300 ${className}`}
    >
      {linkText}
      {twemoji && <Twemoji emoji={twemoji} />}
    </Link>
  );
};

export default LinkButton;
