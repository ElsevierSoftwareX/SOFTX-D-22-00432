import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getUser = async (login) => {
  try {
    const response = await axios.post(`${API_URL}/login`, login, { withCredentials: true });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProjectById = async (id) => {
  return await axios.get(`${API_URL}/project/${id}`, { withCredentials: true });
};

/**
 * Get the objects of project id
 * @param {String} projectId The id of the project
 * @returns A list of objects
 */
export const getObjectsByProjectId = async (projectId) => {
  return await axios.get(`${API_URL}/objects/${projectId}`, { withCredentials: true });
};

// return the project and the objects path
export const getProjectsByUserId = async (userId) => {
  return await axios.get(`${API_URL}/project-user/${userId}`, { withCredentials: true });
};

export const getUsers = async () => {
  return await axios.get(`${API_URL}/users`, { withCredentials: true });
};

export const saveProject = async (userId, project) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${API_URL}/project`,
      data: {
        projectName: project.projectName,
        patientCode: project.patientCode,
        status: project.status,
        assignedAt: project.assignedAt,
        userId: userId,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const updateProject = async (projectId, project) => {
  const data =
    Object.keys(project).length > 0
      ? {
          projectName: project.projectName,
          patientCode: project.patientCode,
          status: project.status,
          assignedAt: project.assignedAt,
        }
      : {};

  try {
    const res = await axios({
      method: "PUT",
      url: `${API_URL}/project/${projectId}`,
      data: data,
    });

    return res.data;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const deleteProject = async (id) => {
  return await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_API_URL}/project/${id}`,
  });
};

export const saveObject = async (id, objectName, projectId, file, filename) => {
  let data = new FormData();
  data.append("file", file, filename);
  data.append("id", id);
  data.append("objectName", objectName);

  try {
    const res = await axios({
      method: "POST",
      url: `${API_URL}/upload/${projectId}`,
      data: data,
    });

    return res.data;
  } catch (error) {
    return error.message;
  }
};

export const saveComment = async (comment) => {
  return await axios({
    method: "POST",
    url: `${API_URL}/comment`,
    data: {
      projectId: comment.projectId,
      userId: comment.userId,
      text: comment.text,
      pointId: comment.pointId,
    },
  });
};

export const getCommentsByProjectIdAndPointId = async (projectId, pointId) => {
  return await axios({
    method: "GET",
    url: `${API_URL}/comments/${projectId}/${pointId}`,
  });
};

export const getCommentsByProjectId = async (projectId) => {
  return await axios.get(`${API_URL}/comments/${projectId}`, { withCredentials: true });
};

export const deleteObject = async (objectId) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${API_URL}/object/${objectId}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const getOffsetMesh = async (data, offset) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${API_URL}/offset`,
      data: {
        data,
        offset,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${API_URL}/comment/${commentId}`,
    });

    return res.data;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
