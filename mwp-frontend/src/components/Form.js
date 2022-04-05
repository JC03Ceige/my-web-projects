import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AppButton from "./Button";

const WebForm = ({
  show,
  setShow,
  formTitle,
  onSubmit,
  onChange,
  btnValue,
  idName,
  idVal,
  titleName,
  descriptionName,
  projURLName,
  titleVal,
  descriptionVal,
  projURLVal,
  titleRef,
  descriptionRef,
  projURLRef,
  idChange,
  titleChange,
  descriptionChange,
  projUrlChange,
}) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{formTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Project Name"
                  id="projTitle"
                  name={titleName}
                  defaultValue={titleVal}
                  ref={titleRef}
                  onChange={titleChange}
                />
                <Form.Text className="text-muted">
                  Please use ALL CAPS for the Project Name.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  id="projDescription"
                  name={descriptionName}
                  defaultValue={descriptionVal}
                  ref={descriptionRef}
                  onChange={descriptionChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Web Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Project Web-Address"
                  id="projURL"
                  name={projURLName}
                  defaultValue={projURLVal}
                  ref={projURLRef}
                  onChange={projUrlChange}
                />
              </Form.Group>
              <AppButton value={btnValue} type="Submit" />
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </div>
  );
};

export default WebForm;
