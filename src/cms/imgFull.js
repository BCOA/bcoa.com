import React, { Component } from "react";
import styled from "styled-components";
//globals
const ImgFull = props => {
  styled.div`
    position: relative;
    height: 40vh;
    margin-bottom: 16px;
  `;
};
// This is the editing component
export class ImgFull extends Component {
  render() {
    return
      <div>
          <ImgFull
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height:'100%'
            }}
        />
      </div>
    ;
  };
};