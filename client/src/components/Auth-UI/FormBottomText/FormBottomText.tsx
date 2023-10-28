import { Typography } from "@mui/material";
import variables from "@Sass/variables.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  navigateTo: string;
  whiteText?: string;
  actionText: string;
  marginTop?: string;
}

const FormBottomText = ({
  navigateTo,
  whiteText,
  actionText,
  marginTop,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Typography sx={{ color: "white", marginTop: marginTop }}>
      {whiteText}{" "}
      <Typography
        onClick={() => navigate(navigateTo)}
        component={"span"}
        sx={{ color: variables.secondActionColor, fontSize: "18px" }}
      >
        {actionText}
      </Typography>
    </Typography>
  );
};

export default FormBottomText;
