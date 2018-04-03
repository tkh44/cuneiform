import React from "react";
import isEqual from "lodash.isequal";
import compose from "recompose/compose";
import withState from "recompose/withState";
import withHandlers from "recompose/withHandlers";

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
      return isEqual(formValues, initialValues);
    },
    isDirty: ({ formValues, initialValues, updateValues }) => {
      return () => !isEqual(formValues, initialValues);
    },
    getValue: ({ formValues }) => {
      return name => formValues[name];
    },
    setValue: ({ formValues, updateValues }) => {
      return e => {
        const { name, value } = e.target;
        updateValues({ ...formValues, ...{ [name]: value } });
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
  const {
    children,
    getValue,
    setValue,
    isPristine,
    isDirty,
    onSubmit,
    formValues,
    resetForm,
    updateValues,
    ...rest
  } = props;

  return (
    <form {...rest} onSubmit={onSubmit}>
      {children({
        isPristine,
        isDirty,
        formValues,
        getValue,
        setValue,
        resetForm,
        updateValues
      })}
    </form>
  );
});
