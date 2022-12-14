import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setGameEnded } from "../features/gameSlice";
import { BsPerson } from "react-icons/bs";

const arr = [];
export default function PointCounterMain({ registeredPlayers, noRounds }) {
  // randomly generate players order
  // calculate first second third player

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [players, setPlayers] = useState(registeredPlayers);
  const [roundNumber, setRoundNumber] = useState(1);
  const [results, setResults] = useState([[{}]]);
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [points, setPoints] = useState([]);
  const [wrongPointChange, setWrongPointChange] = useState(false);

  const handleStartNewGame = () => {
    dispatch(setGameEnded());
  };

  const handleEndRound = () => {
    setRoundNumber(roundNumber + 1);
    // console.log(roundNumber);
    // console.log(noRounds);
    if (roundNumber >= noRounds) {
      onOpen();
    } else {
      // const arr = [
      //   { name: "asoetuh", id: "nsthaoenu" },
      //   { name: "saoteuh", id: "sthaoesunt" },
      // ];
      // const arrArr = [];
      // arrArr.push(arr);
      // console.log(arrArr);

      console.log(players);

      // for (const player of players) {
      //   arr.push(player.point);
      // }
      // setPoints([...points, arr]);
    }
  };

  useEffect(() => {
    console.log(players);
  }, [handleEndRound]);

  useEffect(() => {
    let sum = 0;
    for (const player of players) {
      sum += player.point;
    }

    if (sum !== 0) setWrongPointChange(true);
    else setWrongPointChange(false);
  }, [players]);

  return (
    <>
      <Center w="full" gap="1rem" mt="1rem" px="2rem">
        {noRounds && (
          <Button
            borderWidth="1px"
            borderColor="gray.500"
            onClick={handleEndRound}
          >
            End round {roundNumber}/{noRounds}
          </Button>
        )}

        <Button
          borderWidth="1px"
          borderColor="gray.500"
          w="80%"
          onClick={onOpen}
        >
          New game
        </Button>
      </Center>

      <Center my="1rem" fontWeight="700">
        <Text w="max-content" minH="1.5rem">
          {wrongPointChange && "?????? Total must equal to 0"}
        </Text>
      </Center>

      <Box w="full" px="1rem" mt="1rem">
        {players.map((player, index) => (
          <Player
            key={index}
            index={index}
            name={player.name}
            point={player.point}
            onChangePoint={(index, action) => {
              const newArr = [...players];
              if (action === "increase")
                players[index].point = players[index].point + 1;
              else players[index].point = players[index].point - 1;
              setPlayers(newArr);
            }}
          />
        ))}
      </Box>

      {/* <VStack>
        {results.map((result, result_index) => (
          <Flex key={result_index}>
            {result.map((player, player_index) => (
              <Text key={player_index + result_index}>{player.point}</Text>
            ))}
          </Flex>
        ))}
      </VStack> */}

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent mx="1rem">
          <ModalHeader></ModalHeader>
          {roundNumber >= noRounds ? (
            <>
              <ModalBody>
                <Flex flexDir="column" justify="center">
                  {players.map((player, index) => (
                    <Flex
                      gap="1rem"
                      justify="space-between"
                      w="50%"
                      mx="auto"
                      mb="1rem"
                    >
                      <Text fontWeight="700">{player.name}</Text>
                      <Text>{player.point}</Text>
                    </Flex>
                  ))}
                </Flex>
              </ModalBody>
              <ModalFooter>
                <Button
                  mx="auto"
                  type="submit"
                  onClick={() => {
                    handleStartNewGame();
                  }}
                >
                  START NEW GAME
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalBody textAlign="center">
                <Heading>Start new game ?</Heading>
              </ModalBody>
              <ModalFooter>
                <Button mx="auto" type="submit" onClick={onClose}>
                  NO
                </Button>
                <Button
                  mx="auto"
                  type="submit"
                  onClick={() => {
                    handleStartNewGame();
                  }}
                >
                  YES
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const Player = ({ key, index, name, point, onChangePoint }) => {
  const handleDecreasePoint = () => {
    onChangePoint(index, "decrease");
  };

  const handleIncreasePoint = () => {
    onChangePoint(index, "increase");
  };

  return (
    <>
      <Flex justify="space-between" align="center">
        <Button
          bg="white"
          boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
          _hover={{
            boxShadow:
              "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
          }}
          _active={{
            boxShadow:
              "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
          }}
          onClick={handleDecreasePoint}
        >
          -
        </Button>

        <Flex
          flexDir="column"
          align="center"
          mx="1rem"
          mb="1rem"
          boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
          p="1rem"
          rounded="1rem"
          textAlign="center"
          key={key}
          w="full"
        >
          <Flex
            mb="1rem"
            rounded="0.5rem"
            py="0.4rem"
            align="center"
            justify="center"
            gap="0.5rem"
          >
            <BsPerson />
            <Text fontWeight="700" fontSize="1.2rem">
              {name}
            </Text>
          </Flex>

          <Flex align="center" justify="space-between">
            <Box
              w="5rem"
              rounded="0.5rem"
              boxShadow="rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset"
            >
              <Text fontSize="1.5rem" fontStyle="bold">
                {point}
              </Text>
            </Box>
          </Flex>
        </Flex>

        <Button
          bg="white"
          boxShadow="rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
          _hover={{
            boxShadow:
              "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
          }}
          _active={{
            boxShadow:
              "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
          }}
          onClick={handleIncreasePoint}
        >
          +
        </Button>
      </Flex>
    </>
  );
};
