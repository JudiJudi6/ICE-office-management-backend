import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

export const SectionsToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    slotProps={{
      popper: {
        sx: {
          [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
            {
              marginTop: "0px",
            },
          [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
            {
              marginBottom: "0px",
            },
          [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
            {
              marginLeft: "0px",
            },
          [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
            {
              marginRight: "0px",
            },
        },
      },
    }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fefefe",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    padding: 8,
  },
}));
