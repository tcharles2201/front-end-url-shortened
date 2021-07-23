import axios from "axios";
var Url = require("url-parse");

export class HomeService {

    static BASE_URI = `${process.env.REACT_APP_API}`;
    async createLink(linkObject) {
        const response = await axios.post(
          `${HomeService.BASE_URI}/api/links`,
          linkObject
        );

        return response;
    }

    async getBaseUrl(shortedLink) {
        console.log("shorted url : " + shortedLink);
        if (shortedLink === "") {
        } else {
            var url = new Url(shortedLink);
            const response = await axios.get(
                `${HomeService.BASE_URI}${url.pathname}`
            );

            return response;
        }
    }
}
