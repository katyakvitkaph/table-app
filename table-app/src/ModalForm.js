import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import * as Api from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './styles/styleForm.module.css';

class ModalForm extends Component {
  state = {
    users: [],
    userName: '',
    surname: '',
    age: '',
    editor: true,
  };

  handleChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.addUser();
  };

  addUser = user => {
    const userToAdd = {
      ...user,
      name: this.state.userName,
      surname: this.state.surname,
      age: this.state.age,
      is_mutable: true,
      date: '2000-10-31T01:30:00.000-05:00',
    };
    Api.postUser(userToAdd)
      .then(addedUser => {
        this.setState(prevState => ({
          users: [...prevState.users, addedUser],
        }));
      })
      .finally(this.props.toggle());
  };

  render() {
    const { userName, surname, age, editor } = this.state;
    return (
      <Form className={style.form} onSubmit={this.handleSubmit}>
        <ModalBody>
          <FormGroup className={style.inputsGroup}>
            <Input
              className={style.name}
              type="textarea"
              name="userName"
              value={userName}
              placeholder="First Name"
              onChange={this.handleChange}
            />
            <Input
              className={style.surname}
              type="textarea"
              name="surname"
              value={surname}
              placeholder="Second Name"
              onChange={this.handleChange}
            />
            <Input
              type="number"
              name="age"
              value={age}
              placeholder="Age"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup className={style.checkGroup} check>
            <Label className={style.label} check>
              <Input
                type="checkbox"
                name="editor"
                checked={editor}
                onChange={this.handleChange}
              />
              Active
            </Label>
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              name="date"
              id="exampleDate"
              placeholder="date placeholder"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </ModalBody>
      </Form>
    );
  }
}

export default ModalForm;

ModalForm.propTypes = {
  toggle: PropTypes.func.isRequired,
};
