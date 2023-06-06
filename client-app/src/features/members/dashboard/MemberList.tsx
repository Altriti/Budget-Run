import { observer } from "mobx-react-lite";
import { Button, Grid, Header, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import EmptyComponent from "../../../app/layout/EmptyComponent";

export default observer(function MemberList() {
    const { memberStore } = useStore();
    const { membersArr, deleteMember, loading, manageAccess } = memberStore;

    const [target, setTarget] = useState('');

    function handleMemberDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteMember(id);
    };

    if (memberStore.memberRegistry.size === 0) return <EmptyComponent typeOfList="Members" />

    return (
        <Segment>
            <Header
                style={{
                    fontWeight: "bold", fontSize: '13px', textDecoration: 'underline', color: 'red'
                }}
            >
                MEMBERS
            </Header>
            <Item.Group divided>
                {membersArr.map(member => (
                    <Item key={member.id}>
                        <Item.Content>
                            <Item.Header
                                as={Link}
                                to={`/members/${member.id}`}
                                style={{ width: '100%', }}>
                                <Grid>
                                    <Grid.Column>
                                        {member.name} {member.surname}
                                    </Grid.Column>
                                </Grid>
                            </Item.Header>
                            <Segment basic>
                                <Button
                                    className="deleteButton"
                                    name={member.id}
                                    loading={loading && target === member.id}
                                    onClick={(e) => handleMemberDelete(e, member.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                    size="tiny"
                                />
                                <Label basic content={member.displayName} />
                                <Button
                                    name={member.id}
                                    content={member.access ? 'Granted' : 'Denied'}
                                    color={member.access ? 'green' : 'red'}
                                    onClick={() => manageAccess(member.id)}
                                    size="mini"
                                />
                            </Segment>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment >
    )
})