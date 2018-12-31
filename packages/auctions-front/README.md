## State management agnostic
There is no redux store in a built library
Just forward value and dispatch and and onValueChnage (if dispatch props function is not provider),  props to the component
You can reuse exported reducer to combine one into any kind of the store
Redux used only for internal dev mode, mostly because of ReduxDevTools:

```
    npm start
```

### Cards with dataset
Not sure how Cards could be nested.
<br/>
Post cards use datasets and locks children interaction to capture mouse events. It's agood option for huge lists and custom select lists without "<select />" semantics
PlanView captures Cards events to manage datasets

### VOs and views
There are value object (like SmthVO) types and associated SmthView components

### No class keyword
All the state managed by composition and hooks

### why there is a case for default exports?
Hide some implementation to avoid verbose intellisense

### Avoid styled-components css calculation based on props
This calculations creates new classes. 
From other side pure css expression in css function creates cacheable 
class and could be used similar to CSS modules

### What is InputProps and value & onValueChanged 
And component which holds some value and could change one implements InputProps 
TextInput, PostEditor, Select or any
onValueChanged prop used for all data driven components for composability 
I.E:
```
const handler = compose (dispatch, makeAction, onValueChange) 
// in the next component

compose(handler, transform, onValueChange)
// and so on
```
Each InputProps component forwards onChange callback, you can manage one normally
