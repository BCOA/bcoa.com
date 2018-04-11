import React, { Component } from "react";
import styled from "styled-components";

//editing component
export class ImagesController extends Component {
	render() {
		const URL = CMS.getWidget("string").control;
		return (
			<div>
				<URL {...this.props} />
			</div>
		);
	}
}
//preview component
export const ImagesPreview = props => {
	const URLPreview = CMS.getWidget("string").preview;
	return (
		<div>
			<URLPreview {...props} />
		</div>
	);
}