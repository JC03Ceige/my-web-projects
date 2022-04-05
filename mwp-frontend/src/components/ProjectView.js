import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import DispCard from "./DisplayCard";
import AppButton from "./Button";
import WebForm from "./Form";
import Projects from "../projects.json";
import Carousel from "react-bootstrap/Carousel";

const ProjectView = () => {
  // Reference
  const titleRef = useRef();
  const descriptionRef = useRef();
  const projURLRef = useRef();

  // State
  const [index, setIndex] = useState(0);
  const [projects, setProjects] = useState(Projects);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // Temp State
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [projURL, setProjURL] = useState();

  const [updateId, setUpdateId] = useState();
  const [updateTitle, setUpdateTitle] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [updateProjURL, setUpdateProjURL] = useState();

  // Effect

  useEffect(() => {
    // console.log(projects)
    // setProjects(Projects)
    titleRef.current = null;
    descriptionRef.current = null;
    projURLRef.current = null;
  }, [projects]);

  // Add Post
  const submitAdd = (e) => {
    e.preventDefault();
    if (title && description && projURL) {
      let newProject = {
        "id": uuidv4(),
        "title": title,
        "description": description,
        "projURL": projURL,
      };
      let tempProjects = [...projects, newProject];
      setProjects(tempProjects);
      saveJson(tempProjects);
    }
    setTitle();
    setDescription();
    setProjURL();
    setShowAdd(!showAdd);
  };

  // Delete Post
  const handleDelete = (id) => {
    let filterProjects = [...projects].filter((OBJ) => OBJ.id !== id);
    console.log(filterProjects);
    setProjects(filterProjects);
    saveJson(filterProjects);
    setIndex(0);
  };

  // Populate Post
  const populateForm = (id, title, description, projURL) => {
    setUpdateId(id);
    setUpdateTitle(title);
    setUpdateDescription(description);
    setUpdateProjURL(projURL);
  };

  // Update Post
  const submitEdit = (e) => {
    e.preventDefault();
    let updateValues = {
      "id": updateId,
      "title": updateTitle,
      "description": updateDescription,
      "projURL": updateProjURL,
    };
    let filterProjects = [...projects].filter((OBJ) => OBJ.id !== updateId);
    let updateProjects = [...filterProjects, updateValues];
    setProjects(updateProjects);
    setTitle();
    setDescription();
    setProjURL();
    setShowEdit(!showEdit);
    saveJson(updateProjects);
  };

  // Write to JSON File
  const saveJson = (projectData) => {
    const BASE_URL = "/projects";
    return fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    }) //.then((res) => res.json());
      .then((res) => res.text()) // convert to plain text
      .then((text) => console.log(text));
  };

  // Additional

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
        {projects
          ? projects.map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <DispCard
                    onEdit={() => {
                      setShowEdit(true);
                      populateForm(
                        item.id,
                        item.title,
                        item.description,
                        item.projURL
                      );
                    }}
                    onDelete={() => handleDelete(item.id)}
                    title={item.title}
                    description={item.description}
                    URL={item.URL}
                  />
                  <Carousel.Caption>
                    <h3>{item.title}</h3>
                    <p>
                      <br />
                      <br />
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })
          : null}
      </Carousel>

      {projects.map((project, index) => (
        <div key={index}>
          <WebForm
            show={showEdit}
            setShow={setShowEdit}
            formTitle="Edit Project Details"
            titleName="title"
            descriptionName="description"
            projURLName="URL"
            titleVal={updateTitle || ""}
            descriptionVal={updateDescription || ""}
            projURLVal={updateProjURL || ""}
            titleRef={titleRef}
            descriptionRef={descriptionRef}
            projURLRef={projURLRef}
            titleChange={(e) => setUpdateTitle(e.target.value)}
            descriptionChange={(e) => setUpdateDescription(e.target.value)}
            projUrlChange={(e) => setUpdateProjURL(e.target.value)}
            onSubmit={submitEdit}
            btnValue="Done"
          />
          <WebForm
            show={showAdd}
            setShow={setShowAdd}
            formTitle="Add a New Project"
            idName="id"
            titleName="title"
            descriptionName="description"
            projURLName="URL"
            titleVal={title || ""}
            descriptionVal={description || ""}
            projURLVal={projURL || ""}
            titleRef={titleRef}
            descriptionRef={descriptionRef}
            projURLRef={projURLRef}
            titleChange={(e) => setTitle(e.target.value)}
            descriptionChange={(e) => setDescription(e.target.value)}
            projUrlChange={(e) => setProjURL(e.target.value)}
            onSubmit={(e) => submitAdd(e)}
            btnValue="Add"
          />
        </div>
      ))}
      <AppButton onClick={() => setShowAdd(true)} value={"Add"} />
    </div>
  );
};

export default ProjectView;
