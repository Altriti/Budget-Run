import { Segment, Card, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function ProfileUserData() {
    const { userStore } = useStore();
    const { user } = userStore;

    if (!user) return <LoadingComponent />;

    return (
        <Segment>
            <Header content='User Data' color="red" />
            <Card.Group>
                <Card
                    fluid
                    color='red'
                    header={
                        <div
                            style={{
                                display: 'flex', flexDirection: 'row'
                                , justifyContent: 'space-between'
                            }}
                        >
                            <span>
                                DisplayName:
                            </span>
                            <span
                                style={{ fontSize: '20px', fontWeight: 'bold' }}
                            >
                                {user.displayName}
                            </span>
                        </div>
                    }
                />
                <Card
                    fluid
                    color='red'
                    header={
                        <div
                            style={{
                                display: 'flex', flexDirection: 'row'
                                , justifyContent: 'space-between'
                            }}
                        >
                            <span>
                                UserName:
                            </span>
                            <span
                                style={{ fontSize: '20px', fontWeight: 'bold' }}
                            >
                                {user.userName}
                            </span>
                        </div>
                    }
                />
                <Card
                    fluid
                    color='red'
                    header={
                        <div
                            style={{
                                display: 'flex', flexDirection: 'row'
                                , justifyContent: 'space-between'
                            }}
                        >
                            <span>
                                Email:
                            </span>
                            <span
                                style={{ fontSize: '20px', fontWeight: 'bold' }}
                            >
                                {user.email}
                            </span>
                        </div>
                    }
                />
            </Card.Group>
        </Segment>
    )
})