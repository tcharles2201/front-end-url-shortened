import React, { useState, Fragment } from "react";
import { Button, Spacer, Input } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useToast,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { HomeService } from "../../lib/services/HomeService";
import { Heading, InputGroup, Box, Flex } from "@chakra-ui/react";
import { useClipboard } from "@chakra-ui/react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { DownloadIcon, CopyIcon } from "@chakra-ui/icons";

const homeService = new HomeService();

var QRCode = require("qrcode.react");

export default function PostLink() {
  const [shortedLink, setLink] = useState("");
  const [baseLink, setBaseLink] = useState("");
  const toast = useToast();

  const { onCopy, hasCopied } = useClipboard(shortedLink);

  function createLinkShorted() {
    document.getElementById("url-entered").value = "";
    const toSaved = {
      short_description: "",
      is_anonymous: 1,
      base_url: baseLink,
    };
    if (baseLink !== "") {
      homeService
        .createLink(toSaved)
        .then((response) => {
          const data = response.data;
          setLink(data.shortened_url);

          toast({
            title: "Link successfuly shorted.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log("error");
          toast({
            title: "Error when shorten link, please try again!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Please enter a link.",
        description: "You've to enter a link to short.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    FetchBaseUrl();
  }

  function FetchBaseUrl() {
    if (shortedLink) {
      homeService
        .getBaseUrl(shortedLink)
        .then((response) => {
          if (response) {
            toast({
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          } else {
            toast({
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast({
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          //setOriginalLink(null);
        });
    }
  }

  // download QR code
  const download = function () {
    const link = document.createElement("a");
    link.download = "shortnedUrl.png";
    link.href = document.getElementById("canvas").toDataURL();
    link.click();
  };

  return (
    <Box
      margin="auto"
      marginTop="30px"
      p={10}
      maxWidth="80%"
      borderWidth={5}
      width="full"
    >
      <Box textAlign="center" paddingBottom="15px">
        <Heading as="h1" textColor="black" fontSize="40px">
          Paste the URL to be shortened
        </Heading>
      </Box>
      <Spacer />

      <InputGroup size="lg" paddingBottom="10px">
        <Input
          id="url-entered"
          flex="1"
          py={2}
          px={4}
          rounded="md"
          bg="gray.100"
          borderWidth="1px"
          _hover={{ borderColor: "gray.200", bg: "gray.200" }}
          _focus={{
            outline: "none",
            bg: "white",
            boxShadow: "outline",
            borderColor: "gray.300",
          }}
          onChange={(e) => setBaseLink(e.target.value)}
          placeholder="Enter the Link Here"
        />
        <Flex>
          <Button
            bg="teal.500"
            py={2}
            px={4}
            ml={3}
            rounded="md"
            fontWeight="semibold"
            color="white"
            _hover={{ bg: "teal.600" }}
            _focus={{ boxShadow: "outline" }}
            rightIcon={<ArrowForwardIcon />}
            onClick={createLinkShorted}
            type="submit"
          >
            Shorten URL
          </Button>
        </Flex>
      </InputGroup>

      <Table variant="striped" colorScheme="teal" size="lg">
        <TableCaption>
          Use our URL Shortener to create a shortened link making it easy to
          remember
        </TableCaption>
        <Thead>
          <Tr>
            <Th textDecoration="underline">Your Long URL</Th>
            <Th textDecoration="underline">Shorten URL</Th>
            <Th textDecoration="underline"> QR Code</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td maxWidth="80px">
              {baseLink === "" ? null : (
                <Link color="blue" href={baseLink} isExternal>
                  {baseLink}
                </Link>
              )}
            </Td>

            <Td maxWidth="80px">
              <Link color="blue" href={shortedLink} isExternal>
                {shortedLink}
              </Link>
            </Td>
            <Td maxWidth="70px">
              {shortedLink === "" ? null : (
                <Fragment>
                  <Box
                    width="70%"
                    boxShadow="outline"
                    p="4"
                    rounded="md"
                    bg="white"
                  >
                    <QRCode width="full" value={shortedLink} id="canvas" />
                  </Box>
                  <br />
                  <Button
                    leftIcon={<DownloadIcon />}
                    colorScheme="teal"
                    variant="outline"
                    borderColor="blue"
                    type="button"
                    onClick={download}
                  >
                    Download QR
                  </Button>{" "}
                  <br />
                  <br />
                  <Button
                    leftIcon={<CopyIcon />}
                    colorScheme="teal"
                    variant="outline"
                    borderColor="blue"
                    onClick={onCopy}
                    ml={2}
                  >
                    {hasCopied ? "Copied" : "Copy URL"}
                  </Button>
                </Fragment>
              )}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
}
