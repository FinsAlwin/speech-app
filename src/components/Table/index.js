import React, { useState } from "react";
import { Table, Container, Dropdown } from "react-bootstrap";
import "./style.css";
const TableCustom = (props) => {
  const handleVideoSession = (id) => {
    props.setTable();
    props.sessionType("videoCall");
    props.selectedUserId(id);
  };

  const handleGameSession = () => {
    props.setTable();
    props.sessionType("gameSession");
  };
  return (
    <>
      <div className="tableClass">
        <Container>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map((item, index) => (
                <>
                  {!item.userType && (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.username}</td>
                      <td>{item.age}</td>
                      <td>
                        <Dropdown size="sm">
                          <Dropdown.Toggle
                            variant="primary"
                            id="dropdown-basic"
                          >
                            Actions
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleVideoSession(item.id)}
                            >
                              Video Sessions
                            </Dropdown.Item>
                            {/* <Dropdown.Item onClick={handleGameSession}>
                              Game Sessions
                            </Dropdown.Item> */}
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
};

export default TableCustom;
