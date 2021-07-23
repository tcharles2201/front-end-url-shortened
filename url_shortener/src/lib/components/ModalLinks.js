import React, { useRef, useState } from "react";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputLeftAddon,
  Box,
  Textarea,
} from "@chakra-ui/react";
import QRCode from "qrcode.react";

function renderExpiredAt(expire, link, expiredAtRef) {
  return (
    expire && (
      <FormControl marginBottom={4} isRequired>
        <FormLabel>Date d'expiration:</FormLabel>
        <InputGroup>
          <Input
            type={"date"}
            ref={expiredAtRef}
            defaultValue={link.expired_at}
          />
        </InputGroup>
      </FormControl>
    )
  );
}

const BASE_HOST = "http://localhost:3000/redirect/";

export function ModalLinks(props) {
  const { link, isOpen, UpdateLink, DeleteLink, onClose } = props;
  const [expire, setExpire] = useState(false);
  const codeRef = useRef();
  const baseUrlRef = useRef();
  const shortDescriptionRef = useRef();
  const expiredAtRef = useRef();
  const expireRef = useRef();
  const refObject = { codeRef, baseUrlRef, shortDescriptionRef, expiredAtRef };

  if (link && link.shortened_url) {
    link.code = link.shortened_url.substring(
      BASE_HOST.length,
      link.shortened_url.length
    );
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Link</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <FormControl isRequired>
              <FormLabel>Shortened URL</FormLabel>
              <InputGroup>
                <InputLeftAddon children={BASE_HOST} />
                <Input ref={codeRef} defaultValue={link.code} />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Cible</FormLabel>
              <InputGroup>
                <Input ref={baseUrlRef} defaultValue={link.base_url} />
              </InputGroup>
            </FormControl>
            <FormControl marginBottom={4}>
              <FormLabel>Description:</FormLabel>
              <InputGroup>
                <Textarea
                  ref={shortDescriptionRef}
                  defaultValue={link.short_description}
                ></Textarea>
              </InputGroup>
            </FormControl>
            <FormControl marginBottom={4}>
              <FormLabel>Expired ?:</FormLabel>
              <InputGroup>
                <Checkbox
                  isChecked={expire}
                  onChange={(e) => setExpire(e.target.checked)}
                />
              </InputGroup>
            </FormControl>
            {renderExpiredAt(expire, link, expiredAtRef)}
            <Box marginBottom={4}>
              <QRCode value={link.shortened_url} />
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup size="lg" isAttached>
            <Button
              onClick={(event) => {
                const data = JSON.parse(JSON.stringify(link));

                for (let key in refObject) {
                  const i = key.indexOf("Ref");
                  const u_key = key.substr(0, i).replace(/[A-Z]+/g, (str) => {
                    const nb = str.charCodeAt(0);
                    const aMajCharCode = "A".charCodeAt(0);
                    const aCharCode = "a".charCodeAt(0);
                    const diff = aCharCode - aMajCharCode;
                    const c = String.fromCharCode(nb + diff);

                    return `_${c}`;
                  });

                  if (refObject[key] && refObject[key].current) {
                    const value = refObject[key].current.value;

                    if (value) {
                      if (u_key === "code") {
                        data["shortened_url"] = `${BASE_HOST}${value}`;
                      } else {
                        data[u_key] = value;
                      }
                    }
                  }
                }
                if (!expire) {
                  data.expired_at = null;
                }
                UpdateLink(event, data);
              }}
            >
              Mettre à jour
            </Button>
            <Button
              onClick={(event) => {
                DeleteLink(event, link);
                onClose(event);
              }}
            >
              Supprimer
            </Button>
            <Button onClick={onClose}>Annuler</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
