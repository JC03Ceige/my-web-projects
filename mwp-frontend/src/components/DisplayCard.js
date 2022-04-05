import React from "react";
import Card from "react-bootstrap/Card";
import AppButton from "./Button";

const DispCard = ({ title, description, URL, onEdit, onDelete }) => {
  return (
    <div>
      <Card className="disp-card">
        <Card.Img variant="top" src="" />

        <Card.Body className="d-flex flex-column card-body">
          <div>
            <Card.Title placeholder="Project Title">
              Project Title: {title}
            </Card.Title>
            <Card.Text placeholder="Description of the project goes here.">
              Project description: {description}
            </Card.Text>
            <Card.Link href={URL} placeholder="Project URL">
              {URL}
            </Card.Link>
          </div>
          <div className="btnBar">
            <AppButton onClick={onEdit} value={"Edit"} type="button" />
            <AppButton onClick={onDelete} value={"Delete"} type="button" />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DispCard;
