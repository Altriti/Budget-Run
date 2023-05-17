import { Segment } from "semantic-ui-react";

interface Props {
    typeOfList?: string
}

export default function EmptyComponent({ typeOfList }: Props) {
    return (
        <Segment>
            There are no {typeOfList}
        </Segment>
    )
}