import React from 'react';
import renderer from 'react-test-renderer';
import SCInput from '.';

it('render SCInput', () => {
  const component = renderer.create(<SCInput name="name" />).toJSON();
  expect(component).toMatchSnapshot();
});

it('render SCInput with rules', () => {
  const component = renderer
    .create(<SCInput name="name" rules={[{ required: true }]} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render SCInput with label', () => {
  const component = renderer
    .create(<SCInput name="name" label="Email Address" />)
    .toJSON();
  expect(component).toMatchSnapshot();
});

it('render SCInput with type', () => {
  const component = renderer
    .create(<SCInput name="name" label="Email Address" type="email" />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
