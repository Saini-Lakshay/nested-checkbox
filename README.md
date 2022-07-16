# About

This app includes a nested checkbox component that takes data(example below) and an onChange function(as a callback function) as the parameters same as an [input] element of a form.


# States of Checkbox

There are 3 states of a checkbox:
1. Checked : if the checkbox is checked (along with its children checked).
2. Unchecked : if the checkbox is un-checked (along with its children un-checked).
3. Intermediate : if some children are checked and some are un-checked.

State of the checkbox is depicted through the color of the checkbox.
-> transparent : not checked
-> green : checked
-> orange : intermediate

Note: 
-> state of a checkbox can be manually changed to checked or unchecked by clicking on checkbox. intermediate state is automatically set for a checkbox.
-> if a parent's state is toggled then the state of all children are also set to parent's toggled state(checked or unchecked).


# Expanding/Shrinking the children of a checkbox

If a checkbox has children then a + icon will appear along with it which can be pressed to see all immediate children of that checkbox.
On opening of the children that + is converted to - icon and can be clicked to shrink all children of that checkbox.

# Scope of a checkbox

Scope of a checkbox is defined as the children of that checkbox which is represented by a vertical line in the component.
All checkboxes with no children and which have some parent are connected by horizontal lines to their parent.
