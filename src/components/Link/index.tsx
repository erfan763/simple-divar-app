import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Link({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  to: string;
  sx?: SxProps<Theme>;
  className?: string;
}) {
  return (
    <MuiLink component={RouterLink} to={props.to} sx={props.sx} className={className}>
      {children}
    </MuiLink>
  );
}
