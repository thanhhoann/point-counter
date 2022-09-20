import React, { useState } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Heading,
  Divider,
  Icon,
  Flex,
  IconButton,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { BsPeople } from "react-icons/bs";
import PointCounterMain from "./components/PointerCounterMain";
import { useDispatch, useSelector } from "react-redux";
import { selectGameStatus, setGameStarted } from "./features/gameSlice";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [registeredPlayers, setRegisteredPlayers] = useState([]);
  const [noRounds, setNoRounds] = useState();
  const [registeredNoRounds, setRegisteredNoRounds] = useState();

  const dispatch = useDispatch();
  const isGameStarted = useSelector(selectGameStatus);

  const handleAddPlayer = () => {
    const newPlayer = {
      id: String(Math.random()),
      name: playerName,
      point: 0,
    };
    setPlayers([...players, newPlayer]);
    setPlayerName("");
  };

  const handleRemovePlayer = (id) => {
    setPlayers(() => players.filter((player) => player.id !== id));
  };

  const handleStartGame = () => {
    dispatch(setGameStarted());
    setRegisteredNoRounds(noRounds);
    setRegisteredPlayers(players);
    setNoRounds();
    setPlayers([]);
  };

  return (
    <>
      <Box w="100vw" h="100vh">
        {/* <Box mx="auto"w py="1rem" textAlign="center">
          <Heading>
            {"<"} Point Counter {">"}
          </Heading>
        </Box> */}

        {isGameStarted === "STARTED" ? (
          <PointCounterMain
            noRounds={registeredNoRounds}
            registeredPlayers={registeredPlayers}
            // registeredPlayers={[
            //   { id: "1", name: "hoan", point: 0 },
            //   { id: "2", name: "thinh", point: 0 },
            //   { id: "3", name: "hau", point: 0 },
            // ]}
          />
        ) : (
          <>
            <Box w="90vw" mx="auto" py="1rem" px="0.5rem" rounded="0.5rem">
              {/* <FormControl mb="1rem">
                <FormLabel>Number of rounds</FormLabel>
                <Input
                  type="number"
                  value={noRounds}
                  onChange={(e) => setNoRounds(e.target.value)}
                />
              </FormControl> */}

              <Flex w="full" align="center" gap="1rem" mx="auto">
                <Button w="full" bg="gray.200" onClick={onOpen}>
                  <Flex align="center" gap="0.5rem">
                    <AddIcon w="0.7rem" />
                    <Text>Add player</Text>
                    <Box color="gray.400">|</Box>
                    <Flex justify="center" align="center" gap="0.5rem">
                      <Text>{players.length}</Text> <BsPeople />
                    </Flex>
                  </Flex>
                </Button>
              </Flex>
              <Divider my="1rem" />

              {players.map((player, index) => (
                <Player
                  key={index}
                  player={player}
                  onRemove={handleRemovePlayer}
                />
              ))}
              <Button
                w="full"
                bg="green.100"
                onClick={handleStartGame}
                isDisabled={players.length < 2}
              >
                <Flex align="center" gap="0.5rem">
                  <Text>START GAME</Text>
                </Flex>
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent mx="1rem">
          <ModalHeader textAlign="center">
            <Heading>Player's name</Heading>
          </ModalHeader>
          <ModalBody>
            <FormControl>
              <Input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              w="full"
              mx="auto"
              type="submit"
              onClick={() => {
                handleAddPlayer();
                onClose();
              }}
            >
              <Flex align="center" gap="0.5rem">
                <AddIcon w="0.7rem" />
                <Text>Add player</Text>
              </Flex>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default App;

function Player({ player, onRemove }) {
  const removePlayer = () => {
    onRemove(player.id);
  };

  return (
    <>
      <Flex my="1rem" align="center" justify="space-between">
        <Text>{player.name}</Text>
        <Button onClick={removePlayer}>
          <CloseIcon w="0.7rem" />
        </Button>
      </Flex>
    </>
  );
}
