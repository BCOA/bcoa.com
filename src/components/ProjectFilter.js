import React, { Component } from "react";
import classnames from "classnames";

export default class ProjectFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOpen: false,
    };
  }

  toggleFilter = () => {
    this.state.filterOpen
      ? this.setState({ filterOpen: false })
      : this.setState({ filterOpen: true });
  };

  render() {
    const filterButtonClasses = classnames({
      "marginBottom-6": this.state.filterOpen,
      "bp-marginBottom-0": true,
    });
    return (
      <div className="f-subhead c-gray flex flex-col items-end">
        {!this.props.isWindowLarge && (
          <div className={filterButtonClasses}>
            <button className="margin-0" onClick={this.toggleFilter}>
              Project Categories{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  textAlign: "center",
                }}
              >
                {this.state.filterOpen ? "-" : "+"}
              </span>
            </button>
          </div>
        )}
        {(this.state.filterOpen || this.props.isWindowLarge) && (
          <div>
            <div className="radio marginBottom-4 bp-1_marginBottom-0">
              <input
                name="filter"
                type="radio"
                id="all"
                defaultChecked="true"
                onChange={(el) => this.props.onChange(el.target.id)}
              />
              <label className="marginRight-4" htmlFor="all">
                All Projects
              </label>
            </div>
            {this.props.items &&
              this.props.items.map((category) => {
                return (
                  <div
                    key={category}
                    className="radio marginBottom-4 bp-1_marginBottom-0"
                  >
                    <input
                      name="filter"
                      type="radio"
                      id={category}
                      onChange={(el) => this.props.onChange(el.target.id)}
                    />
                    <label className="marginRight-4" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }
}
