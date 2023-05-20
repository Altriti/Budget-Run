import { observer } from "mobx-react-lite";
import { Button, Grid, Header, Icon, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link, NavLink } from "react-router-dom";
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
            <Header style={{ fontWeight: "bold", fontSize: '13px', textDecoration: 'underline', color: 'red' }}>MEMBERS</Header>
            <Item.Group divided>
                {membersArr.map(member => (
                    <Item key={member.id}>
                        <Item.Content>
                            <Item.Header as='a' style={{ width: '100%', }}>
                                <Grid>
                                    <Grid.Column>
                                        {member.name} {member.surname}
                                    </Grid.Column>
                                </Grid>
                            </Item.Header>
                            <Segment basic>
                                <Button
                                    as={Link}
                                    to={`/members/${member.id}`}
                                    floated='right'
                                    content='View'
                                    color='blue'
                                    basic
                                    size="small"
                                />
                                <Button
                                    name={member.id}
                                    loading={loading && target === member.id}
                                    onClick={(e) => handleMemberDelete(e, member.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red'
                                    basic
                                    size="small"
                                />
                                <Label basic content='label' />
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
            <Button animated style={{ position: 'fixed', bottom: '1em', right: '1em' }}
                as={NavLink}
                to='/createMember'
                color='red'
                size='big'
                circular
            >
                <Button.Content visible><Icon name='plus' /></Button.Content>
                <Button.Content hidden>ADD</Button.Content>
            </Button>
        </Segment >
    )
})