import React from "react";
import styled from "styled-components";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

import SliderHandle from "./Slider.Handle";
import SliderTrack from "./Slider.Track";

import SliderTick from "./Slider.Tick";


class ControlledSlider extends React.Component {
  // Both values need to be arrays
  state = {
    values: [this.props.defaultValue],
    update: [this.props.defaultValue]
  };

  onUpdate = update => {
    this.setState({ update });
    // Use the first value from the array because this only supports one handle
    this.props.onUpdateMin && this.props.onUpdateMin(update[0]);
  };

  onChange = values => {
    console.tron.log(values);
    this.setState({ values });
    // Use the first value from the array because this only supports one handle
    this.props.onChangeMin && this.props.onChangeMin(values[0]);
  };

  onStart = values => {
    this.setState({ values });
    // Use the first value from the array because this only supports one handle
    this.props.onSlideStart && this.props.onSlideStart(values[0]);
  };

  static getDerivedStateFromProps(props, state) {
    // Need this to dynamically update state from props
    if (props.defaultValue !== state.values[0]) {
      return {
        values: [props.defaultValue]
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  render() {
    const { values } = this.state;
    const { minMin, maxMin, stepMin, onFocus, onBlur, ...restProps } = this.props;
    return (
      <Container>
        <StyledSlider
          mode={1}
          step={stepMin}
          domain={[minMin, maxMin]}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          onSlideStart={this.onSlideStart}
          values={values}
          {...restProps}
        >
          <Rail>
            {({ getRailProps }) => <StyledRail {...getRailProps()} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <SliderHandle
                    key={handle.id}
                    handle={handle}
                    domain={[this.props.min, this.props.maxMin]}
                    getHandleProps={getHandleProps}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div>
                {tracks.map(({ id, source, target }) => (
                  <SliderTrack
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <SliderTick key={tick.id} tick={tick} count={ticks.length}/>
                ))}
              </div>
            )}
          </Ticks>

        </StyledSlider>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 24px;
  padding-top: 12px;
  width: 100%;
  margin-top: -25px;
`;

const StyledSlider = styled(Slider)`
  position: relative;
  width: 100%;
`;

const StyledRail = styled.div`
  position: absolute;
  width: 100%;
  height: 14px;
  border-radius: 7px;
  cursor: pointer;
  background-color: #cbcbcb;
`;
export default ControlledSlider;
