import { useConfigStore } from "../../stores/config"
import { useGameStore } from "../../stores/game"
import { useSocket } from "./executor/socket"
import { useLocal } from "./executor/local"


const useExecutor = () => useConfigStore().mode.value == "offline" ? useLocal(): useSocket() 

const setup = () => {
    const { reset } = useGameStore()
    reset();
    useExecutor().setup()
}
const drop = (destination, pieceType) => useExecutor().drop(destination, pieceType)
const move = (origin, destination, promotion) => useExecutor().move(origin, destination, promotion)

export { setup, drop, move }