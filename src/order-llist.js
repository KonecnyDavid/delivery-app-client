import React from "react";
import { Label, Table, Button } from "semantic-ui-react";

export default ({ orders, stateChangeHandler }) => {
  orders = orders.sort((a, b) => {
    if (a.state === "ROZVOZ") return -1;
    return 1;
  });
  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Stav</Table.HeaderCell>
            <Table.HeaderCell>Kontakt</Table.HeaderCell>
            <Table.HeaderCell>Adresa</Table.HeaderCell>
            <Table.HeaderCell>Popis</Table.HeaderCell>
            <Table.HeaderCell>Akce</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orders.map(order => (
            <Table.Row>
              <Table.Cell>
                <Label color="blue">{order.state}</Label>
              </Table.Cell>
              <Table.Cell>
                {order.name}
                <br />
                {order.contact}
              </Table.Cell>
              <Table.Cell>{order.address}</Table.Cell>
              <Table.Cell>{order.description}</Table.Cell>
              <Table.Cell>
                {order.state !== "DORUČENO" && (
                  <Button
                    color="green"
                    onClick={() => {
                      stateChangeHandler(order, "DORUČENO");
                    }}
                  >
                    Doručeno
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
