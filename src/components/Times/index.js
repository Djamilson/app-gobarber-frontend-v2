import React, { useState } from 'react';

import ControlledSlider from '~/components/Times/Slider/Slider';
import ControlledSliderMin from '~/components/Times/Slider/SliderMin';
import { Input } from '@rocketseat/unform';

import { Container, Badge, Timediv, Time, TimeE } from './styles';

export default function Times() {
  /** horas */
  const [min] = useState(0);
  const [max] = useState(23);
  const [value] = useState(10);
  const [step, setStep] = useState(1);

  const [hour, setHour] = useState(value);
  const [sliderHour, setSliderHour] = useState(value);

  /** minutos */
  const [minMin] = useState(0);
  const [maxMin] = useState(59);
  const [valueMin] = useState(0);
  const [stepMin, setStepMin] = useState(1);
  const [sliderMin, setSliderMin] = useState(valueMin);

  const [minute, setMinute] = useState(valueMin);

  function onSlideStart(value) {
    setStep(step);
  }

  function onSliderChange(value) {
    const hour = parseInt(value, 10);
    setHour(hour);
    setSliderHour(hour);
  }

  function onSlideStartMin(value) {
    setStepMin(stepMin);
  }

  function onSliderChangeMin(value) {
    const minn = parseInt(value, 10);

    setMinute(minn);
    setSliderMin(minn);
  }

  return (
    <Container>
      <ul>
        <Time>
          <Badge>
            <TimeE>
              <Input name="hora" type="hidden" value={hour} />
              <Input name="min" type="hidden" value={minute} />

              <span>{hour < 10 ? '0' + hour : hour}</span>
              <span>:</span>
              <span>{minute < 10 ? '0' + minute : minute}</span>
            </TimeE>
          </Badge>
        </Time>

        <Timediv>
          <span>Horas: </span>
          <ControlledSlider
            min={min}
            max={max}
            step={step}
            defaultValue={sliderHour}
            onUpdate={v => onSliderChange(v)}
            onSlideStart={v => onSlideStart(v)}
          />
        </Timediv>

        <Timediv>
          <span>Minutos:</span>
          <ControlledSliderMin
            minMin={minMin}
            maxMin={maxMin}
            stepMin={stepMin}
            defaultValue={sliderMin}
            onUpdateMin={m => onSliderChangeMin(m)}
            onSlideStartMin={m => onSlideStartMin(m)}
          />
        </Timediv>
      </ul>
    </Container>
  );
}
