import CMS from "netlify-cms";
import { ImagesController, ImagesPreview } from "./images";
CMS.registerWidget("images", ImagesController, ImagesPreview);
