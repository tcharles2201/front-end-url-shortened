import React, { useRef, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
  Stack,
  Box,
  Center,
} from "@chakra-ui/react";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { MdCreate, MdClear } from "react-icons/md";
import { AnimateNumber } from "../../../src/lib/components/AnimateNumber";
import { List, ListItem } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { Tag } from "@chakra-ui/react";
import { LinkService } from "../../lib/services/links/LinkService";
import { ModalLinks } from "../../lib/components/ModalLinks";
import moment from "moment";
import { verify } from "jsonwebtoken";

function renderSavedLink(link) {
  return (
    link && (
      <Center>
        <List spacing={3}>
          <ListItem>
            <Center>
              Shortened url: <Tag>{link.shortened_url}</Tag>
            </Center>
          </ListItem>
          <ListItem>
            <Center>
              <QRCode value={link.shortened_url} />
            </Center>
          </ListItem>
        </List>
      </Center>
    )
  );
}

export function DashboardLinks(props) {
  const [links, setLinks] = useState([]);
  const [link, setLink] = useState({});
  const [shouldRenderList, setShouldRenderList] = useState(true);
  const [createdLink, setCreatedLink] = useState(null);
  const inputRef = useRef();
  const [shouldRenderNumber, setShouldRenderNumber] = useState(false);
  const [startRenderNumber, setStartRenderNumber] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkService = new LinkService();
  const token = window.localStorage.getItem("token");
  let data = null;

  if (!token){
    props.history.replace("/");
  }
  try {
    console.log(token);
    console.log(process.env);
    const data = verify(token, process.env.REACT_APP_SECRET);
    console.log(data);
  }
  catch (e){
    console.log(e.message);
    props.history.replace("/");
    window.localStorage.removeItem("token");
  }
  if (!data){
    return (<div></div>);
  }

  function selectLink(event, link) {
    setLink(link);
  }

  function FetchAllLinks() {
    linkService
      .listByUser()
      .then((response) => {
        console.log(response.data);
        setLinks(response.data);
        setShouldRenderList(false);
        setShouldRenderNumber(true);
      })
      .catch((error) => {
        console.log(error);
        selectLink(null);
        setShouldRenderList(false);
        setShouldRenderNumber(true);
      });
  }

  function PushLink(event, link) {
    const toSaved = {
      base_url: link,
      is_anonymous: 0,
      user_id: data.id,
      short_description: "",
    };

    linkService
      .save(toSaved)
      .then((response) => {
        const data = response.data;

        setCreatedLink(data);
        setShouldRenderList(true);

        // FetchAllLinks();
      })
      .catch((error) => {
        //FetchAllLinks();
        setShouldRenderList(true);
      });
  }

  function DeleteLink(event, link) {
    linkService
      .deleteById(link.id)
      .then((response) => {
        console.log(response.data);
        setShouldRenderList(true);
      })
      .catch((error) => {
        console.log(error);
        setShouldRenderList(true);
      });
  }

  function UpdateLink(event, link) {
    linkService
      .update(link)
      .then((response) => {
        console.log(response.data);
        onClose(event);
        setShouldRenderList(true);
      })
      .catch((error) => {
        console.log(error);
        // onClose(event);
        //setShouldRenderList(true);
      });
  }

  if (shouldRenderList) {
    FetchAllLinks();
  }

  return (
    <Stack>
      <Box bg="linear-gradient(to right, #093028, #237a57);" p="100">
        <Heading color="white">Tableau de Bord</Heading>
      </Box>
      <Box paddingY="50">
        <Center>
          <AnimateNumber
            start={startRenderNumber}
            setStart={setStartRenderNumber}
            setRender={setShouldRenderNumber}
            shouldRender={shouldRenderNumber}
            template={"%d liens générés"}
            limit={links.length}
          />
        </Center>
      </Box>
      <Box p="50">
        <Box p={4} borderWidth="1px">
          <Box p={6}>
            <FormControl isRequired>
              <FormLabel>URL</FormLabel>
              <InputGroup>
                <Input placeholder="URL" ref={inputRef} />
                <InputRightElement width="auto">
                  <Button
                    borderLeftRadius="0px"
                    onClick={(event) => {
                      PushLink(event, inputRef.current.value);
                    }}
                    rightIcon={<MdCreate />}
                  >
                    Ajouter
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
          <Box p={6}>{renderSavedLink(createdLink)}</Box>
        </Box>
      </Box>
      <Box p={4}>
        <Box>
          <Heading>Liste des liens</Heading>
        </Box>
        <Box p={4}>
          <Table variant="striped" colorScheme="teal" cursor="pointer">
            <Thead>
              <Tr>
                <Th>Short url</Th>
                <Th>Cible</Th>
                <Th>Description courte</Th>
                <Th>Date d'expiration</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {links.map((link) => {
                return (
                  <Tr key={link.shortened_url}>
                    <Td>{link.shortened_url}</Td>
                    <Td>{link.base_url}</Td>
                    <Td>{link.short_description}</Td>
                    <Td>
                      {link.expired_at &&
                        moment(link.expired_at).format("DD/MM/YYYY")}
                    </Td>
                    <Td>
                      <ButtonGroup size="lg" isAttached>
                        <IconButton
                          onClick={(event) => {
                            DeleteLink(event, link);
                          }}
                          color={"white"}
                          borderRadius="none"
                          bg="red"
                          icon={<MdClear />}
                        />
                        <IconButton
                          onClick={(event) => {
                            onOpen(event);
                            selectLink(event, link);
                          }}
                          color={"white"}
                          borderRadius="none"
                          bg="blue.400"
                          icon={<SettingsIcon />}
                        />
                      </ButtonGroup>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <ModalLinks
            link={link}
            isOpen={isOpen}
            UpdateLink={UpdateLink}
            DeleteLink={DeleteLink}
            onClose={onClose}
          />
        </Box>
      </Box>
    </Stack>
  );
}

/*
                    <Accordion allowToggle allowMultiple>
                        {links.map((link) => {
                            return (<AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    {link.shortened_url}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <FormControl isRequired>
                                <FormLabel>Cible</FormLabel>
                                <InputGroup>
                                    <Input value={link.base_url} />
                                </InputGroup>
                                </FormControl>
                                <FormControl marginBottom={4} isRequired>
                                    <FormLabel>Description:</FormLabel>
                                    <InputGroup>
                                        <Textarea>
                                            {link.short_description}
                                        </Textarea>
                                    </InputGroup>
                                </FormControl>
                                <FormControl marginBottom={4} isRequired>
                                    <FormLabel>Date d'expiration:</FormLabel>
                                    <InputGroup>
                                        <Input value={link.expired_at} />
                                    </InputGroup>
                                </FormControl>
                                <Box marginBottom={4}>
                                    <QRCode value={link.shortened_url} />
                                </Box>
                                <ButtonGroup size="lg" isAttached>
                                    <Button>
                                        Mettre à jour
                                    </Button>
                                    <Button>
                                        Supprimer
                                    </Button>
                                </ButtonGroup>
                            </AccordionPanel>
                        </AccordionItem>);
                        })}

                    </Accordion>
        */
/*

                                                        <Wrap spacing="30px">
                                    <WrapItem width="40%">
                                        <Box borderWidth="1px" width="100%"  borderRadius="lg">
                                        <Box borderTopRadius="lg" borderBottomWidth="1px" bg="green.300" p={4}>
                                            <Heading>Cible</Heading>
                                        </Box>
                                        <Box p="6">
                                            <Text>{link.base_url}</Text>
                                        </Box>
                                    </Box>
                                    </WrapItem>
                                    <WrapItem  width="40%">

            </WrapItem>
                                    <WrapItem width="40%">
                                    <Box borderWidth="1px" width="100%" borderRadius="lg">
                                    <Box borderTopRadius="lg" borderBottomWidth="1px" bg="green.300" p={4}>
                                        <Heading>Description</Heading>
                                    </Box>
                                    <Box p="6">
                                        <Text>{(link.short_description && link.short_description.length) ? link.short_description : "Pas de description"}</Text>
                                    </Box>
                                </Box>
                                    </WrapItem>
                                </Wrap>

                        */
/*
                        <Table variant="striped" colorScheme="teal" cursor="pointer">
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Short url</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    links.map((link) => {
                                        return (<Tr key={link.id}> 
                                            <Td>{link.id}</Td>
                                            <Td>{link.shortened_url}</Td>
                                            <Td>
                                                <ButtonGroup size="lg" isAttached>
                                                    <IconButton color={"white"} borderRadius="none" bg="red" icon={ <MdClear /> } />
                                                    <IconButton color={"white"} borderRadius="none" bg="blue.400" icon={ <SettingsIcon /> } />
                                                </ButtonGroup>
                                            </Td>
                                        </Tr>)
                                    })
                                }
                            </Tbody>
                        </Table>
                        */
