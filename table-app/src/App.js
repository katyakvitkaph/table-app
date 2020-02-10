/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Modal, Button } from 'reactstrap';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as Api from './services/api';
import ModalBody from './ModalBody';
import style from './styles/styleApi.module.css';

class App extends Component {
  state = {
    users: [],
    modal: false,
    columns: [
      {
        dataField: 'id',
        text: 'User ID',
        type: 'number',
        sort: true,
        hidden: true,
      },
      {
        dataField: 'name',
        text: 'First Name',
        type: 'string',
        editable: false,
        sort: true,
      },
      {
        dataField: 'surname',
        text: 'Second Name',
        type: 'string',
        editable: false,
        sort: true,
      },
      {
        dataField: 'age',
        text: 'Age',
        type: 'number',
        editable: true,
        sort: true,
      },
      {
        dataField: 'is_mutable',
        text: 'Active',
        type: 'bool',
        sort: true,
        editor: {
          type: Type.CHECKBOX,
          value: 'true:false',
        },
      },
      {
        dataField: 'date',
        text: 'Date',
        type: 'date',
        sort: true,
        formatter: cell => {
          if (!cell) {
            return '';
          }
          return `${
            moment(cell).format('DD-MM-YYYY')
              ? moment(cell).format('DD-MM-YYYY')
              : moment(cell).format('DD-MM-YYYY')
          }`;
        },
        editor: {
          type: Type.DATE,
        },
      },
    ],
  };

  static defaultProps = {
    buttonLabel: '',
  };

  componentDidMount() {
    Api.fetchNewUser().then(users => {
      this.setState({ users });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { users } = this.state;
    if (prevState.users !== users && prevState.users > 0) {
      Api.fetchNewUser().then(users => {
        this.setState({ users });
      });
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  updateActive = (newValue, parameter, userId) => {
    Api.updateUser(userId, { [parameter]: newValue }).then(updateUser => {
      this.setState(state => ({
        users: state.users.map(user =>
          user.id === userId ? updateUser : user,
        ),
      }));
    });
  };

  render() {
    const { users, columns, modal } = this.state;
    // eslint-disable-next-line react/prop-types
    const { buttonLabel, className } = this.props;
    const { SearchBar, ClearSearchButton } = Search;
    const label = buttonLabel;
    let button = '';
    if (label !== 'Edit') {
      button = (
        <Button color="success" onClick={this.toggle}>
          {label}
          Add row
        </Button>
      );
    }

    return (
      <div id="main">
        <CssBaseline />
        <Container maxWidth="md" className={style.container}>
          <ToolkitProvider keyField="id" data={users} columns={columns} search>
            {props => (
              <div>
                <SearchBar {...props.searchProps} />
                <ClearSearchButton {...props.searchProps} />
                {button}
                <Modal
                  isOpen={modal}
                  toggle={this.toggle}
                  className={className}
                >
                  <ModalBody toggle={this.toggle} />
                </Modal>
                <BootstrapTable
                  {...props.baseProps}
                  data={users}
                  columns={columns}
                  pagination={paginationFactory()}
                  cellEdit={cellEditFactory({
                    mode: 'click',
                    blurToSave: true,
                    afterSaveCell: (oldValue, newValue, row, column) => {
                      this.updateActive(newValue, column.dataField, row.id);
                    },
                  })}
                />
              </div>
            )}
          </ToolkitProvider>
        </Container>
      </div>
    );
  }
}

export default App;
