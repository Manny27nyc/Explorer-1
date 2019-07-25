import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PlainTextarea from 'react-textarea-autosize';

import { Text } from 'components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TextareaContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  /* added this to avoid bug where the top and right :active border disappeared */
  /* padding: ${props => props.theme.baseSpacing}; */
  /* margin: ${props => -props.theme.baseSpacing}; */
`;

const TextareaInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Overlay = styled.div`
  position: absolute;
  top: ${props => props.theme.baseSpacing};
  right: ${props => props.theme.baseSpacing};
  margin-top: ${props => props.theme.sSpacing};
  margin-right: ${props => props.theme.sSpacing};
  border: ${props => props.theme.baseBorder};
  border-radius: ${props => props.theme.baseBorderRadius};
  background: ${props => props.theme.brandWhite};
  padding: ${props => props.theme.sSpacing};
`;

const MarkdownKey = styled.div`
  background-color: ${props => props.theme.brandWhite};
  border: ${props => props.theme.baseBorder};
  border-top: none;
  border-bottom-right-radius: ${props => props.theme.baseBorderRadius};
  border-bottom-left-radius: ${props => props.theme.baseBorderRadius};
  display: none;
  align-items: center;
  padding: ${props => props.theme.baseSpacing} ${props => props.theme.mSpacing};

  > * {
    margin-right: ${props => props.theme.mSpacing};
  }

  @media only screen and (min-width: 56.25em) {
    display: flex;
  }
`;

const Textarea = styled(PlainTextarea)`
  resize: ${props => (props.resizable === 'true' ? 'vertical' : 'none')};
  flex-grow: 1;
  width: 100%;

  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`} ${({
    maxHeight
  }) => maxHeight && `max-height: ${maxHeight};`}

  overflow: auto;
  background-color: ${props => props.theme.baseInputBackground};
  border: ${props => props.theme.baseBorder};
  border-radius: ${props => props.theme.baseBorderRadius};
  font-size: ${props => props.theme.bodyFontSize};
  font-family: inherit;
  padding: ${props => props.theme.mSpacing};

  ${props =>
    props.error &&
    `
    border-color: transparent;
    box-shadow: ${props.theme.brandInputBoxDestructiveShadow};
    outline: none
  `} ${props =>
    props.disabled &&
    `
      background-color: ${props.theme.brandNearWhite};
      border: none;

      &::placeholder {
        color: ${props.theme.brandLightGrey};
      }
  `}


  &::placeholder {
    color: ${props => props.theme.brandGrey};
  }

  &:focus {
    border-color: transparent;
    background: ${props => props.theme.brandWhite};
    box-shadow: ${props => props.theme.brandInputBoxShadow};
    outline: none;
  }
`;

const CodeExample = styled(Text)`
  background-color: ${props => props.theme.brandNearWhite};
  border: ${props => props.theme.baseBorder};
  border-radius: 4px;
  padding: ${props => props.theme.sSpacing};
`;

const LabelText = styled(Text)`
  color: ${props => (props.error ? props.theme.brandRed : null)};
`;

const ErrorFragmentContainer = styled.div`
  margin-top: ${props => props.theme.baseSpacing};
`;

const ErrorFragment = ({ error }) => (
  <React.Fragment>
    {error && (
      <ErrorFragmentContainer>
        <Text typeScale="Small" color="red">
          {error}
        </Text>
      </ErrorFragmentContainer>
    )}
  </React.Fragment>
);

class Textbox extends React.Component {
  state = { text: '' };

  onTextareaChange = e => {
    const { value } = e.target;
    if (typeof this.props.value !== 'string') {
      this.setState({ text: value });
    }
    this.props.onChange(value);
  };

  render() {
    const {
      className,
      error,
      resizable,
      maxHeight,
      minHeight,
      optional,
      label,
      disabled,
      placeholder,
      overlay,
      markdownKey,
      value,
      maxLength,
      onFocus,
      onBlur,
      autoFocus
    } = this.props;

    const { text: textStateValue } = this.state;
    const textValue = typeof value === 'string' ? value : textStateValue;

    return (
      <Container className={className}>
        <TextareaInfo>
          {label && (
            <LabelText inputLabel error={!!error}>
              {optional ? label + ' (Optional)' : label}
            </LabelText>
          )}
          {maxLength && (
            <LabelText inputLabel error={!!error}>
              {textValue.length} / {maxLength}
            </LabelText>
          )}
        </TextareaInfo>
        <TextareaContainer>
          <Textarea
            error={
              error // style related props
            }
            resizable={resizable.toString()}
            maxHeight={maxHeight}
            minHeight={minHeight}
            placeholder={
              placeholder // regular props
            }
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            value={textValue}
            onChange={this.onTextareaChange}
            autoFocus={autoFocus}
          />
          {overlay ? <Overlay>{overlay}</Overlay> : null}
          {markdownKey ? (
            <MarkdownKey>
              <React.Fragment>
                <Text typeScale="Small" color="defaultGrey">
                  # H1
                </Text>
                <Text typeScale="Small" color="defaultGrey">
                  ## H2
                </Text>
                <Text typeScale="Small" color="defaultGrey">
                  ### H3
                </Text>
                <Text
                  typeScale="Small"
                  color="defaultGrey"
                  weight="fontWeight-bold"
                  color="darkGrey"
                >
                  *bold*
                </Text>
                <Text typeScale="Small" color="defaultGrey" fontStyle="italic">
                  _italics_
                </Text>
                <CodeExample typeScale="Small" color="defaultGrey">
                  `code`
                </CodeExample>
                <CodeExample typeScale="Small" color="defaultGrey">
                  ```preformatted```
                </CodeExample>
              </React.Fragment>
            </MarkdownKey>
          ) : null}
        </TextareaContainer>
        <ErrorFragment error={error} />
      </Container>
    );
  }
}

Textbox.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  resizable: PropTypes.bool,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  markdownKey: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  maxLength: PropTypes.number,
  maxHeight: PropTypes.string,
  minHeight: PropTypes.string
};

Textbox.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  resizable: true,
  minHeight: '100px',
  markdownKey: false
};

export default Textbox;
