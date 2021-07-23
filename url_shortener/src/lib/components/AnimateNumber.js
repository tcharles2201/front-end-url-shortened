import React, { useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    InputGroup,
    Input,
    InputRightElement
  } from "@chakra-ui/react"
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { MdCreate, MdClose } from "react-icons/md";
import { Wrap, WrapItem } from "@chakra-ui/react"
import {
    Stack, Box, Container, Center
} from "@chakra-ui/react";

export function AnimateNumber(props) {
    const title = React.createRef();
    const { start, shouldRender, limit, template, setStart, setRender } = props;
    let i = start;
    let d = Date.now();
    let d2 = Date.now();

    if (shouldRender){
        let timerID = setInterval(() => {
            if (i  <= limit){
                if (title.current){
                    const element = title.current;
                    const str = template.replace("%d", i);
    
                    element.textContent = str;
                }
                i++;
            }
            else {
                setStart(i);
                setRender(false);
                clearInterval(timerID);
            }
        }, 80);
    }
    return (<Heading ref={title}></Heading>);
}