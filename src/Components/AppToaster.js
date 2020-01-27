import { Toaster, Position } from "@blueprintjs/core";

const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP_RIGHT
});

export default AppToaster;
