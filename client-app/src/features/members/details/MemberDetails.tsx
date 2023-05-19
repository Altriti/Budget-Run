import { observer } from "mobx-react-lite"
import { useStore } from "../../../app/stores/store"
import { Button, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default observer(function MemberDetails() {
    const { memberStore } = useStore();
    const { selectedMember: member, loadingInitial, loadMember } = memberStore;
    const { id } = useParams();

    useEffect(() => {
        if (id) loadMember(id)
    }, [loadMember, id])

    if (loadingInitial || !member) return <LoadingComponent content="Loading member..." />

    return (
        <Segment>
            <div>{member.id}</div>
            <div>{member.name}</div>
            <div>{member.surname}</div>
            <Button
                as={Link}
                to={`/members/manage/${member.id}`}
                content='Edit'
            />
            <Button
                as={Link}
                to={'/members'}
                content='Cancel'
            />
        </Segment>
    )
})