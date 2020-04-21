import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#F74375"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#F74375"
    }
  }
})(TextField);

export const ColorButton = withStyles((theme) => ({
  root: {
    borderRadius: "1rem",
    margin: "1.5rem 0 2rem 0",
    border: "none",
    color: "white",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    "&:hover": {
      background: "linear-gradient(45deg, #ea5978 30%, #ea834f 90%)"
    }
  }
}))(Button);
