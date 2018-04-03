# Cuneiform

> Simple and Declarative React Forms

## Install

```bash
npm i cuneiform
```

## Example

```javascript
import React from 'react';
import Form from 'cuneiform';

export default Create({ onSubmit }) {
  return (
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
           <input
              name="superhero-name"
              type="text"
              value={getValue("superhero-name")}
              onChange={setValue}
            />
           <button onClick={resetForm}>Reset</button>
           <button type="submit">Submit</button>
         </React.Fragment>
       );
     }}
    </Form>
  )
)
```
