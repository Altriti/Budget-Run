import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NoutFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search">
                    Couldn't find what you are looking for!
                </Icon>
                <Segment.Inline>
                    <Button
                        as={Link} to='/transactions'
                    >
                        Return to Transactions Page
                    </Button>
                </Segment.Inline>
            </Header>
        </Segment>
    )
}