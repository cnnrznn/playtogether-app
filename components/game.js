import { Text } from "react-native";

export default function Game({game}) {
    //console.log("item: ", game)
    return (
        <Text>{JSON.stringify(game, null, 2)}</Text>
    );
};