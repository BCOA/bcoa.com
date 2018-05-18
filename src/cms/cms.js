import CMS from "netlify-cms/dist/cms";
import { ImagesController, ImagesPreview } from "./images";
CMS.registerWidget("images", ImagesController, ImagesPreview);
CMS.registerPreviewStyle("./cms.css");
