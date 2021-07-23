import React from "react";
import { Heading } from "@chakra-ui/react";
export function AnimateNumber(props) {
  const title = React.createRef();
  const { start, shouldRender, limit, template, setStart, setRender } = props;
  let i = start;
  let d = Date.now();
  let d2 = Date.now();

  if (shouldRender) {
    let timerID = setInterval(() => {
      if (i <= limit) {
        if (title.current) {
          const element = title.current;
          const str = template.replace("%d", i);

          element.textContent = str;
        }
        i++;
      } else {
        setStart(i);
        setRender(false);
        clearInterval(timerID);
      }
    }, 80);
  }
  return <Heading ref={title}></Heading>;
}
