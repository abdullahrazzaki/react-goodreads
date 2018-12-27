import React, { Component } from "react";

/**
 * Component that alerts if you click outside of it
 */
type Props = {
  onClickOutside: () => any;
};
export default class OutsideAlerter extends Component<Props> {
  wrapperRef: HTMLDivElement | null = null;
  constructor(props: Props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node: HTMLDivElement | null) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event: MouseEvent) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target as Node)) {
      this.props.onClickOutside();
    }
  }

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  }
}
