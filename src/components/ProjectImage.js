import React from 'react'
import classnames from "classnames";



import Image from "./Image";

export default (props) => {
  const classes = classnames(props.className, {
    'colSpan-1': (props.image.colWidth === '1'),
    'colSpan-2': (props.image.colWidth === '2'),
    'colSpan-3': (props.image.colWidth === '3'),
    'colSpan-4': (props.image.colWidth === '4'),
    'colSpan-5': (props.image.colWidth === '5'),
    'colSpan-6': (props.image.colWidth === '6'),
    'colSpan-7': (props.image.colWidth === '7'),
    'colSpan-8': (props.image.colWidth === '8'),
    'colSpan-9': (props.image.colWidth === '9'),
    'colSpan-10': (props.image.colWidth === '10'),
    'colSpan-11': (props.image.colWidth === '11'),
    'colSpan-12': (props.image.colWidth === '12'),
    'marginBottom-6 project-image-wrapper': true,
    // 'project-image-wrapper': true
  })

  console.log(props);

  return (
    <figure key={props.i} className={classes}>
      <Image image={props.image} />
      {props.image.caption &&
        <div className="marginTop-1">
          –
          <figcaption className='f-caption'>{props.image.caption}</figcaption>
        </div>
      }
    </figure>
  )
}

