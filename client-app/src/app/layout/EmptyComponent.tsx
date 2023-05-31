import { Segment } from "semantic-ui-react";

interface Props {
    typeOfList?: string
}

export default function EmptyComponent({ typeOfList }: Props) {
    return (
        <Segment raised>
            There are no {typeOfList}
        </Segment>
    )
}