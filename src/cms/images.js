import React, { Component } from "react";
import styled from "styled-components";

//editing component
export class ImagesController extends Component {
	render() {
		const URL = CMS.getWidget("image").control;
		const AltText = CMS.getWidget("string").control;
		const Caption = CMS.getWidget("text").control;
		return (
			<div>
				<URL {...this.props} />
				<AltText {...this.props} />
				<Caption {...this.props} />
			</div>
		);
	}
}
//preview component
export const ImagesPreview = props => {
	const URLPreview = CMS.getWidget("image").preview;
	const AltText = CMS.getWidget("string").preview;
	const Caption = CMS.getWidget("text").preview;
	return (
		<div>
			<URLPreview {...props} />
			<AltText {...props} />
			<Caption {...props} />
		</div>
	);
}