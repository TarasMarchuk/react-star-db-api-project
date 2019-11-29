import React, {Component} from "react";

export default class PersonView extends Component {

  render() {
    const {item, image} = this.props;
    return (
      <React.Fragment>
        <img className="item-image"
             src={image}
             alt="" />

        <div className="card-body">
          <h4>{item.name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child, idx) => {
                return React.cloneElement(child, {item});
              })
            }
          </ul>
        </div>
      </React.Fragment>
    )
  }
}