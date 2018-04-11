import React, { Component } from "react";
import styled from "styled-components";

//editing component
export class ImagesController extends Component {
	render() {
		const URL = CMS.getWidget("image").control;
		const altText = CMS.getWidget("string").control;
		const caption = CMS.getWidget("text").control;
		return (
			<div>
				<URL {...this.props} />
				<altText {...this.props} />
				<caption {...this.props} />
			</div>
		);
	}
}
//preview component
export const ImagesPreview = props => {
	const URLPreview = CMS.getWidget("image").preview;
	const altText = CMS.getWidget("string").preview;
	const caption = CMS.getWidget("text").preview;
	return (
		<div>
			<URLPreview {...props} />
			<altText {...props} />
			<caption {...props} />
		</div>
	);
}