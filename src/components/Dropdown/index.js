import React from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.scss';

class DropdownTrigger extends React.Component {
  render() {
    return this.props.children;
  }
}

class DropdownContent extends React.Component {
  render() {
    return this.props.children;
  }
}

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  hide = () => {
    this.setState({ show: false });
  };

  toggle = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { show } = this.state;

    const children = this.props.children;

    const contentClass = show
      ? `${styles.content} ${styles.show}`
      : styles.content;

    return (
      <div className={styles.container}>
        <div
          className={styles.trigger}
          tabIndex="0"
          onBlur={this.hide}
          onClick={this.toggle}
        >
          {this.props.children[0]}
        </div>
        <div className={contentClass}>{this.props.children[1]}</div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  children: PropTypes.arrayOf(function(propValue, key) {
    if (key > 1) {
      return new Error('Children Must Be DropdownTrigger and DropdownContent');
    }
    if (key === 0 && propValue[0].type.name !== DropdownTrigger.name) {
      return new Error('First Child Must Be a Dropdown Trigger Element');
    }
    if (key === 1 && propValue[1].type.name !== DropdownContent.name) {
      return new Error('Second Child Must Be a Dropdown Content Element');
    }
  })
};

Dropdown.DropdownTrigger = DropdownTrigger;
Dropdown.DropdownContent = DropdownContent;

export default Dropdown;
