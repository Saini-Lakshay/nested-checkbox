# About

This app includes a nested checkbox component that takes data(example below) and an onChange function(as a callback function) as the parameters same as an <input /> element of a form.

To access an example with below provided dummy data visit : <a href="https://saini-lakshay.github.io/nested-checkbox/">here</a>

# States of Checkbox

There are 3 states of a checkbox:

1. Checked : if the checkbox is checked (along with its children checked).
2. Unchecked : if the checkbox is un-checked (along with its children un-checked).
3. Intermediate : if some children are checked and some are un-checked.

State of the checkbox is depicted through the color of the checkbox.<br />
-> transparent : not checked<br />
-> green : checked<br />
-> orange(default) : intermediate

Note: <br />
-> state of a checkbox can be manually changed to checked or unchecked by clicking on checkbox. intermediate state is automatically set for a checkbox.<br />
-> if a parent's state is toggled then the state of all children are also set to parent's toggled state(checked or unchecked).<br />
-> intermediate state's color can be changed by providing [intermediateColor] property and value to the component<br />

# Expanding/Shrinking the children of a checkbox

If a checkbox has children then a + icon will appear along with it which can be pressed to see all immediate children of that checkbox.
On opening of the children that + is converted to - icon and can be clicked to shrink all children of that checkbox.

# Scope of a checkbox

Scope of a checkbox is defined as the children of that checkbox which is represented by a vertical line in the component.
All checkboxes with no children and which have some parent are connected by horizontal lines to their parent.

# Dummy Data Example

Data could be unsorted in any form:

```json
data = [
  {
    "name": "Sports",
    "parentId": null
  },
  {
    "name": "Rajasthan Royals",
    "parentId": "IPL"
  },
  {
    "name": "Gujarat Titans",
    "parentId": "IPL"
  },
  {
    "name": "Study",
    "parentId": null
  },
  {
    "name": "Health",
    "parentId": null
  },
  {
    "name": "IPL",
    "parentId": "Sports"
  },
  {
    "name": "Mumbai Indians",
    "parentId": "IPL"
  },
  {
    "name": "MPL",
    "parentId": "Sports"
  },
  {
    "name": "Arsenal",
    "parentId": "MPL"
  },
  {
    "name": "Chelsea",
    "parentId": "MPL"
  },
  {
    "name": "Manchester United",
    "parentId": "MPL"
  },
  {
    "name": "NBA",
    "parentId": "Sports"
  },
  {
    "name": "Soccer",
    "parentId": "Sports"
  },
  {
    "name": "Rugby",
    "parentId": "Sports"
  },
  {
    "name": "GT 1",
    "parentId": "Gujarat Titans"
  },
  {
    "name": "GT 2",
    "parentId": "Gujarat Titans"
  }
]
```
