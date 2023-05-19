import { observer } from "mobx-react-lite";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import EmptyComponent from "../../../app/layout/EmptyComponent";

export default observer(function MemberList() {
    const { memberStore } = useStore();
    const { membersArr, deleteMember, loading } = memberStore;

    const [target, setTarget] = useState('');

    function handleMemberDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteMember(id);
    };

    if (memberStore.memberRegistry.size === 0) return <EmptyComponent typeOfList="Members" />

    return (
        <Segment>
            {membersArr.map(member => (
                <Item key={member.id}>
                    <Item.Content>
                        <div>{member.id}</div>
                        <div>{member.name}</div>
                        <div>{member.surname}</div>
                    </Item.Content>
                    <Item.Extra>
                        <Button
                            name={member.id}
                            content='Delete'
                            loading={loading && target === member.id}
                            onClick={(e) => handleMemberDelete(e, member.id)}
                        />
                        <Button
                            as={Link}
                            to={`/members/${member.id}`}
                            content='View'
                        />
                    </Item.Extra>
                </Item>
            ))}
            <Button
                as={Link}
                to={'/createMember'}
                content="Add Member"
            />
        </Segment>
    )
})