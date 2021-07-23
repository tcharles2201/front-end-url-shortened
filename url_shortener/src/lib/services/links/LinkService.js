import axios from "axios";

export class LinkService {
  static BASE_URI = `${process.env.REACT_APP_API}`;

  async save(link) {
    const response = await axios.post(
      `${LinkService.BASE_URI}/api/links`,
      link,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  }

  async listByUser(userId) {
    const response = await axios.get(
      `${LinkService.BASE_URI}/api/links/${userId}/user`,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  }

  async deleteById(id) {
    const response = await axios.delete(
      `${LinkService.BASE_URI}/api/links/${id}`,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  }

  async update(link) {
    const response = await axios.put(
      `${LinkService.BASE_URI}/api/links`,
      link,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  }

  async getURI(code) {
    const response = await axios.get(
      `${LinkService.BASE_URI}/redirect/${code}`,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    return response;
  }
}
