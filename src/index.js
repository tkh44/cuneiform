import React from "react";
import deepEqual from "fast-deep-equal";
import omit from "object.omit";
import compose from "recompose/compose";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";

const payloadKeys = [
  "children",
  "getValue",
  "setValue",
  "isPristine",
  "isDirty",
  "onSubmit",
  "formValues",
  "resetForm",
  "updateValues"
];

export default compose(
  withState(
    "formValues",
    "updateValues",
    ({ initialValues = {} }) => initialValues
  ),
  withHandlers({
    resetForm: ({ initialValues, updateValues }) => {
      return () => updateValues(initialValues);
    },
    isPristine: ({ formValues, initialValues, updateValues }) => {
      return deepEqual(formValues, initialValues);
    },
    isDirty: ({ formValues, initialValues, updateValues }) => {
      return () => !deepEqual(formValues, initialValues);
    },
    getValue: ({ formValues }) => {
      return name => formValues[name];
    },
    setValue: ({ formValues, updateValues }) => {
      return e => {
        const { name, value } = e.target;
        updateValues(Object.assign(formValues, { [name]: value }));
      };
    },
    onSubmit: props => {
      return e => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(props.formValues);
      };
    }
  })
)(props => {
  const rest = omit(props, payloadKeys);

  return React.createElement(
    "form",
    Object.assign({}, rest, {
      onSubmit: props.onSubmit,
      children: props.children({
        isPristine: props.isPristine,
        isDirty: props.isDirty,
        formValues: props.formValues,
        getValue: props.getValue,
        setValue: props.setValue,
        resetForm: props.resetForm,
        onSubmit: props.onSubmit,
        updateValues: props.updateValues
      })
    })
  );
});
