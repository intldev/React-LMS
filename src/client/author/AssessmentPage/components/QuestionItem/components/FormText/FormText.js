import React from "react";
import PropTypes from "prop-types";
import { Input } from "antd";

import { QuestionText } from "../../common/Form";

export default class FormText extends React.Component {
  static propTypes = {
    saveAnswer: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(["edit", "review"]).isRequired,
    question: PropTypes.object.isRequired,
    onCreateAnswer: PropTypes.func.isRequired
  };

  state = {
    currentValue: ""
  };

  handleChange = ({ target: { value } }) => {
    const { saveAnswer } = this.props;

    this.setState({ currentValue: value }, () => {
      saveAnswer(value);
    });
  };

  renderView = () => {
    const {
      question: {
        validation: {
          valid_response: { value }
        }
      }
    } = this.props;

    if (!value || !value.length) return this.renderAnswerCreateForm();

    return <QuestionText>{value}</QuestionText>;
  };

  renderForm = () => {
    const { currentValue } = this.state;
    return <Input size="large" value={currentValue} onChange={this.handleChange} />;
  };

  renderAnswerCreateForm = () => {
    const {
      question: { id, type },
      onCreateAnswer
    } = this.props;

    return <Input size="large" onPressEnter={onCreateAnswer(id, type)} />;
  };

  render() {
    const { mode } = this.props;

    switch (mode) {
      case "edit":
        return this.renderView();
      case "review":
        return this.renderForm();
      default:
        return null;
    }
  }
}