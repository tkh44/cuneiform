import React from "react";
import renderer from "react-test-renderer";

import Form from "./index";

const TestUtils = require("react-dom/test-utils");

describe("cuneiform", () => {
  test("demo", () => {
    function onSubmit(e) {
      console.log(e);
    }

    const tree = renderer
      .create(
        <Form onSubmit={onSubmit}>
          {({ getValue, setValue, resetForm }) => {
            return (
              <React.Fragment>
                <input
                  name="name"
                  type="text"
                  value={getValue("name")}
                  onChange={setValue}
                />
                <button onClick={resetForm}>Reset</button>
                <button type="submit">Submit</button>
              </React.Fragment>
            );
          }}
        </Form>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("payload", () => {
    function onSubmit(e) {
      console.log(e);
    }

    let runCount = 0;
    let resetFormUp

    class Tester extends React.Component {
      state = {
        updateFlag: 0
      };

      static update(newState) {
        this.setState(newState);
      }

      render() {
        return (
          <Form onSubmit={onSubmit}>
            {({ getValue, setValue }) => {
              runCount++;
              function getValueAndThrow() {
                getValue("name");
              }

              switch (runCount) {
                case 1:
                  expect(getValue("name")).toBe(undefined);
                  setValue({ target: { name: "name", value: "Bob" } });
                  break;
                case 2:
                  expect(getValue("name")).toBe("Bob");
                  setValue({ target: { name: "name", value: "Sam" } });
                  break;
                case 3:
                  expect(getValue("name")).toBe("Sam");
                  break;
                case 4:
                  try {
                    expect(getValueAndThrow).toThrowErrorMatchingSnapshot();
                  } catch (e) {}
                  break;
                default:
                  break;
              }
              return (
                <React.Fragment>
                  <input
                    name="name"
                    type="text"
                    value={getValue("name")}
                    onChange={setValue}
                  />
                  <button type="submit">Submit</button>
                </React.Fragment>
              );
            }}
          </Form>
        );
      }
    }

    TestUtils.renderIntoDocument(<Tester />);
  });
});
