import CMS from "netlify-cms";
import { ImagesController, ImagesPreview } from "./images";
import "./cms.css";
CMS.registerWidget("images", ImagesController, ImagesPreview);
CMS.registerPreviewStyle("./cms.css");
